// using node --env-file instead
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
  console.error("❌ Error: Supabase URL or Key is missing or still uses the placeholder.");
  console.error("URL:", supabaseUrl);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔌 Testing Supabase connection to:', supabaseUrl);
  
  // Try to hit the 'events' table
  const { data, error } = await supabase.from('events').select('*').limit(5);
  
  if (error) {
    console.error('❌ Connection failed. Error details:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Connection successful!');
    console.log(`📊 Retrieved ${data.length} events from the database.`);
    if (data.length > 0) {
      console.log(data);
    }
  }
}

testConnection();
