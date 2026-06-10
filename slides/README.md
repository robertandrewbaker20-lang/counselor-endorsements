# Scouts AI Presentation — Visual Rebuild

Rebuild the **interior slides** of your Google Slides deck with modern layouts, hero images, and speaker notes — while keeping the **first and last company template slides untouched**.

## Files

| File | Purpose |
|------|---------|
| `RebuildSlides.gs` | Google Apps Script — run in your presentation |
| `slide-inventory.md` | Full text extracted from source PPTX |
| `extracted-content.json` | Machine-readable PPTX extraction |

## Source

- **PPTX:** `~/Downloads/Scouts AI presentation 2026.pptx` (16 slides)
- **Google Slides:** [Edit deck](https://docs.google.com/presentation/d/1cZV6DBBjyYGxSxrjnyCHw_97zKk9xvTrVaIKsAMX9t8/edit)
- **Presentation ID:** `1cZV6DBBjyYGxSxrjnyCHw_97zKk9xvTrVaIKsAMX9t8`

## Bookend slides (preserved)

| Slide | Content |
|-------|---------|
| **1** | AI Merit Badge opening — classification banner, Forge branding |
| **16** | Forge Arkansas Cyber Summit closing — register CTA |

Slides **2–15** are rebuilt with improved visuals.

## Company colors (from PPTX theme)

Used as interior accents only — bookend templates are not modified.

- Navy `#041C2C` · Forge Blue `#0072CE` · Orange `#E57200`
- Teal `#279989` · Purple `#7474C1` · Red `#BA0C2F`

## How to apply the rebuild

### 1. Make a backup copy

In Google Slides: **File → Make a copy**. Run the script on the copy first.

### 2. Open Apps Script

1. Open your [presentation](https://docs.google.com/presentation/d/1cZV6DBBjyYGxSxrjnyCHw_97zKk9xvTrVaIKsAMX9t8/edit)
2. **Extensions → Apps Script**
3. Delete any default code in `Code.gs`
4. Copy the entire contents of `slides/RebuildSlides.gs` and paste into the editor
5. **Save** (Ctrl/Cmd + S)

### 3. Authorize and run

1. Select `rebuildSlides` from the function dropdown
2. Click **Run** ▶
3. On first run: **Review permissions → Allow** (script needs access to your Slides)
4. Wait ~30–60 seconds for images to load from Unsplash

### 4. Verify

- Slide 1 (opening) and slide 16 (closing) should be **unchanged**
- Slides 2–15 should have new layouts with images, cards, timelines, and callout boxes
- Open **View → Speaker notes** to see counselor talking points

### Alternative: run on whichever deck is open

If the script is bound to a different presentation, change the ID at the top of `RebuildSlides.gs`, or run `rebuildSlidesActive()` instead (uses the currently open deck).

## What each rebuilt slide looks like

| # | Topic | Layout style |
|---|-------|--------------|
| 2 | About Forge | Split image + mission + values grid |
| 3 | Today's Agenda | Full-bleed hero image + numbered list |
| 4 | What Is a Deepfake? | Image + callout + then/now comparison bar |
| 5 | Why This Matters | Three example cards |
| 6 | Requirement 5a | Five-column impact grid |
| 7 | Live Demo | Hero overlay + URL callout |
| 8 | Requirement 5b | Numbered action steps + reassurance callout |
| 9 | How I Built It | Vertical timeline |
| 10 | Working in AI | Q&A prompt card grid |
| 11 | AI For You | Split image + benefits list |
| 12 | Prompt Engineering | Bad vs good comparison cards |
| 13 | Try This Week | Three challenge cards + reflection |
| 14 | Website Walkthrough | Hero + numbered demo steps |
| 15 | Recap | Checklist + team image |

## Re-extract content from PPTX

If you update the source PowerPoint:

```bash
cd ~/Projects/counselor-endorsements
python3 -m venv .venv && .venv/bin/pip install python-pptx
.venv/bin/python3 slides/extract-pptx.py
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Images don't load | Unsplash URLs need internet; re-run `rebuildSlides()` |
| "Bookend verification failed" | Don't delete slides 1 or 16 before running |
| Layout looks wrong | Ensure your deck has the **Forge header** layout; script falls back to default |
| Permission denied | Re-authorize Apps Script; you must own or edit the presentation |

## Companion demo

Live demo website: [counselor-endorsements.vercel.app](https://counselor-endorsements.vercel.app)
