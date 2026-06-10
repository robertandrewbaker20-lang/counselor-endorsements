/**
 * Scouts AI Presentation — Visual Rebuild Script
 *
 * Rebuilds interior slides (2 through second-to-last) with improved layouts
 * and royalty-free images. Preserves bookend company template slides.
 *
 * Run: rebuildSlides() from Apps Script editor bound to your presentation.
 */

var PRESENTATION_ID = '1cZV6DBBjyYGxSxrjnyCHw_97zKk9xvTrVaIKsAMX9t8';

// Forge company palette (from PPTX theme)
var COLORS = {
  navy: '#041C2C',
  white: '#FFFFFF',
  lightGray: '#F3F3F3',
  forgeBlue: '#0072CE',
  orange: '#E57200',
  teal: '#279989',
  purple: '#7474C1',
  red: '#BA0C2F',
  cyan: '#0097A7',
  darkText: '#212121',
  mutedText: '#595959',
};

// Slide canvas (16:9, points)
var SLIDE_W = 720;
var SLIDE_H = 405;
var MARGIN = 36;
var CONTENT_TOP = 72; // below Forge header bar

// Royalty-free images (Unsplash — hotlink OK for Slides)
var IMAGES = {
  innovation: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80',
  aiBrain: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80',
  deepfake: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80',
  phoneScam: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=80',
  cyber: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80',
  scouts: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1400&q=80',
  coding: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80',
  teamwork: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80',
  lightbulb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
  demo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1400&q=80',
  forge: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
};

// ─── Entry point ───────────────────────────────────────────────────────────

function rebuildSlides() {
  var presentation = SlidesApp.openById(PRESENTATION_ID);
  var slides = presentation.getSlides();

  if (slides.length < 2) {
    throw new Error('Presentation needs at least 2 slides (opening + closing bookends).');
  }

  var openingId = slides[0].getObjectId();
  var closingId = slides[slides.length - 1].getObjectId();

  // Remove interior slides (last-1 down to index 1)
  for (var i = slides.length - 2; i >= 1; i--) {
    presentation.getSlides()[i].remove();
  }

  var layout = findLayout_(presentation, 'Forge header') ||
               findLayout_(presentation, 'TITLE_AND_BODY') ||
               presentation.getLayouts()[0];

  var defs = getSlideDefinitions_();
  for (var j = 0; j < defs.length; j++) {
    var slide = presentation.insertSlide(1 + j, layout);
    clearSlideContent_(slide);
    defs[j].builder(slide, defs[j]);
    if (defs[j].notes) {
      slide.getNotesPage().getSpeakerNotesShape().getText().setText(defs[j].notes);
    }
  }

  // Verify bookends untouched
  var finalSlides = presentation.getSlides();
  if (finalSlides[0].getObjectId() !== openingId ||
      finalSlides[finalSlides.length - 1].getObjectId() !== closingId) {
    throw new Error('Bookend slides were modified — aborting verification failed.');
  }

  Logger.log('Rebuilt ' + defs.length + ' interior slides. Bookends preserved.');
}

function rebuildSlidesActive() {
  PRESENTATION_ID = SlidesApp.getActivePresentation().getId();
  rebuildSlides();
}

// ─── Slide definitions (content from Scouts AI presentation 2026.pptx) ───────

