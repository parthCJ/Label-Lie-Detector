# Label Lie Detector

AI-powered food label scanner that exposes misleading marketing claims and identifies harmful ingredients in plain English.

Video here -> https://drive.google.com/file/d/1J75vbEZX0ZxLu-luXMm-aG71TFCIZsV0/view?usp=sharing

## Features

- Upload image or paste ingredient text
- AI OCR extraction using Groq vision models
- Traffic light safety system (Red/Yellow/Green)
- Detects hidden sugars, preservatives, and artificial additives
- Mobile responsive

## Tech Stack

Next.js 14 • TypeScript • Tailwind CSS • Groq API

## Quick Start

```bash
npm install
```

Create `.env.local` with your Groq API key:

```
GROQ_API_KEY=your_key_here
```

```bash
npm run dev
```

Open http://localhost:3000

## License

MIT

Built for hackathon demonstration. Contributions welcome for post-hackathon improvements.

---

**Exposing food industry lies, one label at a time.**
