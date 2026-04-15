import { getEvents } from '@/app/actions/events';
import { Calendar, MapPin, Clock } from 'react-feather';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PublicEventsPage() {
  const events = await getEvents() || [];

  // Keep all events from the database natively without omitting past events
  const allEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Top action bar replicating the functionality of the omitted Navbar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Calendar className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            EventSync Pro
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="[&>div]:ml-0">
             <SearchBar />
          </div>
          <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-5xl">
            Event Directory
          </h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            A comprehensive, transparent listing of all historical and upcoming events.
          </p>
        </div>

        <div className="space-y-6">
          {allEvents.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 shadow-sm rounded-xl p-12 text-center text-slate-500">
              There are no scheduled events at this time.
            </div>
          ) : (
            allEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white dark:bg-slate-900 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200 flex flex-col md:flex-row relative"
              >
                {/* Visual Color Bar */}
                <div className={`w-full md:w-3 flex-shrink-0 ${event.color?.replace('bg-', 'bg-') || 'bg-indigo-500'}`} />
                
                {event.poster_url && (
                  <div className="w-full md:w-56 h-48 md:h-auto flex-shrink-0 bg-slate-100 border-r border-slate-200 dark:border-slate-800">
                    <img 
                      src={event.poster_url} 
                      alt={`Poster for ${event.title}`} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                  </div>
                )}

                <div className="p-6 md:p-8 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h2>
                    {event.description && (
                      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 min-w-[200px] text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <time dateTime={event.date}>
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span>
                        {event.start_time?.substring(0, 5)} - {event.end_time?.substring(0, 5)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        {event.location || event.rooms?.name || 'TBD'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