function getSlideDefinitions_() {
  return [
  {
    notes: 'Introduce yourself and Forge. Keep it brief — scouts want to get to the demo.',
    builder: buildAboutForge_,
  },
  {
    notes: 'Walk through the agenda. Mention the demo is silly on purpose — it makes the lesson stick.',
    builder: buildAgenda_,
  },
  {
    notes: 'Define deepfake in plain language. Emphasize the "5 years ago vs today" contrast.',
    builder: buildWhatIsDeepfake_,
  },
  {
    notes: 'Real-world examples scouts can relate to. Ask if anyone has gotten a suspicious call.',
    builder: buildWhyItMatters_,
  },
  {
    notes: 'Merit Badge Requirement 5a. Discuss each impact category with a quick example.',
    builder: buildHowItHurts_,
  },
  {
    notes: 'Transition to live demo. Open counselor-endorsements.vercel.app. Andrew gave full consent.',
    builder: buildDemoSlide_,
  },
  {
    notes: 'Merit Badge Requirement 5b. Stress: do not forward, document everything, tell an adult.',
    builder: buildWhatToDo_,
  },
  {
    notes: 'Merit Badge Requirement 8b career content. Walk through your actual build process.',
    builder: buildHowIBuilt_,
  },
  {
    notes: 'Open floor for career questions. Let scouts drive — these prompts are starters.',
    builder: buildWorkingInAI_,
  },
  {
    notes: 'Balance the fear with empowerment. AI is a tool scouts will use in school.',
    builder: buildAIForYou_,
  },
  {
    notes: 'Merit Badge Requirement 6c. Live-demo a bad vs good prompt if time allows.',
    builder: buildPromptEngineering_,
  },
  {
    notes: 'Assign the weekly challenge. Make it concrete — due next troop meeting.',
    builder: buildTryThisWeek_,
  },
  {
    notes: 'Open the website and walk through: real photo vs AI video, voice comparison, products.',
    builder: buildWebsiteWalkthrough_,
  },
  {
    notes: 'Recap agenda items while site is still open. Transition to Q&A or closing.',
    builder: buildWebsiteRecap_,
  },
  ];
}

// ─── Slide builders ────────────────────────────────────────────────────────

function buildAboutForge_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'About Forge');
  addTitle_(slide, 'Established 2018', 88, 28, COLORS.navy);

  // Hero image right
  insertImageSafe_(slide, IMAGES.forge, 400, CONTENT_TOP, 284, 300);

  addSubtitle_(slide, 'Mission', MARGIN, 130, 340);
  addBody_(slide,
    'Advance critical technology capabilities for national security by strengthening the workforce, advancing innovation and enhancing resiliency through purposeful collaborations across the private and public sectors.',
    MARGIN, 152, 340, 60, 11);

  // Values grid
  var values = [
    'Lead with Trust & Integrity',
    'Be Bold & Take Action',
    'Forge Relationships & Deliver Results',
    'Challenge the Status Quo',
    'Be the Best',
    'Make A Difference',
  ];
  addCardGrid_(slide, values, MARGIN, 228, 648, 2, 3, COLORS.forgeBlue);
}

function buildAgenda_(slide) {
  setHeroBackground_(slide, IMAGES.scouts, 0.55);
  addOverlayBar_(slide);
  addTitle_(slide, "Today's Agenda", MARGIN, CONTENT_TOP + 4, COLORS.white, 26);

  var items = [
    'Who I am & what Forge does',
    "What's a deepfake?",
    "Live demo (warning: it's silly)",
    'How I built it & Q&A about AI careers',
    'How YOU can use AI this week',
  ];
  addNumberedList_(slide, items, MARGIN + 8, CONTENT_TOP + 48, 580, COLORS.white, 14);
}

function buildWhatIsDeepfake_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'What Is a Deepfake?');

  insertImageSafe_(slide, IMAGES.deepfake, MARGIN, CONTENT_TOP + 4, 280, 280);

  addCalloutBox_(slide,
    'A video, image, or audio clip generated by AI that shows a real person doing or saying something they never did.',
    340, CONTENT_TOP + 20, 344, 90, COLORS.navy, COLORS.white);

  addBody_(slide,
    'The tech is called generative AI — it learns from millions of examples, then creates new content.',
    340, CONTENT_TOP + 120, 344, 50, 12, COLORS.darkText);

  // Timeline comparison
  addComparisonBar_(slide,
    '5 years ago: experts + powerful computers',
    'Today: anyone with a phone and $10',
    MARGIN, 310, 648);
}

