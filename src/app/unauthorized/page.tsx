import Link from "next/link";
import { ShieldOff, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
        <ShieldOff className="h-10 w-10 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        You don&apos;t have permission to view this page. This area is
        restricted to administrators only.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </main>
  );
}
