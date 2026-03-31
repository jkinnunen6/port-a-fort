// ── HEADER ──────────────────────────────────────
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute('page');
    this.innerHTML = `
      <header>
        <a class="logo" href="index.html">
          <div class="logo-mark">
            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.08 51.08"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:#3d3d3d;}.cls-3{isolation:isolate;}</style></defs><path class="cls-2" d="m25.54,51.08c14.11,0,25.54-11.43,25.54-25.54S39.65,0,25.54,0C11.43,0,0,11.43,0,25.54s11.43,25.54,25.54,25.54h0"/><g class="cls-3"><path class="cls-1" d="m29.18,31.41c1.08-.16,2.08-.42,2.94-.78v6.86c0,1.34-.08,2.18-.46,3.26-.7,2-1.94,3.5-2.4,3.9-.2.16-.36.22-.52.22-.3,0-.74-.42-.74-.9,0-.26.08-.38.32-.46.74-.2,1.26-.4,1.54-.76.24-.28.4-.72.52-1.4.12-.84.16-2.04.16-3.88v-3.96c0-1.34-.1-1.42-1.36-1.6v-.5Zm2.06-2.78c-.56,0-1.02-.48-1.02-1.02,0-.62.46-1.06,1.04-1.06.54,0,.98.44.98,1.06,0,.54-.44,1.02-1,1.02Z"/><path class="cls-1" d="m44.12,39.69c-1.08,0-2.26.02-2.68.04-.12-.14-3.26-3.86-3.38-3.98-.28-.32-.4-.42-.58-.42-.08,0-.24,0-.36.04v2.22c0,1.34.1,1.42,1.4,1.54v.56h-4.42v-.56c1.34-.12,1.44-.26,1.44-1.54v-9.56c0-1.3-.14-1.34-1.38-1.52v-.52c1.04-.1,2.24-.4,2.96-.68v9.54c.6-.14.98-.38,1.28-.7.46-.46,1.2-1.36,1.54-1.86.42-.58.26-.74-.7-.82v-.56l4.12-.18v.54c-1.4.22-1.8.38-2.66,1.28-.38.4-1.28,1.42-1.7,1.94.4.56,2.44,2.88,3.1,3.58.96.96,1.24,1.02,2.02,1.06v.56Z"/></g></svg>
          </div>
          <span class="logo-text">Jeff Kinnunen</span>
        </a>
        <nav class="desktop-nav">
          <a href="index.html" ${page === 'work' ? 'class="active"' : ''}>Work</a>
          <a href="play.html" ${page === 'play' ? 'class="active"' : ''}>Play</a>
          <a href="resume.pdf" target="_blank">Resume</a>
        </nav>
        <button class="hamburger" aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div class="mobile-overlay">
        <button class="overlay-close" aria-label="Close menu">✕</button>
        <nav class="overlay-nav">
          <a href="index.html" ${page === 'work' ? 'class="active"' : ''}>Work</a>
          <a href="play.html" ${page === 'play' ? 'class="active"' : ''}>Play</a>
          <a href="resume.pdf" target="_blank">Resume</a>
        </nav>
      </div>
    `;

// ── HEAD TAGS ────────────────────────────────────
const favicon = document.createElement('link');
favicon.rel   = 'icon';
favicon.type  = 'image/png';
favicon.href  = 'images/favicon.png';
document.head.appendChild(favicon);

const appleTouchIcon = document.createElement('link');
appleTouchIcon.rel   = 'apple-touch-icon';
appleTouchIcon.href  = 'images/favicon.png';
document.head.appendChild(appleTouchIcon);

    // Toggle logic
    const hamburger = this.querySelector('.hamburger');
    const overlay   = this.querySelector('.mobile-overlay');
    const close     = this.querySelector('.overlay-close');

    hamburger.addEventListener('click', () => {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    });

    // Close on nav link click
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ── FOOTER ──────────────────────────────────────
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <span>© Jeff Kinnunen 2026</span>
        <span>Built by hand. <br>(Claude's hands)</span>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

// ── CURSOR ──────────────────────────────────────
function initCursor() {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="cursor-dot"></div>
    <div id="cursor-ring"></div>
  `);

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;
  const LERP = 0.12;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactables = 'a, button, [role="button"], input, textarea, select, label, .card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactables)) {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactables)) {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    }
  });

  document.addEventListener('mousedown', () => ring.classList.add('is-clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('is-clicking'));

  document.addEventListener('mouseleave', () => {
    dot.classList.add('is-hidden');
    ring.classList.add('is-hidden');
  });

  document.addEventListener('mouseenter', () => {
    dot.classList.remove('is-hidden');
    ring.classList.remove('is-hidden');
  });
}

initCursor();


// ── WORK GRID AUTO-STYLE ─────────────────────────────────
function initWorkGrid() {
  const items = document.querySelectorAll('.work-item');
  if (!items.length) return;

  items.forEach((item, i) => {
    // Random grayscale between 100–220 (avoids too dark or too light)
    const v = Math.floor(Math.random() * 70 + 190);
    const hex = v.toString(16).padStart(2, '0');
    const color = `#${hex}${hex}${hex}`;

    const thumb = item.querySelector('.placeholder-img, .work-thumb');
    if (thumb) thumb.style.background = color;

    // Staggered animation delay
    item.style.animationDelay = `${(i + 1) * 0.05}s`;
  });
}

initWorkGrid();