# Label Lie Detector

## The Problem

Marketing claims like "Natural" or "No Added Sugar" are often misleading. Ingredients lists are intentionally complex to hide unhealthy additives like Maltodextrin, High Fructose Corn Syrup, and harmful E-numbers.

## The Solution

An OCR-powered scanner that extracts ingredient text, filters out marketing fluff, identifies harmful substances, and explains their health impact in plain English.

## Features

- **Dual Input Methods**: Image upload with camera support OR text paste
- **AI-Powered OCR**: Extract ingredients from product photos using Groq's vision model
- **Intelligent Analysis**: Identify hidden sugars, harmful preservatives, and artificial additives
- **Traffic Light System**: Visual color-coding (Red/Yellow/Green) for ingredient safety
- **Marketing vs Reality**: Direct comparison between front-label claims and actual ingredients
- **Plain English Explanations**: No jargon, just clear health impact information
- **Real-time Processing**: Get results in seconds
- **Modern UI**: Responsive design with glassmorphism effects

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI/ML**: Groq API
  - LLaMA 3.2 11B Vision (OCR extraction)
  - LLaMA 3.1 70B Versatile (ingredient analysis)
- **Image Processing**: Sharp, HTML5 Canvas
- **Camera**: MediaDevices API

## Quick Start

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure API Key
Add your Groq API key to `.env.local`:
```
GROQ_API_KEY=your_groq_api_key_here
```
Get a free API key at: https://console.groq.com

### 3. Run Development Server
```powershell
npm run dev
```

### 4. Open Application
Navigate to http://localhost:3000

## Usage

### Method 1: Image Analysis
1. Click "Choose File" or "Use Camera"
2. Capture/upload a photo of the ingredients label
3. Wait for AI analysis (5-10 seconds)
4. Review color-coded results

### Method 2: Text Analysis
1. Switch to "Paste Text" tab
2. Copy ingredients from packaging or online store
3. Paste and click "Analyze Text"
4. Review results instantly

## Test Examples

Try these sample ingredients lists:

**Misleading Protein Bar:**
```
Maltitol Syrup, Soy Protein Isolate, Maltodextrin, Glycerin, 
Palm Kernel Oil, Fructose, Natural Flavors, Carrageenan, 
Sucralose, Artificial Flavors, BHT, Red 40, Yellow 5
```

**Diet Soda with Hidden Risks:**
```
Carbonated Water, Caramel Color, Aspartame, Phosphoric Acid, 
Potassium Benzoate, Natural Flavors, Acesulfame Potassium
```

**"Healthy" Cereal:**
```
Whole Grain Wheat, Sugar, Corn Syrup, Modified Corn Starch, 
Maltodextrin, Salt, Red 40, Yellow 5, Blue 1, BHT
```

## Project Structure

```
hackathon/
├── app/
│   ├── api/
│   │   ├── analyze/          # Image analysis endpoint
│   │   └── analyze-text/     # Text analysis endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Main application page
├── components/
│   ├── AnalysisResults.tsx   # Results display with traffic lights
│   └── ImageUploader.tsx     # Input handling (image/text)
├── lib/
│   ├── ingredients.ts        # Harmful ingredients database
│   └── sampleData.ts         # Test data samples
├── types/
│   └── index.ts              # TypeScript interfaces
└── package.json
```

## API Endpoints

### POST /api/analyze
Analyzes product label images using vision AI and ingredient analysis.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "productName": "Product Name",
  "ingredients": [...],
  "marketingClaims": [...],
  "overallScore": { "red": 3, "yellow": 2, "green": 5 },
  "summary": "Overall assessment...",
  "extractedText": "OCR output..."
}
```

### POST /api/analyze-text
Analyzes ingredient text directly without OCR.

**Request:**
```json
{
  "text": "Ingredients: ..."
}
```

**Response:** Same structure as /api/analyze

## Key Algorithms

### Ingredient Categorization
- **RED**: Carcinogens, harmful preservatives (E211, E320, BHA, BHT), trans fats
- **YELLOW**: Hidden sugars, artificial colors/flavors, thickeners
- **GREEN**: Natural ingredients, whole foods, safe additives

### Detection Patterns
- Hidden sugars: 18+ aliases (maltodextrin, dextrose, rice syrup, etc.)
- Harmful preservatives: 15+ E-numbers and chemical names
- Artificial additives: 25+ colors, flavors, and modifiers

## Hackathon Build

**Time Constraint**: 3 hours  
**Focus**: Consumer safety and transparency  
**Goal**: Empower consumers to make informed food choices

## Future Enhancements

- Barcode scanning integration
- Product database and recommendations
- Personalized allergen alerts
- Nutritional comparison tools
- PDF report export
- Browser extension
- Mobile native app

## License

MIT License - Open source for consumer safety

## Contributing

Built for hackathon demonstration. Contributions welcome for post-hackathon improvements.

---

**Exposing food industry lies, one label at a time.**
