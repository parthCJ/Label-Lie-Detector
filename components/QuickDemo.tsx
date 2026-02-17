'use client'

import { sampleIngredientLists, safeProductExample } from '@/lib/sampleData'

interface QuickDemoProps {
  onSelectSample: (text: string) => void
}

export default function QuickDemo({ onSelectSample }: QuickDemoProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6">
      <h3 className="text-2xl font-bold text-white mb-4">Quick Demo</h3>
      <p className="text-gray-300 mb-4">
        Try these sample products to see the detector in action:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sampleIngredientLists.map((sample, index) => (
          <button
            key={index}
            onClick={() => onSelectSample(sample.ingredients)}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 rounded-lg p-4 text-left transition-all hover:scale-105"
          >
            <div className="text-white font-semibold mb-1">{sample.name}</div>
            <div className="text-xs text-gray-300 mb-2">{sample.frontLabel}</div>
            <div className="text-xs text-purple-300">Click to analyze</div>
          </button>
        ))}
        <button
          onClick={() => onSelectSample(safeProductExample.ingredients)}
          className="bg-gradient-to-br from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 border border-green-500/30 rounded-lg p-4 text-left transition-all hover:scale-105"
        >
          <div className="text-white font-semibold mb-1">{safeProductExample.name}</div>
          <div className="text-xs text-gray-300 mb-2">{safeProductExample.frontLabel}</div>
          <div className="text-xs text-green-300">Click to analyze (Safe Example)</div>
        </button>
      </div>
    </div>
  )
}
