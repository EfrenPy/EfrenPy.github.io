/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */

export function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  if (!toggle || !siteNav) return;

  toggle.addEventListener('click', function() {
    var isOpen = siteNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.classList.toggle('close', isOpen);
    document.body.classList.toggle('overflow--hidden', isOpen);
  });

  // Helper to close the mobile nav
  function closeMenu() {
    siteNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('close');
    document.body.classList.remove('overflow--hidden');
  }

  // Close nav when a nav link is clicked
  var navLinks = siteNav.querySelectorAll('.nav-links a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close nav when resizing to desktop
  var mql = window.matchMedia('(min-width: 925px)');
  if (mql.addEventListener) {
    mql.addEventListener('change', function() { if (mql.matches) closeMenu(); });
  } else if (mql.addListener) {
    mql.addListener(function() { if (mql.matches) closeMenu(); });
  }

  // Close nav on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

/* ==========================================================================
   Active Navigation Link
   ========================================================================== */

export function updateActiveNav() {
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
