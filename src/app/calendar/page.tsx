
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const goToToday = () => {
    setDate(new Date())
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500">Select a date to see events.</p>
        </div>
        <div>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
            />
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Selected Date
              </h2>
              <p className="mt-2 text-gray-500">
                {date ? date.toLocaleDateString() : "No date selected"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}