import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { AnalysisResponse } from '@/types'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const ANALYSIS_PROMPT = `You are a food safety expert. Analyze the following ingredient list from a food product label.

Your task:
1. Extract all ingredients from the text
2. Categorize each ingredient as RED (dangerous/harmful), YELLOW (caution/moderate), or GREEN (safe/natural)
3. Identify hidden sugars (dextrose, maltodextrin, rice syrup, agave, fructose, etc.)
4. Flag harmful preservatives (E-numbers like E211, E320, E621, sodium benzoate, BHA, BHT, etc.)
5. Flag artificial additives (MSG, carrageenan, artificial colors, artificial flavors, etc.)
6. Identify any misleading marketing claims if visible in the text
7. Provide plain English explanations for why each flagged ingredient is concerning

Return a JSON object with this exact structure:
{
  "productName": "string or null",
  "ingredients": [
    {
      "name": "ingredient name",
      "category": "red" | "yellow" | "green",
      "risk": "High Risk" | "Moderate Risk" | "Safe",
      "explanation": "plain English explanation of health impact"
    }
  ],
  "marketingClaims": [
    {
      "claim": "what the front label says",
      "reality": "what the ingredients actually show"
    }
  ],
  "overallScore": {
    "red": number,
    "yellow": number,
    "green": number
  },
  "summary": "2-3 sentence overall assessment"
}

Focus on ingredients that are actually harmful or deceptive. Don't flag basic ingredients like water, salt, flour unless they're in concerning amounts.`

export async function POST(request: NextRequest) {
  try {
    console.log('Analyze API called')
    const { image } = await request.json()

    if (!image) {
      console.error('No image provided')
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    console.log('Image received, length:', image.length)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    
    console.log('Starting OCR with Groq...')
    const ocrCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract all text from this food label image, focusing on the ingredients list. Return just the raw text, nothing else.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Data}`,
              },
            },
          ] as any,
        },
      ],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 0.3,
      max_tokens: 1024,
    })

    const extractedText = ocrCompletion.choices[0]?.message?.content || ''
    console.log('OCR complete, extracted text:', extractedText.substring(0, 100))

    if (!extractedText.trim()) {
      console.error('No text extracted from image')
      return NextResponse.json(
        { error: 'Could not extract text from image' },
        { status: 400 }
      )
    }

    console.log('Starting ingredient analysis...')
    const analysisCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: ANALYSIS_PROMPT,
        },
        {
          role: 'user',
          content: extractedText,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    })

    const analysisText = analysisCompletion.choices[0]?.message?.content || '{}'
    console.log('Analysis complete')
    const analysis: AnalysisResponse = JSON.parse(analysisText)
    analysis.extractedText = extractedText

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: `Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
