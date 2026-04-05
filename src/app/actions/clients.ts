"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getClients() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
  
  if (error) {
    console.error("Error fetching clients:", error)
    return []
  }
  return data
}

export async function addClient(formData: FormData) {
  const supabase = await createClient()
  
  const clientData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: (formData.get("email") as string) || null,
    phone_number: (formData.get("phone_number") as string) || null,
    company_name: (formData.get("company_name") as string) || null,
  }

  const { error } = await supabase.from('clients').insert([clientData])
  
  if (error) throw new Error(error.message)
  
  revalidatePath("/clients")
  return true
}

export async function deleteClient(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('clients').delete().eq('id', id)
  
  if (error) throw new Error(error.message)
  
  revalidatePath("/clients")
  return true
}
