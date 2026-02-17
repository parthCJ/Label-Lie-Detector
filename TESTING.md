# Testing Guide

## Manual Testing

### Test Case 1: Image Upload

**Objective**: Verify image upload functionality

**Steps**:
1. Open application at http://localhost:3000
2. Click "Choose File" button
3. Select an image of a food label
4. Wait for analysis to complete

**Expected Result**:
- Image preview appears
- Analysis completes within 10 seconds
- Results display with color-coded ingredients
- No errors in console

**Test with**: Clear photo of ingredient label with good lighting

---

### Test Case 2: Camera Capture

**Objective**: Verify camera functionality

**Steps**:
1. Open application
2. Click "Use Camera" button
3. Grant camera permissions
4. Point camera at ingredient label
5. Click "Capture Photo"
6. Wait for analysis

**Expected Result**:
- Camera stream displays
- Photo captured successfully
- Analysis completes
- Results displayed

**Requirements**: Device with camera, camera permissions

---

### Test Case 3: Text Input

**Objective**: Verify text analysis functionality

**Steps**:
1. Click "Paste Text" tab
2. Paste ingredient list (use sample from Quick Demo)
3. Click "Analyze Text"
4. Wait for results

**Expected Result**:
- Text accepted
- Analysis completes within 5 seconds
- Ingredients categorized correctly
- Health impacts explained

**Sample Text**:
```
Maltodextrin, Soy Protein, Fructose, Natural Flavors, 
Carrageenan, BHT, Red 40, Yellow 5
```

---

### Test Case 4: Quick Demo Samples

**Objective**: Verify sample data analysis

**Steps**:
1. Scroll to "Quick Demo" section
2. Click on each sample product
3. Review results for each

**Expected Results**:
- All samples load and analyze
- Harmful ingredients flagged red/yellow
- Marketing vs Reality section appears
- Safe example shows mostly green

**Samples to Test**:
- Protein Bar (should show multiple red flags)
- Diet Soda (should show preservative warnings)
- Healthy Cereal (should expose hidden sugars)
- Kids Yogurt (should flag sweeteners)
- Whole Wheat Bread (should be mostly yellow/green)
- Organic Apple Sauce (should be mostly green)

---

### Test Case 5: Error Handling

**Objective**: Verify graceful error handling

**Steps**:
1. Upload invalid file type (e.g., .txt file)
2. Upload very large image (>10MB)
3. Submit empty text field
4. Test with invalid API key

**Expected Results**:
- Appropriate error messages
- No application crash
- User can retry
- Clear guidance provided

---

### Test Case 6: Ingredient Detection Accuracy

**Objective**: Verify harmful ingredient detection

**Test Data**:

#### Hidden Sugars
```
Ingredients: Maltodextrin, High Fructose Corn Syrup, 
Dextrose, Rice Syrup, Agave Nectar
```
**Expected**: All flagged as yellow/red with sugar warnings

#### Harmful Preservatives
```
Ingredients: Sodium Benzoate (E211), BHA (E320), 
BHT (E321), MSG (E621)
```
**Expected**: All flagged as red with preservative warnings

#### Artificial Additives
```
Ingredients: Red 40, Yellow 5, Blue 1, Artificial Flavors, 
Carrageenan, Modified Food Starch
```
**Expected**: All flagged as yellow/red with additive warnings

#### Safe Ingredients
```
Ingredients: Organic Apples, Water, Vitamin C
```
**Expected**: All flagged as green, minimal warnings

---

### Test Case 7: Marketing Claims Detection

**Test Data**:
```
Front Label: "NATURAL" "NO ADDED SUGAR" "HEALTHY SNACK"
Ingredients: Maltitol Syrup, Maltodextrin, Sucralose, 
Natural Flavors, Artificial Flavors, BHT
```

**Expected Result**:
- Marketing vs Reality section populated
- Contradictions identified
- Clear explanation of deception

---

### Test Case 8: UI Responsiveness

**Objective**: Verify responsive design

