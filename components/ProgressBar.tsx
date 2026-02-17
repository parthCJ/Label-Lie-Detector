'use client'

import { useEffect, useState } from 'react'

interface ProgressBarProps {
  step: 'idle' | 'ocr' | 'analyzing' | 'complete'
}

export default function ProgressBar({ step }: ProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    switch (step) {
      case 'idle':
        setProgress(0)
        break
      case 'ocr':
        setProgress(40)
        break
      case 'analyzing':
        setProgress(80)
        break
      case 'complete':
        setProgress(100)
        break
    }
  }, [step])

  const getCurrentStep = () => {
    switch (step) {
      case 'ocr':
        return 'Extracting text from image...'
      case 'analyzing':
        return 'Analyzing ingredients...'
      case 'complete':
        return 'Analysis complete!'
      default:
        return 'Starting...'
    }
  }

  const currentStep = getCurrentStep()

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <div className="bg-amber-50 rounded-2xl p-6 shadow-xl border border-amber-200">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <p className="text-gray-900 text-lg font-semibold">{currentStep}</p>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span className={step === 'ocr' ? 'font-bold text-blue-600' : ''}>
              1. OCR Extraction
            </span>
            <span className={step === 'analyzing' ? 'font-bold text-purple-600' : ''}>
              2. Ingredient Analysis
            </span>
            <span className={step === 'complete' ? 'font-bold text-green-600' : ''}>
              3. Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
