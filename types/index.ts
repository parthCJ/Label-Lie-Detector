export interface Ingredient {
  name: string
  category: 'red' | 'yellow' | 'green'
  risk: string
  explanation: string
}

export interface AnalysisResponse {
  productName?: string
  ingredients: Ingredient[]
  marketingClaims: {
    claim: string
    reality: string
  }[]
  overallScore: {
    red: number
    yellow: number
    green: number
  }
  summary: string
  extractedText?: string
}
