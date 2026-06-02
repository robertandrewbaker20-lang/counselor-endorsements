# Counselor's Questionable Endorsements

A static web demo for the BSA AI Merit Badge class. It simulates AI-generated "deepfake" endorsement videos to teach scouts about deepfakes (Merit Badge requirement 5) and AI ethics. The counselor enthusiastically endorses absurd products (with consent) in a cheesy late-night infomercial style.

## Run locally

ES modules require a local HTTP server — opening `index.html` directly via `file://` may block imports.

From the project root:

```bash
python3 -m http.server
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Deploy to Vercel

1. Push this repo to GitHub (when ready).
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: **Other**
4. Output directory: `.` (project root)
5. Build command: leave empty (no build step)

Vercel serves the static files with zero configuration.

## Assets

| File | Location | Status |
|------|----------|--------|
| Counselor photo (Andrew) | `public/counselor.png` | Included |
| Counselor voice sample | `public/audio/counselor-voice.wav` | Included |
| Endorsement videos | `public/videos/endorsement-01.mp4` … `endorsement-08.mp4` | Add when ready |
| Caption text | `data/endorsements.js` | Expand as needed |

Until videos are added, the app shows a "video coming soon" placeholder when playback fails.

## Consent and educational use

Endorsement videos are AI-generated for educational purposes as part of a BSA AI Merit Badge demo. Counselor Andrew's photo and voice recording are authentic and were provided with full consent. This project is not intended for misleading or commercial use.
