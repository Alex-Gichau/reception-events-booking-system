import { getRooms } from "@/app/actions/rooms"
import { getClients } from "@/app/actions/clients"
import { getEventById } from "@/app/actions/events"
import EditEventClient from "@/app/edit-event/[id]/EditEventClient"

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params
  
  // Safely execute all three network promises simultaneously
  const [eventData, rooms, clients] = await Promise.all([
    getEventById(unwrappedParams.id),
    getRooms(),
    getClients()
  ])

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Modify Event Details</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Adjust the physical properties or timeblocks for this event.
        </p>
        
        <EditEventClient event={eventData} clients={clients || []} rooms={rooms || []} />
      </div>
    </main>
  )
}
