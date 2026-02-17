'use client'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Label Lie Detector
            </h1>
          </div>

          {/* Navigation Links - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              About
            </a>
            <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              How It Works
            </a>
            <a href="#demo" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Demo
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <a 
              href="#scan"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold transition-all shadow-md text-sm sm:text-base"
            >
              Start Scanning
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
