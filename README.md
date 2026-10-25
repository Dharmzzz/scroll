# 📜 Archival Heritage Scroll Timeline (Pure HTML, CSS & Vanilla JS)

> An award-winning, interactive scrollytelling timeline experience featuring **Lenis smooth scrolling**, **GSAP ScrollTrigger**, authentic **analog TV broadcast eras** (B&W CRT → 1980s Color CRT → Digital HD → 4K HDR), and an edge-to-edge **architectural pencil-sketch-to-color-fill background animation**.
>
> **100% Pure HTML, CSS, and Vanilla JavaScript** — Zero React, Zero Node.js, Zero build tools required! Works immediately by double-clicking `index.html`.

---

## 🌟 What Is This? (Zero Coding Knowledge Needed)

- **Continuous Golden Spine**: A radiant golden timeline running through every milestone, glowing and filling as you scroll.
- **4 Historical TV Broadcast Eras**: As you scroll through history, the screen atmosphere shifts seamlessly:
  - **1955–1979**: Monochrome B&W CRT TV (480i scanlines)
  - **1980–1999**: Analog Color CRT Broadcast (PAL/NTSC color phosphor grain)
  - **2000–2014**: Digital HDTV (1080p transition)
  - **2015–Present**: Ultra HD & 4K HDR
- **Pencil Drawing Animation (1960 → 1980)**: When scroll leaves 1960, an authentic drafting pencil sweeps across the screen, sketching fine architectural lines, graphite cross-hatching, and resolving into the 1967 archival photograph.
- **Color Fill Animation (1980 → 1999)**: As scroll crosses into the 1980s color television era, an analog color scanning beam sweeps down the school, filling the building with vibrant Kerala sky blues, terracotta tile reds, and emerald palms!
- **Digital 1080p Laser Scan (2000 → 2015)**: An electric-cyan laser beam sweeps across the campus, transitioning the building into the authentic, razor-sharp High Definition photograph.
- **Modern Campus & 360p-to-4K Clarity (2016 → Present)**: At 2016, the background transitions to the modern Rajagiri campus towers, beginning in a soft 360p streaming blur and progressively resolving into razor-sharp 4K Ultra HD clarity as you scroll down.
- **Interactive Cards & Modals**: Click any card or blueprint watermark to open high-resolution photo inspection lightboxes.

---

## 🚀 How to Run (Instantly in 5 Seconds)

Because this project is built with **100% pure HTML, CSS, and Vanilla JavaScript**, you do not need to install Node.js, npm, or build tools!

### Method 1: Just Double-Click!
Simply double-click **`index.html`** in this folder to open it directly in Chrome, Edge, Safari, or Firefox!

### Method 2: Using Python (Built into Windows, Mac & Linux)
```bash
python -m http.server 3000
```
Open **`http://localhost:3000`** in your browser.

### Method 3: Using VS Code Live Server
Right-click **`index.html`** → **"Open with Live Server"**.

---

## 📦 Zero-Dependency CDN Architecture

All animation and smooth scrolling libraries are loaded cleanly from high-speed CDNs:

| Library | Role in Project | CDN Script Tag |
| :--- | :--- | :--- |
| **GSAP & ScrollTrigger** | Powers the scroll-scrubbed timeline, pencil tool cursor, and color wipe down the building. | `<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>`<br>`<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>` |
| **Lenis** | Provides buttery-smooth momentum vertical scrolling on mice, trackpads, and phones. | `<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>` |
| **Google Fonts** | `Cinzel`, `Playfair Display`, `Plus Jakarta Sans`, and `Space Mono`. | Standard `<link>` tags in `<head>` |

---

## 📁 Project Structure

```
scroll/
├── index.html                     # 100% complete HTML markup with all milestones & icons
├── README.md                      # This guide
├── INTEGRATION_PROMPT.md          # AI prompt for integrating into any web framework
├── .gitignore
│
├── css/
│   └── timeline.css               # Complete styling: scanlines, ribbons, golden spine, responsive
│
├── js/
│   └── timeline.js                # Pure Vanilla JS: Lenis + GSAP ScrollTrigger + Modals
│
└── assets/                        # High-resolution architectural drawings & photos
    ├── kalamassery_campus_lines_transparent.png   # Pencil outlines
    ├── kalamassery_campus_sketch_transparent.png  # Graphite cross-hatching
    ├── kalamassery_campus_1967.jpg                # B&W archival photo
    ├── kalamassery_campus_color.jpg               # 1980s Color TV restoration
    ├── kalamassery_campus_hd.jpg                  # 2000s High Definition 1080p upgrade
    ├── rajagiri_modern_campus_2016.jpg            # 2016+ Modern Campus (Progressive 360p -> 4K clarity)
    ├── rajagiri_timeline_wall_1.jpg               # Physical campus mural Part 1
    └── rajagiri_timeline_wall_2.jpg               # Physical campus mural Part 2
```

---

## 🎨 How to Customize Content

1. **Changing Milestone Text**: Open `index.html` and search for any year (e.g. `1980`, `1967`). Change the title, subtitle, or description directly in the HTML!
2. **Changing Images**: Replace any image in the `assets/` folder with your own school, company, or historical building.
3. **Changing Eras**: The four era sections are marked with `#era-section-era-1`, `#era-section-era-2`, etc.

---

## 📜 License & Pedigree

Created for **Rajagiri College of Social Sciences (RCSS)** alumni & heritage archives.
Free to use and adapt for academic, institutional, and open-source storytelling projects.
