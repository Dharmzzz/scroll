# 🤖 AI Integration Prompt: Add 3D PDF Flipbook into Any Project

> **Copy and paste the entire prompt below into ChatGPT, Claude, Cursor, Copilot, or Gemini to automatically integrate this 3D PDF Flipbook reader into your project.**

---

```markdown
You are an expert Frontend Architect and UI/UX Engineer. I want to integrate the 3D Realistic PDF Flipbook reader from https://github.com/Dharmzzz/report into my current project.

### 1. GOAL & OVERVIEW
Integrate an interactive, high-performance in-browser 3D Digital PDF Flipbook featuring:
- Dynamic client-side PDF decoding using Mozilla's PDF.js (no manual conversion of PDF pages to images needed!).
- Realistic 3D book physics powered by StPageFlip (page curls, drop shadows, interactive dog-ear corner drag, soundless turns).
- Vintage aged hardcover front & back covers with gilded filigree frames, antique medallion seal, and gold typography.
- Aged parchment inner pages with spine depth shadows and randomized scorched/burnt edge patterns.
- High-DPI canvas scaling (1.5x * DPR) ensuring razor-sharp text and graphics on retina displays.
- Zoom & pan system (zoom in up to 250%, zoom out, reset, and click-and-drag to pan around the page).
- Full navigation controls: First page, previous, next, last, page number input jump, floating chevron arrows, and keyboard arrow keys.
- Publication switcher dropdown supporting multiple PDFs with asynchronous race-condition prevention.
- 100% responsive layout (2-page book spread on desktop, 1-page portrait on mobile).

---

### 2. REQUIRED LIBRARIES & DEPENDENCIES

Include the following libraries via CDN or npm:

1. **PDF.js (Mozilla)**
   - Script: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js`
   - Worker: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
   - *Purpose*: Parses `.pdf` files in the browser and renders pages into `<canvas>` elements.

2. **StPageFlip**
   - Script: `https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js`
   - *Purpose*: Implements the 3D page curl physics, book binding, and page flipping engine.

3. **Bootstrap Icons**
   - CSS: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css`
   - *Purpose*: Navigation and zoom control icons.

4. **Google Fonts**
   - CSS: `https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap`
   - *Purpose*: Antique book cover and serif typography.

---

### 3. FILE STRUCTURE TO CREATE IN MY PROJECT

```
my-project/
├── public/ (or static/)
│   ├── css/
│   │   └── flipbook.css
│   ├── js/
│   │   └── flipbook.js
│   ├── assets/
│   │   └── logorajagiri.png (or my logo)
│   └── pdfs/
│       └── publication.pdf
└── template/page/component (HTML, React, or Django template)
```

---

### 4. HTML MARKUP STRUCTURE
```html
<div class="flipbook-wrapper">
  <!-- Publication Dropdown -->
  <div class="controls">
    <label for="pdf-selector"><strong>Select Publication:</strong></label>
    <select id="pdf-selector">
      <option value="/pdfs/publication.pdf">Annual Report 2024</option>
    </select>
  </div>

  <!-- Loading State -->
  <div id="loading-indicator">
    <div class="spinner"></div>
    <span>Rendering pages... (<span id="loading-progress">0%</span>)</span>
  </div>

  <!-- Zoom Controls -->
  <div class="zoom-controls" id="zoom-controls">
    <button id="btn-zoom-out"><i class="bi bi-zoom-out"></i></button>
    <span class="zoom-level-indicator" id="zoom-level-text">100%</span>
    <button id="btn-zoom-in"><i class="bi bi-zoom-in"></i></button>
    <button id="btn-zoom-reset"><i class="bi bi-arrow-counterclockwise"></i></button>
  </div>

  <!-- Book Stage -->
  <div id="book-container">
    <button id="float-prev-btn" class="flip-arrow-btn btn-prev-arrow"><i class="bi bi-chevron-left"></i></button>
    <button id="float-next-btn" class="flip-arrow-btn btn-next-arrow"><i class="bi bi-chevron-right"></i></button>
    <div id="book-centering-wrapper">
      <div class="flip-book" id="book"></div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <nav class="navigation" id="flipbook-controls">
    <button id="btn-first"><i class="bi bi-chevron-bar-left"></i></button>
    <button id="prev-btn"><i class="bi bi-chevron-left"></i></button>
    <div class="page-counter">
      <input type="number" id="page-input" value="1" min="1" />
      <span> / <span id="total-pages">1</span></span>
    </div>
    <button id="next-btn"><i class="bi bi-chevron-right"></i></button>
    <button id="btn-last"><i class="bi bi-chevron-bar-right"></i></button>
  </nav>
</div>
```

---

### 5. FRAMEWORK INTEGRATION NOTES

- **In React / Next.js**: Wrap the initialization inside `useEffect(() => { ... }, [])` and ensure it runs client-side only (`typeof window !== 'undefined'` or Next.js `dynamic(..., { ssr: false })`).
- **In Django / Laravel**: Include the CSS in `{% block extra_css %}` and JS in `{% block extra_js %}`. Set `staticBase = "{% static '' %}"` for dynamic asset path resolution.
- **In Plain HTML**: Simply include `<link rel="stylesheet" href="css/flipbook.css">` and `<script src="js/flipbook.js"></script>` right before `</body>`.

Please inspect my codebase, place the files in the right directories, adapt the paths, and verify that the flipbook opens smoothly with full 3D page turns!
```
