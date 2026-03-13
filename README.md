# Reception Events Booking System

A comprehensive, modern web application designed to manage event bookings, room scheduling, and client communications for reception facilities. Built with Next.js and TypeScript, this system provides administrators and receptionists with powerful tools to streamline daily operations.

## 🚀 Key Features

*   **Role-Based Access:** Distinct views and capabilities for `Admins` (financials, audit, complete oversight) and `Receptionists` (daily calendar, booking management).
*   **Advanced Calendar & Scheduling:** Interactive calendar views with automated collision detection to prevent double-booking of rooms.
*   **Room & Inventory Management:** Track available rooms, their capacities, and scheduling statuses.
*   **Detailed Client Data Model:** Capture robust client details for comprehensive follow-ups, tracking, and relationship management.
*   **Integrated Communications:** Support for automated SMS and WhatsApp invitations and confirmations.
*   **Payment Integration:** Built-in tracking for event costs, deposits, and payment statuses.
*   **External Syncs:** Integration capabilities with Google Calendar for external scheduling, and Google Sheets for customized data exports.
*   **Timetable Printing:** Dedicated functionality for generating and printing daily/weekly event timetables.
*   **Comprehensive Audit Logging:** An immutable data log tracking every system action (who, what, when) for security and accountability.
*   **Modern UI/UX:** A responsive, beautifully designed interface using Tailwind CSS and shadcn/ui components.
*   **Internal Newsletters & Notifications:** Share updates about room statuses and general facility info with staff.

## 🛠️ Technology Stack

*   **Frontend Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/)
*   **Main Database & Backend:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
*   **Auxiliary Services:** Firebase (for specific realtime functionality/notifications)
*   **Proposed External Integrations:** Google Calendar/Sheets APIs, Twilio/Meta Graph (SMS/WhatsApp), Payment provider (Stripe/etc).

## 💻 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or pnpm
*   A Supabase Project

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Alex-Gichau/reception-events-booking-system.git
    cd reception-events-booking-system
    ```

2.  **Environment Variables**
    Create a `.env.local` file in the root directory and add your Supabase and Firebase keys (see `.env.example` if applicable).

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

5.  **Open the Application**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🗺️ Project Roadmap

1.  **UI Construction:** Building out the core application states and layouts.
2.  **Database & Auth Setup:** Initializing Supabase, creating the schema (Events, Rooms, Clients, Users, Audit Logs).
3.  **Core Application Logic:** Implementing the booking workflows and collision detection algorithms.
4.  **Integrations Phase 1:** Syncing with Google Calendar and Google Sheets.
5.  **Integrations Phase 2:** Setting up Payment Gateways, SMS, and WhatsApp functionalities.
6.  **Refinement:** Timetable printing, internal newsletters, and rigorous testing.
