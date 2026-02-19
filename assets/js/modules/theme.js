import { announce } from './announce.js';

/* ==========================================================================
   Dark Mode Toggle
   ========================================================================== */

export function initDarkMode() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const updateThemeImages = (theme) => {
    document.querySelectorAll('.theme-img').forEach((img) => {
      img.src = img.getAttribute('data-' + theme) || img.src;
    });
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeImages(theme);
  };

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    announce(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Set correct images for current theme on page load
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeImages(currentTheme);
}

/* ==========================================================================
   Language Toggle
   ========================================================================== */

export function initLanguage() {
  const toggle = document.querySelector('.lang-toggle');
  if (!toggle) return;

  const setLang = (lang) => {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
  };

  const updateI18n = (lang) => {
    toggle.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
    document.querySelectorAll('[data-i18n-' + lang + ']').forEach(el => {
      const text = el.getAttribute('data-i18n-' + lang);
      if (el.tagName === 'INPUT') el.placeholder = text;
      else if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', text);
    });
  };

  const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
  updateI18n(currentLang);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-lang');
    const next = current === 'en' ? 'es' : 'en';
    setLang(next);
    updateI18n(next);
    announce(next === 'es' ? 'Idioma cambiado a español' : 'Language changed to English');
  });
}

/* ==========================================================================
   Accent Color Customization
   ========================================================================== */

export function initColorCustomization() {
  var toggle = document.querySelector('.color-toggle');
  var picker = document.querySelector('.color-picker');
  if (!toggle || !picker) return;

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return r + ', ' + g + ', ' + b;
  }

  function applyColors(primary, accent) {
    var root = document.documentElement;
    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-accent', accent);
    root.style.setProperty('--color-primary-rgb', hexToRgb(primary));
    root.style.setProperty('--color-accent-rgb', hexToRgb(accent));
    root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, ' + primary + ', ' + accent + ')');
    root.style.setProperty('--gradient-subtle', 'linear-gradient(135deg, ' + primary + '14, ' + accent + '14)');
  }

  function openPicker() {
    picker.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    var checked = picker.querySelector('[aria-checked="true"]') || swatches[0];
    if (checked) checked.focus();
  }

  function closePicker() {
    picker.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Toggle picker
  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (picker.classList.contains('is-open')) {
      closePicker();
    } else {
      openPicker();
    }
  });

  // Close picker on outside click
  document.addEventListener('click', function(e) {
    if (!picker.contains(e.target) && e.target !== toggle) {
      closePicker();
    }
  });

  // Close picker on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && picker.classList.contains('is-open')) {
      closePicker();
      toggle.focus();
    }
  });

  // Swatch click
  var swatches = picker.querySelectorAll('.color-swatch');

  function selectSwatch(swatch) {
    var primary = swatch.getAttribute('data-primary');
    var accent = swatch.getAttribute('data-accent');

    swatches.forEach(function(s) {
      s.classList.remove('is-active');
      s.setAttribute('aria-checked', 'false');
      s.setAttribute('tabindex', '-1');
    });
    swatch.classList.add('is-active');
    swatch.setAttribute('aria-checked', 'true');
    swatch.setAttribute('tabindex', '0');

    applyColors(primary, accent);
    localStorage.setItem('accent-colors', JSON.stringify({ primary: primary, accent: accent }));
    announce('Accent color changed to ' + swatch.getAttribute('aria-label'));
    closePicker();
  }

  swatches.forEach(function(swatch, index) {
    swatch.addEventListener('click', function() {
      selectSwatch(this);
    });

    // Arrow key navigation within radio group
    swatch.addEventListener('keydown', function(e) {
      var nextIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (index + 1) % swatches.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (index - 1 + swatches.length) % swatches.length;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSwatch(this);
        return;
      } else {
        return;
      }
      swatches[index].setAttribute('tabindex', '-1');
      swatches[nextIndex].setAttribute('tabindex', '0');
      swatches[nextIndex].focus();
    });
  });

  // Restore saved colors
  var saved = localStorage.getItem('accent-colors');
  if (saved) {
    try {
      var colors = JSON.parse(saved);
      applyColors(colors.primary, colors.accent);

      // Mark active swatch
      swatches.forEach(function(swatch) {
        if (swatch.getAttribute('data-primary') === colors.primary &&
            swatch.getAttribute('data-accent') === colors.accent) {
          swatch.classList.add('is-active');
          swatch.setAttribute('aria-checked', 'true');
          swatch.setAttribute('tabindex', '0');
        } else {
          swatch.setAttribute('aria-checked', 'false');
          swatch.setAttribute('tabindex', '-1');
        }
      });
    } catch (e) {
      // Invalid saved data, ignore
    }
  }
}
