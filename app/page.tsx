'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ImageUploader from '@/components/ImageUploader'
import AnalysisResults from '@/components/AnalysisResults'
import QuickDemo from '@/components/QuickDemo'
import ProgressBar from '@/components/ProgressBar'
import SkeletonLoader from '@/components/SkeletonLoader'
import { AnalysisResponse } from '@/types'

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState<'idle' | 'ocr' | 'analyzing' | 'complete'>('idle')
  const [error, setError] = useState<string | null>(null)

  const resetAnalysis = () => {
    setAnalysis(null)
    setError(null)
    setLoadingStep('idle')
  }

  const handleAnalysis = async (imageData: string) => {
    setLoading(true)
    setError(null)
    setAnalysis(null)
    setLoadingStep('ocr')

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

      setLoadingStep('analyzing')
      const data = await response.json()
      console.log('Analysis complete:', data)
      setLoadingStep('complete')
      setTimeout(() => {
        setAnalysis(data)
        setLoading(false)
      }, 500)
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoadingStep('idle')
      setLoading(false)
    }
  }

  const handleTextAnalysis = async (text: string) => {
    setLoading(true)
    setError(null)
    setAnalysis(null)
    setLoadingStep('analyzing')

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

      setLoadingStep('complete')
      const data = await response.json()
      setTimeout(() => {
        setAnalysis(data)
        setLoading(false)
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoadingStep('idle')
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative z-10 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* About Section */}
          <section id="about" className="scroll-mt-20">
            <header className="text-center mb-8 sm:mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Label Lie Detector
              </h1>
              <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto px-4 font-medium">
                Expose misleading marketing claims and harmful ingredients in your food products
              </p>
            </header>
          </section>

          {/* Features Section */}
          <section id="features" className="scroll-mt-20 mb-8 sm:mb-12">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
              <p className="text-gray-700">Upload a product image or paste ingredient text to get instant analysis</p>
            </div>
          </section>

          {/* Scan Section */}
          <section id="scan" className="scroll-mt-20">
            <div className="max-w-6xl mx-auto">
              <ImageUploader
                onImageUpload={handleAnalysis}
                onTextSubmit={handleTextAnalysis}
                loading={loading}
              />

              {/* Demo Section */}
              {!analysis && !loading && (
                <div id="demo" className="scroll-mt-20">
                  <QuickDemo onSelectSample={handleTextAnalysis} />
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
                  Error: {error}
                </div>
              )}

              {loading && (
                <>
                  <ProgressBar step={loadingStep} />
                  <SkeletonLoader />
                </>
              )}

              {analysis && !loading && (
                <AnalysisResults analysis={analysis} onReset={resetAnalysis} />
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
