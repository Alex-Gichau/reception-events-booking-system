"use client";

import { useState, useMemo } from 'react';
import { Calendar, CheckCircle, DollarSign, Users, PieChart as PieChartIcon, Activity } from 'react-feather';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieLabelRenderProps {
  name?: string;
  percent?: number;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export default function ReportsClient({ events }: { events: any[] }) {
  // Compute High Level Stats
  const totalEvents = events.length;
  const completedEvents = events.filter(e => e.status === 'completed' || new Date(e.date) < new Date(new Date().setHours(0,0,0,0))).length;
  const totalRevenue = events.reduce((acc, curr) => acc + (Number(curr.total_cost) || 0), 0);
  const totalAttendees = events.reduce((acc, curr) => acc + (Number(curr.attendees_count) || 0), 0);

  // Group computationally by Month Name (e.g. "May 2025")
  const monthlyEventsMap = useMemo(() => {
    const map: Record<string, any[]> = {};
    events.forEach(e => {
      const d = new Date(e.date);
      const key = d.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!map[key]) map[key] = [];
      map[key].push(e);
    });
    return map;
  }, [events]);

  const monthsAvailable = Object.keys(monthlyEventsMap).sort((a,b) => new Date(a).getTime() - new Date(b).getTime());
  
  const [activeMonth, setActiveMonth] = useState(
    monthsAvailable.length > 0 ? monthsAvailable[monthsAvailable.length - 1] : ''
  );

  const currentMonthEvents = monthlyEventsMap[activeMonth] || [];

  // Data for Charts
  const statusData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    events.forEach(e => {
      const status = e.status || "Unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    return Object.keys(statusCounts).map(k => ({ name: k.charAt(0).toUpperCase() + k.slice(1), value: statusCounts[k] }));
  }, [events]);

  const revenueByMonthData = useMemo(() => {
    return monthsAvailable.map(month => {
      const monthEvents = monthlyEventsMap[month];
      const rev = monthEvents.reduce((acc, curr) => acc + (Number(curr.total_cost) || 0), 0)
      return { name: month.split(' ')[0].substring(0,3), revenue: rev }
    }).slice(-6); // last 6 active months
  }, [monthsAvailable, monthlyEventsMap]);

  return (
    <>
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Bookings</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{totalEvents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30 text-green-500">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Events</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{completedEvents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">KSh {totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-500">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Attendees</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{totalAttendees.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Data Charts */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg shadow-sm mb-8 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-500" /> Key Database Insights
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 text-center uppercase tracking-wider">Event Status Distribution</h4>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={40}
                    dataKey="value"
                    paddingAngle={2}
                    label={({ name, percent }: PieLabelRenderProps) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip wrapperClassName="dark:!bg-slate-800 dark:!border-slate-700 dark:!text-white rounded-lg shadow-xl" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
               <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">No data available</div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 text-center uppercase tracking-wider">Revenue Trands (Trailing 6 active)</h4>
            {revenueByMonthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByMonthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `KSh ${val/1000}k`} />
                  <Tooltip wrapperClassName="dark:!bg-slate-800 dark:!border-slate-700 dark:!text-white rounded-lg shadow-xl" cursor={{fill: 'rgba(99, 102, 241, 0.05)'}} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
               <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">No data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Event Performance by Month (Custom Tabs) */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg shadow-sm mb-8 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Event Performance by Month</h3>
        </div>
        <div className="p-6">
          {monthsAvailable.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No events found in the database yet.</p>
          ) : (
            <>
              <div className="flex space-x-2 border-b border-gray-200 dark:border-slate-800 mb-6 overflow-x-auto pb-1">
                {monthsAvailable.map((month) => (
                  <button
                    key={month}
                    onClick={() => setActiveMonth(month)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition whitespace-nowrap focus:outline-none ${
                      activeMonth === month
                        ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
                  <thead className="bg-gray-50 dark:bg-slate-800/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Event Details
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Timeline
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Turnout
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Generated Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
                    {currentMonthEvents.map((event, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(event.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {event.attendees_count || 0} pax
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">
                          KSh {Number(event.total_cost || 0).toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium tracking-wide
                          ${event.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : ''}
                          ${event.status === 'tentative' ? 'text-amber-500 dark:text-amber-400' : ''}
                          ${event.status === 'cancelled' ? 'text-red-500 dark:text-red-400' : ''}
                          ${event.status === 'confirmed' ? 'text-indigo-600 dark:text-indigo-400' : ''}
                          ${!event.status ? 'text-gray-500' : ''}`}>
                          {event.status ? event.status.toUpperCase() : 'PENDING'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
