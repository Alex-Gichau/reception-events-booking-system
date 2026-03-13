import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>

      {/* Calendar Mini View */}
      <div className="bg-white rounded-lg shadow mb-8 p-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-8" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {[...Array(35)].map((_, i) => (
            <Skeleton key={i} className="h-8" />
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6">
              <div className="flex items-start">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="ml-4 flex-1">
                  <Skeleton className="h-5 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
