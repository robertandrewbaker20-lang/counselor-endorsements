# Counselor's Questionable Endorsements

A class demo for the Scouting America AI merit badge. Scouts click through a fake late-night infomercial, hear a merit-badge counselor endorse products nobody should buy, and then talk about deepfakes: how they are made, who they can hurt, and what to do if one targets you.

## What problem it solves

Scouts need a concrete way to see that AI can put words in a real person's mouth. A lecture about deepfakes is easy to forget. A silly endorsement of pine-cone toothpaste is not. The joke products make the ethics lesson stick, including merit badge requirement 5 (what a deepfake can do to a person, and what to do about it) and the parts of the badge about using AI carefully.

## What I built

Two pages in one Next.js app:

- An infomercial homepage. It shows four fake Scout-themed products, plays a short recorded clip when you click one, and fills in a canned endorsement line if you type your own product name.
- A Visual Lab at `/visual-lab`. A Scout types a topic such as "how a lever works." The page picks a matching 3D scene and plays a fake "print" animation, then lets you orbit the model and read the labels.

I also kept a Google Apps Script in `slides/` that rebuilds the class slide deck. Acme in those slides is a stand-in name, not a real employer.

The homepage does not show a real person's photo. The header is a text placeholder.

## How it works

The homepage is a static page in `public/index.html`. `next.config.ts` rewrites `/` to that file. The page loads product names from `public/data/products.js` and endorsement lines from `public/data/endorsements.js`. Clicking a product plays an `.m4a` file that is already in the repo. Typing a custom product does not call a model. It drops the typed name into one of the sentences that contain `[PRODUCT]`.

There is no video generator in this repo. `public/videos/` is empty. The old on-page video player was removed.

The Visual Lab is a React page. `generateVisualConcept` waits about two seconds, then matches a few keywords (lever, photosynthesis, pulley, water cycle). Anything else gets the lever scene with the typed words as the title. A comment in that file marks where a real model call could go later. It is still a mock. Dragging the model uses three.js. The "printer" is an animation of layers, not a device on the network.

## Tech stack

What the running app actually uses:

- Next.js 15 and React 19
- TypeScript
- Static HTML, CSS, and JavaScript for the infomercial (`public/`)
- Tailwind CSS for the Visual Lab
- three.js, React Three Fiber, and drei for the 3D model
- Framer Motion for the Visual Lab header and a few transitions
- Vercel for hosting (`vercel.json` sets the Next.js framework)

No environment variables. No database. No API route.

The slide helper is Google Apps Script. `slides/extract-pptx.py` and `scripts/split-counselor-audio.py` are one-off local scripts. They are not part of the website.

## How to run it locally

```bash
npm install
npm run dev
```

Open:

- http://localhost:3001 — the infomercial
- http://localhost:3001/visual-lab — the Visual Lab

The dev server uses port 3001. To use another port: `npm run dev -- -p 3000`.

Production build:

```bash
npm run build
npm start
```

## Screenshots

<!-- Add screenshots before you publish this repo. Suggested shots: the infomercial homepage, a product clip playing, and the Visual Lab after a prompt. -->

_Screenshots coming soon._

## Live demo

<!-- Replace this line with the public URL once you are ready to share it. -->

Live demo: https://counselor-endorsements.vercel.app

## What I learned

A deepfake lesson works better when the example is obviously fake. Scouts can laugh at bark-flavored trail mix and still have a serious talk about consent, reputation, and what to do if a fake video is about them.

Splitting the project into a static infomercial and a small Next.js lab kept the class site easy to click through. The Visual Lab looks like AI, and the code shows the limit of that: keyword matching is not a model. Saying so in class matters as much as the animation.

I built this with AI coding tools. Cursor wrote a lot of the code. I directed the work and tested it in the browser and in class.

## License

MIT. Copyright Robert Baker. See [LICENSE](LICENSE).
