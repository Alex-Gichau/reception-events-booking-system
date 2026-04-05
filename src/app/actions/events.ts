"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addEvent(formData: FormData) {
  const supabase = await createClient()

  // Ensure these parse properly based on your DB schema requirements
  const title = formData.get("eventName")?.toString() || ""
  const date = formData.get("date")?.toString() || ""
  const time = formData.get("time")?.toString() || ""
  const location = formData.get("location")?.toString() || ""
  const description = formData.get("description")?.toString() || ""

  // Use default times / colors for our simplified schema
  const start_time = `${time}:00`
  const end_time = `${time}:00` // default to 1-hour or same time, can compute proper end_time later
  
  const { data, error } = await supabase
    .from("events")
    .insert([{
      title,
      date,
      start_time,
      end_time,
      description,
      location,
      duration_hours: 1, // defaulting to 1 hour
      color: "bg-blue-500", // default color
    }])
    .select()

  if (error) {
    console.error("Supabase insert error:", error)
    throw new Error(error.message)
  }

  revalidatePath("/calendar") // Refresh calendar
  return data
}

export async function deleteEvent(eventId: number | string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId)

  if (error) {
    console.error("Supabase delete error:", error)
    throw new Error(error.message)
  }

  revalidatePath("/calendar")
}

export async function updateEvent(eventId: number | string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("eventName")?.toString() || ""
  const date = formData.get("date")?.toString() || ""
  const time = formData.get("time")?.toString() || ""
  const location = formData.get("location")?.toString() || ""
  const description = formData.get("description")?.toString() || ""

  const start_time = `${time}:00`
  const end_time = `${time}:00`

  const { data, error } = await supabase
    .from("events")
    .update({
      title,
      date,
      start_time,
      end_time,
      description,
      location
    })
    .eq("id", eventId)
    .select()

  if (error) {
    console.error("Supabase update error:", error)
    throw new Error(error.message)
  }

  revalidatePath("/calendar")
  return data
}

export async function getEvents() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })

  if (error) {
    console.error("Supabase get events error:", error)
    throw new Error(error.message)
  }

  return data
}

export async function getEventById(eventId: string | number) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single()
    
  if (error) {
    console.error("Supabase get event error:", error)
    throw new Error(error.message)
  }
  
  return data
}
