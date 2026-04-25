import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateApiKey } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     description: Returns a list of events
 *     responses:
 *       200:
 *         description: A list of events
 */
export async function GET(request: Request) {
  // 1. Validate API Key
  const auth = await validateApiKey(request);
  if (!auth.isValid) {
    return auth.response;
  }

  try {
    // 2. Parse query parameters for pagination/filtering (optional)
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // 3. Fetch data from Supabase
    const supabase = await createClient();
    
    // Using a simple select on the events table
    // Replace with your actual events table columns
    const { data: events, error, count } = await supabase
      .from('events')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('date', { ascending: true }); // Assume 'date' or 'created_at' column exists

    if (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json(
        { error: 'Internal Server Error while fetching events' },
        { status: 500 }
      );
    }

    // 4. Return response
    return NextResponse.json({
      meta: {
        total: count,
        limit,
        offset,
      },
      data: events,
    });
  } catch (err) {
    console.error('Unhandled API Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
