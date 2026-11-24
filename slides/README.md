# Scouts AI Presentation — Visual Rebuild

Google Apps Script that rebuilds the interior slides of a class deck. It keeps the first and last slides as they are and redraws slides 2–15 with simpler layouts, speaker notes, and royalty-free images.

Acme is a stand-in name. Do not put a real employer, a real child's name, or a real photo back into the deck.

## Files

| File | Purpose |
|------|---------|
| `RebuildSlides.gs` | Google Apps Script. Run it from the presentation you have open. |
| `slide-inventory.md` | Class outline. Names and contact details are stand-ins. |
| `extracted-content.json` | Slide text from the source deck, with the same stand-ins. |
| `extract-pptx.py` | Re-reads a `.pptx` you pass on the command line. |

## Bookend slides

| Slide | Content |
|-------|---------|
| **1** | AI Merit Badge opening |
| **16** | Acme Cyber Summit closing. Acme is not a real organization. |

Slides **2–15** are the ones the script rebuilds.

## Colors used on the interior slides

- Navy `#041C2C` · Accent blue `#0072CE` · Orange `#E57200`
- Teal `#279989` · Purple `#7474C1` · Red `#BA0C2F`

## How to run it

### 1. Make a backup copy

In Google Slides: **File → Make a copy**. Run the script on the copy first.

### 2. Open Apps Script

1. Open your own copy of the deck.
2. **Extensions → Apps Script**
3. Delete any default code in `Code.gs`
4. Copy the entire contents of `slides/RebuildSlides.gs` and paste into the editor
5. **Save**

### 3. Authorize and run

1. Select `rebuildSlidesActive` from the function dropdown
2. Click **Run**
3. On first run: **Review permissions → Allow**
4. Wait for the images to load from Unsplash

`rebuildSlidesActive` uses the deck you have open. `PRESENTATION_ID` in the script is blank on purpose. Set it only on your own machine if you need `rebuildSlides()` to open a specific file. Do not commit a real presentation ID.

### 4. Check the result

- Slide 1 and slide 16 should be unchanged
- Slides 2–15 should have new layouts
- **View → Speaker notes** has the talking points

## What each rebuilt slide looks like

| # | Topic | Layout style |
|---|-------|--------------|
| 2 | About Acme (stand-in workplace) | Split image + short note + reminder grid |
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

The live-demo slides name `counselor-endorsements.vercel.app` as the class site. Replace that URL if you host the demo somewhere else.

## Re-extract content from a PowerPoint file

From the repo root, with `python-pptx` installed:

```bash
python3 slides/extract-pptx.py path/to/presentation.pptx
```

The script writes `slides/extracted-content.json` and stores only the file name, not a home-directory path. Read the output before committing it. Take out employer names, phone numbers, and anyone's real name.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Images don't load | Unsplash URLs need internet. Run `rebuildSlidesActive()` again. |
| "Bookend verification failed" | Don't delete slides 1 or 16 before running |
| Layout looks wrong | The script looks for an **Acme header** layout, then falls back to the first layout |
| Permission denied | Re-authorize Apps Script. You must be allowed to edit the presentation. |
