import { readAllLogs } from "@/lib/logger"
import { Terminal, RefreshCcw } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function TerminalLogPage() {
  const logData = readAllLogs()
  
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto h-[80vh] flex flex-col bg-black rounded-lg border border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Terminal Header Chrome */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex items-center gap-4 text-slate-400 font-mono text-sm ml-4 border-l border-slate-700 pl-4">
              <a href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">
                 [HOME]
              </a>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>root@eventsync-pro:~# /var/log/terminal.log</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Output Window */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-[13px] md:text-sm leading-relaxed scroll-smooth shadow-inner">
          <pre className="text-emerald-400 whitespace-pre-wrap break-all">
            {logData}
            {/* Blinking Cursor Simulation */}
            <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse align-middle ml-1"></span>
          </pre>
        </div>
      </div>
    </main>
  )
}
