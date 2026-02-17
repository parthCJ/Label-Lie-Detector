export const harmfulIngredients = {
  hiddenSugars: [
    'dextrose',
    'maltodextrin',
    'rice syrup',
    'corn syrup',
    'high fructose corn syrup',
    'agave nectar',
    'agave syrup',
    'fructose',
    'glucose',
    'sucrose',
    'maltose',
    'fruit juice concentrate',
    'cane sugar',
    'brown sugar',
    'invert sugar',
    'malt syrup',
    'molasses',
    'treacle',
  ],

  harmfulPreservatives: [
    'e211', 'sodium benzoate',
    'e320', 'bha', 'butylated hydroxyanisole',
    'e321', 'bht', 'butylated hydroxytoluene',
    'e621', 'msg', 'monosodium glutamate',
    'e250', 'sodium nitrite',
    'e220', 'sulfur dioxide',
    'e221', 'sodium sulfite',
    'e222', 'sodium bisulfite',
    'e223', 'sodium metabisulfite',
    'e224', 'potassium metabisulfite',
    'e226', 'calcium sulfite',
    'e227', 'calcium bisulfite',
    'e228', 'potassium bisulfite',
  ],

  artificialAdditives: [
    'carrageenan',
    'artificial flavor',
    'artificial flavors',
    'artificial colour',
    'artificial colors',
    'natural flavors',
    'red 40', 'e129',
    'yellow 5', 'e102',
    'yellow 6', 'e110',
    'blue 1', 'e133',
    'blue 2', 'e132',
    'green 3', 'e143',
    'caramel color',
    'modified food starch',
    'partially hydrogenated oil',
    'trans fat',
    'sodium aluminum phosphate',
    'potassium bromate',
    'propyl gallate',
    'tbhq',
  ],
}

export function normalizeIngredientName(name: string): string {
  return name.toLowerCase().trim().replace(/[.,;()]/g, '')
}

export function isHarmfulIngredient(name: string): {
  harmful: boolean
  category?: 'sugar' | 'preservative' | 'additive'
  severity?: 'high' | 'moderate'
} {
  const normalized = normalizeIngredientName(name)

  if (harmfulIngredients.hiddenSugars.some(sugar => normalized.includes(sugar))) {
    return { harmful: true, category: 'sugar', severity: 'moderate' }
  }

  if (harmfulIngredients.harmfulPreservatives.some(pres => normalized.includes(pres))) {
    return { harmful: true, category: 'preservative', severity: 'high' }
  }

  if (harmfulIngredients.artificialAdditives.some(add => normalized.includes(add))) {
    return { harmful: true, category: 'additive', severity: 'moderate' }
  }

  return { harmful: false }
}