**Steps**:
1. Open application
2. Resize browser window
3. Test on different screen sizes
4. Test on mobile device

**Expected Results**:
- Layout adapts to screen size
- All buttons remain clickable
- Text remains readable
- No horizontal scrolling
- Camera works on mobile

**Test Sizes**:
- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

---

### Test Case 9: Performance Testing

**Objective**: Verify acceptable performance

**Metrics**:
- Initial page load: < 3 seconds
- Image analysis: 5-10 seconds
- Text analysis: 3-5 seconds
- UI interactions: Instant feedback

**Steps**:
1. Open DevTools > Network tab
2. Reload page, measure load time
3. Upload image, measure analysis time
4. Submit text, measure analysis time

**Acceptable Performance**:
- Page load: < 3s on fast connection
- Image analysis: < 15s worst case
- Text analysis: < 10s worst case
- No memory leaks

---

### Test Case 10: Browser Compatibility

**Objective**: Verify cross-browser support

**Browsers to Test**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Features to Test**:
- Image upload
- Camera access
- Text input
- Styling and animations
- API calls

**Expected**: Full functionality in all modern browsers

---

## Automated Testing (Future)

### Unit Tests (Jest + React Testing Library)

```typescript
// Example test structure
describe('ImageUploader', () => {
  it('should handle file upload', () => {
    // Test implementation
  })
  
  it('should validate file type', () => {
    // Test implementation
  })
})

describe('AnalysisResults', () => {
  it('should display ingredients correctly', () => {
    // Test implementation
  })
  
  it('should categorize by color', () => {
    // Test implementation
  })
})
```

### Integration Tests

```typescript
describe('Analysis Flow', () => {
  it('should analyze image end-to-end', async () => {
    // Test full image analysis flow
  })
  
  it('should analyze text end-to-end', async () => {
    // Test full text analysis flow
  })
})
```

### API Tests

```typescript
describe('API Routes', () => {
  describe('/api/analyze', () => {
    it('should return analysis for valid image', async () => {
      // Test API endpoint
    })
    
    it('should return error for invalid image', async () => {
      // Test error handling
    })
  })
})
```

---

## Load Testing

### Using Artillery

```yaml
# artillery-config.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: 'Analyze Text'
    flow:
      - post:
          url: '/api/analyze-text'
          json:
            text: 'Test ingredients'
```

Run: `artillery run artillery-config.yml`

---

## Security Testing

### Checklist
- [ ] No API keys exposed in client code
- [ ] Input validation on all endpoints
- [ ] File size limits enforced
- [ ] No XSS vulnerabilities
- [ ] No SQL injection (if database added)
- [ ] HTTPS in production
- [ ] CORS properly configured

### Tools
- OWASP ZAP for security scanning
- npm audit for dependency vulnerabilities
- Snyk for continuous monitoring

---

## Testing Checklist

Before deployment:
- [ ] All sample products analyze correctly
- [ ] Image upload works
- [ ] Camera capture works
- [ ] Text input works
- [ ] Error handling graceful
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Performance acceptable
- [ ] No console errors
- [ ] API key not exposed
- [ ] Marketing claims detected
- [ ] Traffic light colors correct
- [ ] Explanations are clear
- [ ] UI looks polished

---

## Known Issues / Edge Cases

### Current Limitations
1. OCR accuracy depends on image quality
2. Very long ingredient lists may timeout
3. Some E-numbers not in database
4. Camera may not work in all browsers
5. Large images take longer to process

### Edge Cases to Test
- Empty ingredient list
- Single ingredient only
- Very long ingredient names
- Special characters in ingredients
- Multiple languages
- Poor quality/blurry images
- Rotated images

---

## Bug Reporting Template

```markdown
**Bug Description**:
[Clear description of the issue]

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happened]

**Environment**:
- Browser: 
- OS: 
- Device: 
- Screen size: 

**Screenshots**:
[If applicable]

**Console Errors**:
[Any error messages]
```

---

**Test thoroughly. Ship confidently.**
