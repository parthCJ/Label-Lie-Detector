'use client'

export default function SkeletonLoader() {
  return (
    <div className="mt-8 space-y-6 animate-pulse">
      {/* Product Name Skeleton */}
      <div className="bg-amber-50 rounded-2xl p-6 shadow-xl border border-amber-200">
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>

      {/* Overall Score Skeleton */}
      <div className="bg-amber-50 rounded-2xl p-6 shadow-xl border border-amber-200">
        <div className="h-7 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-red-100 rounded-lg p-4 h-24"></div>
            <div className="bg-yellow-100 rounded-lg p-4 h-24"></div>
            <div className="bg-green-100 rounded-lg p-4 h-24"></div>
          </div>
        </div>
      </div>

      {/* Summary Skeleton */}
      <div className="bg-amber-50 rounded-2xl p-6 shadow-xl border border-amber-200">
        <div className="h-7 bg-gray-300 rounded w-1/5 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>

      {/* Ingredients Skeleton */}
      <div className="bg-amber-50 rounded-2xl p-6 shadow-xl border border-amber-200">
        <div className="h-7 bg-gray-300 rounded w-1/3 mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg p-4 border-2 border-gray-300 bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
