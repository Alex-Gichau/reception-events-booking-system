import { getEvents } from '@/app/actions/events';
import ReportsClient from './ReportsClient';

export default async function ReportsPage() {
  const events = await getEvents() || [];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Performance Reports</h1>
        <p className="text-gray-500 dark:text-gray-400">Real-time metrics securely compiled directly from your database.</p>
      </div>

      <ReportsClient events={events} />
    </main>
  );
}