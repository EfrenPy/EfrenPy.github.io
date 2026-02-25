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

