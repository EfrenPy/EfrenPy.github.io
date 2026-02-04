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

  function update() {
    ticking = false;

    if (window.innerWidth < LARGE_BREAKPOINT) {
      sidebar.style.position = '';
      sidebar.style.top = '';
      return;
    }

    const sidebarHeight = Math.max(sidebar.offsetHeight, sidebar.scrollHeight);
    const viewportHeight = window.innerHeight;
    const mastheadH = getMastheadHeight();

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
          if (sidebarRect.top + sidebarHeight <= viewportHeight) {
            sidebar.style.position = 'sticky';
            sidebar.style.top = -(sidebarHeight - viewportHeight) + 'px';
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
}
