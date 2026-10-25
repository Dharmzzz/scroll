# 📖 3D Realistic Annual Reports Flipbook & Reader

> **An immersive, high-performance in-browser 3D Digital Flipbook reader** that renders standard PDF publications into authentic, tactile physical books with **realistic page curl physics**, **aged hardcover bindings**, **gold-embossed typography**, **scorch-marked parchment edges**, **smooth zoom & pan**, and an **instant multi-publication switcher**.

---

## 🌟 Executive Overview

Traditional web PDF viewers offer flat, vertical scrolling that feels sterile and uninspired. This project transforms reading institutional archives and annual reports into a rich, physical experience:

- **100% Pure Web Standards**: Zero React, zero Vite/Webpack, zero build steps, and zero backend required. Runs directly in any modern browser using pure HTML5, CSS3, and Vanilla JavaScript.
- **Physics-Driven 3D Page Turning**: Real-time page deformation, corner dragging, dynamic lighting, and realistic drop shadows powered by **StPageFlip**.
- **Antique Gilded Hardcover Binding**: Custom procedural #1f4d59 aged leather texture, dual-layer gilded borders, vintage corner filigrees, and an antique embossed crest medallion.
- **Procedural Scorch & Burnt Edge Patterns**: 4 randomized, natural singed paper edge patterns distributed across pages to recreate an authentic historic volume without obscuring text or photos.
- **High-DPI Retina PDF Decoding**: Powered by Mozilla **PDF.js**, scaling canvases up to 1.8× `devicePixelRatio` for razor-sharp clarity on 1080p, Retina, and 4K displays.
- **Pre-Loaded Archive of 10 Publications**: Out-of-the-box support for 10 complete Rajagiri College of Social Sciences (OYSTER Alumni Association) Annual Reports spanning a decade (2014–2024).

---

## 🛠️ Technology Stack & Dependencies

| Component | Library / Spec | Version / CDN | Purpose |
| :--- | :--- | :--- | :--- |
| **PDF Rendering Engine** | Mozilla `pdf.js` | `v3.11.174` (cdnjs) | Decodes binary `.pdf` streams directly in the browser and paints them to HTML5 `<canvas>` elements. |
| **PDF Worker Thread** | Mozilla `pdf.worker.js` | `v3.11.174` (cdnjs) | Offloads heavy font parsing and decompression to a Web Worker, keeping the UI at 60 FPS. |
| **3D Flipbook Engine** | `StPageFlip` (`page-flip.browser.js`) | `v2.0.7` (jsdelivr) | Computes real-time page physics, curling geometry, spine depth gradients, and mouse/touch drag interactions. |
| **UI Iconography** | `Bootstrap Icons` | `v1.11.3` (jsdelivr) | Provides clean vector SVG icons for navigation, zoom, and orientation controls. |
| **Gilded Typography** | `Google Fonts` (`Cinzel`, `Playfair Display`) | Google Fonts API | High-contrast serif and Roman letterforms for authentic gold-leaf hot-stamped book titles. |
| **Base UI Font** | `Google Fonts` (`Plus Jakarta Sans`) | Google Fonts API | Modern, legible sans-serif for UI controls, dropdowns, and counter indicators. |

---

## 🎨 Visual Aesthetics & Design System

### 1. Aged Hardcover Binding (`.hardcover-aged`)
- **Color & Texture**: Deep aged patina radial gradient (`#245866` to `#061619`) with distressed micro-texture overlays simulating vintage book leather.
- **Gilded Frame**: Double 2px gold border (`#dfba53`) with inset framing and decorative Unicode four-leaf corner filigrees (`❖`).
- **Antique Medallion**: Radial cream seal with gold double-ring border framing the official institutional crest.
- **Foil Stamping**: Multi-stop linear gradient (`#fff3c9` → `#e2be58` → `#a67918`) applied with `-webkit-background-clip: text` to simulate authentic hot-stamped gold foil.

### 2. Archival Flyleaf Frontispiece (`.inside-front`)
- Warm parchment paper texture with an inner ruled border and formal Latin motto: *"Learn • Serve • Excel"*.
- Displays institutional accreditation (*Autonomous • NAAC A++ Grade • NIRF Top Ranked*) and historical context facing Page 1.