function buildWhyItMatters_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Why This Matters');
  addTitle_(slide, 'Deepfakes In The Real World', MARGIN, CONTENT_TOP, COLORS.navy, 22);

  var cards = [
    { icon: '📞', title: 'Scam Calls', body: '"Grandma, I\'m in trouble — I need money." A cloned voice of a real grandchild.' },
    { icon: '⭐', title: 'Fake Endorsements', body: 'Celebrities "promoting" crypto scams they\'ve never heard of.' },
    { icon: '🏫', title: 'Reputation Attacks', body: 'Students targeted with fake videos shared at school.' },
  ];
  addThreeCards_(slide, cards, MARGIN, CONTENT_TOP + 44, 648);
}

function buildHowItHurts_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Requirement 5a');
  addTitle_(slide, 'How A Deepfake Can Affect A Person', MARGIN, CONTENT_TOP, COLORS.navy, 20);

  var impacts = [
    { label: 'Reputation', detail: 'What people believe about you', color: COLORS.purple },
    { label: 'Money', detail: 'Scams and fraud', color: COLORS.orange },
    { label: 'Safety', detail: 'Harassment, bullying, threats', color: COLORS.red },
    { label: 'Trust', detail: 'When real evidence stops being trusted', color: COLORS.forgeBlue },
    { label: 'Feelings', detail: 'Fear, embarrassment, isolation', color: COLORS.teal },
  ];
  addImpactGrid_(slide, impacts, MARGIN, CONTENT_TOP + 40, 648);
}

function buildDemoSlide_(slide) {
  setHeroBackground_(slide, IMAGES.demo, 0.5);
  addOverlayBar_(slide);
  addTitle_(slide, 'Live Demo', MARGIN, CONTENT_TOP + 4, COLORS.white, 28);
  addBody_(slide,
    'I made a deepfake of your counselor. With his permission.',
    MARGIN, CONTENT_TOP + 48, 400, 40, 16, COLORS.white);

  addCalloutBox_(slide,
    'counselor-endorsements.vercel.app',
    MARGIN, CONTENT_TOP + 100, 420, 52, COLORS.orange, COLORS.white);

  addBody_(slide,
    'Built in one weekend with a $20/month AI subscription.',
    MARGIN, CONTENT_TOP + 168, 400, 30, 13, COLORS.white);
}

function buildWhatToDo_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Requirement 5b');
  addTitle_(slide, "If You're Ever Targeted — Here's What To Do", MARGIN, CONTENT_TOP, COLORS.navy, 18);

  insertImageSafe_(slide, IMAGES.cyber, 480, CONTENT_TOP + 36, 200, 250);

  var steps = [
    'Tell a trusted adult immediately — parent, scoutmaster, teacher, counselor',
    "Don't share it or forward it — even to \"warn\" friends",
    'Document it — screenshots, links, dates, usernames',
    'Report to the platform — every app has a report button',
    'For serious cases (threats, sexual content, harassment) — law enforcement',
  ];
  addStepList_(slide, steps, MARGIN, CONTENT_TOP + 40, 420, COLORS.forgeBlue);

  addCalloutBox_(slide,
    "It's not your fault if it happens to you.",
    MARGIN, 340, 420, 44, COLORS.teal, COLORS.white);
}

function buildHowIBuilt_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Requirement 8b — Career Interview');
  addTitle_(slide, 'How I Built The Demo', MARGIN, CONTENT_TOP, COLORS.navy, 22);

  var steps = [
    "Got Andrew's photo (and his permission!)",
    'Wrote scripts — short, silly product endorsements',
    'Generated videos with Grok Imagine (xAI)',
    'Built the website in Cursor (AI coding tool)',
    'Hosted on Vercel — free, public URL in 5 minutes',
  ];
  addTimeline_(slide, steps, MARGIN, CONTENT_TOP + 44, 648);
  insertImageSafe_(slide, IMAGES.coding, 520, CONTENT_TOP + 200, 160, 120);
}

