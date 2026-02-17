# Deployment Guide

## Local Development

### Setup
```powershell
# Install dependencies
npm install

# Set up environment variables
# Edit .env.local and add your Groq API key

# Run development server
npm run dev
```

Access at: http://localhost:3000

## Production Build

### Build for Production
```powershell
# Create optimized production build
npm run build

# Start production server
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

1. **Install Vercel CLI**
   ```powershell
   npm i -g vercel
   ```

2. **Deploy**
   ```powershell
   vercel
   ```

3. **Add Environment Variables**
   - Go to your Vercel dashboard
   - Select your project
   - Settings > Environment Variables
   - Add `GROQ_API_KEY` with your API key

4. **Redeploy**
   ```powershell
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```powershell
   npm i -g netlify-cli
   ```

2. **Build**
   ```powershell
   npm run build
   ```

3. **Deploy**
   ```powershell
   netlify deploy --prod
   ```

4. **Configure Environment**
   - Site settings > Environment variables
   - Add `GROQ_API_KEY`

### Option 3: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build Image**
   ```powershell
   docker build -t label-lie-detector .
   ```

3. **Run Container**
   ```powershell
   docker run -p 3000:3000 -e GROQ_API_KEY=your_key label-lie-detector
   ```

### Option 4: Railway

1. **Install Railway CLI**
   ```powershell
   npm i -g @railway/cli
   ```

2. **Login and Deploy**
   ```powershell
   railway login
   railway init
   railway up
   ```

3. **Set Environment Variables**
   ```powershell
   railway variables set GROQ_API_KEY=your_key
   ```

### Option 5: Traditional Server (VPS/Dedicated)

1. **Install Node.js 18+**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and Setup**
   ```bash
   git clone your-repo
   cd hackathon
   npm install
   npm run build
   ```

3. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "label-detector" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Environment Variables

Required environment variables:

```
GROQ_API_KEY=your_groq_api_key_here
```

Optional (for production):
```
NODE_ENV=production
```

## Performance Optimization

### Image Optimization
- Images are processed with Sharp
- Automatic format conversion
- Quality optimization

### Caching Strategy
- Static assets cached by CDN
- API responses not cached (real-time analysis)

### Bundle Optimization
- Code splitting enabled
- Tree shaking for unused code
- Minification in production

## Monitoring

### Error Tracking
Consider adding Sentry:
```powershell
npm install @sentry/nextjs
```

### Analytics
Options:
- Vercel Analytics (if deployed on Vercel)
- Google Analytics
- Plausible Analytics

## Security Considerations

1. **API Key Protection**
   - Never commit .env files
   - Use environment variables in deployment
   - Rotate keys regularly

2. **Rate Limiting**
   - Implement rate limiting for API endpoints
   - Consider using Upstash Redis

3. **Input Validation**
   - Already implemented in API routes
   - Validates image size and format
   - Sanitizes text input

4. **CORS Configuration**
   - Configure in next.config.js if needed
   - Restrict to specific origins in production

## Troubleshooting Deployment

### Build Errors
- Check Node.js version (18+)
- Clear Next.js cache: `rm -rf .next`
- Verify all dependencies: `npm install`

### Runtime Errors
- Check environment variables are set
- Verify Groq API key is valid
- Check server logs for details

### Performance Issues
- Enable CDN for static assets
- Configure proper caching headers
- Consider edge functions for API routes

## Scaling

### Horizontal Scaling
- Deploy multiple instances behind load balancer
- Use serverless deployment (Vercel/Netlify)

### Caching Layer
- Add Redis for caching common analyses
- Cache ingredient database lookups

### Database (Future)
- Consider adding persistent storage
- Cache analysis results
- Track ingredient updates

## Cost Estimation

### Groq API
- Free tier: Limited requests/day
- Paid tier: Pay per request
- Estimate: $0.001-0.01 per analysis

### Hosting
- Vercel: Free tier available, $20/month for pro
- Netlify: Free tier available, $19/month for pro
- VPS: $5-20/month depending on specs

## Maintenance

### Regular Updates
```powershell
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Monitoring Checklist
- API response times
- Error rates
- Groq API usage/costs
- User feedback

## Backup and Recovery

### Code
- Use Git for version control
- Push to GitHub/GitLab regularly

### Configuration
- Document all environment variables
- Keep backup of .env.local template

### Database (if added)
- Regular automated backups
- Test restore procedures

---

**Ready to deploy and expose food industry lies!**
