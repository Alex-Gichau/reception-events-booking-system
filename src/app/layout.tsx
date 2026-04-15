import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingIndicator from "../components/LoadingIndicator";

export const metadata: Metadata = {
  title: "EventSync Pro Manager",
  description: "Manage all your events in one place",
};

import { AuthProvider } from "@/lib/auth/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import ClientTelemetry from "@/components/ClientTelemetry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ClientTelemetry />
            <Navbar />
            {children}
            <Footer />
            <Suspense fallback={null}>
              <LoadingIndicator />
            </Suspense>
          </AuthProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
