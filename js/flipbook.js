/**
 * ==============================================================================
 * DYNAMIC 3D REALISTIC PDF FLIPBOOK (flipbook.js)
 * ==============================================================================
 * Powered by:
 * - Mozilla PDF.js: Native browser PDF decoding & high-DPI canvas rendering
 * - StPageFlip: Authentic 3D page curl physics, drop shadows & soundless turns
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Initialize PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  let pageFlipInstance = null;
  let currentLoadId = 0; // Guard against rapid dropdown switching
  let totalBookPages = 0;

  // DOM Elements
  const selector = document.getElementById('pdf-selector');
  const loader = document.getElementById('loading-indicator');
  const loadingProgress = document.getElementById('loading-progress');
  const bookContainer = document.getElementById('book-container');
  const bookCenteringWrapper = document.getElementById('book-centering-wrapper');
  const controls = document.getElementById('flipbook-controls');
  const zoomControlsEl = document.getElementById('zoom-controls');
  const zoomLevelText = document.getElementById('zoom-level-text');
  const floatPrevBtn = document.getElementById('float-prev-btn');
  const floatNextBtn = document.getElementById('float-next-btn');
  const pageInput = document.getElementById('page-input');
  const totalPagesSpan = document.getElementById('total-pages');

  // Zoom & Pan state
  let currentZoom = 1.0;
  const ZOOM_STEP = 0.25;
  const MAX_ZOOM = 2.5;
  const MIN_ZOOM = 1.0;

  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialPanX = 0;
  let initialPanY = 0;

  function applyTransform() {
    let centerOffset = 0;
    if (pageFlipInstance && pageFlipInstance.getOrientation() !== 'portrait') {
      const pageIdx = pageFlipInstance.getCurrentPageIndex();
      if (pageIdx === 0) {
        centerOffset = -25;
      } else if (pageIdx >= totalBookPages - 1) {
        centerOffset = 25;
      }
    }

    if (currentZoom > 1.0) {
      bookCenteringWrapper.style.transform = `scale(${currentZoom}) translate(calc(${centerOffset}% + ${
        panX / currentZoom
      }px), ${panY / currentZoom}px)`;
      bookContainer.style.cursor = isDragging ? 'grabbing' : 'grab';
    } else {
      bookCenteringWrapper.style.transform =
        centerOffset !== 0 ? `translateX(${centerOffset}%)` : 'none';
      bookContainer.style.cursor = 'auto';
    }

    if (zoomLevelText) {
      zoomLevelText.textContent = `${Math.round(currentZoom * 100)}%`;
    }
  }

  function updateZoom() {
    if (currentZoom <= 1.0) {
      currentZoom = 1.0;
      panX = 0;
      panY = 0;
    }
    applyTransform();
  }

  function updateBookCenter() {
    applyTransform();
  }

  /**
   * Main function: Fetch PDF, decode pages, render high-DPI canvases, and build 3D book
   */
  async function loadAndRenderPDF(pdfUrl) {
    currentLoadId++;
    const loadId = currentLoadId;

    loader.style.display = 'flex';
    bookContainer.style.display = 'none';
    controls.style.display = 'none';
    if (zoomControlsEl) zoomControlsEl.style.display = 'none';
    if (floatPrevBtn) floatPrevBtn.style.display = 'none';
    if (floatNextBtn) floatNextBtn.style.display = 'none';

    if (pageFlipInstance) {
      pageFlipInstance.destroy();
      pageFlipInstance = null;
    }

    // Reset zoom and pan
    currentZoom = 1.0;
    panX = 0;
    panY = 0;
    updateZoom();

    await new Promise((r) => setTimeout(r, 50));
    if (loadId !== currentLoadId) return;

    bookCenteringWrapper.innerHTML = '<div class="flip-book" id="book"></div>';
    const bookElement = document.getElementById('book');

    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdfDoc = await loadingTask.promise;
      if (loadId !== currentLoadId) return;

      const numPages = pdfDoc.numPages;
      const pagesArray = [];
      const selectedText = selector.options[selector.selectedIndex].text;

      // 1. FRONT COVER (Gilded Antique Hardcover)
      const frontCover = document.createElement('div');
      frontCover.className = 'page hardcover-aged front-cover';
      frontCover.dataset.density = 'hard';
      frontCover.innerHTML = `
        <div class="cover-antique-frame"></div>
        <div class="cover-content">
          <div class="antique-title-sub">Rajagiri College of Social Sciences</div>
          <div>
            <div class="antique-medallion">
              <img src="assets/logorajagiri.png" alt="Emblem" />
            </div>
            <h1 class="antique-title-main">OYSTER</h1>
            <h2 class="antique-title-org">― Alumni Association ―</h2>
            <div class="antique-plaque">
              <h3>${selectedText}</h3>
            </div>
          </div>
          <div>
            <div style="color: #dfba53; font-size: 1rem; margin-bottom: 4px;">❦ ❖ ❦</div>
            <div class="antique-motto">"Learn • Serve • Excel"</div>
            <div class="antique-accreditation">Autonomous • NAAC A++ (CGPA 3.83)</div>
          </div>
        </div>
      `;
      pagesArray.push(frontCover);

      // 2. INSIDE FRONT COVER (Parchment Paper Flyleaf)
      const insideFrontCover = document.createElement('div');
      insideFrontCover.className = 'page inside-cover inside-front burn-pattern-1';
      insideFrontCover.innerHTML = `
        <div class="flyleaf-frame">
          <div style="font-family: 'Cinzel', Georgia, serif; font-size: 0.8rem; font-weight: 700; color: #1f4d59; letter-spacing: 2.2px; text-transform: uppercase;">
            Official Alumni Publication
          </div>
          <div>
            <div style="margin-bottom: 1rem;">
              <img src="assets/logorajagiri.png" style="max-width: 110px; display: inline-block; filter: sepia(0.25) contrast(1.1);" alt="Crest" />
            </div>
            <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; color: #153841; font-weight: 700; margin-bottom: 0.35rem;">
              Rajagiri College of Social Sciences
            </h3>
            <p style="font-size: 0.84rem; color: #5a452a; font-style: italic; margin-bottom: 1.2rem;">
              (Autonomous • NAAC A++ Grade • NIRF Top Ranked)
            </p>
            <div style="font-size: 1.15rem; color: #b88a2b; margin-bottom: 0.8rem;">❦ ― ❖ ― ❧</div>
            <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; font-weight: 700; color: #1f4d59; margin-bottom: 0.4rem;">
              Annual Report &amp; Heritage Archives
            </h4>
            <p style="font-family: 'Georgia', serif; font-size: 0.84rem; color: #3a2e1d; line-height: 1.6; max-width: 290px; margin: 0 auto;">
              Preserving achievements, connecting graduates, and inspiring future generations worldwide.
            </p>
          </div>
          <div style="font-size: 0.8rem; color: #5a452a;">
            <span style="color: #9c6e12; font-weight: 700; font-family: 'Playfair Display', Georgia, serif; font-style: italic;">"Learn • Serve • Excel"</span><br>
            Turn page to begin reading ➔
          </div>
        </div>
      `;
      pagesArray.push(insideFrontCover);

      // 3. RENDER EACH PDF PAGE TO HIGH-DPI CANVAS
      const dpr = Math.min(window.devicePixelRatio || 1, 1.8);

      for (let i = 1; i <= numPages; i++) {
        if (loadId !== currentLoadId) return;

        loadingProgress.textContent = Math.round(((i - 1) / numPages) * 100) + '%';

        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 * dpr });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        if (loadId !== currentLoadId) return;

        const pageDiv = document.createElement('div');
        pageDiv.className = 'page pdf-page';

        // Assign localized scorch / burn patterns across pages (patterns 0 & 5 remain clean)
        const patternIndex = (i * 3 + 1) % 6;
        if (patternIndex === 1) pageDiv.classList.add('burn-pattern-1');
        else if (patternIndex === 2) pageDiv.classList.add('burn-pattern-2');
        else if (patternIndex === 3) pageDiv.classList.add('burn-pattern-3');
        else if (patternIndex === 4) pageDiv.classList.add('burn-pattern-4');

        pageDiv.appendChild(canvas);
        pagesArray.push(pageDiv);
      }

      // 4. INSIDE BACK COVER
      const insideBackCover = document.createElement('div');
      insideBackCover.className = 'page inside-cover inside-back burn-pattern-2';
      insideBackCover.innerHTML = `<div class="page-content" style="height: 100%;"></div>`;

      // 5. VINTAGE BACK COVER
      const backCover = document.createElement('div');
      backCover.className = 'page hardcover-aged back-cover';
      backCover.dataset.density = 'hard';
      backCover.innerHTML = `
        <div class="cover-antique-frame"></div>
        <div class="cover-content">
          <div class="antique-title-sub">Rajagiri College of Social Sciences</div>
          <div>
            <div class="antique-motto" style="font-size: 1.3rem; margin-bottom: 1.3rem;">"Learn • Serve • Excel"</div>
            <div class="antique-medallion" style="margin-bottom: 1.2rem;">
              <img src="assets/logorajagiri.png" style="max-width: 105px;" alt="Logo" />
            </div>
            <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">OYSTER Alumni Network</h4>
            <p style="font-size: 0.85rem; color: #dfba53; margin: 0; font-family: 'Georgia', serif; font-style: italic;">Preserving Heritage &amp; Inspiring Tomorrow</p>
          </div>
          <div>
            <div style="color: #dfba53; font-size: 0.9rem; margin-bottom: 6px;">❦ ❖ ❦</div>
            <div class="antique-accreditation">
              Kalamassery, Kochi - 683 104, Kerala<br>
              Email: alumni@rajagiri.edu • Web: rajagiri.almaconnect.com
            </div>
          </div>
        </div>
      `;

      // If total pages is odd, add 1 blank flyleaf so back cover lands cleanly on outside
      if ((pagesArray.length + 2) % 2 !== 0) {
        const blankPage = document.createElement('div');
        blankPage.className = 'page inside-cover';
        blankPage.innerHTML = `<div class="page-content" style="height: 100%;"></div>`;
        pagesArray.push(blankPage);
      }

      pagesArray.push(insideBackCover);
      pagesArray.push(backCover);

      loadingProgress.textContent = '100%';

      pagesArray.forEach((p) => bookElement.appendChild(p));
      bookContainer.style.display = 'flex';
      bookElement.style.display = 'block';

      // Desktop vs Mobile sizing
      const isMobile = window.innerWidth < 768;
      const targetPageWidth = isMobile ? Math.min(window.innerWidth - 30, 360) : 440;
      const targetPageHeight = isMobile ? Math.round(targetPageWidth * 1.414) : 600;

      // 6. Initialize StPageFlip
      pageFlipInstance = new St.PageFlip(bookElement, {
        width: targetPageWidth,
        height: targetPageHeight,
        size: 'fixed',
        minWidth: 300,
        maxWidth: 550,
        minHeight: 420,
        maxHeight: 780,
        showCover: true,
        usePortrait: isMobile,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        flippingTime: 550,
        showPageCorners: true,
        mobileScrollSupport: true,
      });

      pageFlipInstance.loadFromHTML(bookElement.querySelectorAll('.page'));

      loader.style.display = 'none';
      controls.style.display = 'flex';
      zoomControlsEl.style.display = 'flex';
      if (floatPrevBtn) floatPrevBtn.style.display = 'flex';
      if (floatNextBtn) floatNextBtn.style.display = 'flex';

      totalBookPages = pagesArray.length;
      totalPagesSpan.textContent = totalBookPages;
      pageInput.value = 1;
      pageInput.max = totalBookPages;

      updateBookCenter();

      pageFlipInstance.on('flip', (e) => {
        pageInput.value = e.data + 1;
        updateBookCenter();
      });

      pageFlipInstance.on('changeState', (e) => {
        if (e.data === 'read') updateBookCenter();
      });

      pageFlipInstance.on('changeOrientation', () => {
        updateBookCenter();
      });

      pageInput.addEventListener('change', (e) => {
        let pageNum = parseInt(e.target.value, 10);
        if (isNaN(pageNum) || pageNum < 1) pageNum = 1;
        if (pageNum > totalBookPages) pageNum = totalBookPages;
        pageInput.value = pageNum;
        pageFlipInstance.flip(pageNum - 1);
      });
    } catch (error) {
      if (loadId !== currentLoadId) return;
      console.error('Error loading PDF:', error);
      loader.innerHTML = `
        <span style="color: #c93b2b; font-weight: 700;">Failed to load PDF document.</span>
        <br><small style="color: #666;">Error: ${error.message}</small>
      `;
    }
  }

  // Load initial publication
  loadAndRenderPDF(selector.value);

  // Dropdown change
  selector.addEventListener('change', (e) => {
    loadAndRenderPDF(e.target.value);
  });

  // Navigation handlers
  function flipNext() {
    if (pageFlipInstance) pageFlipInstance.flipNext();
  }
  function flipPrev() {
    if (pageFlipInstance) pageFlipInstance.flipPrev();
  }

  document.getElementById('prev-btn').addEventListener('click', flipPrev);
  document.getElementById('next-btn').addEventListener('click', flipNext);
  if (floatPrevBtn) floatPrevBtn.addEventListener('click', flipPrev);
  if (floatNextBtn) floatNextBtn.addEventListener('click', flipNext);

  document.getElementById('btn-first').addEventListener('click', () => {
    if (pageFlipInstance) pageFlipInstance.flip(0);
  });
  document.getElementById('btn-last').addEventListener('click', () => {
    if (pageFlipInstance && totalBookPages > 0) pageFlipInstance.flip(totalBookPages - 1);
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (
      document.activeElement &&
      (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT')
    ) {
      return;
    }
    if (e.key === 'ArrowLeft') flipPrev();
    else if (e.key === 'ArrowRight') flipNext();
  });

  // Zoom controls
  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    if (currentZoom < MAX_ZOOM) {
      currentZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
      updateZoom();
    }
  });

  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    if (currentZoom > MIN_ZOOM) {
      currentZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
      updateZoom();
    }
  });

  document.getElementById('btn-zoom-reset').addEventListener('click', () => {
    currentZoom = 1.0;
    updateZoom();
  });

  // Drag-to-pan when zoomed in
  bookContainer.addEventListener('mousedown', (e) => {
    if (currentZoom <= 1.0 || e.button !== 0) return;
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialPanX = panX;
    initialPanY = panY;
    bookContainer.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    panX = initialPanX + (e.clientX - startX);
    panY = initialPanY + (e.clientY - startY);
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      bookContainer.style.cursor = currentZoom > 1.0 ? 'grab' : 'auto';
    }
  });
});
