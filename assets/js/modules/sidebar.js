/* ==========================================================================
   Sidebar Visibility
   ========================================================================== */

export function initSidebar() {
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
      this.setAttribute('aria-expanded', String(isHidden));
    });
  }

  initStickyScroll();
}

/* ==========================================================================
   Bidirectional Sticky Sidebar
   ========================================================================== */

const LARGE_BREAKPOINT = 925;

const STATE = {
  STICK_TOP: 'STICK_TOP',
  STICK_BOTTOM: 'STICK_BOTTOM',
  FLOAT: 'FLOAT',
};

function initStickyScroll() {
  const sidebar = document.querySelector('.sidebar.sticky');
  if (!sidebar) return;

  const wrapper = document.getElementById('swup-sidebar');
  if (!wrapper) return;

  let state = STATE.STICK_TOP;
  let lastScrollY = window.scrollY;
  let ticking = false;
  let floatOffset = 0;

  const controller = new AbortController();
  const { signal } = controller;

  // Store previous controller on the wrapper so re-init can abort it
  if (wrapper._stickyAbort) {
    wrapper._stickyAbort.abort();
  }
  wrapper._stickyAbort = controller;

  function getMastheadHeight() {
    const masthead = document.querySelector('.masthead');
    return masthead ? masthead.offsetHeight : 0;
  }

  /** Measure the sidebar's full content height, accounting for any overflow
   *  that getBoundingClientRect might miss (e.g. lazy-loaded images). */
  function getSidebarHeight() {
    return Math.max(
      sidebar.getBoundingClientRect().height,
      sidebar.offsetHeight,
      sidebar.scrollHeight
    );
  }

  /** Compute the sticky top value that pins the sidebar bottom to the viewport bottom. */
  function stickBottomTop() {
    return document.documentElement.clientHeight - getSidebarHeight();
  }

  function update() {
    ticking = false;

    if (window.innerWidth < LARGE_BREAKPOINT) {
      sidebar.style.position = '';
      sidebar.style.top = '';
      return;
    }

    const viewportHeight = document.documentElement.clientHeight;
    const mastheadH = getMastheadHeight();
    const sidebarHeight = getSidebarHeight();

    // Short sidebar: let CSS sticky handle it
    if (sidebarHeight <= viewportHeight - mastheadH) {
      sidebar.style.position = '';
      sidebar.style.top = '';
      state = STATE.STICK_TOP;
      return;
    }

    const scrollY = window.scrollY;
    const scrollingDown = scrollY > lastScrollY;
    const sidebarRect = sidebar.getBoundingClientRect();

    switch (state) {
      case STATE.STICK_TOP:
        if (scrollingDown) {
          // Transition to FLOAT — offset relative to wrapper holds position
          floatOffset = sidebarRect.top - wrapper.getBoundingClientRect().top;
          sidebar.style.position = 'relative';
          sidebar.style.top = floatOffset + 'px';
          state = STATE.FLOAT;
        }
        break;

      case STATE.STICK_BOTTOM:
        // Re-adjust top each frame to handle dynamic height changes
        // (lazy images loading, font swaps, etc.)
        sidebar.style.top = stickBottomTop() + 'px';
        if (!scrollingDown) {
          // Transition to FLOAT
          floatOffset = sidebarRect.top - wrapper.getBoundingClientRect().top;
          sidebar.style.position = 'relative';
          sidebar.style.top = floatOffset + 'px';
          state = STATE.FLOAT;
        }
        break;

      case STATE.FLOAT:
        if (scrollingDown) {
          // Check if sidebar bottom has reached viewport bottom
          if (sidebarRect.bottom <= viewportHeight) {
            sidebar.style.position = 'sticky';
            // Measure height AFTER switching to sticky (may reflow)
            sidebar.style.top = stickBottomTop() + 'px';
            state = STATE.STICK_BOTTOM;
          }
        } else {
          // Check if sidebar top has reached masthead bottom
          if (sidebarRect.top >= mastheadH) {
            sidebar.style.position = 'sticky';
            sidebar.style.top = mastheadH + 'px';
            state = STATE.STICK_TOP;
          }
        }
        break;
    }

    lastScrollY = scrollY;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function onResize() {
    // Reset to STICK_TOP and let the next scroll recalculate
    state = STATE.STICK_TOP;
    sidebar.style.position = '';
    sidebar.style.top = '';
    lastScrollY = window.scrollY;
  }

  window.addEventListener('scroll', onScroll, { signal, passive: true });
  window.addEventListener('resize', onResize, { signal });

  // After fonts load, re-adjust if currently stuck at bottom
  // (font loading can change sidebar height)
  document.fonts.ready.then(() => {
    if (state === STATE.STICK_BOTTOM) {
      sidebar.style.top = stickBottomTop() + 'px';
    }
  });
}
