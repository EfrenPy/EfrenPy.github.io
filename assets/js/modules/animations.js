/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */

var scrollRevealObserver = null;
var floatingCtaObserver = null;
var floatingCtaAbort = null;

export function initScrollReveal() {
  // Clean up previous observer
  if (scrollRevealObserver) { scrollRevealObserver.disconnect(); scrollRevealObserver = null; }

  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  scrollRevealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollRevealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select elements to animate
  const revealElements = document.querySelectorAll(
    '.archive__item, .page__content > h2, .page__content > h3, ' +
    '.page__content > p, .page__content > ul, .page__content > ol, ' +
    '.author__urls li, .feature__item, ' +
    '.cert-card, .contact-card, .career-timeline__milestone, ' +
    '.cv-timeline-item, .cv-edu-card, .cv-skill-tag, ' +
    '.github-stats > a, ' +
    '.key-results__card, .value-prop, .bio-section__callout, ' +
    '.featured-post-card, .looking-for-section'
  );

  // Track card indices per parent for stagger
  const parentCounters = new Map();

  revealElements.forEach((el) => {
    // Don't re-add if already has reveal class
    if (el.classList.contains('reveal') || el.classList.contains('reveal--left') || el.classList.contains('reveal--right')) {
      scrollRevealObserver.observe(el);
      return;
    }

    // Stat cards get scale reveal
    var isStatCard = el.matches('.key-results__card, .bio-section__callout');
    // Timeline milestones get slide-up
    var isTimeline = el.matches('.career-timeline__milestone');

    if (isStatCard && el.parentElement) {
      var parent = el.parentElement;
      var count = parentCounters.get(parent) || 0;
      parentCounters.set(parent, count + 1);
      el.style.transitionDelay = (count * 0.08) + 's';
      el.classList.add('reveal--scale');
    } else if (isTimeline && el.parentElement) {
      var parent = el.parentElement;
      var count = parentCounters.get(parent) || 0;
      parentCounters.set(parent, count + 1);
      el.style.transitionDelay = (count * 0.1) + 's';
      el.classList.add('reveal--slide-up');
    }

    // Card-type elements get directional + stagger
    var isCard = el.matches('.cert-card, .contact-card, .archive__item, .cv-edu-card, .cv-timeline-item');

    if (!isStatCard && !isTimeline && isCard && el.parentElement) {
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
    } else if (!isStatCard && !isTimeline) {
      el.classList.add('reveal');
      // Stagger for list items
      if (el.matches('.author__urls li, .cv-skill-tag')) {
        var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.05) + 's';
      }
    }

    scrollRevealObserver.observe(el);
  });
}

/* ==========================================================================
   Scroll Progress Bar
   ========================================================================== */

export function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  const masthead = document.querySelector('.masthead');

  if (!progressBar) return;

  // Hide progress bar if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progressBar.style.display = 'none';
    return;
  }

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
  // Clean up previous observers and listeners
  if (floatingCtaObserver) { floatingCtaObserver.disconnect(); floatingCtaObserver = null; }
  if (floatingCtaAbort) { floatingCtaAbort.abort(); floatingCtaAbort = null; }

  var cta = document.querySelector('.floating-cta');
  if (!cta) return;

  floatingCtaAbort = new AbortController();
  var signal = floatingCtaAbort.signal;

  var scrollThreshold = 600;
  var ticking = false;
  var footerVisible = false;

  var footer = document.querySelector('.page__footer');
  if (footer) {
    floatingCtaObserver = new IntersectionObserver(function(entries) {
      footerVisible = entries[0].isIntersecting;
      updateVisibility();
    }, { threshold: 0.1 });
    floatingCtaObserver.observe(footer);
  }

  var updateVisibility = function() {
    if (window.scrollY > scrollThreshold && window.innerWidth < 925 && !footerVisible) {
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
  }, { passive: true, signal: signal });

  window.addEventListener('resize', function() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true, signal: signal });

  updateVisibility();
}

/* ==========================================================================
   Count-Up Animation for Stat Numbers
   ========================================================================== */

var countUpObserver = null;

export function initCountUp() {
  if (countUpObserver) { countUpObserver.disconnect(); countUpObserver = null; }

  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var numbers = document.querySelectorAll('.key-results__number[data-count]');
  if (!numbers.length) return;

  countUpObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        countUpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach(function(el) {
    countUpObserver.observe(el);
  });
}

function animateNumber(el) {
  var finalText = el.textContent;
  var target = parseInt(el.getAttribute('data-count'), 10);
  if (isNaN(target)) return;

  var duration = 1200;
  var start = performance.now();

  function step(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(eased * target);

    if (progress < 1) {
      el.textContent = String(current);
      requestAnimationFrame(step);
    } else {
      el.textContent = finalText;
    }
  }

  el.textContent = '0';
  requestAnimationFrame(step);
}

