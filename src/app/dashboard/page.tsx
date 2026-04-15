import Link from 'next/link';
import { Plus, Calendar, CheckCircle, DollarSign, Users, ChevronRight, Edit2, ExternalLink } from 'react-feather';
import { getEvents } from '@/app/actions/events';
import WeeklyEventsChart from '@/components/WeeklyEventsChart';
import UpcomingEventsList from '@/components/UpcomingEventsList';

export const dynamic = 'force-dynamic';

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
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{events.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {events.filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0))).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Revenue</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                KSh {events.reduce((acc, curr) => acc + (Number(curr.total_cost) || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Attendees</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {events.reduce((acc, curr) => acc + (Number(curr.attendees_count) || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <WeeklyEventsChart events={events} />

      <UpcomingEventsList events={events} />
    </main>
  );
}