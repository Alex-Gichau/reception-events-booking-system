# System Plan: Reception Events Booking System

## 1. Project Overview
A comprehensive modern web application designed for managing event bookings at a reception facility. The system provides an intuitive dashboard, interactive calendar views, a streamlined event creation process, room inventory management, and robust communication tools. It is designed to handle hundreds of events per year while maintaining a detailed audit trail of all operations.

## 2. Tech Stack Setup
- **Framework:** Next.js (App Router), React 19, TypeScript
- **Styling & UI:** Tailwind CSS v4, shadcn/ui, `tailwindcss-animate`
- **Animations:** Motion (Framer Motion)
- **Data Visualization & Icons:** `recharts`, `lucide-react`, `react-feather`
- **Date Handling:** `date-fns`, `react-day-picker`
- **Main Database & Backend:** Supabase (PostgreSQL, Authentication, Row Level Security)
- **Auxiliary Database & Features:** Firebase (for push notifications, specific real-time features, or file storage if needed)
- **Integrations:**
  - Google Sheets API (data export/sync)
  - Google Calendar API (calendar sync)
  - SMS & WhatsApp API (e.g., Twilio / Meta Graph API for invites and confirmations)
  - Payment Gateway (e.g., Stripe or local equivalent for payment integration)

## 3. Core Features & Architecture
- **Role-Based Access Control (RBAC):**
  - **Admin:** Access to comprehensive financial statistics, revenue reports, audit logs, user management, and advanced room inventory.
  - **Receptionist:** Handles daily operations, calendar management, booking creation, and client follow-ups.
- **Dashboard & Reporting:** High-level metrics showing total events, upcoming events, estimated revenue, and expected attendees.
- **Advanced Calendar Interface:** Interactive monthly, weekly, and daily calendar views.
- **Room & Inventory Management:** Tracking of available rooms, physical resources, and room schedules.
- **Collision Detection:** Automated double-booking prevention based on room availability and time slots.
- **Communication & Notifications:**
  - Automated SMS and WhatsApp sending for invites and booking confirmations.
  - Internal newsletters or notifications about room updates/changes.
- **Payment Integration:** Managing invoices, deposits, and payment statuses for events.
- **Timetable & Exporting:** Printing timetables and exporting event schedules.
- **Audit Logging:** A strictly enforced, non-deletable data log indicating every action performed by users and admins for security and auditing purposes.

## 4. Database Schema (Supabase PostgreSQL)

**`users` table:**
- `id` (uuid, references auth.users)
- `email` (text)
- `role` (enum: 'admin', 'receptionist')
- `created_at` (timestamp)

**`rooms` table (Inventory):**
- `id` (uuid)
- `name` (text)
- `capacity` (integer)
- `features` (jsonb)
- `status` (enum: 'available', 'maintenance', 'out_of_service')

**`clients` table (For Follow-Ups):**
- `id` (uuid)
- `first_name` (text)
- `last_name` (text)
- `email` (text)
- `phone_number` (text)
- `whatsapp_number` (text)
- `company_name` (text, nullable)
- `notes` (text)

**`events` table:**
- `id` (uuid)
- `client_id` (uuid, references clients)
- `room_id` (uuid, references rooms)
- `title` (text)
- `event_type` (text)
- `description` (text, nullable)
- `date` (date)
- `start_time` (time)
- `end_time` (time)
- `attendees_count` (integer)
- `payment_status` (enum: 'pending', 'partial', 'paid', 'refunded')
- `total_cost` (numeric)
- `amount_paid` (numeric)
- `status` (enum: 'tentative', 'confirmed', 'completed', 'cancelled')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**`audit_logs` table:**
- `id` (uuid)
- `user_id` (uuid, references users)
- `action` (text - e.g., 'CREATE_EVENT', 'UPDATE_PAYMENT')
- `entity_type` (text - e.g., 'event', 'room')
- `entity_id` (uuid)
- `old_data` (jsonb)
- `new_data` (jsonb)
- `ip_address` (inet)
- `created_at` (timestamp)

## 5. Implementation Roadmap
- **Phase 1: Foundation & UI Expansion** Next.js setup, styling, responsive layouts, and building the UI states for dashboards, calendar, and forms (Ongoing).
- **Phase 2: Database & Core Logic** Supabase integration, defining relational tables, implementing collision detection, and building the Add/Edit/Cancel Event flow.
- **Phase 3: Authentication & Audit Logging** Setting up Supabase Auth, establishing Admin vs Receptionist views, and implementing tracking for the audit log.
- **Phase 4: Integrations (Phase A)** Google Calendar Sync and Google Sheets integration.
- **Phase 5: Payments & Communications** Stripe (or equivalent) for payments, and Twilio/WhatsApp integration for SMS and message capabilities.
- **Phase 6: Printing & Polish** Timetable printable views, newsletters/broadcasts to staff, performance optimization, and final deployment.

## 6. Progress Log

### ✅ Completed
1. **System Blueprinting:** Defined exact Tech Stack, Roles, and Schemas to act as the authoritative `gemini.md` blueprint. 
2. **Deployment Config:** Set up Next.js static export options and configured an automated GitHub Actions deployment workflow for GitHub Pages.
3. **Global Loading State:** Designed a glassmorphic, responsive `<LoadingIndicator />` with a CSS-animated ellipsis for seamless route transitions.
4. **Role-Based Access Control (RBAC):** (Phase 3 Fast-Tracked)
   - Configured `@supabase/ssr` server and browser clients.
   - Built an Edge Middleware to protect routes, enforcing `/login` redirects and stopping non-admins from hitting `/admin/*`.
   - Created an `AuthContext` React Provider to expose user sessions and `admin` / `receptionist` boolean flags to any client component.
   - Created an `<AuthGuard>` wrapper for restricting specific UI sections by role.
   - Built a custom `/login` page and a `/unauthorized` fallback page.
   - Designed a dynamic navbar that displays the logged-in User's badge, initials, and role, while hiding itself cleanly when on the login route.
   - Wrote the foundational custom SQL (`supabase/profiles.sql`) containing the `profiles` table schema, ENUM definitions, Row Level Security Policies, and an automatic registration Trigger to default users to receptionists.