function buildWorkingInAI_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Working In AI');
  addTitle_(slide, 'Questions About Working In AI?', MARGIN, CONTENT_TOP, COLORS.navy, 22);

  var prompts = [
    'What does an AI professional actually do all day?',
    "What's the weirdest thing AI has done in front of me?",
    'What should you study if you want to do this?',
    "Is AI going to take everyone's jobs?",
    "What's the coolest project you've worked on?",
    'Ask me anything.',
  ];
  addPromptCards_(slide, prompts, MARGIN, CONTENT_TOP + 44, 648);
}

function buildAIForYou_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'AI Is YOUR Tool Too');
  addTitle_(slide, 'The Other Side: AI Can Work FOR You', MARGIN, CONTENT_TOP, COLORS.navy, 20);

  insertImageSafe_(slide, IMAGES.education, MARGIN, CONTENT_TOP + 44, 240, 260);

  var bullets = [
    'Help you understand hard subjects — "Explain photosynthesis like I\'m 8"',
    'Quiz you for tests — "Ask me 5 questions about the Civil War"',
    'Make studying visual — generate diagrams, illustrations, mind maps',
    'Help with writing — brainstorm ideas, improve drafts (don\'t let it write FOR you)',
  ];
  addBulletList_(slide, bullets, 300, CONTENT_TOP + 52, 384, COLORS.darkText, 12);

  addCalloutBox_(slide,
    'Free tools to try: ChatGPT · Claude · Gemini · Perplexity',
    300, 310, 384, 40, COLORS.cyan, COLORS.white);
}

function buildPromptEngineering_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Requirement 6c');
  addTitle_(slide, 'Prompt Engineering — How To Get Good Answers', MARGIN, CONTENT_TOP, COLORS.navy, 18);

  addComparisonCards_(slide,
    'Bad prompt:',
    '"Tell me about rockets."',
    'Good prompt:',
    '"Explain how a rocket engine works to a 12-year-old. Use a simple analogy, then quiz me on what I learned."',
    MARGIN, CONTENT_TOP + 44, 648);

  var rules = ['Be specific about what you want', 'Give context about who you are', "Ask follow-up questions — it's a conversation, not a search engine"];
  addBulletList_(slide, rules, MARGIN, 310, 648, COLORS.navy, 12);
}

function buildTryThisWeek_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Try This Week');
  addTitle_(slide, 'Your Challenge This Week — Pick ONE', MARGIN, CONTENT_TOP, COLORS.navy, 20);

  var options = [
    { emoji: '🚀', title: 'Curiosity', body: "Ask an AI to explain something you've always wondered about" },
    { emoji: '📚', title: 'Homework', body: 'Use AI to help you study for a real test (not do it for you)' },
    { emoji: '🎨', title: 'Creativity', body: 'Ask AI to help you brainstorm a project idea' },
  ];
  addThreeCards_(slide, options.map(function(o) {
    return { icon: o.emoji, title: o.title, body: o.body };
  }), MARGIN, CONTENT_TOP + 40, 648);

  addSubtitle_(slide, 'Then ask yourself:', MARGIN, 268, 200);
  var reflect = ['Was the answer correct?', 'How would I check?', "What did I learn that I couldn't have found by Googling?"];
  addBulletList_(slide, reflect, MARGIN, 286, 400, COLORS.mutedText, 11);
  addCalloutBox_(slide,
    'Bring back one cool thing and one weird thing you noticed.',
    MARGIN, 340, 648, 40, COLORS.orange, COLORS.white);
}

function buildWebsiteWalkthrough_(slide) {
  setHeroBackground_(slide, IMAGES.aiBrain, 0.6);
  addOverlayBar_(slide);
  addTitle_(slide, 'Website: How a Deepfake Can Work', MARGIN, CONTENT_TOP + 4, COLORS.white, 20);
  addBody_(slide, 'Live walkthrough — counselor-endorsements.vercel.app', MARGIN, CONTENT_TOP + 36, 500, 24, 14, COLORS.white);

  var walkthrough = [
    'Compare Andrew\'s real photo & voice to AI-generated videos',
    'Click absurd products — Pine Cone Fresh, Bark Bites, Knot-B-Gone',
    'Notice: lip sync, enthusiasm, and realism',
    'Ask: How would you know this is fake without being told?',
  ];
  addNumberedList_(slide, walkthrough, MARGIN + 8, CONTENT_TOP + 72, 580, COLORS.white, 13);
}

