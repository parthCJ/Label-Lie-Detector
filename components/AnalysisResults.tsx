'use client'

import { AnalysisResponse } from '@/types'

interface AnalysisResultsProps {
  analysis: AnalysisResponse
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const getCategoryColor = (category: 'red' | 'yellow' | 'green') => {
    switch (category) {
      case 'red':
        return 'bg-red-500/20 border-red-500 text-red-200'
      case 'yellow':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-200'
      case 'green':
        return 'bg-green-500/20 border-green-500 text-green-200'
    }
  }

  const getCategoryIcon = (category: 'red' | 'yellow' | 'green') => {
    switch (category) {
      case 'red':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'yellow':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'green':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const totalIngredients = analysis.overallScore.red + analysis.overallScore.yellow + analysis.overallScore.green
  const redPercentage = totalIngredients > 0 ? (analysis.overallScore.red / totalIngredients) * 100 : 0
  const yellowPercentage = totalIngredients > 0 ? (analysis.overallScore.yellow / totalIngredients) * 100 : 0
  const greenPercentage = totalIngredients > 0 ? (analysis.overallScore.green / totalIngredients) * 100 : 0

  return (
    <div className="mt-8 space-y-6">
      {analysis.productName && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-white">{analysis.productName}</h2>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Overall Safety Score</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/20 rounded-full h-8 overflow-hidden">
              <div className="h-full flex">
                <div 
                  className="bg-red-500 h-full transition-all duration-500"
                  style={{ width: `${redPercentage}%` }}
                />
                <div 
                  className="bg-yellow-500 h-full transition-all duration-500"
                  style={{ width: `${yellowPercentage}%` }}
                />
                <div 
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{ width: `${greenPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-red-500/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-200">{analysis.overallScore.red}</div>
              <div className="text-sm text-red-300">High Risk</div>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-200">{analysis.overallScore.yellow}</div>
              <div className="text-sm text-yellow-300">Moderate Risk</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-200">{analysis.overallScore.green}</div>
              <div className="text-sm text-green-300">Safe</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Summary</h3>
        <p className="text-gray-200 text-lg leading-relaxed">{analysis.summary}</p>
      </div>

      {analysis.marketingClaims && analysis.marketingClaims.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Marketing vs Reality</h3>
          <div className="space-y-4">
            {analysis.marketingClaims.map((claim, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-purple-300">CLAIM:</span>
                      <p className="text-white mt-1">{claim.claim}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-red-300">REALITY:</span>
                      <p className="text-red-200 mt-1">{claim.reality}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Ingredient Analysis</h3>
        <div className="space-y-3">
          {analysis.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 border-2 ${getCategoryColor(ingredient.category)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getCategoryIcon(ingredient.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold">{ingredient.name}</h4>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white/20">
                      {ingredient.risk}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{ingredient.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {analysis.extractedText && (
        <details className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <summary className="text-xl font-bold text-white cursor-pointer hover:text-purple-300 transition-colors">
            View Extracted Text
          </summary>
          <div className="mt-4 bg-black/30 rounded-lg p-4">
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">{analysis.extractedText}</pre>
          </div>
        </details>
      )}
    </div>
  )
}
