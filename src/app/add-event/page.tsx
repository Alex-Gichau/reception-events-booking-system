import { getClients } from "@/app/actions/clients"
import { getRooms } from "@/app/actions/rooms"
import AddEventForm from "./AddEventForm"

export default async function AddEventPage() {
  const clients = await getClients() || []
  const rooms = await getRooms() || []

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Schedule New Event</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The system will automatically prevent room double-bookings in real-time.
        </p>
        
        <AddEventForm clients={clients} rooms={rooms} />
      </div>
    </main>
  )
}
