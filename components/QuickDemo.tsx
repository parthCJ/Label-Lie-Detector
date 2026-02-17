'use client'

import { sampleIngredientLists, safeProductExample } from '@/lib/sampleData'

interface QuickDemoProps {
  onSelectSample: (text: string) => void
}

export default function QuickDemo({ onSelectSample }: QuickDemoProps) {
  return (
    <div className="bg-amber-50 rounded-2xl p-6 mt-6 shadow-xl border border-amber-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Demo</h3>
      <p className="text-gray-700 mb-4">
        Try these sample products to see the detector in action:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sampleIngredientLists.map((sample, index) => (
          <button
            key={index}
            onClick={() => onSelectSample(sample.ingredients)}
            className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-left transition-all hover:scale-105"
          >
            <div className="text-gray-900 font-semibold mb-1">{sample.name}</div>
            <div className="text-xs text-gray-600 mb-2">{sample.frontLabel}</div>
            <div className="text-xs text-blue-600">Click to analyze</div>
          </button>
        ))}
        <button
          onClick={() => onSelectSample(safeProductExample.ingredients)}
          className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-left transition-all hover:scale-105"
        >
          <div className="text-gray-900 font-semibold mb-1">{safeProductExample.name}</div>
          <div className="text-xs text-gray-600 mb-2">{safeProductExample.frontLabel}</div>
          <div className="text-xs text-green-600">Click to analyze (Safe Example)</div>
        </button>
      </div>
    </div>
  )
}
