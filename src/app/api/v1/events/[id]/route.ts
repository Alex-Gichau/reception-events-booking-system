import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateApiKey } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Validate API Key
  const auth = await validateApiKey(request);
  if (!auth.isValid) {
    return auth.response;
  }

  try {
    const { id } = await params;

    // 2. Fetch data from Supabase
    const supabase = await createClient();
    
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // PostgREST specific error for "Results contain 0 rows" on .single()
        return NextResponse.json(
          { error: 'Event not found' },
          { status: 404 }
        );
      }
      console.error(`Error fetching event ${id}:`, error);
      return NextResponse.json(
        { error: 'Internal Server Error while fetching event' },
        { status: 500 }
      );
    }

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // 3. Return response
    return NextResponse.json({
      data: event,
    });
  } catch (err) {
    console.error('Unhandled API Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
