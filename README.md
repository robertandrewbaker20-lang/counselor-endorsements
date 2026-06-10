# Counselor's Questionable Endorsements

A static web demo for the BSA AI Merit Badge class. It simulates AI-generated "deepfake" endorsement videos to teach scouts about deepfakes (Merit Badge requirement 5) and AI ethics. The counselor enthusiastically endorses absurd products (with consent) in a cheesy late-night infomercial style.

## Run locally

Install dependencies and start the Next.js dev server:

```bash
npm install
npm run dev
```

Then open:

- [http://localhost:3001](http://localhost:3001) — infomercial homepage (`public/index.html`)
- [http://localhost:3001/visual-lab](http://localhost:3001/visual-lab) — **Prompt & Print Visual Lab** (Real Education experience)

Uses port **3001** by default (3000 is often taken by other apps). Override with `npm run dev -- -p 3000` if you prefer.

The static infomercial also lives in `public/` for direct asset serving.

## Deploy to Vercel

1. Push this repo to GitHub (when ready).
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: **Next.js** (auto-detected via `vercel.json`)

The infomercial homepage is rewritten to `/index.html`; the Visual Lab is at `/visual-lab`.

## Assets

| File | Location | Status |
|------|----------|--------|
| Counselor headshot (Andrew) | `public/andrew-headshot.jpg` | Included |
| Product voice clips | `public/audio/products/*.m4a` | Included — click a product image to play |
| Endorsement videos | `public/videos/endorsement-01.mp4` … `endorsement-08.mp4` | Add when ready |
| Caption text | `data/endorsements.js` | Expand as needed |

Until videos are added, the app shows a "video coming soon" placeholder when playback fails.

## Presentation slides

Visual rebuild tooling for the Scouts AI Merit Badge deck lives in [`slides/`](slides/):

- **`slides/RebuildSlides.gs`** — Google Apps Script to rebuild interior slides with modern layouts and images
- **`slides/README.md`** — step-by-step instructions for running on Google Slides

## Consent and educational use

Endorsement videos are AI-generated for educational purposes as part of a BSA AI Merit Badge demo. Counselor Andrew's photo and voice recording are authentic and were provided with full consent. This project is not intended for misleading or commercial use.
