import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// This is a simple API key validation function.
// For a production environment, you should store API keys securely in a database (like Supabase)
// and validate against those records, potentially tracking usage, rate limits, etc.
export async function validateApiKey(request: Request) {
  const headersList = await headers();
  const apiKey = headersList.get('x-api-key');

  if (!apiKey) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Missing API Key. Please provide an x-api-key header.' },
        { status: 401 }
      ),
    };
  }

  // In a real application, query your database here
  // e.g., const { data } = await supabase.from('api_keys').select('*').eq('key', apiKey).single()
  // For this initial setup, we'll check against an environment variable
  const validApiKey = process.env.DEVELOPER_API_KEY;

  if (validApiKey && apiKey !== validApiKey) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Invalid API Key' },
        { status: 403 }
      ),
    };
  }

  // If DEVELOPER_API_KEY is not set in env, we allow it for development, but warn
  if (!validApiKey) {
    console.warn('DEVELOPER_API_KEY is not set in environment variables. API is currently open.');
  }

  return { isValid: true, response: null };
}