function buildWebsiteRecap_(slide) {
  setLightBackground_(slide);
  addSectionLabel_(slide, 'Recap');
  addTitle_(slide, 'What We Covered Today', MARGIN, CONTENT_TOP, COLORS.navy, 22);

  var items = [
    'Who I am & what Forge does',
    "What's a deepfake?",
    "Live demo (warning: it's silly)",
    'How I built it & Q&A about AI careers',
    'How YOU can use AI this week',
  ];
  addChecklist_(slide, items, MARGIN, CONTENT_TOP + 48, 400, COLORS.teal);
  insertImageSafe_(slide, IMAGES.teamwork, 440, CONTENT_TOP + 48, 244, 260);
}

// ─── Layout helpers ────────────────────────────────────────────────────────

function setLightBackground_(slide) {
  slide.getBackground().setSolidFill(COLORS.lightGray);
}

function setHeroBackground_(slide, imageUrl, dimOpacity) {
  try {
    slide.getBackground().setPictureFill(imageUrl);
  } catch (e) {
    slide.getBackground().setSolidFill(COLORS.navy);
  }
  if (dimOpacity) {
    var overlay = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, SLIDE_W, SLIDE_H);
    overlay.getFill().setSolidFill(COLORS.navy);
    overlay.getFill().setAlpha(1 - dimOpacity);
    overlay.getBorder().setTransparent();
  }
}

function addOverlayBar_(slide) {
  var bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, SLIDE_W, CONTENT_TOP);
  bar.getFill().setSolidFill(COLORS.navy);
  bar.getFill().setAlpha(0.85);
  bar.getBorder().setTransparent();
}

function addSectionLabel_(slide, text) {
  var box = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, MARGIN, 16, 200, 22);
  box.getFill().setSolidFill(COLORS.forgeBlue);
  box.getBorder().setTransparent();
  var tb = slide.insertTextBox(text, MARGIN + 8, 17, 184, 20);
  styleText_(tb, 10, COLORS.white, true);
}

function addTitle_(slide, text, x, y, color, size) {
  var tb = slide.insertTextBox(text, x, y, SLIDE_W - x - MARGIN, 36);
  styleText_(tb, size || 24, color || COLORS.navy, true);
}

function addSubtitle_(slide, text, x, y, width) {
  var tb = slide.insertTextBox(text, x, y, width || 300, 20);
  styleText_(tb, 13, COLORS.forgeBlue, true);
}

function addBody_(slide, text, x, y, w, h, size, color) {
  var tb = slide.insertTextBox(text, x, y, w, h);
  styleText_(tb, size || 12, color || COLORS.darkText, false);
}

function styleText_(textBox, size, color, bold) {
  var text = textBox.getText();
  text.getTextStyle().setFontSize(size).setForegroundColor(color).setBold(bold);
  text.getParagraphStyle().setLineSpacing(115);
  try {
    text.getParagraphStyle().setSpacingMode(SlidesApp.SpacingMode.NEVER_COLLAPSE);
  } catch (e) { /* older API */ }
}

function addCalloutBox_(slide, text, x, y, w, h, bgColor, textColor) {
  var box = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, y, w, h);
  box.getFill().setSolidFill(bgColor);
  box.getBorder().setTransparent();
  var tb = slide.insertTextBox(text, x + 12, y + 8, w - 24, h - 16);
  styleText_(tb, 13, textColor, true);
}

