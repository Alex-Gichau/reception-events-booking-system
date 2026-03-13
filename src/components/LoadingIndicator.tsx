"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <>
      <style>{`
        @keyframes ellipsis-dot {
          0%, 20%   { opacity: 0; }
          50%        { opacity: 1; }
          100%       { opacity: 0; }
        }
        .dot-1 { animation: ellipsis-dot 1.4s infinite 0s; }
        .dot-2 { animation: ellipsis-dot 1.4s infinite 0.2s; }
        .dot-3 { animation: ellipsis-dot 1.4s infinite 0.4s; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .loader-fade-in {
          animation: fade-in-up 0.2s ease-out forwards;
        }
      `}</style>

      {/* Bottom-left on md+ screens, horizontally centered at bottom on mobile */}
      <div
        role="status"
        aria-live="polite"
        aria-label="Page loading"
        className="
          loader-fade-in
          fixed z-[9999]

          /* Mobile: centered at bottom */
          bottom-6 left-1/2 -translate-x-1/2

          /* Desktop: bottom-left, no centering override */
          md:left-6 md:translate-x-0

          flex items-center gap-2
          bg-white/90 backdrop-blur-sm
          border border-gray-200/80
          shadow-lg shadow-black/10
          rounded-full
          px-4 py-2.5
        "
      >
        {/* Spinner ring */}
        <span
          className="
            inline-block w-4 h-4 rounded-full
            border-2 border-gray-200 border-t-indigo-600
            animate-spin flex-shrink-0
          "
        />

        {/* Text with animated ellipsis */}
        <span className="text-sm font-medium text-gray-700 select-none leading-none">
          Loading
          <span className="dot-1 inline-block">.</span>
          <span className="dot-2 inline-block">.</span>
          <span className="dot-3 inline-block">.</span>
        </span>
      </div>
    </>
  );
}
