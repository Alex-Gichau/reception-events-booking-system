"use client"

import { getISOWeek, parseISO } from "date-fns"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useMemo } from "react"

export default function WeeklyEventsChart({ events }: { events: any[] }) {
  const data = useMemo(() => {
    const counts: Record<number, number> = {}
    events.forEach(e => {
      if (e.date) {
        const week = getISOWeek(parseISO(e.date))
        counts[week] = (counts[week] || 0) + 1
      }
    })
    
    // Convert to array and sort by week number
    return Object.entries(counts).map(([week, count]) => ({
      week: `Week ${week}`,
      events: count
    })).sort((a,b) => parseInt(a.week.split(' ')[1]) - parseInt(b.week.split(' ')[1]))
  }, [events])

  return (
    <div className="bg-white rounded-lg shadow mb-8 p-6 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6 font-semibold">Weekly Event Distribution</h2>
      
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg">
          <p className="text-gray-500">No events data to display</p>
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="week" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis allowDecimals={false} tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="events" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
