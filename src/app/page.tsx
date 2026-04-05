import Link from 'next/link';
import { Plus, Calendar, CheckCircle, DollarSign, Users, ChevronRight, Edit2, ExternalLink } from 'react-feather';
import { getEvents } from '@/app/actions/events';
import WeeklyEventsChart from '@/components/WeeklyEventsChart';
import UpcomingEventsList from '@/components/UpcomingEventsList';

export default async function Home() {
  let events = [];
  try {
    events = await getEvents() || [];
  } catch (err) {
    console.error("Failed to fetch events for dashboard", err);
  }
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Dashboard</h1>
          <p className="text-gray-500">Manage all your events in one place</p>
        </div>
        <Link href="/add-event">
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-50 text-primary-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <p className="text-xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 text-green-500">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-500">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p className="text-xl font-semibold text-gray-900">KSh 5,430</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-500">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attendees</p>
              <p className="text-xl font-semibold text-gray-900">1,240</p>
            </div>
          </div>
        </div>
      </div>

      <WeeklyEventsChart events={events} />

      <UpcomingEventsList events={events} />
    </main>
  );
}