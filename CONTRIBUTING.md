# Contributing to Label Lie Detector

Thank you for your interest in improving consumer food safety awareness!

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Groq API key

### Initial Setup
```powershell
# Clone repository
git clone https://github.com/yourusername/label-lie-detector.git
cd label-lie-detector

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Groq API key

# Start development server
npm run dev
```

## Project Structure

```
hackathon/
├── app/                      # Next.js 14 app directory
│   ├── api/                  # API routes
│   │   ├── analyze/          # Image analysis endpoint
│   │   └── analyze-text/     # Text analysis endpoint
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── AnalysisResults.tsx   # Results display
│   ├── ImageUploader.tsx     # Input handling
│   ├── InfoSection.tsx       # Information display
│   └── QuickDemo.tsx         # Sample demos
├── lib/                      # Utility functions
│   ├── ingredients.ts        # Ingredient database
│   └── sampleData.ts         # Test data
└── types/                    # TypeScript definitions
    └── index.ts              # Type interfaces
```

## How to Contribute

### Reporting Bugs
1. Check existing issues first
2. Create detailed bug report using template
3. Include reproduction steps
4. Provide screenshots if applicable

### Suggesting Features
1. Check existing feature requests
2. Create detailed feature proposal
3. Explain use case and benefits
4. Consider implementation complexity

### Submitting Changes

#### 1. Fork and Clone
```powershell
# Fork on GitHub, then:
git clone https://github.com/yourusername/label-lie-detector.git
cd label-lie-detector
git remote add upstream https://github.com/original/label-lie-detector.git
```

#### 2. Create Branch
```powershell
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

#### 3. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

#### 4. Test Changes
```powershell
# Run development server
npm run dev

# Test your changes thoroughly
# See TESTING.md for test cases

# Build to ensure no errors
npm run build
```

#### 5. Commit Changes
```powershell
git add .
git commit -m "feat: add barcode scanning support"
# or
git commit -m "fix: resolve camera permission issue"
```

Commit message format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting changes
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

#### 6. Push and Create PR
```powershell
git push origin feature/your-feature-name
```
Then create Pull Request on GitHub.

## Code Style Guide

### TypeScript
```typescript
// Use interfaces for object shapes
interface Ingredient {
  name: string
  category: 'red' | 'yellow' | 'green'
  risk: string
  explanation: string
}

// Use descriptive variable names
const harmfulIngredients = [...] // Good
const arr = [...] // Bad

// Add JSDoc comments for complex functions
/**
 * Analyzes ingredients and categorizes by safety level
 * @param ingredients - Array of ingredient names
 * @returns Categorized ingredient analysis
 */
function analyzeIngredients(ingredients: string[]) {
  // Implementation
}
```

### React Components
```typescript
// Use functional components
export default function MyComponent({ prop1, prop2 }: Props) {
  // Component logic
}

// Use descriptive component and prop names
interface ImageUploaderProps {
  onImageUpload: (data: string) => void
  loading: boolean
}

// Extract complex JSX into sub-components
const IngredientCard = ({ ingredient }: { ingredient: Ingredient }) => (
  <div>...</div>
)
```

### CSS/Tailwind
```typescript
// Use semantic class grouping
className="
  flex items-center gap-4
  bg-white/10 backdrop-blur-lg
  rounded-lg p-4
  border border-white/20
  hover:bg-white/20
  transition-all