function addBulletList_(slide, items, x, y, w, color, size) {
  var text = items.map(function(item) { return '• ' + item; }).join('\n');
  var tb = slide.insertTextBox(text, x, y, w, SLIDE_H - y - MARGIN);
  styleText_(tb, size || 12, color, false);
}

function addNumberedList_(slide, items, x, y, w, color, size) {
  var text = items.map(function(item, i) { return (i + 1) + '.  ' + item; }).join('\n');
  var tb = slide.insertTextBox(text, x, y, w, SLIDE_H - y - MARGIN);
  styleText_(tb, size || 13, color, false);
}

function addStepList_(slide, steps, x, y, w, accentColor) {
  for (var i = 0; i < steps.length; i++) {
    var cy = y + i * 52;
    var circle = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, x, cy, 28, 28);
    circle.getFill().setSolidFill(accentColor);
    circle.getBorder().setTransparent();
    var num = slide.insertTextBox(String(i + 1), x + 7, cy + 4, 16, 20);
    styleText_(num, 12, COLORS.white, true);
    addBody_(slide, steps[i], x + 36, cy + 2, w - 36, 44, 11);
  }
}

function addTimeline_(slide, steps, x, y, w) {
  var line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, x + 14, y + 10, x + 14, y + steps.length * 48);
  line.getLineFill().setSolidFill(COLORS.forgeBlue);
  line.setWeight(3);

  for (var i = 0; i < steps.length; i++) {
    var cy = y + i * 48;
    var dot = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, x + 6, cy + 4, 16, 16);
    dot.getFill().setSolidFill(COLORS.orange);
    dot.getBorder().setTransparent();
    addBody_(slide, steps[i], x + 30, cy, w - 30, 40, 12);
  }
}

function addComparisonBar_(slide, leftText, rightText, x, y, w) {
  var half = (w - 12) / 2;
  addCalloutBox_(slide, leftText, x, y, half, 48, COLORS.mutedText, COLORS.white);
  addCalloutBox_(slide, rightText, x + half + 12, y, half, 48, COLORS.red, COLORS.white);
}

function addComparisonCards_(slide, badLabel, badText, goodLabel, goodText, x, y, w) {
  var half = (w - 16) / 2;
  addSubtitle_(slide, badLabel, x, y);
  var badBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, y + 20, half, 100);
  badBox.getFill().setSolidFill('#FFEBEE');
  badBox.getBorder().getLineFill().setSolidFill(COLORS.red);
  badBox.getBorder().setWeight(2);
  addBody_(slide, badText, x + 10, y + 30, half - 20, 80, 11, COLORS.red);

  var gx = x + half + 16;
  addSubtitle_(slide, goodLabel, gx, y);
  var goodBox = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, gx, y + 20, half, 100);
  goodBox.getFill().setSolidFill('#E8F5E9');
  goodBox.getBorder().getLineFill().setSolidFill(COLORS.teal);
  goodBox.getBorder().setWeight(2);
  addBody_(slide, goodText, gx + 10, y + 30, half - 20, 80, 11, COLORS.teal);
}

function addThreeCards_(slide, cards, x, y, w) {
  var gap = 12;
  var cardW = (w - gap * 2) / 3;
  for (var i = 0; i < cards.length; i++) {
    var cx = x + i * (cardW + gap);
    var card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, cx, y, cardW, 200);
    card.getFill().setSolidFill(COLORS.white);
    card.getBorder().getLineFill().setSolidFill(COLORS.forgeBlue);
    card.getBorder().setWeight(1);

    if (cards[i].icon) {
      addBody_(slide, cards[i].icon, cx + 10, y + 10, cardW - 20, 30, 22);
    }
    addBody_(slide, cards[i].title, cx + 10, y + 44, cardW - 20, 24, 13, COLORS.navy);
    var body = slide.insertTextBox(cards[i].body, cx + 10, y + 68, cardW - 20, 120);
    styleText_(body, 10, COLORS.mutedText, false);
  }
}

