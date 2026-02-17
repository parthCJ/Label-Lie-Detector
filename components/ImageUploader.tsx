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
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
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
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('image')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            mode === 'image'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white/20 text-gray-300 hover:bg-white/30'
          }`}
        >
          Image Upload
        </button>
        <button
          onClick={() => setMode('text')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            mode === 'text'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white/20 text-gray-300 hover:bg-white/30'
          }`}
        >
          Paste Text
        </button>
      </div>

      {mode === 'image' ? (
        <div className="space-y-6">
          {!isCameraMode ? (
            <>
              <div className="flex gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Choose File
                </button>
                <button
                  onClick={startCamera}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="flex gap-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all"
                >
                  Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {previewUrl && !isCameraMode && (
            <div className="mt-6">
              <p className="text-white mb-2 font-semibold">Preview:</p>
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
            className="w-full h-64 bg-white/10 text-white placeholder-gray-400 rounded-lg p-4 border border-white/20 focus:border-purple-500 focus:outline-none resize-none"
          />
          <button
            onClick={handleTextSubmit}
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Text
          </button>
        </div>
      )}
    </div>
  )
}
