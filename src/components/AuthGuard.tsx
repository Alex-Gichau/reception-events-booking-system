"use client";

import { useAuth, UserRole } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldOff } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  /** If set, redirects instead of showing an inline error */
  redirectTo?: string;
}

/**
 * Wrap any component/page section to restrict it to specific roles.
 * Usage:
 *   <AuthGuard allowedRoles={["admin"]}>
 *     <AdminPanel />
 *   </AuthGuard>
 */
export default function AuthGuard({
  children,
  allowedRoles,
  redirectTo,
}: AuthGuardProps) {
  const { role, loading } = useAuth();
  const router = useRouter();

  const hasAccess =
    !allowedRoles || !role ? false : allowedRoles.includes(role);

  useEffect(() => {
    if (!loading && !hasAccess && redirectTo) {
      router.replace(redirectTo);
    }
  }, [loading, hasAccess, redirectTo, router]);

  if (loading) return null;

  if (!hasAccess) {
    if (redirectTo) return null; // Will redirect via useEffect

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
          <ShieldOff className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Access Restricted
        </h2>
        <p className="text-gray-500 text-sm max-w-xs">
          You don&apos;t have permission to view this section. Please contact
          your administrator.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
