"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { writeLog } from "@/lib/logger"

export async function getRooms() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('rooms').select('*').order('name', { ascending: true })
  
  if (error) {
    console.error("Error fetching rooms:", error)
    return []
  }
  return data
}

export async function addRoom(formData: FormData) {
  const supabase = await createClient()
  
  const roomData = {
    name: formData.get("name") as string,
    capacity: parseInt(formData.get("capacity") as string) || 0,
    status: formData.get("status") || "available",
    min_price: parseFloat(formData.get("min_price") as string) || 0,
    max_price: parseFloat(formData.get("max_price") as string) || 0,
  }

  const { error } = await supabase.from('rooms').insert([roomData])
  
  if (error) throw new Error(error.message)
  
  revalidatePath("/rooms")
  return true
}

export async function deleteRoom(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('rooms').delete().eq('id', id)
  
  if (error) {
    writeLog(`Failed to delete room ID ${id}: ${error.message}`, 'ERROR')
    throw new Error(error.message)
  }
  
  writeLog(`System purged Physical Room UUID: ${id}`, 'WARN')
  revalidatePath("/rooms")
  return true
}

export async function updateRoom(id: string, formData: FormData) {
  const supabase = await createClient()

  const roomData = {
    name: formData.get("name") as string,
    capacity: parseInt(formData.get("capacity") as string) || 0,
    status: formData.get("status") || "available",
    min_price: parseFloat(formData.get("min_price") as string) || 0,
    max_price: parseFloat(formData.get("max_price") as string) || 0,
  }

  const { error } = await supabase.from('rooms').update(roomData).eq('id', id)

  if (error) {
    writeLog(`Configuration failure modifying Room ID ${id}: ${error.message}`, 'ERROR')
    throw new Error(error.message)
  }

  writeLog(`Configuration modified for physical Room space mapping: ${roomData.name} (ID: ${id})`, 'SUCCESS')
  revalidatePath("/rooms")
  return true
}
