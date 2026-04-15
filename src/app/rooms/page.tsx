import { getRooms } from "@/app/actions/rooms"
import RoomListClient from "./RoomListClient"

export default async function RoomsPage() {
  const rooms = await getRooms() || []
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Room Inventory</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage available halls, rooms, and spaces for physical booking</p>
        </div>
      </div>
      
      <RoomListClient initialRooms={rooms} />
    </main>
  )
}
