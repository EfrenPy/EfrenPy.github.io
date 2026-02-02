# Performance Improvements

Deep analysis and implementation guide for improving site performance metrics (LCP, FID, CLS, TTFB).

---

## Table of Contents

1. [Font Loading Optimization](#1-font-loading-optimization)
2. [Image Dimension Attributes](#2-image-dimension-attributes)
3. [Script Loading Strategy](#3-script-loading-strategy)
4. [Critical CSS Inlining](#4-critical-css-inlining)
5. [Service Worker Enhancement](#5-service-worker-enhancement)
6. [CSS Bundle Reduction](#6-css-bundle-reduction)
7. [Gradient Mesh Performance](#7-gradient-mesh-performance)

---

## 1. Font Loading Optimization

### Current State

**File:** `_includes/head/custom.html` (lines 5-8)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

**Issues:**
- Loading 5 weights of Inter (300, 400, 500, 600, 700) and 3 weights of Space Grotesk (500, 600, 700) = 8 font files
- Google Fonts CSS is render-blocking despite `display=swap`
- No font subsetting (loading full character sets)
- Two DNS lookups required (googleapis.com + gstatic.com)

### Implementation

#### Option A: Preload critical fonts + reduce weights

```html
<!-- _includes/head/custom.html -->

<!-- Preconnect (keep existing) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload the most critical font weights -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap">

<!-- Load fonts non-blocking -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap" media="print" onload="this.media='all'">

<!-- Fallback for no-JS -->
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap">
</noscript>
```

**Changes:**
- Reduced Inter from 5 weights to 2 (400, 600) - covers body and semi-bold
- Reduced Space Grotesk from 3 weights to 2 (600, 700) - covers headers
- Non-blocking load via `media="print"` trick
- Preload hint for the CSS file itself

#### Option B: Self-host fonts (best performance)

1. Download fonts from [google-webfonts-helper](https://gwfh.mranftl.com/)
2. Place WOFF2 files in `assets/fonts/`
3. Add `@font-face` declarations in `_sass/_variables.scss`:

```scss
// _sass/_variables.scss - add at the top

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/inter-v13-latin-regular.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/assets/fonts/inter-v13-latin-600.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/assets/fonts/space-grotesk-v16-latin-600.woff2') format('woff2');
}

@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/assets/fonts/space-grotesk-v16-latin-700.woff2') format('woff2');
}
```

Then remove the Google Fonts `<link>` from `head/custom.html` entirely.

**Benefits of self-hosting:**
- Eliminates 2 DNS lookups + 1 CSS request to Google
- WOFF2 only (no legacy format overhead)
- `font-display: swap` guaranteed
- `unicode-range` subsetting reduces file sizes
- Fonts cached by your own service worker

#### Font weight audit

Review `_sass/` files to confirm which weights are actually used:

| Weight | Where Used | Keep? |
|--------|-----------|-------|
| 300 (Light) | Not found in active styles | Remove |
| 400 (Regular) | Body text, paragraphs | Keep |
| 500 (Medium) | Minor uses in buttons | Can map to 600 |
| 600 (SemiBold) | Headings, nav links, emphasis | Keep |
| 700 (Bold) | `<strong>`, page titles | Keep for Space Grotesk |

---

## 2. Image Dimension Attributes

### Current State

**No images across the site have `width` and `height` attributes**, causing Cumulative Layout Shift (CLS).

**Affected files:**
- `_includes/archive-single.html` (line 67-73) - project teaser images
- `_includes/author-profile.html` (line 11-13) - avatar
- `_includes/sidebar.html` (line 9-15) - sidebar images
- `_includes/page__hero.html` (line 50) - hero images
- `_includes/gallery` (lines 28-43) - gallery images

### Implementation

#### Archive teasers (`_includes/archive-single.html`)

Replace (around line 67-73):
```html
<img src=
  {% if teaser contains "://" %}
    "{{ teaser }}"
  {% else %}
    "{{ teaser | prepend: "/images/" | prepend: base_path }}"
  {% endif %}
  alt="" loading="lazy">
```

With:
```html
<img src=
  {% if teaser contains "://" %}
    "{{ teaser }}"
  {% else %}
    "{{ teaser | prepend: "/images/" | prepend: base_path }}"
  {% endif %}
  alt="{% if post.title %}{{ post.title | strip_html }}{% endif %}"
  width="150" height="150"
  loading="lazy"
  decoding="async">
```

#### Author avatar (`_includes/author-profile.html`)

Add dimensions matching the CSS `.author__avatar` size:
```html
<img src="{{ author.avatar | prepend: "/images/" | prepend: base_path }}"
     class="author__avatar"
     alt="{{ author.name }}"
     width="110" height="110"
     loading="lazy"
     decoding="async">
```

#### CSS aspect-ratio fallback (`_sass/_archive.scss`)

Add `aspect-ratio` to prevent layout shift even without explicit dimensions:

```scss
// _sass/_archive.scss - add inside .archive__item-teaser

.archive__item-teaser {
  flex-shrink: 0;
  width: 150px;
  align-self: center;

  img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
}
```

#### Hero images (`_includes/page__hero.html`)

```html
<img src="{{ img_path }}"
     alt="{{ page.title }}"
     class="page__hero-image"
     width="1200" height="400"
     loading="lazy"
     decoding="async"
     style="aspect-ratio: 3/1; object-fit: cover;">
```

---

## 3. Script Loading Strategy

### Current State

**File:** `_includes/head.html` (lines 54-56)
- `swup.min.js` loaded in `<head>` (render-blocking)
- Inline Swup initialization script in `<head>` (render-blocking)

**File:** `_includes/scripts.html` (line 1)
- `main.min.js` loaded at end of `<body>` without `defer` or `async`

**File:** `_includes/head.html` (lines 18-52)
- 4 inline scripts for SW registration, JS detection, dark mode, and language

### Implementation

#### Move Swup to deferred loading

In `_includes/head.html`, change:
```html
<script src="{{ base_path }}/assets/js/swup.min.js?v={{ site.time | date: '%s' }}"></script>
```

To:
```html
<script src="{{ base_path }}/assets/js/swup.min.js?v={{ site.time | date: '%s' }}" defer></script>
```

#### Add defer to main.min.js

In `_includes/scripts.html`, change:
```html
<script src="{{ base_path }}/assets/js/main.min.js?v={{ site.time | date: '%s' }}"></script>
```

To:
```html
<script src="{{ base_path }}/assets/js/main.min.js?v={{ site.time | date: '%s' }}" defer></script>
```

#### Keep critical inline scripts in head

The dark mode and language detection scripts MUST stay in `<head>` to prevent FOUC (Flash of Unstyled Content). These are fine as-is since they're small and prevent visible layout thrashing.

#### Consolidate inline scripts

Merge the 4 inline scripts in `head.html` into a single `<script>` block to reduce parse overhead:

```html
<script>
  // JS detection
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // Dark mode (prevent FOUC)
  (function(){
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();

  // Language detection (prevent FOUC)
  (function(){
    var l = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('data-lang', l);
  })();

  // Service worker (non-blocking)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
  }
</script>
```

**Key change:** Service worker registration moved inside `load` event so it doesn't compete with critical resources.

---

## 4. Critical CSS Inlining

### Current State

All CSS loads via a single `main.css` file. On first visit, the browser must download and parse the entire stylesheet before rendering anything.

### Implementation

#### Extract above-the-fold CSS

Create a minimal inline stylesheet for first-paint content:

```html
<!-- _includes/head.html - add before the main stylesheet link -->
<style>
  /* Critical CSS - masthead, hero, basic layout */
  :root {
    --color-background: #fff;
    --color-text: #1e293b;
    --color-primary: #52adc8;
  }
  [data-theme="dark"] {
    --color-background: #0f172a;
    --color-text: #e2e8f0;
    --color-primary: #67d4f1;
  }
  body {
    margin: 0;
    font-family: "Inter", -apple-system, sans-serif;
    background: var(--color-background);
    color: var(--color-text);
  }
  .masthead {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border, #e2e8f0);
  }
  .site-nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gradient-mesh { display: none; }
</style>
```

Then load the full stylesheet non-blocking:
```html
<link rel="stylesheet" href="{{ base_path }}/assets/css/main.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="{{ base_path }}/assets/css/main.css"></noscript>
```

**Note:** This is an advanced optimization. Measure with Lighthouse first to determine if the current approach is already acceptable.

---

## 5. Service Worker Enhancement

### Current State

**File:** `sw.js`

- Only 7 assets precached (missing main.min.js, fonts)
- Network-first strategy only (no stale-while-revalidate)
- Single cache version (`efren-site-v1`)
- No runtime caching for Google Fonts

### Implementation

#### Enhanced precache list

```javascript
// sw.js - update PRECACHE_ASSETS

const CACHE_NAME = 'efren-site-v2';
const PRECACHE_ASSETS = [
  '/',
  '/offline/',
  '/assets/css/main.css',
  '/assets/js/main.min.js',
  '/assets/js/swup.min.js',
  '/favicon.png',
  '/images/logo.png',
  '/images/webp/profile.webp',
  // Self-hosted fonts (if using Option B above)
  '/assets/fonts/inter-v13-latin-regular.woff2',
  '/assets/fonts/inter-v13-latin-600.woff2',
  '/assets/fonts/space-grotesk-v16-latin-600.woff2',
  '/assets/fonts/space-grotesk-v16-latin-700.woff2'
];
```

#### Add stale-while-revalidate for pages

```javascript
// sw.js - replace fetch handler

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache-first for static assets (CSS, JS, fonts, images)
  if (url.pathname.match(/\.(css|js|woff2?|png|webp|jpg|svg)$/)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Network-first for HTML pages
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('/offline/')))
    );
    return;
  }
});
```

#### Cache Google Fonts at runtime

```javascript
// sw.js - add Google Fonts caching (only if NOT self-hosting)

if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME + '-fonts').then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
  return;
}
```

---

## 6. CSS Bundle Reduction

### Current State

Font Awesome is loaded via 3 SCSS imports:
```scss
@import "vendor/font-awesome/fontawesome";  // Core
@import "vendor/font-awesome/solid";        // All solid icons
@import "vendor/font-awesome/brands";       // All brand icons
```

This includes the full icon sets when only ~20 icons are actually used.

### Implementation

#### Audit used icons

Search the codebase for `fa-` usage to build a list of actually used icons:

**Solid icons used:** `fa-home`, `fa-chevron-up`, `fa-external-link`, `fa-sun`, `fa-moon`, `fa-graduation-cap`, `fa-briefcase`, `fa-code`, `fa-certificate`, `fa-book`, `fa-chalkboard-teacher`, `fa-shield-alt`, `fa-envelope`, `fa-globe`, `fa-bars`, `fa-times`, `fa-palette`

**Brand icons used:** `fa-github`, `fa-linkedin`, `fa-instagram`, `fa-orcid`, `fa-google-scholar`, `fa-python`

#### Option: Switch to SVG icon sprites

Instead of loading the full Font Awesome font files, create an SVG sprite with only the icons used:

```html
<!-- _includes/head.html or as a separate include -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-home" viewBox="0 0 576 512">
    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1..."/>
  </symbol>
  <!-- ... other icons -->
</svg>
```

This is a significant effort but can reduce CSS bundle by 50-100KB.

**Simpler alternative:** Use a Font Awesome kit with only the needed icons via their CDN subsetting feature.

---

## 7. Gradient Mesh Performance

### Current State

**File:** `_layouts/default.html` (lines 17-21)

```html
<div class="gradient-mesh">
  <div class="gradient-orb gradient-orb--1"></div>
  <div class="gradient-orb gradient-orb--2"></div>
  <div class="gradient-orb gradient-orb--3"></div>
</div>
```

Three animated gradient orbs with CSS animations run on every page, consuming GPU resources.

### Implementation

#### Add `will-change` for GPU compositing

```scss
// _sass/_animations.scss

.gradient-orb {
  will-change: transform;
  contain: strict;
}
```

#### Limit to homepage only

If the gradient mesh is only visually important on the homepage, conditionally render it:

```html
<!-- _layouts/default.html -->
{% if page.url == "/" %}
<div class="gradient-mesh" aria-hidden="true">
  <div class="gradient-orb gradient-orb--1"></div>
  <div class="gradient-orb gradient-orb--2"></div>
  <div class="gradient-orb gradient-orb--3"></div>
</div>
{% endif %}
```

#### Pause animations when off-screen

```javascript
// assets/js/_main.js - add to initPageFeatures()

const mesh = document.querySelector('.gradient-mesh');
if (mesh) {
  const observer = new IntersectionObserver(([entry]) => {
    mesh.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
  });
  observer.observe(mesh);
}
```

---

## Priority Matrix

| Improvement | Impact | Effort | Priority |
|------------|--------|--------|----------|
| Image width/height attributes | High (CLS) | Low | P0 |
| Script defer/async | High (FID) | Low | P0 |
| Font weight reduction | Medium (LCP) | Low | P1 |
| Self-host fonts | High (LCP) | Medium | P1 |
| Service worker enhancement | Medium (repeat visits) | Medium | P2 |
| Critical CSS inlining | Medium (FCP) | High | P2 |
| CSS bundle reduction | Low-Medium | High | P3 |
| Gradient mesh optimization | Low | Low | P3 |

---

## Measurement

Before implementing, establish baselines:

```bash
# Run Lighthouse CLI
npx lighthouse https://efrenrodriguezrodriguez.com --output=json --output-path=./lighthouse-baseline.json

# Key metrics to track:
# - Largest Contentful Paint (LCP) - target < 2.5s
# - First Input Delay (FID) - target < 100ms
# - Cumulative Layout Shift (CLS) - target < 0.1
# - First Contentful Paint (FCP) - target < 1.8s
# - Time to Interactive (TTI) - target < 3.8s
```

After each change, re-run and compare against baseline.
