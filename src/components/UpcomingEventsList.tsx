"use client"

import * as React from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Calendar, CheckCircle, Users, ChevronRight, Edit2, ExternalLink, X, Clock, MapPin, AlignLeft, User } from 'react-feather'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { deleteEvent } from "@/app/actions/events"

export default function UpcomingEventsList({ events }: { events: any[] }) {
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = React.useState<any | null>(null)

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
  }

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this event?")) return
    try {
      await deleteEvent(id)
      setSelectedEvent(null)
      // Hard refresh or rely on server action's revalidatePath
      // Next.js will auto-refresh the data since it's a server action with revalidatePath("/") or ("/calendar")
    } catch(err) {
      console.error(err)
      alert("Error deleting event")
    }
  }

  // Formatting helper for standard YYYY-MM-DD
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Unknown Date"
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
    } catch {
      return dateStr
    }
  }

  const upcomingEventsList = events
    .filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow overflow-hidden border border-gray-100 dark:border-slate-800">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Upcoming Events</h3>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-slate-800">
        {upcomingEventsList.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No upcoming events found.</div>
        ) : (
          upcomingEventsList.slice(0, 5).map((event) => (
            <div 
              key={event.id} 
              className="p-6 event-card transition duration-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50"
              onClick={() => handleEventClick(event)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-500 rounded-lg p-3 text-white shadow-sm">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{event.title}</h4>
                    <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{formatDate(event.date)} • {event.start_time?.substring(0, 5) || "TBD"}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{event.location || "No Location specified"}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 mr-2">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/edit-event/${event.id}`)
                    }}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 text-right">
        <Link href="/calendar">
          <Button variant="default" className="inline-flex items-center">
            View All Events
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Reused Event Modal from Calendar Page */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
             onClick={() => setSelectedEvent(null)}>
          <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200"
               onClick={e => e.stopPropagation()}>
             {/* Modal Header */}
             <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900">
               <div className="flex items-center gap-2">
                 <div className={cn("w-3 h-3 rounded-full shadow-sm", selectedEvent.color?.replace('bg-', 'bg-').replace('text-', 'bg-') || 'bg-blue-500')} />
                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Event Details</span>
               </div>
               <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-gray-100" onClick={() => setSelectedEvent(null)}>
                   <X className="w-4 h-4" />
                 </Button>
               </div>
             </div>
             {/* Modal Body */}
             <div className="p-6 space-y-4">
               <div>
                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedEvent.title}</h2>
               </div>
               <div className="space-y-3 pt-2">
                 <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                   <Clock className="w-5 h-5 mt-0.5 text-gray-400" />
                   <div>
                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                       {formatDate(selectedEvent.date)}
                     </p>
                     <p className="text-sm">
                       {selectedEvent.start_time?.substring(0, 5) || "Time TBD"}
                     </p>
                   </div>
                 </div>
                 {selectedEvent.location && (
                   <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                     <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                     <p className="text-sm">{selectedEvent.location}</p>
                   </div>
                 )}
                 {selectedEvent.description && (
                   <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                     <AlignLeft className="w-5 h-5 mt-0.5 text-gray-400" />
                     <p className="text-sm">{selectedEvent.description}</p>
                   </div>
                 )}
                 <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                     <User className="w-5 h-5 mt-0.5 text-gray-400" />
                     <p className="text-sm">Alex Gichau</p>
                 </div>
               </div>
             </div>
             {/* Modal Footer */}
             <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex justify-between gap-2">
               <div className="flex gap-2">
                 <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedEvent.title || 'Event')}&dates=${new Date(`${selectedEvent.date}T${selectedEvent.start_time}`).toISOString().replace(/[-:]/g, "").split('.')[0] + 'Z'}/${new Date(`${selectedEvent.date}T${selectedEvent.end_time}`).toISOString().replace(/[-:]/g, "").split('.')[0] + 'Z'}&details=${encodeURIComponent(selectedEvent.description || '')}&location=${encodeURIComponent(selectedEvent.location || '')}`} target="_blank" rel="noreferrer">
                   <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700">
                     <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                     </svg>
                     Google 
                   </Button>
                 </a>
                 <a href={`/api/calendar/${selectedEvent.id}`} download>
                   <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700">
                     <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.253 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.89 3.67 2.22-3.14 1.76-2.58 5.86.34 7.06-.72 1.48-1.52 2.76-2.66 3.73zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.45-2.08 4.39-3.74 4.25z"/></svg>
                     Apple 
                   </Button>
                 </a>
               </div>
               
               <div className="flex gap-2">
                 <Button variant="destructive" onClick={() => handleDelete(selectedEvent.id)}>Delete</Button>
                 <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                   <Link href={`/edit-event/${selectedEvent.id}`}>Edit Event</Link>
                 </Button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}
