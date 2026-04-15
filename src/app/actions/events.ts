"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendEventConfirmation } from "@/lib/email"
import { writeLog } from "@/lib/logger"

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
  const location = formData.get("location")?.toString() || null
  const total_cost = parseFloat(formData.get("total_cost") as string) || 0

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
      location,
      total_cost,
      room_id: room_id === "none" ? null : room_id,
      client_id: client_id === "none" ? null : client_id,
      duration_hours: 1,
      color: "bg-blue-500",
    }])
    .select()

  if (error) {
    writeLog(`FATAL event architecture insertion error: ${error.message}`, 'ERROR')
    throw new Error(error.message)
  }

  writeLog(`System booked new master timeline Event: '${title}' set for ${date}`, 'SUCCESS')

  // Intercept successful booking to extract relations and dispatch Mail Receipt!
  if (client_id && client_id !== "none") {
    const { data: client } = await supabase.from('clients').select('first_name, email').eq('id', client_id).single()
    let finalLocation = "TBD"
    
    if (room_id && room_id !== "none") {
      const { data: room } = await supabase.from('rooms').select('name').eq('id', room_id).single()
      if (room) finalLocation = room.name
    }

    if (client && client.email) {
      writeLog(`Auto-dispatching simulated email receipt to internal client target: ${client.email}`, 'INFO')
      // Fire Email asynchronously so it doesn't block UI returning
      sendEventConfirmation(
        client.email,
        client.first_name,
        title,
        date,
        start_time,
        finalLocation
      ).catch(err => writeLog(`Non-fatal API rejection on Mail dispatch execution: ${err}`, 'WARN'))
    }
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
    writeLog(`Attempted block deletion forcefully bypassed or corrupted: ${error.message}`, 'ERROR')
    throw new Error(error.message)
  }
  
  writeLog(`Administrative action forcibly wiped Event Record (UUID: ${eventId}) completely off grid`, 'WARN')
  revalidatePath("/calendar")
}

export async function updateEvent(eventId: number | string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("eventName")?.toString() || ""
  const date = formData.get("date")?.toString() || ""
  const start_time = formData.get("start_time")?.toString() || ""
  const end_time = formData.get("end_time")?.toString() || ""
  const description = formData.get("description")?.toString() || ""
  const room_id = formData.get("room_id")?.toString() || null
  const client_id = formData.get("client_id")?.toString() || null
  const poster_url = formData.get("poster_url")?.toString() || null
  const location = formData.get("location")?.toString() || null
  const total_cost = parseFloat(formData.get("total_cost") as string) || 0

  const { data, error } = await supabase
    .from("events")
    .update({
      title,
      date,
      start_time,
      end_time,
      description,
      poster_url,
      location,
      total_cost,
      room_id: room_id === "none" ? null : room_id,
      client_id: client_id === "none" ? null : client_id,
    })
    .eq("id", eventId)
    .select()

  if (error) {
    writeLog(`Supabase update error thrown blocking edit on ID ${eventId}: ${error.message}`, 'ERROR')
    throw new Error(error.message)
  }
  
  writeLog(`Operator manually mutated configuration for Event record '${title}' (UUID: ${eventId})`, 'WARN')

  revalidatePath("/calendar")
  return data
}

export async function getEvents() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("events")
    .select("*, rooms(name)")
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
