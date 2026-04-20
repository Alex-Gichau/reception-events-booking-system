import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  
  if (q.length < 2) return NextResponse.json({ results: [] })

  const supabase = await createClient()

  // Full text search or basic ilike matching for Events
  const { data: events, error: eventError } = await supabase
    .from('events')
    .select('id, title, date')
    .ilike('title', `%${q}%`)
    .limit(4)

  // Matching for Clients
  const { data: clients, error: clientError } = await supabase
    .from('clients')
    .select('id, first_name, last_name')
    .or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%`)
    .limit(3)

  interface SearchResult {
    type: 'event' | 'client';
    id: string | number;
    title: string;
    subtitle: string;
  }

  const results: SearchResult[] = []

  if (events) {
    events.forEach(e => results.push({ type: 'event', id: e.id, title: e.title, subtitle: e.date }))
  }
  if (clients) {
    clients.forEach(c => results.push({ type: 'client', id: c.id, title: `${c.first_name} ${c.last_name}`, subtitle: 'Client CRM Profile' }))
  }

  return NextResponse.json({ results })
}
