/* ==========================================================================
   Modern vanilla JavaScript - no jQuery dependencies
   Entry point: imports all modules, bundled by esbuild
   ========================================================================== */

import { initMobileNav, updateActiveNav } from './modules/nav.js';
import { initDarkMode, initLanguage, initColorCustomization } from './modules/theme.js';
import { initLightbox } from './modules/lightbox.js';
import { initScrollReveal, initScrollProgress, initScrollToTop } from './modules/animations.js';
import { initSidebar } from './modules/sidebar.js';
import { initSearch } from './modules/search.js';
import { initOfflineIndicator } from './modules/offline.js';

document.addEventListener('DOMContentLoaded', function() {

  // Initialize global features (masthead-level, don't need reinit on navigation)
  initMobileNav();
  initDarkMode();
  initLanguage();
  initColorCustomization();
  initOfflineIndicator();
  initSearch();

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

  // Floating mobile CTA

  // Scroll to top on new page
  window.scrollTo(0, 0);
}

// Make globally available for Swup
window.initPageFeatures = initPageFeatures;
