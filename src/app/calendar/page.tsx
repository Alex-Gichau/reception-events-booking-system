"use client"

import * as React from "react"
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  subDays,
  setHours,
  setMinutes,
  startOfDay,
  endOfDay
} from "date-fns"
import { ChevronLeft, ChevronRight, Plus, Search, HelpCircle, Settings, X, Clock, MapPin, AlignLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getEvents, deleteEvent } from "@/app/actions/events"

type CalendarEvent = {
  id: number | string;
  title: string;
  date: Date;
  color: string;
  durationHours: number;
  description?: string;
  location?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [view, setView] = React.useState<'month' | 'week' | 'day'>('month')
  const [showSearch, setShowSearch] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)

  const [events, setEvents] = React.useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents()
        if (data) {
          const formattedEvents: CalendarEvent[] = data.map((evt: any) => {
            // evt.date is YYYY-MM-DD
            // evt.start_time is HH:MM:SS
            const [year, month, day] = evt.date.split("-").map(Number)
            const [hours, minutes] = evt.start_time.split(":").map(Number)
            
            // Construct local date time
            const eventDate = new Date(year, month - 1, day, hours, minutes)

            return {
              id: evt.id,
              title: evt.title,
              date: eventDate,
              color: evt.color || 'bg-blue-500',
              durationHours: Number(evt.duration_hours) || 1,
              description: evt.description,
              location: evt.location,
            }
          })
          setEvents(formattedEvents)
        }
      } catch (err) {
        console.error("Failed to fetch events:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id)
      setEvents(events.filter(e => e.id !== id))
      setSelectedEvent(null)
    } catch(err) {
      console.error(err)
      alert("Error deleting event")
    }
  }

  // Calculations for views
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const viewStart = view === 'month' ? startOfWeek(monthStart) : view === 'week' ? startOfWeek(currentDate) : startOfDay(currentDate)
  const viewEnd = view === 'month' ? endOfWeek(monthEnd) : view === 'week' ? endOfWeek(currentDate) : endOfDay(currentDate)

  const days = eachDayOfInterval({ start: viewStart, end: viewEnd })

  const nextPeriod = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1))
    else if (view === 'week') setCurrentDate(addDays(currentDate, 7))
    else setCurrentDate(addDays(currentDate, 1))
  }

  const prevPeriod = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1))
    else if (view === 'week') setCurrentDate(subDays(currentDate, 7))
    else setCurrentDate(subDays(currentDate, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getHeaderText = () => {
    if (view === 'month') return format(currentDate, "MMMM yyyy")
    if (view === 'week') {
      const wStart = startOfWeek(currentDate)
      const wEnd = endOfWeek(currentDate)
      if (isSameMonth(wStart, wEnd)) {
        return `${format(wStart, "MMM d")} - ${format(wEnd, "d, yyyy")}`
      }
      return `${format(wStart, "MMM d")} - ${format(wEnd, "MMM d, yyyy")}`
    }
    return format(currentDate, "MMMM d, yyyy")
  }

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
  }

  const renderMonthView = () => (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-white">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
      
      {/* Days Grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-[repeat(auto-fill,minmax(100px,1fr))] auto-rows-[minmax(100px,1fr)] bg-gray-200 gap-px overflow-y-auto isolate">
         {days.map((day) => {
           const dayEvents = events.filter(e => isSameDay(e.date, day))
           const isToday = isSameDay(day, new Date())
           const isCurrentMonth = isSameMonth(day, currentDate)
           
           return (
             <div
               key={day.toString()}
               className={cn(
                 "bg-white min-h-[120px] p-1 flex flex-col hover:bg-gray-50 transition-colors group z-0",
                 !isCurrentMonth && "bg-gray-50/40"
               )}
               onClick={() => {
                 setCurrentDate(day)
                 setView('day')
               }}
             >
               <div className="flex items-center justify-center w-full mb-1 mt-1">
                 <div
                   className={cn(
                     "text-xs font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-all cursor-pointer",
                     isToday ? "bg-blue-600 text-white" : "text-gray-700 group-hover:bg-gray-200",
                     !isCurrentMonth && !isToday && "text-gray-400"
                   )}
                 >
                   {format(day, "d")}
                 </div>
               </div>
               <div className="flex-1 overflow-y-auto space-y-1 no-scrollbar px-1 mt-1">
                 {dayEvents.map(event => (
                   <div
                     key={event.id}
                     onClick={(e) => handleEventClick(e, event)}
                     className={cn(
                       "px-2 py-1 text-[11px] truncate rounded text-white font-medium cursor-pointer transition-opacity hover:opacity-80 shadow-sm",
                       event.color
                     )}
                     title={event.title}
                   >
                     {format(event.date, 'p').toLowerCase()} {event.title}
                   </div>
                 ))}
               </div>
             </div>
           )
         })}
      </div>
    </div>
  )

  const renderTimeGrid = (gridDays: Date[]) => (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Days Header */}
      <div className="flex border-b border-gray-200 bg-white ml-14">
        {gridDays.map((day) => {
          const isToday = isSameDay(day, new Date())
          return (
            <div key={day.toString()} className="flex-1 py-3 text-center border-l border-gray-100 first:border-none flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setCurrentDate(day)
                  setView('day')
                }}
            >
              <span className={cn("text-xs font-medium uppercase tracking-wider", isToday ? "text-blue-600" : "text-gray-500")}>{format(day, 'EEE')}</span>
              <div className={cn("text-xl font-normal w-10 h-10 flex items-center justify-center rounded-full", isToday ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200")}>
                {format(day, 'd')}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Time Grid Scroll Container */}
      <div className="flex-1 overflow-y-auto relative flex">
        {/* Time Labels */}
        <div className="w-14 shrink-0 border-r border-gray-100 bg-white relative">
          {HOURS.map((hour) => (
            <div key={hour} className="h-14 relative">
              <span className="absolute -top-2.5 right-2 text-xs text-gray-400 font-medium">
                {hour === 0 ? '' : format(setHours(new Date(), hour), 'h a')}
              </span>
            </div>
          ))}
        </div>
        
        {/* Grid Area */}
        <div className="flex-1 flex relative">
           {/* Horizontal Grid lines */}
           <div className="absolute inset-0 pointer-events-none">
             {HOURS.map((hour) => (
               <div key={`line-${hour}`} className="h-14 border-b border-gray-100 w-full" />
             ))}
           </div>
           
           {/* Day Columns */}
           {gridDays.map((day) => (
             <div key={day.toString()} className="flex-1 border-r border-gray-100 relative min-h-[1344px]"> {/* 24 * 56px */}
               {events.filter(e => isSameDay(e.date, day)).map(event => {
                 const top = (event.date.getHours() + event.date.getMinutes() / 60) * 56 // 56px per hour
                 const height = event.durationHours * 56
                 return (
                   <div
                     key={event.id}
                     onClick={(e) => handleEventClick(e, event)}
                     className={cn(
                       "absolute left-0 right-1 ml-1 rounded-md px-2 py-1 text-xs text-white shadow-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity",
                       event.color
                     )}
                     style={{ top: `${top}px`, height: `${height}px` }}
                   >
                     <div className="font-semibold truncate">{event.title}</div>
                     <div className="truncate opacity-90">{format(event.date, 'p')}</div>
                   </div>
                 )
               })}
             </div>
           ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white overflow-hidden font-sans relative">
      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
             onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200"
               onClick={e => e.stopPropagation()}>
             {/* Modal Header */}
             <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
               <div className="flex items-center gap-2">
                 <div className={cn("w-3 h-3 rounded-full shadow-sm", selectedEvent.color.replace('bg-', 'bg-').replace('text-', 'bg-'))} />
                 <span className="text-sm font-medium text-gray-500">Event Details</span>
               </div>
               <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900" onClick={() => setSelectedEvent(null)}>
                   <X className="w-4 h-4" />
                 </Button>
               </div>
             </div>
             {/* Modal Body */}
             <div className="p-6 space-y-4">
               <div>
                 <h2 className="text-2xl font-semibold text-gray-900">{selectedEvent.title}</h2>
               </div>
               <div className="space-y-3 pt-2">
                 <div className="flex items-start gap-3 text-gray-600">
                   <Clock className="w-5 h-5 mt-0.5 text-gray-400" />
                   <div>
                     <p className="text-sm font-medium text-gray-900">
                       {format(selectedEvent.date, 'EEEE, MMMM d')}
                     </p>
                     <p className="text-sm">
                       {format(selectedEvent.date, 'h:mm a')} - {format(addMonths(currentDate, 0), 'h:mm a')} {/* Placeholder end time */}
                     </p>
                   </div>
                 </div>
                 {selectedEvent.location && (
                   <div className="flex items-start gap-3 text-gray-600">
                     <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                     <p className="text-sm">{selectedEvent.location}</p>
                   </div>
                 )}
                 {selectedEvent.description && (
                   <div className="flex items-start gap-3 text-gray-600">
                     <AlignLeft className="w-5 h-5 mt-0.5 text-gray-400" />
                     <p className="text-sm">{selectedEvent.description}</p>
                   </div>
                 )}
                 <div className="flex items-start gap-3 text-gray-600">
                     <User className="w-5 h-5 mt-0.5 text-gray-400" />
                     <p className="text-sm">Alex Gichau</p>
                 </div>
               </div>
             </div>
             {/* Modal Footer */}
             <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
               <Button variant="destructive" onClick={() => handleDelete(selectedEvent.id)}>Delete</Button>
               <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                 <Link href={`/edit-event/${selectedEvent.id}`}>Edit Event</Link>
               </Button>
             </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 lg:px-6 py-3 border-b border-gray-200 bg-white shadow-sm z-10 gap-y-3">
        <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={goToToday} className="px-4 py-1.5 h-auto text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100">
              Today
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={prevPeriod} className="rounded-full w-8 h-8 text-gray-600 hover:bg-gray-100">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextPeriod} className="rounded-full w-8 h-8 text-gray-600 hover:bg-gray-100">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <h1 className="text-lg lg:text-xl font-normal text-gray-800 tracking-wide lg:min-w-[220px] truncate">
            {getHeaderText()}
          </h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 ml-auto">
          {showSearch && (
            <div className="relative animate-in slide-in-from-right-4 duration-200 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 transition-all"
                autoFocus
              />
            </div>
          )}
          <div className="flex items-center text-gray-600">
             <Button variant="ghost" size="icon" className={cn("rounded-full w-9 h-9 hover:bg-gray-100", showSearch && "bg-gray-100 text-gray-900")}
                     onClick={() => setShowSearch(!showSearch)}>
               <Search className="w-5 h-5" />
             </Button>
             <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-gray-100 hidden sm:inline-flex">
               <HelpCircle className="w-5 h-5" />
             </Button>
             <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-gray-100 hidden sm:inline-flex">
               <Settings className="w-5 h-5" />
             </Button>
          </div>
          <div className="bg-gray-50 border border-gray-300 rounded-md flex p-0.5">
            <button onClick={() => setView('month')} className={cn("px-2 lg:px-3 py-1 text-sm font-medium rounded-sm transition-colors", view === 'month' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900")}>Month</button>
            <button onClick={() => setView('week')} className={cn("px-2 lg:px-3 py-1 text-sm font-medium rounded-sm transition-colors", view === 'week' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900")}>Week</button>
            <button onClick={() => setView('day')} className={cn("px-2 lg:px-3 py-1 text-sm font-medium rounded-sm transition-colors", view === 'day' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900")}>Day</button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 hidden xl:flex flex-col bg-white z-10 transition-all duration-300">
          <div className="p-4">
            <Button className="w-full flex items-center justify-center gap-2 rounded-full py-6 shadow-sm hover:shadow-md transition-shadow bg-blue-600 hover:bg-blue-700 text-white font-medium text-base">
              <Plus className="w-5 h-5" />
              Create
            </Button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 px-2 tracking-wide">My calendars</h3>
              <div className="space-y-3 px-2">
                {[
                  { label: "Alex Gichau", color: "text-blue-600" },
                  { label: "Tasks", color: "text-indigo-600" },
                  { label: "Birthdays", color: "text-emerald-600" },
                  { label: "Reminders", color: "text-purple-600" },
                ].map((calendar, i) => (
                  <label key={i} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className={cn("rounded w-4 h-4 cursor-pointer focus:ring-offset-0 transition-colors border-gray-300 focus:ring-blue-600", calendar.color)} 
                      defaultChecked 
                    />
                    <span className="group-hover:text-gray-900 transition-colors">{calendar.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area Rendering (Month/Week/Day) */}
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderTimeGrid(days)}
        {view === 'day' && renderTimeGrid(days)}
      </div>
    </div>
  )
}