### 3. Procedural Burnt-Edge & Scorch Patterns
To give the publication an authentic physical book feel without obscuring any content, four localized radial gradient patterns are applied randomly:
- **Pattern 1 (`burn-pattern-1`)**: Upper outer edge scorch notch (~22% from top).
- **Pattern 2 (`burn-pattern-2`)**: Lower outer edge scorch notch (~68% from top).
- **Pattern 3 (`burn-pattern-3`)**: Singed outer bottom corner (~100% bottom).
- **Pattern 4 (`burn-pattern-4`)**: Singed top corner + subtle mid-margin notch.
- **Clean Pages**: Patterns 0 and 5 remain pristine, creating natural page-to-page variation.

### 4. Centering & Spread Geometry
- **Dual-Page Spread (Desktop & Tablets)**: Realistic two-page spread with a dark spine depth shadow along the binding.
- **Dynamic Book Centering**: Automatically shifts `translateX(-25%)` when viewing the front cover, centers (`none`) on open spreads, and shifts `translateX(25%)` when reaching the back cover.
- **Responsive Single-Page (Mobile)**: Automatically collapses to single-page portrait reading on screens narrower than `768px`.

---

## 📚 Complete Publications Catalog

The flipbook is pre-configured with 10 official Rajagiri College of Social Sciences (RCSS) OYSTER Annual Reports:

| # | Publication Name | File Path | Era / Academic Year |
| :---: | :--- | :--- | :---: |
| 1 | **OYSTER Annual Report 2014-15** | `pdfs/Annual Report 2014-15-OYSTER.pdf` | 2014 – 2015 |
| 2 | **OYSTER Annual Report 2015-16** | `pdfs/Annual Report 2015-16-OYSTER.pdf` | 2015 – 2016 |
| 3 | **OYSTER Annual Report 2016-17** | `pdfs/Annual Report 2016-17-OYSTER.pdf` | 2016 – 2017 |
| 4 | **OYSTER Annual Report 2017-18** | `pdfs/Annual Report 2017-18-OYSTER.pdf` | 2017 – 2018 |
| 5 | **OYSTER Annual Report 2018-19** | `pdfs/Annual Report 2018-19-OYSTER.pdf` | 2018 – 2019 |
| 6 | **OYSTER Annual Report 2019-20** | `pdfs/Annual Report 2019-20-OYSTER.pdf` | 2019 – 2020 |
| 7 | **OYSTER Annual Report 2020-21** | `pdfs/Annual Report 2020-21.pdf` | 2020 – 2021 |
| 8 | **OYSTER Annual Report 2021-22** | `pdfs/Annual Report 2021-22.pdf` | 2021 – 2022 |
| 9 | **OYSTER Annual Report 2022-23** | `pdfs/Annual Report 2022-23.pdf` | 2022 – 2023 |
| 10 | **OYSTER Annual Report 2023-24** *(Selected)* | `pdfs/ANNUAL REPORT 2023-24.pdf` | 2023 – 2024 |

---

## ⚡ Interactive Controls & Features

### 1. Document Switcher Dropdown
- Select any of the 10 publications from the top dropdown.
- Existing instances are cleanly destroyed (`pageFlip.destroy()`), memory is freed, and the new document streams in asynchronously.
- Protected by a cancellation token (`currentLoadId`) to prevent race conditions during rapid switching.

### 2. Real-Time Percentage Loader
- While PDF pages are fetched, decoded, and rasterized to canvas, a central spinner displays live progress from `0%` to `100%`.

### 3. Zoom & Drag-To-Pan
- **Zoom In / Out**: Scale pages smoothly from **100% up to 250%** in steps of 25%.
- **Reset Zoom**: One-click reset back to 100% standard reading view.
- **Drag-to-Pan**: When zoomed in, click/touch anywhere and drag to smoothly pan around fine print, charts, and financial tables. Cursor dynamically switches to `grab` and `grabbing`.

