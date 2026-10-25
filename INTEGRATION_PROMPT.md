# 🤖 AI Integration Prompt: Add Pure Vanilla HTML/JS Scroll Timeline into Any Project

> **Copy and paste the entire prompt below into ChatGPT, Claude, Cursor, Copilot, or Gemini to automatically integrate this pure HTML/CSS/JS scroll timeline into any project (Django, Laravel, Next.js, WordPress, or plain HTML).**

---

```markdown
You are an expert Frontend Architect. I want to integrate the 100% Pure HTML, CSS, and Vanilla JS Archival Heritage Scroll Timeline from https://github.com/Dharmzzz/scroll into my current project.

### 1. GOAL & OVERVIEW
Integrate an interactive, full-page scrollytelling heritage timeline:
- NO React or Node.js build step required — 100% pure HTML, CSS, and Vanilla JavaScript!
- Buttery-smooth vertical momentum scrolling using Lenis.
- GSAP ScrollTrigger timeline progression with a central golden spine.
- 4 TV Broadcast eras with authentic period styling:
  1. 1955-1979: Monochrome Black & White TV (480i scanlines)
  2. 1980-1999: Analog Color CRT Broadcast (PAL/NTSC phosphor grain)
  3. 2000-2014: Digital HDTV (1080p transition)
  4. 2015-Present: 4K Ultra HD & HDR OLED
- Full-page architectural background animation:
  * 1960s–1980s: Live animated drafting pencil sweeps across the screen drawing architectural outline lines, graphite cross-hatching, and resolving into a B&W archival photo.
  * 1980s–1990s: As the user scrolls into the color television era, an analog color scanning beam sweeps down the building, filling it with full vibrant color!
  * 2000s–2015: An electric-cyan laser beam sweeps down, upgrading the campus to the authentic 1080p High Definition photograph.
  * 2016–Present: The background transitions to the modern campus, starting in a soft 360p streaming blur and progressively sharpening to razor-sharp 4K Ultra HD as you scroll down.
- Interactive milestone cards branching left and right with clean inline SVG icons.
- Lightbox modals for inspecting milestone records and high-resolution archival photos.
- 100% responsive layout adapting from desktop 2-lane timeline to mobile single-spine timeline.

### 2. REQUIRED LIBRARIES (Loaded via CDN)
```html
<!-- GSAP & ScrollTrigger -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<!-- Lenis Smooth Scrolling -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
  rel="stylesheet"
/>
```

### 3. FILE PLACEMENT
```
my-project/
├── css/timeline.css
├── js/timeline.js
└── assets/
    ├── kalamassery_campus_lines_transparent.png
    ├── kalamassery_campus_sketch_transparent.png
    ├── kalamassery_campus_1967.jpg
    ├── kalamassery_campus_color.jpg
    ├── kalamassery_campus_hd.jpg
    ├── rajagiri_modern_campus_2016.jpg
    ├── rajagiri_timeline_wall_1.jpg
    └── rajagiri_timeline_wall_2.jpg
```

### 4. INTEGRATION NOTES
- **In Django / Laravel**: Include the HTML section directly in your template (`home/timeline.html`). Link `timeline.css` in the `<head>` and `timeline.js` at the bottom before `</body>`.
- **In Plain HTML**: Link `css/timeline.css`, paste the `<section>` HTML markup, and load `js/timeline.js` at the bottom.
- **In React / Next.js**: You can render the static HTML using `dangerouslySetInnerHTML` or place it in `public/` and iframe/embed it.

Please review my project structure, place the CSS, JS, and image assets properly, and verify that the timeline runs with pixel-perfect fidelity!
```
