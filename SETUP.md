# Label Lie Detector - Setup and Usage Guide

## Quick Start (3-Hour Hackathon Build)

### Prerequisites
- Node.js 18+ installed
- Groq API key (free at https://console.groq.com)
- Modern web browser with camera access (optional)

### Installation Steps

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Configure Groq API Key**
   - Open `.env.local`
   - Replace `your_groq_api_key_here` with your actual Groq API key
   - Get a free API key at: https://console.groq.com

3. **Run Development Server**
   ```powershell
   npm run dev
   ```

4. **Open Application**
   - Navigate to http://localhost:3000
   - The app should now be running!

### Usage

#### Method 1: Image Upload
1. Click "Image Upload" tab
2. Click "Choose File" to upload a photo of a product label
3. OR click "Use Camera" to take a photo directly
4. Wait for analysis (5-10 seconds)
5. Review the results

#### Method 2: Text Input
1. Click "Paste Text" tab
2. Copy ingredients list from product packaging or online store
3. Paste into the text area
4. Click "Analyze Text"
5. Review the results

### Understanding the Results

#### Traffic Light System
- **RED**: High-risk ingredients (carcinogens, harmful preservatives, insulin spikes)
- **YELLOW**: Moderate risk (use in moderation, artificial thickeners/colors)
- **GREEN**: Safe and natural ingredients

#### Overall Safety Score
- Visual bar showing proportion of red/yellow/green ingredients
- Numerical count for each category

#### Marketing vs Reality
- Compares front-label claims with actual ingredient analysis
- Exposes misleading marketing tactics

#### Ingredient Analysis
- Detailed breakdown of each concerning ingredient
- Plain English explanation of health impacts
- Risk level for each ingredient

### Sample Test Cases

Use these sample ingredient lists to test the app:

1. **Protein Bar** (Copy and paste):
```
Ingredients: Maltitol Syrup, Soy Protein Isolate, Maltodextrin, Glycerin, Palm Kernel Oil, Fructose, Water, Natural Flavors, Soy Lecithin, Salt, Carrageenan, Sucralose, Acesulfame Potassium, Artificial Flavors, BHT (Preservative), Red 40, Yellow 5.
```

2. **Diet Soda**:
```
Ingredients: Carbonated Water, Caramel Color, Aspartame, Phosphoric Acid, Potassium Benzoate (Preservative), Natural Flavors, Citric Acid, Caffeine, Acesulfame Potassium.
```

3. **Healthy Cereal**:
```
Ingredients: Whole Grain Wheat, Sugar, Corn Syrup, Modified Corn Starch, Wheat Starch, Maltodextrin, Salt, Tripotassium Phosphate, Color Added (Red 40, Yellow 5, Blue 1), Natural and Artificial Flavor, BHT Added to Preserve Freshness.
```

### Troubleshooting

**Issue**: "Could not extract text from image"
- Solution: Ensure image is clear and well-lit
- Make sure ingredients list is visible and in focus
- Try using text input method instead

**Issue**: API errors
- Solution: Check your Groq API key in `.env.local`
- Verify you have API credits remaining
- Check console for detailed error messages

**Issue**: Camera not working
- Solution: Grant camera permissions in browser
- Try using file upload instead
- Check if camera is being used by another application

### Building for Production

```powershell
npm run build
npm start
```

The app will be available at http://localhost:3000

### Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI/ML**: Groq API (LLaMA 3.2 11B Vision + LLaMA 3.1 70B)
- **Image Processing**: Sharp, Canvas API
- **Camera**: MediaDevices API

### Key Features Implemented

1. Dual input methods (image + text)
2. Real-time camera capture
3. OCR extraction using vision model
4. Intelligent ingredient analysis
5. Traffic light categorization system
6. Marketing claim detection
7. Health impact explanations
8. Responsive modern UI
9. Error handling and validation
10. Sample data for testing

### Performance Notes

- Image analysis: ~5-10 seconds
- Text analysis: ~3-5 seconds
- Supports images up to 10MB
- Works on mobile and desktop
- No data stored or transmitted beyond API calls

### Privacy & Security

- Images processed in memory only
- No data persistence
- API calls secured with environment variables
- Camera access requires explicit permission
- No tracking or analytics

### Future Enhancements (Post-Hackathon)

- Barcode scanning
- Product database integration
- Alternative product suggestions
- Personalized health profiles
- Allergen detection
- Nutritional comparison
- Export reports as PDF
- Mobile app version
- Browser extension

### License

MIT License - Built for hackathon demonstration purposes.

---

**Built in 3 hours for Consumer Safety Hackathon**
