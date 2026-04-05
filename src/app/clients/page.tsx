import { getClients } from "@/app/actions/clients"
import ClientListClient from "./ClientListClient"

export default async function ClientsPage() {
  const clients = await getClients() || []
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Client Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Track and manage event attendees, organizers, and VIPs</p>
        </div>
      </div>
      
      <ClientListClient initialClients={clients} />
    </main>
  )
}
