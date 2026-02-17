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
  const [isFrontCamera, setIsFrontCamera] = useState(false)
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
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Camera access is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Edge.')
        return
      }

      console.log('Attempting to access camera...')
      console.log('Browser:', navigator.userAgent)
      
      // First check if we have permission
      try {
        const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName })
        console.log('Camera permission status:', permissions.state)
      } catch (e) {
        console.log('Could not check camera permissions')
      }

      let stream;
      
      try {
        console.log('Requesting environment camera...')
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          } 
        })
        console.log('Environment camera accessed successfully')
        setIsFrontCamera(false)
      } catch (err) {
        console.log('Environment camera not available:', err)
        console.log('Trying default camera...')
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            }
          })
          console.log('Default camera accessed successfully')
          // Assume default camera is front-facing if environment not available
          setIsFrontCamera(true)
        } catch (err2) {
          console.error('Failed to access any camera:', err2)
          throw err2
        }
      }
      
      if (stream) {
        console.log('Stream obtained, setting camera mode...')
        streamRef.current = stream
        setIsCameraMode(true)
        
        // Wait for video element to be rendered in the DOM
        setTimeout(() => {
          if (videoRef.current) {
            console.log('Setting video stream...')
            videoRef.current.srcObject = stream
            
            // Wait for video to be ready
            videoRef.current.onloadedmetadata = () => {
              console.log('Video metadata loaded')
              videoRef.current?.play().then(() => {
                console.log('Video playing')
              }).catch(err => {
                console.error('Error playing video:', err)
              })
            }
            console.log('Camera started successfully')
          } else {
            console.error('Video ref is still null after timeout')
          }
        }, 100)
      } else {
        console.error('Stream is null')
        throw new Error('Failed to obtain camera stream')
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Could not access camera: ${errorMessage}\n\nPlease:\n1. Allow camera access when prompted\n2. Check if another app is using the camera\n3. Try refreshing the page`)
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
        // Only flip the image if using front camera to fix mirroring
        if (isFrontCamera) {
          ctx.save()
          ctx.scale(-1, 1)
          ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
          ctx.restore()
        } else {
          // Back camera - no flip needed
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        }
        
        const imageData = canvas.toDataURL('image/jpeg', 0.95)
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
                  muted
                  className="w-full rounded-lg"
                  style={{ minHeight: '400px', maxHeight: '600px' }}
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
