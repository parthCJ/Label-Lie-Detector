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
      console.log('Starting analysis...')
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API Error:', errorData)
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()
      console.log('Analysis complete:', data)
      setAnalysis(data)
    } catch (err) {
      console.error('Error:', err)
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
    <main className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Label Lie Detector
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">
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
            </>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
              Error: {error}
            </div>
          )}

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <p className="text-gray-900 mt-4 text-lg">Analyzing ingredients...</p>
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
