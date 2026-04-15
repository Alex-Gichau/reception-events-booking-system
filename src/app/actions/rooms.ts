"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

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
  }

  const { error } = await supabase.from('rooms').insert([roomData])
  
  if (error) throw new Error(error.message)
  
  revalidatePath("/rooms")
  return true
}

export async function deleteRoom(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('rooms').delete().eq('id', id)
  
  if (error) throw new Error(error.message)
  
  revalidatePath("/rooms")
  return true
}
