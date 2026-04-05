-- ==========================================
-- Schema setup for Reception Events Booking
-- ==========================================

-- 1. Create Enums
CREATE TYPE room_status AS ENUM ('available', 'maintenance', 'out_of_service');
CREATE TYPE event_payment_status AS ENUM ('pending', 'partial', 'paid', 'refunded');
CREATE TYPE event_status AS ENUM ('tentative', 'confirmed', 'completed', 'cancelled');

-- 2. Create Rooms Table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  features JSONB DEFAULT '{}'::jsonb,
  status room_status DEFAULT 'available'::room_status,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Clients Table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT,
  whatsapp_number TEXT,
  company_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  room_id UUID REFERENCES rooms(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  event_type TEXT,
  description TEXT,
  location TEXT,
  color TEXT DEFAULT 'bg-blue-500',
  duration_hours NUMERIC DEFAULT 1,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  attendees_count INTEGER DEFAULT 0,
  payment_status event_payment_status DEFAULT 'pending'::event_payment_status,
  total_cost NUMERIC DEFAULT 0.00,
  amount_paid NUMERIC DEFAULT 0.00,
  status event_status DEFAULT 'tentative'::event_status,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create Audit Logs Table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

-- Enable RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Creating policies to allow read and write for authenticated users
-- Note: In a production environment, you would want to restrict these policies
-- based on whether the user is an 'admin' or 'receptionist' from the `profiles` table.
-- For now, we allow any authenticated user to interact with the tables.

CREATE POLICY "Enable read access for all authenticated users" ON rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable write access for all authenticated users" ON rooms FOR ALL TO authenticated USING (true);

CREATE POLICY "Enable read access for all authenticated users" ON clients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable insert access for all authenticated users" ON clients FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update access for all authenticated users" ON clients FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete access for all authenticated users" ON clients FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable read access for all authenticated users" ON events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable insert access for all authenticated users" ON events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update access for all authenticated users" ON events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete access for all authenticated users" ON events FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable read access for all authenticated users" ON audit_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable insert access for all authenticated users" ON audit_logs FOR INSERT TO authenticated WITH CHECK (true);
-- We generally do not want anyone to update or delete audit logs:
-- (No UPDATE or DELETE policy on audit_logs)
