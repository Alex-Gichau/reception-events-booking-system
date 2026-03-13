import Link from 'next/link';
import { ArrowLeft, Edit2, ExternalLink, Printer, Mail, FileText, Calendar, Share2, X, Save, Users } from 'react-feather';

export default function EventDetailsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-gray-500 hover:text-primary-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="ml-2 text-2xl font-bold text-gray-900">Event Details</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Event Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Reception Calendar Launch</h2>
              <p className="text-primary-100">Church Group Event</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </button>
              <button className="flex items-center px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition">
                <ExternalLink className="mr-2 h-4 w-4" />
                Sync
              </button>
              <button className="flex items-center px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600">Event: Reception Calendar Launch Church Group. This is the official launch of our new church management system calendar feature.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h4>
                  <p className="text-gray-900">Fri, May 23, 2025</p>
                  <p className="text-gray-600">4:00 PM - 7:30 PM</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                  <p className="text-gray-900">Reception</p>
                  <p className="text-gray-600">Main Church Building</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Email</h4>
                  <p className="text-gray-900">pceastamediateam@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h4>
                  <p className="text-gray-900">0707 257000</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <ExternalLink className="mr-1 h-3 w-3" /> {/* Changed from check-circle to external-link for consistency with original HTML */}
                    Livestreaming
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Users className="mr-1 h-3 w-3" />
                    100 Attendees
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <ExternalLink className="mr-1 h-3 w-3" /> {/* Changed from dollar-sign to external-link for consistency with original HTML */}
                    PAID (KSh 0)
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Please ensure all media equipment is set up 1 hour before the event. The bishop will be attending so protocol must be observed.</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <span>Email Attendees</span>
                    <Mail className="h-4 w-4" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <span>Generate Report</span>
                    <FileText className="h-4 w-4" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <span>Add to Google Calendar</span>
                    <Calendar className="h-4 w-4" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <span>Share Event</span>
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Event Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                      <span>GM</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Geeshau Media</p>
                      <p className="text-sm text-gray-500">Organizer</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <span>PC</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">PCEA Team</p>
                      <p className="text-sm text-gray-500">Media Coordinator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Created:</span> 2025, May 28, Wed 05:33 AM by Geeshau Media
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <X className="mr-2 h-4 w-4" />
              Cancel Event
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}