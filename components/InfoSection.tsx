'use client'

export default function InfoSection() {
  return (
    <div className="bg-amber-50 rounded-2xl p-6 mt-6 shadow-xl border border-amber-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Detect</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="text-xl font-bold text-red-700">Hidden Sugars</h4>
          </div>
          <ul className="text-sm text-red-800 space-y-2">
            <li>Maltodextrin</li>
            <li>High Fructose Corn Syrup</li>
            <li>Rice Syrup, Agave</li>
            <li>Dextrose, Fructose</li>
            <li>Fruit Juice Concentrate</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="text-xl font-bold text-yellow-700">Harmful Preservatives</h4>
          </div>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li>E211 (Sodium Benzoate)</li>
            <li>E320 (BHA)</li>
            <li>E321 (BHT)</li>
            <li>E621 (MSG)</li>
            <li>Sodium Nitrite</li>
          </ul>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <h4 className="text-xl font-bold text-orange-700">Artificial Additives</h4>
          </div>
          <ul className="text-sm text-orange-800 space-y-2">
            <li>Artificial Colors (Red 40, Yellow 5)</li>
            <li>Artificial Flavors</li>
            <li>Carrageenan</li>
            <li>Modified Food Starch</li>
            <li>Trans Fats</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-5">
        <h4 className="text-lg font-bold text-blue-700 mb-3">How It Works</h4>
        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
          <li>Upload a photo or paste ingredient text</li>
          <li>AI extracts and analyzes all ingredients</li>
          <li>Cross-references against harmful substance database</li>
          <li>Categorizes each ingredient by safety level</li>
          <li>Identifies misleading marketing claims</li>
          <li>Provides plain English health impact explanations</li>
        </ol>
      </div>

      <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-5">
        <h4 className="text-lg font-bold text-gray-700 mb-3">Tips for Best Results</h4>
        <ul className="text-sm text-gray-800 space-y-2">
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
