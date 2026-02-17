'use client'

import { useState, useRef, ChangeEvent } from 'react'

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void
  onTextSubmit: (text: string) => void
  loading: boolean
}

export default function ImageUploader({ onImageUpload, onTextSubmit, loading }: ImageUploaderProps) {
  const [mode, setMode] = useState<'image' | 'text'>('image')
  const [text, setText] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isCameraMode, setIsCameraMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name, file.type, file.size)
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        console.log('File read complete, data length:', result.length)
        setPreviewUrl(result)
        onImageUpload(result)
      }
      reader.onerror = (error) => {
        console.error('Error reading file:', error)
        alert('Error reading file. Please try again.')
      }
      reader.readAsDataURL(file)
    } else {
      console.log('No file selected')
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraMode(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Could not access camera. Please check permissions.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg')
        console.log('Photo captured, data length:', imageData.length)
        setPreviewUrl(imageData)
        stopCamera()
        onImageUpload(imageData)
      }
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsCameraMode(false)
  }

  const handleTextSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text)
    }
  }

  return (
    <div className="bg-amber-50 rounded-2xl p-4 sm:p-8 shadow-xl border border-amber-200">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setMode('image')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            mode === 'image'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Image Upload
        </button>
        <button
          onClick={() => setMode('text')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            mode === 'text'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Paste Text
        </button>
      </div>

      {mode === 'image' ? (
        <div className="space-y-6">
          {!isCameraMode ? (
            <>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Analyzing...' : 'Choose File'}
                </button>
                <button
                  onClick={startCamera}
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Use Camera
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border-4 border-blue-500">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                  style={{ minHeight: '400px' }}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg"
                >
                  Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {previewUrl && !isCameraMode && (
            <div className="mt-6">
              <p className="text-gray-900 mb-2 font-semibold">Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full rounded-lg shadow-lg max-h-96 object-contain"
              />
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the ingredients list here..."
            className="w-full h-64 bg-amber-50 text-gray-900 placeholder-gray-500 rounded-lg p-4 border border-amber-300 focus:border-blue-500 focus:outline-none resize-none"
          />
          <button
            onClick={handleTextSubmit}
            disabled={loading || !text.trim()}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Text
          </button>
        </div>
      )}
    </div>
  )
}
