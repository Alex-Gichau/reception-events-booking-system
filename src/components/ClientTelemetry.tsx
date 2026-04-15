"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { logClientAction } from "@/app/actions/telemetry"

export default function ClientTelemetry() {
  const pathname = usePathname()

  // Track page navigations dynamically
  useEffect(() => {
    if (pathname) {
      logClientAction(`User securely navigated viewport to Route: ${pathname}`)
    }
  }, [pathname])

  // Intercept and stream all user click mechanic interactions globally
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Execute non-blocking trace on target DOM nodes
      const target = e.target as HTMLElement
      const button = target.closest('button')
      const link = target.closest('a')

      if (button) {
        // Strip carriage returns and condense text gracefully
        const text = button.innerText.trim().replace(/\n/g, ' ') || button.getAttribute('aria-label') || 'Icon-only Button'
        logClientAction(`GUI Click Input Triggered on Button component: [${text}]`)
      } else if (link) {
        const text = link.innerText.trim().replace(/\n/g, ' ') || link.href
        logClientAction(`GUI Navigation Input Triggered on Hyperlink: [${text}]`)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null // Invisible background sidecar component
}