"
```

## Priority Contributions

### High Priority
1. **Barcode Scanning**: Integrate barcode lookup
2. **Product Database**: Build searchable database
3. **Allergen Detection**: Flag common allergens
4. **Mobile App**: React Native version
5. **Browser Extension**: Quick-scan extension

### Medium Priority
1. **User Accounts**: Save scanned products
2. **Recommendations**: Suggest healthier alternatives
3. **Comparison Tool**: Compare multiple products
4. **Export Reports**: PDF/image export
5. **Nutritional Analysis**: Beyond ingredients

### Low Priority
1. **Localization**: Multi-language support
2. **Social Features**: Share scans
3. **Gamification**: Badges and achievements
4. **API**: Public API for developers
5. **Widgets**: Embeddable scanner

## Feature Development Guidelines

### Adding New Ingredient Categories

1. Update `lib/ingredients.ts`:
```typescript
export const harmfulIngredients = {
  // ... existing categories
  newCategory: [
    'ingredient1',
    'ingredient2',
  ],
}
```

2. Update detection logic:
```typescript
export function isHarmfulIngredient(name: string) {
  // Add new category check
  if (harmfulIngredients.newCategory.some(item => 
    normalized.includes(item)
  )) {
    return { 
      harmful: true, 
      category: 'newCategory', 
      severity: 'moderate' 
    }
  }
}
```

3. Update prompt in API routes to include new category

4. Add UI indicators in `AnalysisResults.tsx`

### Adding New Analysis Features

1. Define new types in `types/index.ts`
2. Update API prompt to request new data
3. Update API response interface
4. Add UI components to display new data
5. Update documentation

### Improving OCR Accuracy

1. Experiment with different Groq models
2. Add image preprocessing (contrast, rotation)
3. Implement multi-pass OCR with validation
4. Add confidence scoring

## Testing Requirements

### Before Submitting PR
- [ ] Code builds without errors
- [ ] All existing features still work
- [ ] New feature tested manually
- [ ] No console errors or warnings
- [ ] Mobile responsive (if UI changes)
- [ ] Documentation updated
- [ ] No API keys committed

### Test Cases to Run
1. Image upload and analysis
2. Camera capture
3. Text input
4. Quick demo samples
5. Error scenarios
6. Mobile view

See `TESTING.md` for detailed test procedures.

## Documentation Guidelines

### Code Comments
- Comment complex algorithms
- Explain non-obvious decisions
- Document API integrations
- Add JSDoc for public functions

### README Updates
- Keep installation steps current
- Update feature list
- Add new dependencies
- Update screenshots

### New Documentation
Create separate docs for:
- Major features
- API integrations
- Deployment guides
- Architecture decisions

## API Integration Guidelines

### Adding New AI Models
1. Research model capabilities
2. Test response format
3. Update types to match response
4. Handle errors gracefully
5. Document in code

### Adding New Data Sources
1. Check licensing and terms
2. Implement caching strategy
3. Add rate limiting
4. Handle API downtime
5. Document usage limits

## Performance Considerations

### Optimization Checklist
- [ ] Minimize bundle size
- [ ] Optimize images
- [ ] Reduce API calls
- [ ] Implement caching
- [ ] Use code splitting
- [ ] Lazy load components

### Performance Targets
- Page load: < 3s
- Image analysis: < 10s
- Text analysis: < 5s
- Interaction response: < 100ms

## Security Considerations

### Security Checklist
- [ ] No secrets in code
- [ ] Input validation on all endpoints
- [ ] File size limits enforced
- [ ] Sanitize user input
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Run security audits

### Security Review Process
1. Run `npm audit`
2. Review dependency changes
3. Test input validation
4. Check error messages don't leak info
5. Verify API key protection

## Release Process

### Version Numbering
- Major: Breaking changes (1.0.0 → 2.0.0)
- Minor: New features (1.0.0 → 1.1.0)
- Patch: Bug fixes (1.0.0 → 1.0.1)

### Release Checklist
1. Update version in package.json
2. Update CHANGELOG.md
3. Run full test suite
4. Build production version
5. Test production build
6. Create git tag
7. Deploy to production
8. Announce release

## Community Guidelines

### Be Respectful
- Welcome newcomers
- Provide constructive feedback
- Celebrate contributions
- Help others learn

### Communication Channels
- GitHub Issues: Bug reports, features
- GitHub Discussions: Questions, ideas
- Pull Requests: Code contributions

### Code of Conduct
- Be inclusive and welcoming
- Respect differing viewpoints
- Accept constructive criticism
- Focus on what's best for the community

## Getting Help

### Resources
- README.md: Quick start guide
- SETUP.md: Detailed setup
- TESTING.md: Test procedures
- DEPLOYMENT.md: Deployment options

### Ask Questions
- GitHub Discussions for general questions
- GitHub Issues for bug reports
- Code comments for implementation details

## Recognition

Contributors will be:
- Listed in Contributors section
- Mentioned in release notes
- Credited in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Together, we can expose food industry lies and empower consumers!**

Thank you for contributing to consumer health and safety!
