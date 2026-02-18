/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */

export function initScrollReveal() {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select elements to animate
  const revealElements = document.querySelectorAll(
    '.archive__item, .page__content > h2, .page__content > h3, ' +
    '.page__content > p, .page__content > ul, .page__content > ol, ' +
    '.author__urls li, .feature__item, ' +
    '.highlight-card, .cert-card, .contact-card, .career-timeline__milestone, ' +
    '.cv-timeline-item, .cv-edu-card, .cv-skill-tag, ' +
    '.github-stats > a, .bento-grid > *'
  );

  // Track card indices per parent for stagger
  const parentCounters = new Map();

  revealElements.forEach((el) => {
    // Don't re-add if already has reveal class
    if (el.classList.contains('reveal') || el.classList.contains('reveal--left') || el.classList.contains('reveal--right')) {
      revealOnScroll.observe(el);
      return;
    }

    // Card-type elements get directional + stagger
    var isCard = el.matches('.highlight-card, .cert-card, .contact-card, .career-timeline__milestone, .archive__item, .cv-edu-card, .cv-timeline-item, .bento-grid > *');

    if (isCard && el.parentElement) {
      var parent = el.parentElement;
      var count = parentCounters.get(parent) || 0;
      parentCounters.set(parent, count + 1);

      // Stagger delay
      el.style.transitionDelay = (count * 0.08) + 's';

      // Directional: odd left, even right
      if (count % 2 === 0) {
        el.classList.add('reveal--left');
      } else {
        el.classList.add('reveal--right');
      }
    } else {
      el.classList.add('reveal');
      // Stagger for list items
      if (el.matches('.author__urls li, .cv-skill-tag')) {
        var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.05) + 's';
      }
    }

    revealOnScroll.observe(el);
  });
}

/* ==========================================================================
   Scroll Progress Bar
   ========================================================================== */

export function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  const masthead = document.querySelector('.masthead');

  if (!progressBar) return;

  let ticking = false;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;

    // Add shadow to masthead when scrolled
    if (masthead) {
      masthead.classList.toggle('is-scrolled', scrollTop > 10);
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateProgress();
}

/* ==========================================================================
   Scroll-to-Top Button
   ========================================================================== */

export function initScrollToTop() {
  var btn = document.querySelector('.scroll-to-top');
  if (!btn) return;

  var scrollThreshold = 300;
  var ticking = false;

  var updateVisibility = function() {
    if (window.scrollY > scrollThreshold) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
    ticking = false;
  };

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initial check
  updateVisibility();
}

/* ==========================================================================
   Floating Mobile CTA
   ========================================================================== */

export function initFloatingCta() {
  var cta = document.querySelector('.floating-cta');
  if (!cta) return;

  var scrollThreshold = 600;
  var ticking = false;

  var updateVisibility = function() {
    if (window.scrollY > scrollThreshold && window.innerWidth < 925) {
      cta.classList.add('is-visible');
    } else {
      cta.classList.remove('is-visible');
    }
    ticking = false;
  };

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', function() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateVisibility();
}
