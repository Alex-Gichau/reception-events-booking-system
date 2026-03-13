import Link from 'next/link';
import { Plus, Calendar, CheckCircle, DollarSign, Users, ChevronLeft, ChevronRight, Edit2, ExternalLink } from 'react-feather';

export default function Home() {
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

      {/* Calendar Mini View */}
      <div className="bg-white rounded-lg shadow mb-8 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">May 2025</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          <div className="text-xs font-medium text-gray-500 py-2">Sun</div>
          <div className="text-xs font-medium text-gray-500 py-2">Mon</div>
          <div className="text-xs font-medium text-gray-500 py-2">Tue</div>
          <div className="text-xs font-medium text-gray-500 py-2">Wed</div>
          <div className="text-xs font-medium text-gray-500 py-2">Thu</div>
          <div className="text-xs font-medium text-gray-500 py-2">Fri</div>
          <div className="text-xs font-medium text-gray-500 py-2">Sat</div>

          {/* Calendar Days */}
          <div className="py-2"></div> {/* Empty space for days before the 1st */}
          <div className="py-2"></div>
          <div className="py-2"></div>
          <div className="py-2"></div>
          <div className="py-2"></div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center calendar-day active">1</div>
          </div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center">2</div>
          </div>

          {/* More days would go here */}
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center">23</div>
          </div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center bg-primary-100 text-primary-500">24</div>
          </div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center bg-primary-100 text-primary-500">25</div>
          </div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center bg-primary-100 text-primary-500">26</div>
          </div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center bg-primary-100 text-primary-500">27</div>
          </div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center bg-primary-100 text-primary-500">28</div>
          </div>
          <div className="py-2">
            <div className="mx-auto rounded-full h-8 w-8 flex items-center justify-center">29</div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {/* Event Card 1 */}
          <div className="p-6 event-card transition duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-500 rounded-lg p-3 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Reception Calendar Launch</h4>
                  <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <Calendar className="mr-1 h-4 w-4" /> {/* Changed from clock to calendar for consistency with original HTML */}
                      <span>Fri, May 23, 2025 • 4:00 PM - 7:30 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" /> {/* Changed from map-pin to users for consistency with original HTML */}
                      <span>Reception</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      PAID
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      <Users className="mr-1 h-3 w-3" />
                      100 attendees
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <ExternalLink className="mr-1 h-3 w-3" /> {/* Changed from video to external-link for consistency with original HTML */}
                      Livestreaming
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Sync Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="p-6 event-card transition duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-500 rounded-lg p-3 text-white">
                  <Calendar className="h-6 w-6" /> {/* Changed from music to calendar for consistency with original HTML */}
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Guild Singers</h4>
                  <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <Calendar className="mr-1 h-4 w-4" /> {/* Changed from clock to calendar for consistency with original HTML */}
                      <span>Tue, May 27, 2025 • 11:00 AM - 12:30 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" /> {/* Changed from map-pin to users for consistency with original HTML */}
                      <span>Church Hall 1</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                      <Calendar className="mr-1 h-3 w-3" /> {/* Changed from clock to calendar for consistency with original HTML */}
                      Upcoming
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Users className="mr-1 h-3 w-3" />
                      Church Group
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
                  <ExternalLink className="mr-2 h-4 w-4" /> {/* Changed from printer to external-link for consistency with original HTML */}
                  Print Schedule
                </button>
              </div>
            </div>
          </div>

          {/* More events would go here */}
        </div>
        <div className="px-6 py-4 bg-gray-50 text-right">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
            View All Events
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}