/* ================================================================
   BANDCAMP WEB ARCHIVE — app.js
   ================================================================ */

'use strict';

// ── Dismiss AI warning banner ──────────────────────────────────
const dismissBtn = document.getElementById('dismiss-warning');
const warningBar = document.getElementById('ai-warning');

if (dismissBtn && warningBar) {
  dismissBtn.addEventListener('click', () => {
    warningBar.style.transition = 'opacity 0.3s, max-height 0.4s, padding 0.4s';
    warningBar.style.opacity    = '0';
    warningBar.style.maxHeight  = '0';
    warningBar.style.padding    = '0';
    warningBar.style.overflow   = 'hidden';
    warningBar.addEventListener('transitionend', () => warningBar.remove(), { once: true });
  });
}

// ── Scroll reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Pipeline steps — staggered individual reveal ───────────────
document.querySelectorAll('.pipeline-step').forEach((step, i) => {
  step.style.opacity   = '0';
  step.style.transform = 'translateY(16px)';
  step.style.transition = [
    `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
    `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`
  ].join(', ');

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'none';
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  stepObserver.observe(step);
});

// ── Nav — solid background after scroll ───────────────────────
const nav = document.querySelector('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is pre-scrolled
}
