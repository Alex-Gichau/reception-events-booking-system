"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSearch = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }
      
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
        setIsOpen(true)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSearch()
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <div className="relative hidden sm:flex items-center ml-6" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
             <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
             <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          className="block w-64 pl-10 pr-3 py-1.5 border border-gray-200 dark:border-slate-700 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 transition-all"
          placeholder="Search events, clients..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (e.target.value.length > 1) setIsOpen(true)
          }}
          onFocus={() => { if(query.length > 1) setIsOpen(true) }}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-10 left-0 w-80 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-slate-800/50">Top Matches</div>
          <ul>
            {results.map((result, idx) => (
              <li key={`${result.type}-${result.id}-${idx}`}>
                <Link 
                  href={result.type === 'event' ? `/calendar` : `/clients`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{result.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${result.type === 'event' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'}`}>
                      {result.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{result.subtitle}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query.length > 1 && !loading && results.length === 0 && (
         <div className="absolute top-10 left-0 w-80 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-xl z-50 p-4 text-center text-sm text-gray-500">
           No matching records found.
         </div>
      )}
    </div>
  )
}
