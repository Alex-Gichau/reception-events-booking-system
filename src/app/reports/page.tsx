"use client";
import { useState } from 'react';
import { Calendar, CheckCircle, DollarSign, Users } from 'react-feather';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieLabelRenderProps {
  name?: string;
  percent?: number;
}

const monthlyEvents = {
  'May 2025': [
    { name: 'Reception Calendar Launch', date: 'May 23, 2025', attendees: 100, revenue: 'KSh 1,200', status: 'Completed' },
    { name: 'Guild Singers Concert', date: 'May 27, 2025', attendees: 80, revenue: 'KSh 800', status: 'Completed' },
  ],
  'June 2025': [
    { name: 'Youth Retreat Planning', date: 'June 10, 2025', attendees: 50, revenue: 'KSh 0', status: 'Upcoming' },
    { name: 'Summer Festival', date: 'June 25, 2025', attendees: 200, revenue: 'KSh 2,500', status: 'Upcoming' },
  ],
  'July 2025': [
    { name: 'Community Outreach', date: 'July 15, 2025', attendees: 120, revenue: 'KSh 0', status: 'Upcoming' },
  ],
};

const ageData = [
  { name: '18-24', value: 20 },
  { name: '25-34', value: 40 },
  { name: '35-54', value: 30 },
  { name: '55+', value: 10 },
];

const locationData = [
  { name: 'Nairobi', value: 60 },
  { name: 'Mombasa', value: 20 },
  { name: 'Kisumu', value: 10 },
];

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b']; // primary, secondary, green, yellow

export default function ReportsPage() {
  const [activeMonth, setActiveMonth] = useState('May 2025');

  const currentMonthEvents = monthlyEvents[activeMonth as keyof typeof monthlyEvents] || [];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Event Reports</h1>
        <p className="text-gray-500">Detailed insights into your event performance</p>
      </div>

      {/* Summary Statistics */}
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
              <p className="text-sm font-medium text-gray-500">Completed Events</p>
              <p className="text-xl font-semibold text-gray-900">16</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-500">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
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
              <p className="text-sm font-medium text-gray-500">Total Attendees</p>
              <p className="text-xl font-semibold text-gray-900">1,240</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Performance by Month (Custom Tabs) */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Event Performance by Month</h3>
        </div>
        <div className="p-6">
          <div className="flex space-x-2 border-b border-gray-200 mb-4">
            {Object.keys(monthlyEvents).map((month) => (
              <button
                key={month}
                onClick={() => setActiveMonth(month)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
                  activeMonth === month
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {month}
              </button>
            ))}
          </div>

          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendees
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMonthEvents.map((event, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.attendees}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.revenue}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${event.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {event.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Attendee Demographics - Charts */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Attendee Demographics</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Age Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: PieLabelRenderProps) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Location (Top 3)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feedback and Comments */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Feedback & Comments</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-900">&quot;Great event, very well organized!&quot;</p>
            <p className="text-xs text-gray-500 mt-1">- Attendee A, Reception Calendar Launch</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-900">&quot;Enjoyed the music, looking forward to the next one.&quot;</p>
            <p className="text-xs text-gray-500 mt-1">- Attendee B, Guild Singers Concert</p>
          </div>
        </div>
      </div>
    </main>
  );
}