function addCardGrid_(slide, items, x, y, w, cols, rows, accentColor) {
  var gap = 8;
  var cellW = (w - gap * (cols - 1)) / cols;
  var cellH = 52;
  for (var i = 0; i < items.length; i++) {
    var col = i % cols;
    var row = Math.floor(i / cols);
    var cx = x + col * (cellW + gap);
    var cy = y + row * (cellH + gap);
    var cell = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, cx, cy, cellW, cellH);
    cell.getFill().setSolidFill(COLORS.white);
    cell.getBorder().getLineFill().setSolidFill(accentColor);
    cell.getBorder().setWeight(1);
    addBody_(slide, items[i], cx + 8, cy + 8, cellW - 16, cellH - 16, 9, COLORS.darkText);
  }
}

function addImpactGrid_(slide, impacts, x, y, w) {
  var gap = 10;
  var cardW = (w - gap * 4) / 5;
  for (var i = 0; i < impacts.length; i++) {
    var cx = x + i * (cardW + gap);
    var card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, cx, y, cardW, 200);
    card.getFill().setSolidFill(impacts[i].color);
    card.getBorder().setTransparent();

    var label = slide.insertTextBox(impacts[i].label, cx + 6, y + 16, cardW - 12, 40);
    styleText_(label, 11, COLORS.white, true);

    var detail = slide.insertTextBox(impacts[i].detail, cx + 6, y + 60, cardW - 12, 120);
    styleText_(detail, 9, COLORS.white, false);
  }
}

function addPromptCards_(slide, prompts, x, y, w) {
  var cols = 2;
  var gap = 10;
  var cellW = (w - gap) / cols;
  var cellH = 48;
  for (var i = 0; i < prompts.length; i++) {
    var col = i % cols;
    var row = Math.floor(i / cols);
    var cx = x + col * (cellW + gap);
    var cy = y + row * (cellH + gap);
    var cell = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, cx, cy, cellW, cellH);
    cell.getFill().setSolidFill(COLORS.white);
    cell.getBorder().getLineFill().setSolidFill(COLORS.purple);
    cell.getBorder().setWeight(1);
    addBody_(slide, prompts[i], cx + 10, cy + 8, cellW - 20, cellH - 16, 10, COLORS.darkText);
  }
}

function addChecklist_(slide, items, x, y, w, accentColor) {
  for (var i = 0; i < items.length; i++) {
    var cy = y + i * 44;
    var check = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, cy + 2, 22, 22);
    check.getFill().setSolidFill(accentColor);
    check.getBorder().setTransparent();
    addBody_(slide, '✓', x + 5, cy + 2, 16, 22, 12, COLORS.white);
    addBody_(slide, items[i], x + 30, cy, w - 30, 36, 12);
  }
}

function insertImageSafe_(slide, url, x, y, w, h) {
  try {
    var img = slide.insertImage(url, x, y, w, h);
    img.getBorder().setTransparent();
    return img;
  } catch (e) {
    Logger.log('Image failed: ' + url + ' — ' + e);
    var placeholder = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, x, y, w, h);
    placeholder.getFill().setSolidFill(COLORS.lightGray);
    placeholder.getBorder().getLineFill().setSolidFill(COLORS.forgeBlue);
    return placeholder;
  }
}

// ─── Utilities ─────────────────────────────────────────────────────────────

function findLayout_(presentation, name) {
  var layouts = presentation.getLayouts();
  for (var i = 0; i < layouts.length; i++) {
    if (layouts[i].getLayoutName().indexOf(name) !== -1) {
      return layouts[i];
    }
  }
  return null;
}

function clearSlideContent_(slide) {
  var shapes = slide.getShapes();
  for (var i = shapes.length - 1; i >= 0; i--) {
    shapes[i].remove();
  }
  // Also clear placeholders
  var placeholders = slide.getPlaceholders();
  for (var j = 0; j < placeholders.length; j++) {
    try {
      placeholders[j].remove();
    } catch (e) { /* master placeholders may be protected */ }
  }
}
