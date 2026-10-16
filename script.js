/* ─── script.js ──────────────────────────────────────────────────────
   Dental Tree — minimal JS: scroll-fade, footer year, nav active state
──────────────────────────────────────────────────────────────────── */

'use strict';

// ── Footer year ────────────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Scroll-fade observer ───────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.12 }
  );
  fadeEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: show everything if IntersectionObserver not supported
  fadeEls.forEach((el) => el.classList.add('visible'));
}

// ── Smooth-scroll for anchor links (handles browsers without native support) ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Highlight active nav section ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}
