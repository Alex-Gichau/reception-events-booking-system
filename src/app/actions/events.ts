"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addEvent(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("eventName")?.toString() || ""
  const date = formData.get("date")?.toString() || ""
  const start_time = formData.get("start_time")?.toString() || ""
  const end_time = formData.get("end_time")?.toString() || ""
  const description = formData.get("description")?.toString() || ""
  const room_id = formData.get("room_id")?.toString() || null
  const client_id = formData.get("client_id")?.toString() || null
  const poster_url = formData.get("poster_url")?.toString() || null

  // Physical Room Booking Conflict Resolution
  if (room_id && room_id !== "none" && date && start_time && end_time) {
    const { data: overlapping } = await supabase
      .from("events")
      .select("id, title")
      .eq("date", date)
      .eq("room_id", room_id)
      .lt("start_time", end_time)
      .gt("end_time", start_time)

    if (overlapping && overlapping.length > 0) {
      throw new Error(`Conflict: This Space is already booked for '${overlapping[0].title}' during this time block.`)
    }
  }
  
  const { data, error } = await supabase
    .from("events")
    .insert([{
      title,
      date,
      start_time,
      end_time,
      description,
      poster_url,
      room_id: room_id === "none" ? null : room_id,
      client_id: client_id === "none" ? null : client_id,
      duration_hours: 1,
      color: "bg-blue-500",
    }])
    .select()

  if (error) {
    console.error("Supabase insert error:", error)
    throw new Error(error.message)
  }

  revalidatePath("/calendar") 
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