### 4. Page Navigation Modes
- **Mouse / Touch Drag**: Click or touch any page corner or edge to physically curl and flip the page.
- **Floating Chevrons**: Large circular floating chevron buttons (`<` and `>`) pinned to the left and right of the book.
- **Bottom Navigation Dock**: First Page (`|<`), Previous (`<`), Next (`>`), and Last Page (`>|`).
- **Direct Page Jump**: Editable numeric input field (`[ 1 ] / 14`) allowing readers to type any page number and jump instantly.
- **Keyboard Shortcuts**: Left Arrow (`←`) flips backward, Right Arrow (`→`) flips forward.

---

## 🚀 Quick Start Guide

> [!IMPORTANT]
> **Why is a local web server required?**  
> Modern web browsers enforce CORS (Cross-Origin Resource Sharing) security policies that block JavaScript from reading binary PDF files over the `file:///` protocol. Running a local HTTP server resolves this immediately.

### Method 1: Using Python (Recommended — Built into Windows, macOS & Linux)
1. Open PowerShell or Terminal in this project directory:
   ```powershell
   cd "c:\Users\dkxga\web Develop\scroll"
   ```
2. Start the HTTP server:
   ```powershell
   python -m http.server 3000
   ```
3. Open your browser to: **`http://localhost:3000`**

---

### Method 2: Using Node.js / npx
1. Open your terminal in this directory.
2. Run:
   ```bash
   npx serve .
   ```
3. Open the local URL printed in your terminal (typically `http://localhost:3000` or `http://localhost:5000`).

---

### Method 3: Using VS Code Live Server
1. Open this folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on **`index.html`** and select **"Open with Live Server"**.

---

## 📂 File Structure & Repository Map

```
scroll/ (branch: pdf)
├── index.html                   # Pure standalone HTML structure & CDN references
├── README.md                    # Comprehensive technical documentation & user guide
├── read.md                      # Alias documentation copy
├── package.json                 # Optional npm scripts (`npm start`)
├── .gitignore                   # Standard web ignore rules (node_modules, caches)
├── css/
│   └── flipbook.css             # Complete 3D book styling, leather textures, filigrees & burn patterns
├── js/
│   └── flipbook.js              # Complete PDF.js + StPageFlip controller logic, zoom & pan engine
├── assets/
│   └── logorajagiri.png         # High-resolution Rajagiri crest medallion image
└── pdfs/                        # 10 complete high-resolution annual report PDF files
    ├── Annual Report 2014-15-OYSTER.pdf
    ├── Annual Report 2015-16-OYSTER.pdf
    ├── Annual Report 2016-17-OYSTER.pdf
    ├── Annual Report 2017-18-OYSTER.pdf
    ├── Annual Report 2018-19-OYSTER.pdf
    ├── Annual Report 2019-20-OYSTER.pdf
    ├── Annual Report 2020-21.pdf
    ├── Annual Report 2021-22.pdf
    ├── Annual Report 2022-23.pdf
    └── ANNUAL REPORT 2023-24.pdf
```

---

## ➕ How to Add Your Own Publications

Adding new PDF reports or booklets takes under 60 seconds:

1. **Add Your PDF**: Place your `.pdf` file into the `pdfs/` directory (e.g., `pdfs/Annual Report 2024-25.pdf`).
2. **Update Dropdown in `index.html`**:
   Open [`index.html`](file:///index.html) and add an `<option>` inside `<select id="pdf-selector">`:
   ```html
   <select id="pdf-selector">
     <!-- Existing options -->
     <option value="pdfs/Annual Report 2024-25.pdf">OYSTER Annual Report 2024-25</option>
   </select>
   ```
3. **Refresh Your Browser**: The book will automatically detect the page count, construct the custom embossed front & back hardcovers, and render all pages with 3D physics!

---

## 🔒 Security & Privacy

- **100% Client-Side Processing**: All PDF decoding and rasterization happens entirely inside the user's browser memory. No documents, pages, or user metrics are uploaded to external servers.
- **Zero Tracking / Zero Telemetry**: Clean, privacy-first implementation without third-party analytics.

---

## 📜 License

Created for **Rajagiri College of Social Sciences (RCSS)** & the **OYSTER Alumni Association**. Built with open-source technologies under MIT / Apache licenses.
