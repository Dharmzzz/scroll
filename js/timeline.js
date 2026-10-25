/**
 * ==============================================================================
 * RAJAGIRI HERITAGE TIMELINE CONTROLLER (timeline.js)
 * ==============================================================================
 * 100% Pure Vanilla JavaScript (No React, No Bundler, No Node.js required!)
 * 
 * Features:
 * 1. Lenis Smooth Momentum Scrolling synchronized with GSAP ScrollTrigger.
 * 2. 4-Stage Television Broadcast evolution (Monochrome -> 1980s Color CRT -> Digital HD -> 4K HDR).
 * 3. Central golden heritage spine fill progress tracking scroll.
 * 4. Full-page edge-to-edge architectural pencil drawing animation (1960 -> 1980).
 * 5. 1980s PAL Color TV scanning wipe animation filling the school with color (1980 -> 1999).
 * 6. Milestone detail modal and full-screen mural lightbox modals.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------------------------
  // 1. Lenis Smooth Scrolling Initialization
  // ----------------------------------------------------------------------------
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tickerCallback = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // ----------------------------------------------------------------------------
  // 2. Spine Progress Fill per Era
  // ----------------------------------------------------------------------------
  const stationGroups = gsap.utils.toArray('.era-stations-group');
  stationGroups.forEach((group) => {
    const fill = group.querySelector('.vertical-spine-progress-fill');
    if (fill) {
      gsap.to(fill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: group,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: true,
        },
      });
    }
  });

  // ----------------------------------------------------------------------------
  // 3. Finale Monument Card Reveal (Removed per user request)
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // 4. TV Broadcast Era Color Evolutions
  // ----------------------------------------------------------------------------
  const eraCanvas = document.querySelector('.vertical-timeline-canvas');
  const eraSection = document.querySelector('.vertical-timeline-section');
  const eraConfigs = [
    { id: 'era-1', code: 'tv-bw' },
    { id: 'era-2', code: 'tv-color-crt' },
    { id: 'era-3', code: 'tv-digital-hd' },
    { id: 'era-4', code: 'tv-4k-hdr' },
  ];

  function setActiveTvEra(code) {
    if (eraCanvas) {
      eraCanvas.className = `vertical-timeline-canvas ${code}`;
    }
    if (eraSection) {
      eraSection.className = `vertical-timeline-section ${code}`;
    }
  }

  eraConfigs.forEach(({ id, code }) => {
    ScrollTrigger.create({
      trigger: `#era-section-${id}`,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => setActiveTvEra(code),
      onEnterBack: () => setActiveTvEra(code),
    });
  });

  // ----------------------------------------------------------------------------
  // 5. Dynamic Milestone Card Reveals & Connector Expansion
  // ----------------------------------------------------------------------------
  const rows = gsap.utils.toArray('.vertical-station-row');
  rows.forEach((row) => {
    const yearPill = row.querySelector('.spine-year-pill');
    const leftCard = row.querySelector('.lane-left .node-card');
    const rightCard = row.querySelector('.lane-right .node-card');
    const blueprintCard = row.querySelector('.lane-left .blueprint-watermark-card');
    const connectors = row.querySelectorAll('.connector-horizontal');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: 'top 82%',
        end: 'bottom 18%',
        toggleActions: 'play reverse play reverse',
      },
    });

    if (yearPill) {
      tl.to(yearPill, { scale: 1.15, duration: 0.3, ease: 'power2.out' }, 0);
    }
    if (connectors.length > 0) {
      tl.fromTo(
        connectors,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.28, ease: 'power2.out' },
        0.05
      );
    }
    if (leftCard) {
      tl.fromTo(
        leftCard,
        { opacity: 0, x: 35, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'back.out(1.2)' },
        0.1
      );
    }
    if (blueprintCard) {
      tl.fromTo(
        blueprintCard,
        { opacity: 0, x: 35, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'back.out(1.2)' },
        0.1
      );
    }
    if (rightCard) {
      tl.fromTo(
        rightCard,
        { opacity: 0, x: -35, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'back.out(1.2)' },
        0.1
      );
    }
  });

  // ----------------------------------------------------------------------------
  // 6. Chapter Ribbon Header Reveal
  // ----------------------------------------------------------------------------
  const eraBanners = gsap.utils.toArray('.era-chapter-ribbon');
  eraBanners.forEach((banner) => {
    gsap.fromTo(
      banner,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: banner,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  });

  // ----------------------------------------------------------------------------
  // 7. Full-Page Architectural Background Animations
  //    Era 1 (1960 -> 1980): Live Pencil Sketch & Cross-Hatching
  //    Era 2 (1980 -> 1999): PAL Color TV Scanning Beam Fills School with Color!
  //    Era 3 (2000 -> 2014): 1080p Digital Laser Beam Upgrades School to High Definition!
  //    Era 4 (2015 -> Present): Crystal Clear Ultra HD / 4K Dynamic Range
  // ----------------------------------------------------------------------------
  const bgContainer = document.querySelector('.campus-sketch-background');
  const station1960 = document.querySelector('#station-st-1960');
  const era2Section = document.querySelector('#era-section-era-2');
  const era3Section = document.querySelector('#era-section-era-3');
  const era4Section = document.querySelector('#era-section-era-4');
  const finaleSection = document.querySelector('.vertical-timeline-finale');

  if (bgContainer && station1960 && era2Section) {
    const bgLines = bgContainer.querySelector('.campus-bg-lines');
    const bgShading = bgContainer.querySelector('.campus-bg-shading');
    const bgPhoto = bgContainer.querySelector('.campus-bg-photo');
    const bgColor = bgContainer.querySelector('.campus-bg-color');
    const colorBeam = bgContainer.querySelector('.campus-bg-color-beam');
    const bgHD = bgContainer.querySelector('.campus-bg-hd');
    const hdBeam = bgContainer.querySelector('.campus-bg-hd-beam');
    const bgModern = bgContainer.querySelector('.campus-bg-modern');
    const streamBadge = bgContainer.querySelector('.campus-bg-stream-badge');
    const streamLabel = streamBadge ? streamBadge.querySelector('.stream-res-label') : null;
    const bgPencil = bgContainer.querySelector('.campus-bg-pencil-cursor');
    const station2016 = document.querySelector('#station-st-2016');

    // --- TIMELINE 1: ERA 1 (1960 -> 1980) PENCIL DRAWING ---
    const drawTl = gsap.timeline({
      scrollTrigger: {
        trigger: station1960,
        start: 'bottom 70%',
        endTrigger: era2Section,
        end: 'top 60%',
        scrub: 0.6,
        onUpdate: (self) => {
          const pct = Math.round(self.progress * 100);
          document.querySelectorAll('.watermark-progress-text').forEach((el) => {
            if (pct === 0) el.textContent = 'Sketching Starts...';
            else if (pct < 100) el.textContent = `Sketching ${pct}%`;
            else el.textContent = '✓ Completed (1980)';
          });
        },
      },
    });

    if (bgLines) {
      drawTl.fromTo(
        bgLines,
        { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 0.95, duration: 0.45, ease: 'none' },
        0.02
      );
    }
    if (bgShading) {
      drawTl.fromTo(
        bgShading,
        { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 0.9, duration: 0.45, ease: 'none' },
        0.32
      );
    }
    if (bgPhoto) {
      drawTl.fromTo(
        bgPhoto,
        { opacity: 0 },
        { opacity: 0.88, duration: 0.25, ease: 'power1.inOut' },
        0.72
      );
    }
    if (bgPencil) {
      drawTl.fromTo(
        bgPencil,
        { left: '15%', top: '15%', rotation: -25, opacity: 0 },
        { opacity: 1, duration: 0.05, ease: 'none' },
        0.02
      );
      drawTl.to(bgPencil, { left: '80%', top: '25%', rotation: -18, duration: 0.25, ease: 'sine.inOut' }, 0.07);
      drawTl.to(bgPencil, { left: '25%', top: '55%', rotation: -28, duration: 0.25, ease: 'sine.inOut' }, 0.32);
      drawTl.to(bgPencil, { left: '70%', top: '75%', rotation: -15, duration: 0.25, ease: 'sine.inOut' }, 0.57);
      drawTl.to(bgPencil, { left: '90%', top: '90%', rotation: -5, opacity: 0, duration: 0.15, ease: 'power2.out' }, 0.85);
    }

    // --- TIMELINE 2: ERA 2 (1980 -> 1999) COLOR FILL ---
    if (bgColor && era3Section) {
      const colorTl = gsap.timeline({
        scrollTrigger: {
          trigger: era2Section,
          start: 'top 60%',
          endTrigger: era3Section,
          end: 'top 60%',
          scrub: 0.6,
        },
      });

      if (bgPhoto) colorTl.set(bgPhoto, { opacity: 0.88 }, 0);

      colorTl.fromTo(
        bgColor,
        { opacity: 1, clipPath: 'inset(0% 0% 100% 0%)' },
        { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' },
        0
      );

      if (colorBeam) {
        colorTl.fromTo(colorBeam, { top: '0%', opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'none' }, 0);
        colorTl.to(colorBeam, { top: '100%', duration: 0.9, ease: 'none' }, 0.05);
        colorTl.to(colorBeam, { opacity: 0, duration: 0.05, ease: 'power1.out' }, 0.95);
      }
    }

    // --- TIMELINE 3: ERA 3 (2000 -> 2014) DIGITAL HIGH DEFINITION UPGRADE ---
    if (bgHD && era3Section) {
      const endEra3 = era4Section || finaleSection;
      const hdTl = gsap.timeline({
        scrollTrigger: {
          trigger: era3Section,
          start: 'top 60%',
          endTrigger: endEra3,
          end: 'top 60%',
          scrub: 0.6,
        },
      });

      // Keep color photo visible behind HD wipe so there is never a blank gap
      if (bgColor) hdTl.set(bgColor, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }, 0);

      // High-Definition wipe sweeps across the campus as user enters digital era
      hdTl.fromTo(
        bgHD,
        { opacity: 1, clipPath: 'inset(0% 0% 100% 0%)' },
        { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' },
        0
      );

      // Cyan Digital Laser Beam tracks the leading edge of HD crystal clarity
      if (hdBeam) {
        hdTl.fromTo(hdBeam, { top: '0%', opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'none' }, 0);
        hdTl.to(hdBeam, { top: '100%', duration: 0.9, ease: 'none' }, 0.05);
        hdTl.to(hdBeam, { opacity: 0, duration: 0.05, ease: 'power1.out' }, 0.95);
      }
    }

    // --- TIMELINE 4: ERA 4 (2016 -> Present) MODERN CAMPUS WITH 360p -> 4K PROGRESSIVE CLARITY ---
    const station2015 = document.querySelector('#station-st-2015');
    if (bgModern && (station2016 || station2015)) {
      const startTrigger = station2015 || station2016;

      // Pure scrubbed timeline: scrubs clarity from 360p to 4K and stays active through 2020+ and the Finale!
      const modernTl = gsap.timeline({
        scrollTrigger: {
          trigger: startTrigger,
          start: 'bottom 85%',
          endTrigger: document.body,
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            if (!streamLabel) return;
            const p = self.progress;
            if (p < 0.20) {
              streamLabel.textContent = 'STREAM: 360p SD';
            } else if (p < 0.50) {
              streamLabel.textContent = 'STREAM: 720p HD';
            } else if (p < 0.75) {
              streamLabel.textContent = 'STREAM: 1080p FHD';
            } else {
              streamLabel.textContent = '✓ 4K ULTRA HD';
            }
          },
        },
      });

      // Phase 1 (0.00 to 0.15): As scroll leaves 2015 and enters 2016, fade in modern campus in 360p blur
      // IMPORTANT: Explicitly preserve saturate(1) and brightness(1) so GSAP never zeroes them out!
      modernTl.fromTo(
        bgModern,
        { opacity: 0, filter: 'blur(8px) contrast(1.02) saturate(1) brightness(1)' },
        { opacity: 1, filter: 'blur(8px) contrast(1.02) saturate(1) brightness(1)', duration: 0.15, ease: 'power1.out' },
        0
      );
      if (streamBadge) {
        modernTl.fromTo(
          streamBadge,
          { opacity: 0 },
          { opacity: 1, duration: 0.10, ease: 'none' },
          0.03
        );
      }

      // Phase 2 (0.15 to 0.75): As scroll continues down past 2017 & 2020+, clarity increases to razor-sharp 4K
      modernTl.to(
        bgModern,
        {
          filter: 'blur(0px) contrast(1.08) saturate(1.15) brightness(1.02)',
          duration: 0.60,
          ease: 'power1.inOut',
        },
        0.15
      );
    }

    // --- TIMELINE 5: VISIBILITY CONTROLLER (Active from 1960 continuously through the entire page) ---
    // The building background stays fully visible behind 2020+ and behind the finale monument card!
    ScrollTrigger.create({
      trigger: station1960,
      start: 'bottom 75%',
      // No end / onLeave: never goes black, background remains the building itself all the way to the bottom!
      onEnter: () => gsap.to(bgContainer, { opacity: 1, duration: 0.4 }),
      onLeaveBack: () => gsap.to(bgContainer, { opacity: 0, duration: 0.4 }),
    });
  }

  // ----------------------------------------------------------------------------
  // 8. Modals Logic (Milestone Details & Mural Lightbox)
  // ----------------------------------------------------------------------------
  const detailModal = document.getElementById('milestone-detail-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');

  function openDetailModal(card) {
    if (!detailModal || !card) return;
    const title = card.querySelector('.node-card-title')?.textContent || '';
    const sub = card.querySelector('.node-card-sub')?.textContent || '';
    const desc = card.querySelector('.node-card-reason')?.textContent || '';
    const chipYear = card.querySelector('.node-year-chip')?.textContent || '';
    const tag = card.querySelector('.node-stream-tag')?.textContent || '';
    const iconClone = card.querySelector('.card-icon-badge')?.innerHTML || '';

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-subtitle').textContent = sub;
    document.getElementById('modal-desc').textContent = desc;
    document.getElementById('modal-year').textContent = chipYear;
    document.getElementById('modal-badge').textContent = tag;
    document.getElementById('modal-icon-badge').innerHTML = iconClone;

    const photoWrap = document.getElementById('modal-photo-wrap');
    if (card.closest('#station-st-1967') || title.includes('Kalamassery')) {
      photoWrap.style.display = 'block';
    } else {
      photoWrap.style.display = 'none';
    }

    detailModal.style.display = 'flex';
  }

  function closeDetailModal() {
    if (detailModal) detailModal.style.display = 'none';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDetailModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeDetailModal);
  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeDetailModal();
    });
  }

  // Bind clicks on milestone cards
  document.querySelectorAll('.node-card').forEach((card) => {
    card.addEventListener('click', () => openDetailModal(card));
  });

  // Bind click on 1967 blueprint watermark card
  const blueprintCard = document.querySelector('.blueprint-watermark-card');
  if (blueprintCard) {
    blueprintCard.addEventListener('click', () => {
      openLightbox(2); // opens 1967 archival photo
    });
  }

  // Mural Lightbox Modal
  const muralModal = document.getElementById('mural-lightbox-modal');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const toggleBtns = document.querySelectorAll('.lightbox-toggle-btn');

  const MURAL_PHOTOS = [
    {
      src: 'assets/rajagiri_timeline_wall_1.jpg',
      title: 'Original Campus Wall Mural — Part 1 (1955 – 1990)',
      desc: 'The foundational era: Madras & Kerala affiliations, Kalamassery campus, and early Live Labs.',
    },
    {
      src: 'assets/rajagiri_timeline_wall_2.jpg',
      title: 'Original Campus Wall Mural — Part 2 (1990 – 2020+)',
      desc: 'Autonomous status, Valley Campus, NAAC 5-Star, and international academic expansions.',
    },
    {
      src: 'assets/kalamassery_campus_1967.jpg',
      title: 'Kalamassery Hilltop Campus Main Building (1967 - B&W Archival Photo)',
      desc: 'Authentic archival photograph of the iconic Rajagiri College of Social Sciences building.',
    },
    {
      src: 'assets/kalamassery_campus_color.jpg',
      title: 'Kalamassery Hilltop Campus Main Building (1980s Color Restoration)',
      desc: 'Full-color architectural restoration celebrating the 1980 RCSS Independent College status and Color TV broadcast era.',
    },
    {
      src: 'assets/kalamassery_campus_hd.jpg',
      title: 'Kalamassery Hilltop Campus Main Building (2000s High Definition 1080p)',
      desc: 'Crystal-clear digital high-definition restoration celebrating the 2000 NAAC 5-Star, Valley Campus, and Digital HDTV era.',
    },
    {
      src: 'assets/rajagiri_modern_campus_2016.jpg',
      title: 'Rajagiri Valley & Modern Campus Panoramic View (2016 – Present)',
      desc: 'Contemporary aerial perspective showing the modern academic towers, sports grounds, and eco-friendly solar infrastructure.',
    },
  ];

  let currentPhotoIdx = 0;

  function openLightbox(idx = 0) {
    currentPhotoIdx = idx;
    updateLightboxUI();
    if (muralModal) muralModal.style.display = 'flex';
  }

  function closeLightbox() {
    if (muralModal) muralModal.style.display = 'none';
  }

  function updateLightboxUI() {
    const photo = MURAL_PHOTOS[currentPhotoIdx];
    if (lightboxImg) lightboxImg.src = photo.src;
    if (lightboxTitle) lightboxTitle.textContent = photo.title;
    if (lightboxDesc) lightboxDesc.textContent = photo.desc;
    if (lightboxCounter) lightboxCounter.textContent = `Photo ${currentPhotoIdx + 1} of ${MURAL_PHOTOS.length}`;

    toggleBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === currentPhotoIdx);
    });
  }

  toggleBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      currentPhotoIdx = idx;
      updateLightboxUI();
    });
  });

  const btnExplore = document.querySelector('.btn-explore-mural-wall');
  if (btnExplore) {
    btnExplore.addEventListener('click', () => openLightbox(0));
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (muralModal) {
    muralModal.addEventListener('click', (e) => {
      if (e.target === muralModal) closeLightbox();
    });
  }

  // Keyboard Escape key closes all modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeLightbox();
    }
  });
});
