'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import AnalysisResults from '@/components/AnalysisResults'
import QuickDemo from '@/components/QuickDemo'
import InfoSection from '@/components/InfoSection'
import { AnalysisResponse } from '@/types'

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalysis = async (imageData: string) => {
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleTextAnalysis = async (text: string) => {
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Label Lie Detector
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expose misleading marketing claims and harmful ingredients in your food products
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <ImageUploader
            onImageUpload={handleAnalysis}
            onTextSubmit={handleTextAnalysis}
            loading={loading}
          />

          {!analysis && !loading && (
            <>
              <QuickDemo onSelectSample={handleTextAnalysis} />
              <InfoSection />
            </>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
              Error: {error}
            </div>
          )}

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-white mt-4 text-lg">Analyzing ingredients...</p>
            </div>
          )}

          {analysis && !loading && (
            <AnalysisResults analysis={analysis} />
          )}
        </div>
      </div>
    </main>
  )
}
