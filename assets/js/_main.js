/* ==========================================================================
   Modern vanilla JavaScript - no jQuery dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

  // Initialize global features (masthead-level, don't need reinit on navigation)
  initDarkMode();
  initLanguage();

  // Initialize per-page features
  initPageFeatures();

});

// Enable smooth scrolling via CSS (add to html element)
document.documentElement.style.scrollBehavior = 'smooth';

/* ==========================================================================
   Per-Page Feature Initialization
   Called on initial load AND after each Swup page transition
   ========================================================================== */

function initPageFeatures() {
  // Sticky footer
  const footer = document.querySelector('.page__footer');
  if (footer) {
    const updateFooterMargin = () => {
      document.body.style.marginBottom = footer.offsetHeight + 'px';
    };
    updateFooterMargin();

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateFooterMargin);
      resizeObserver.observe(footer);
    } else {
      window.addEventListener('resize', updateFooterMargin);
    }
  }

  // Sidebar visibility logic
  initSidebar();

  // Image lightbox
  initLightbox();

  // Scroll reveal animations
  initScrollReveal();

  // Scroll progress bar
  initScrollProgress();

  // Active nav link highlighting
  updateActiveNav();

  // Scroll-to-top button
  initScrollToTop();

  // Scroll to top on new page
  window.scrollTo(0, 0);
}

// Make globally available for Swup
window.initPageFeatures = initPageFeatures;

/* ==========================================================================
   Sidebar Visibility
   ========================================================================== */

function initSidebar() {
  const authorUrlsWrapper = document.querySelector('.author__urls-wrapper');
  const authorUrls = document.querySelector('.author__urls');
  const followButton = document.querySelector('.author__urls-wrapper button');

  const updateSidebarVisibility = () => {
    if (!authorUrls) return;

    const hasButton = followButton !== null;
    const buttonVisible = hasButton && followButton.offsetParent !== null;
    const show = !hasButton || (hasButton && !buttonVisible);

    if (show) {
      authorUrls.style.display = '';
    } else {
      authorUrls.style.display = 'none';
    }
  };

  updateSidebarVisibility();
  window.addEventListener('resize', updateSidebarVisibility);

  // Follow menu dropdown toggle
  if (followButton && authorUrls) {
    followButton.addEventListener('click', function() {
      const isHidden = authorUrls.style.display === 'none' ||
                       getComputedStyle(authorUrls).display === 'none';

      authorUrls.style.display = isHidden ? 'block' : 'none';
      this.classList.toggle('open');
    });
  }
}

/* ==========================================================================
   Image Lightbox
   ========================================================================== */

function initLightbox() {
  const imageLinks = document.querySelectorAll(
    'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".JPG"], a[href$=".png"], a[href$=".gif"], a[href$=".webp"]'
  );

  if (imageLinks.length === 0) return;

  // Reuse existing dialog or create new one
  let dialog = document.querySelector('.image-lightbox');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'image-lightbox';
    dialog.innerHTML = `
      <img src="" alt="Lightbox image">
      <button class="lightbox-close" aria-label="Close">&times;</button>
    `;
    document.body.appendChild(dialog);

    // Add lightbox styles once
    const style = document.createElement('style');
    style.textContent = `
      .image-lightbox {
        border: none;
        padding: 0;
        background: rgba(0, 0, 0, 0.9);
        max-width: 95vw;
        max-height: 95vh;
      }
      .image-lightbox::backdrop {
        background: rgba(0, 0, 0, 0.8);
      }
      .image-lightbox img {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        display: block;
      }
      .image-lightbox .lightbox-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
      }
      .image-lightbox .lightbox-close:hover {
        background: #fff;
      }
    `;
    document.head.appendChild(style);

    // Close handlers (only bind once)
    const closeBtn = dialog.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  const lightboxImg = dialog.querySelector('img');

  // Attach click handlers to image links
  imageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      lightboxImg.src = this.href;
      dialog.showModal();
    });
  });
}

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */

function initScrollReveal() {
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
    '.author__urls li, .feature__item'
  );

  revealElements.forEach((el, index) => {
    // Don't re-add if already has reveal class
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      // Add staggered delay for items in lists
      if (el.matches('.archive__item, .author__urls li')) {
        el.style.transitionDelay = `${index * 0.05}s`;
      }
    }
    revealOnScroll.observe(el);
  });
}

/* ==========================================================================
   Scroll Progress Bar
   ========================================================================== */

function initScrollProgress() {
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

function initScrollToTop() {
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
   Dark Mode Toggle
   ========================================================================== */

function initDarkMode() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* ==========================================================================
   Language Toggle
   ========================================================================== */

function initLanguage() {
  const toggle = document.querySelector('.lang-toggle');
  if (!toggle) return;

  const setLang = (lang) => {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang);
  };

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-lang');
    const next = current === 'en' ? 'es' : 'en';
    setLang(next);
  });
}

/* ==========================================================================
   Active Navigation Link
   ========================================================================== */

function updateActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPath = new URL(link.href).pathname;

    // Exact match or starts with (for sub-pages)
    if (currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   Animated Counters (for stats section if added)
   ========================================================================== */

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const animate = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
      }
    };
    animate();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.counter);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}
