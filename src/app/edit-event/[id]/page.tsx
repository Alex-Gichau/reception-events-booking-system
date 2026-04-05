"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { updateEvent, getEventById } from "@/app/actions/events"

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const router = useRouter()

  const [eventName, setEventName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await getEventById(unwrappedParams.id)
        if (eventData) {
          setEventName(eventData.title || "")
          setDate(eventData.date || "")
          // time is stored as HH:MM:SS, let's keep it to HH:MM for input compatibility
          setTime(eventData.start_time ? eventData.start_time.substring(0, 5) : "")
          setLocation(eventData.location || "")
          setDescription(eventData.description || "")
        }
      } catch (error) {
        console.error("Failed to load event", error)
        alert("Event not found or failed to load")
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvent()
  }, [unwrappedParams.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append("eventName", eventName)
      formData.append("date", date)
      formData.append("time", time)
      formData.append("location", location)
      formData.append("description", description)

      await updateEvent(unwrappedParams.id, formData)
      alert("Event updated successfully!")
      router.push("/calendar")
    } catch (error) {
      console.error(error)
      alert("Failed to update event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Loading event details...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow p-8 animate-in fade-in duration-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Event</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="event-name">Event Name</Label>
            <Input
              id="event-name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 text-right">
            <Button type="button" variant="outline" onClick={() => router.push("/calendar")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
