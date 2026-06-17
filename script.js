/* ═══════════════════════════════════════
   CURTAIN ANIMATION
═══════════════════════════════════════ */
function openCurtains() {
  const btn = document.getElementById('open-btn');
  const wrap = document.querySelector('.curtain-wrap');
  const screen = document.getElementById('curtain-screen');
  const main = document.getElementById('main-content');

  btn.disabled = true;
  btn.style.opacity = '0.5';
  wrap.classList.add('open');

  // After curtains open → fade out screen → show main
  setTimeout(() => {
    screen.style.transition = 'opacity 0.6s ease';
    screen.style.opacity = '0';

    setTimeout(() => {
      screen.style.display = 'none';
      main.classList.remove('hidden');
      main.style.opacity = '0';
      main.style.transition = 'opacity 0.6s ease';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { main.style.opacity = '1'; });
      });
      startCountdown();
      initReveal();
    }, 650);
  }, 1500);
}

/* ═══════════════════════════════════════
   COUNTDOWN
═══════════════════════════════════════ */
function startCountdown() {
  const weddingDate = new Date('2026-11-22T09:00:00');

  function update() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      ['days','hours','minutes','seconds'].forEach(id => {
        document.getElementById(id).textContent = '00';
      });
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    document.getElementById('days').textContent    = String(d).padStart(2,'0');
    document.getElementById('hours').textContent   = String(h).padStart(2,'0');
    document.getElementById('minutes').textContent = String(m).padStart(2,'0');
    document.getElementById('seconds').textContent = String(s).padStart(2,'0');
  }

  update();
  setInterval(update, 1000);
}

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
function initReveal() {
  const targets = document.querySelectorAll(
    '.section-eyebrow, .section-title, .divider-ornament, .story-text, ' +
    '.event-card, .venue-card, .contact-card, .action-btn'
  );
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}
