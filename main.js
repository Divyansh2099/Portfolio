/* =========================================================
   Divyansh Portfolio — Interactions & Animations
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initTypingEffect();
  initActiveNav();
  initCounters();
  setYear();
});

/* ---------------- Navbar: add background on scroll ---------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------------- Mobile menu toggle ---------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  const closeMenu = () => {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));
}

/* ---------------- Scroll reveal (Intersection Observer) ---------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger reveal within a container
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el, i) => {
    // Light stagger for grouped elements
    if (el.classList.contains('tech-badge') || el.classList.contains('stat-card')) {
      el.dataset.delay = (i % 5) * 80;
    }
    observer.observe(el);
  });
}

/* ---------------- Typing effect for hero subtitle ---------------- */
function initTypingEffect() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Data/AI Engineer',
    'Machine Learning Builder',
    'Turning Data → Decisions',
    'I build intelligent systems.',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, 1800); // pause at full word
      }
      return setTimeout(tick, 70);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        return setTimeout(tick, 300);
      }
      return setTimeout(tick, 35);
    }
  };

  setTimeout(tick, 800);
}

/* ---------------- Active nav link on scroll ---------------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------------- Animated stat counters ---------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach((c) => (c.textContent = c.dataset.count));
    return;
  }

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ---------------- Footer year ---------------- */
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
