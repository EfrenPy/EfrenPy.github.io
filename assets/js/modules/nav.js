/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */

let mobileNavAbort = null;

export function initMobileNav() {
  if (mobileNavAbort) mobileNavAbort.abort();
  mobileNavAbort = new AbortController();

  var toggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  if (!toggle || !siteNav) return;

  toggle.addEventListener('click', function() {
    var isOpen = siteNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.classList.toggle('close', isOpen);
    document.body.classList.toggle('overflow--hidden', isOpen);
  }, { signal: mobileNavAbort.signal });

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
    link.addEventListener('click', closeMenu, { signal: mobileNavAbort.signal });
  });

  // Close nav when resizing to desktop
  var mql = window.matchMedia('(min-width: 925px)');
  mql.addEventListener('change', function() { if (mql.matches) closeMenu(); }, { signal: mobileNavAbort.signal });

  // Close nav on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  }, { signal: mobileNavAbort.signal });
}

/* ==========================================================================
   "More" Dropdown Navigation
   ========================================================================== */

let moreDropdownAbort = null;

export function initMoreDropdown() {
  if (moreDropdownAbort) moreDropdownAbort.abort();
  moreDropdownAbort = new AbortController();

  var toggle = document.querySelector('.nav-more__toggle');
  var dropdown = document.querySelector('.nav-more__dropdown');
  if (!toggle || !dropdown) return;

  function openDropdown() {
    dropdown.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (dropdown.classList.contains('is-open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, { signal: moreDropdownAbort.signal });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target) && e.target !== toggle) {
      closeDropdown();
    }
  }, { signal: moreDropdownAbort.signal });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && dropdown.classList.contains('is-open')) {
      closeDropdown();
      toggle.focus();
    }
  }, { signal: moreDropdownAbort.signal });

  // Close on nav link click (for Swup)
  dropdown.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeDropdown, { signal: moreDropdownAbort.signal });
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
