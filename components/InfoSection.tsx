'use client'

export default function InfoSection() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6">
      <h3 className="text-2xl font-bold text-white mb-6">What We Detect</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="text-xl font-bold text-red-300">Hidden Sugars</h4>
          </div>
          <ul className="text-sm text-red-200 space-y-2">
            <li>Maltodextrin</li>
            <li>High Fructose Corn Syrup</li>
            <li>Rice Syrup, Agave</li>
            <li>Dextrose, Fructose</li>
            <li>Fruit Juice Concentrate</li>
          </ul>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="text-xl font-bold text-yellow-300">Harmful Preservatives</h4>
          </div>
          <ul className="text-sm text-yellow-200 space-y-2">
            <li>E211 (Sodium Benzoate)</li>
            <li>E320 (BHA)</li>
            <li>E321 (BHT)</li>
            <li>E621 (MSG)</li>
            <li>Sodium Nitrite</li>
          </ul>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <h4 className="text-xl font-bold text-orange-300">Artificial Additives</h4>
          </div>
          <ul className="text-sm text-orange-200 space-y-2">
            <li>Artificial Colors (Red 40, Yellow 5)</li>
            <li>Artificial Flavors</li>
            <li>Carrageenan</li>
            <li>Modified Food Starch</li>
            <li>Trans Fats</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-lg p-5">
        <h4 className="text-lg font-bold text-purple-300 mb-3">How It Works</h4>
        <ol className="text-sm text-purple-200 space-y-2 list-decimal list-inside">
          <li>Upload a photo or paste ingredient text</li>
          <li>AI extracts and analyzes all ingredients</li>
          <li>Cross-references against harmful substance database</li>
          <li>Categorizes each ingredient by safety level</li>
          <li>Identifies misleading marketing claims</li>
          <li>Provides plain English health impact explanations</li>
        </ol>
      </div>

      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
        <h4 className="text-lg font-bold text-blue-300 mb-3">Tips for Best Results</h4>
        <ul className="text-sm text-blue-200 space-y-2">
          <li>Ensure good lighting when taking photos</li>
          <li>Capture the entire ingredients section clearly</li>
          <li>For text input, include the full ingredients list</li>
          <li>Check both front label claims and back ingredients</li>
          <li>Look for E-numbers and unfamiliar chemical names</li>
        </ul>
      </div>
    </div>
  )
}
