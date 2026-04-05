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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow overflow-hidden border border-gray-100 dark:border-slate-800">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Upcoming Events</h3>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-slate-800">
        {events.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No upcoming events found.</div>
        ) : (
          events.slice(0, 5).map((event) => (
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
             <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-2">
               <Button variant="destructive" onClick={() => handleDelete(selectedEvent.id)}>Delete</Button>
               <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                 <Link href={`/edit-event/${selectedEvent.id}`}>Edit Event</Link>
               </Button>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}
