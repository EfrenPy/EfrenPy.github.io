# Accessibility Improvements

Deep analysis and implementation guide for improving WCAG 2.1 AA compliance and overall accessibility.

---

## Table of Contents

1. [Skip Navigation Link](#1-skip-navigation-link)
2. [Focus Indicator Consistency](#2-focus-indicator-consistency)
3. [Color Contrast Audit](#3-color-contrast-audit)
4. [Keyboard Navigation Enhancements](#4-keyboard-navigation-enhancements)
5. [ARIA Live Regions](#5-aria-live-regions)
6. [Image Alt Text Audit](#6-image-alt-text-audit)
7. [Language Toggle Accessibility](#7-language-toggle-accessibility)
8. [Color Picker Accessibility](#8-color-picker-accessibility)
9. [Lightbox Accessibility](#9-lightbox-accessibility)

---

## 1. Skip Navigation Link

### Current State

**File:** `_sass/_utilities.scss` (lines 99-113)

The `.skip-link` class is **defined** in CSS but **never instantiated** in any layout HTML:

```scss
.skip-link {
  position: fixed;
  z-index: 20;
  margin: 0;
  font-family: $sans-serif;
  white-space: nowrap;
}
```

The `.screen-reader-shortcut:focus` styles (lines 80-94) exist to make skip links visible on focus:

```scss
.screen-reader-text:focus,
.screen-reader-shortcut:focus {
  clip: auto !important;
  height: auto !important;
  width: auto !important;
  display: block;
  font-size: 1em;
  font-weight: bold;
  padding: 15px 23px 14px;
  background: #fff;
  z-index: 100000;
}
```

### Implementation

Add a skip link as the first focusable element in `_layouts/default.html`:

```html
<!-- _layouts/default.html - add as first child of <body> -->
<body>
  <a class="skip-link screen-reader-shortcut" href="#main">
    Skip to main content
  </a>

  <div class="gradient-mesh" aria-hidden="true">
    <!-- ... existing mesh divs ... -->
  </div>
  {% include masthead.html %}
  <!-- ... rest of layout ... -->
```

Update the CSS to make it properly functional:

```scss
// _sass/_utilities.scss - replace .skip-link definition

.skip-link {
  position: fixed;
  top: -100%;
  left: 1rem;
  z-index: 10000;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary, #52adc8);
  color: #fff;
  font-family: $sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  border-radius: 0 0 0.5rem 0.5rem;
  white-space: nowrap;
  transition: top 0.2s ease;

  &:focus {
    top: 0;
    outline: 2px solid var(--color-accent, #8B5CF6);
    outline-offset: 2px;
  }
}
```

Ensure the `#main` target has proper scroll behavior:

```scss
// _sass/_base.scss - add
#main:target {
  scroll-margin-top: 4rem; // account for sticky masthead
}
```

---

## 2. Focus Indicator Consistency

### Current State

Focus styles are defined in multiple places with inconsistent patterns:

| Location | Focus Style | Issues |
|----------|------------|--------|
| `_utilities.scss:1235` | `outline: 2px solid var(--color-primary)` with `outline-offset: 3px` | Good - global `focus-visible` |
| `_base.scss:131` | `%tab-focus` mixin (dotted outline, warning color) | Conflicts with global style |
| `_forms.scss:224` | `outline: 0` with `box-shadow` ring | Removes outline, shadow only |
| `_masthead.scss:57` | Hover state only, no focus-specific style | Missing focus indicator |
| `_navigation.scss:295` | Hover underline animation, no focus | Missing focus indicator |

### Implementation

#### Standardize on a single focus style

Remove conflicting focus definitions and ensure the global `focus-visible` is the baseline:

```scss
// _sass/_utilities.scss - keep and enhance the global rule

*:focus-visible {
  outline: 2px solid var(--color-primary, #52adc8);
  outline-offset: 3px;
  border-radius: 2px;
}

// High contrast for dark mode
[data-theme="dark"] *:focus-visible {
  outline-color: var(--color-primary, #67d4f1);
}
```

#### Fix navigation focus states

```scss
// _sass/_navigation.scss - add focus state alongside hover

.nav-links a {
  // ... existing styles ...

  &:hover,
  &:focus-visible {
    color: var(--color-primary, $info-color);
    &:before {
      transform: scaleX(1);
    }
  }
}
```

#### Fix masthead button focus states

```scss
// _sass/_masthead.scss - add focus states to toggle buttons

.theme-toggle,
.lang-toggle,
.color-toggle {
  // ... existing styles ...

  &:hover,
  &:focus-visible {
    color: var(--color-primary, $info-color);
    background: var(--color-background-secondary, $lighter-gray);
  }

  // Remove transform on focus (rotation can be disorienting)
  &:focus-visible {
    transform: none;
  }
}
```

#### Fix form focus states

```scss
// _sass/_forms.scss - ensure outline is visible, not just box-shadow

input:focus-visible,
textarea:focus-visible {
  border-color: var(--color-primary, $primary-color);
  outline: 2px solid var(--color-primary, $primary-color);
  outline-offset: -2px;
  box-shadow: 0 0 0 3px rgba(82, 173, 200, 0.25);
}
```

#### Remove conflicting `%tab-focus` mixin

In `_sass/_mixins.scss`, the `%tab-focus` mixin (lines 5-11) uses a warning color and dotted outline that conflicts with the cleaner global style. Either:
- Remove the mixin entirely
- Or update it to match the global pattern

```scss
// _sass/_mixins.scss - update to match global style

%tab-focus {
  outline: 2px solid var(--color-primary, #52adc8);
  outline-offset: 3px;
}
```

---

## 3. Color Contrast Audit

### Current State

**File:** `_sass/_variables.scss`

The site offers 5 accent color schemes. Each must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text).

#### Light Mode Analysis (background: `#fff`)

| Color | Hex | Contrast vs #fff | AA Normal | AA Large |
|-------|-----|-------------------|-----------|----------|
| Primary (Ocean) | `#52adc8` | ~3.2:1 | FAIL | PASS |
| Accent (Purple) | `#8B5CF6` | ~3.9:1 | FAIL | PASS |
| Text | `#1e293b` | ~15:1 | PASS | PASS |
| Text Light | `#64748b` | ~4.7:1 | PASS | PASS |

#### Dark Mode Analysis (background: `#0f172a`)

| Color | Hex | Contrast vs #0f172a | AA Normal | AA Large |
|-------|-----|---------------------|-----------|----------|
| Primary (Ocean) | `#67d4f1` | ~8.5:1 | PASS | PASS |
| Accent (Purple) | `#a78bfa` | ~5.5:1 | PASS | PASS |
| Text | `#e2e8f0` | ~14:1 | PASS | PASS |
| Text Light | `#94a3b8` | ~6.5:1 | PASS | PASS |

### Issues

**Light mode primary color `#52adc8` fails AA for normal text.** This color is used for:
- Links
- Navigation active state
- Buttons
- Accent highlights

### Implementation

#### Darken the light-mode primary

```scss
// _sass/_variables.scss - update light mode primary

:root {
  --color-primary: #3a8fa8;  // Darkened from #52adc8 (now ~4.6:1 contrast)
  --color-accent: #7c3aed;   // Darkened from #8B5CF6 (now ~5.5:1 contrast)
}
```

#### Audit all 5 accent color schemes

The accent colors are defined in JavaScript (`_main.js`) and injected as CSS variables. Each scheme must be checked:

```javascript
// Current accent colors from _main.js
const colorSchemes = {
  'ocean-purple': { primary: '#52adc8', accent: '#8B5CF6' },    // Needs fixing
  'emerald-cyan': { primary: '#10b981', accent: '#06b6d4' },    // Check contrast
  'amber-red':    { primary: '#f59e0b', accent: '#ef4444' },    // Check contrast
  'pink-purple':  { primary: '#ec4899', accent: '#8b5cf6' },    // Check contrast
  'indigo-teal':  { primary: '#6366f1', accent: '#14b8a6' }     // Check contrast
};
```

**Recommended fixes for light mode:**

| Scheme | Current Primary | Fixed Primary | Current Accent | Fixed Accent |
|--------|----------------|---------------|----------------|--------------|
| Ocean Purple | `#52adc8` | `#3a8fa8` | `#8B5CF6` | `#7c3aed` |
| Emerald Cyan | `#10b981` | `#059669` | `#06b6d4` | `#0891b2` |
| Amber Red | `#f59e0b` | `#d97706` | `#ef4444` | `#dc2626` |
| Pink Purple | `#ec4899` | `#db2777` | `#8b5cf6` | `#7c3aed` |
| Indigo Teal | `#6366f1` | `#4f46e5` | `#14b8a6` | `#0d9488` |

**Rule of thumb:** If a color is used as text on a white background, it needs a contrast ratio of at least 4.5:1. Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify each.

---

## 4. Keyboard Navigation Enhancements

### Current State

**File:** `assets/js/_main.js`

- Mobile nav toggle updates `aria-expanded` (good)
- Sidebar follow button updates `aria-expanded` (good)
- No keyboard trap prevention for modals
- Color picker swatches lack keyboard arrow navigation
- Scroll-to-top button is keyboard accessible

### Implementation

#### Add Escape key to close mobile nav

```javascript
// assets/js/_main.js - add to initMobileNav()

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && nav.classList.contains('is-visible')) {
    nav.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus(); // Return focus to toggle button
  }
});
```

#### Add keyboard navigation to color picker

```javascript
// assets/js/_main.js - add to color picker initialization

const swatches = document.querySelectorAll('.color-swatch');
swatches.forEach((swatch, index) => {
  swatch.setAttribute('role', 'radio');
  swatch.setAttribute('tabindex', index === 0 ? '0' : '-1');

  swatch.addEventListener('keydown', function(e) {
    let nextIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % swatches.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + swatches.length) % swatches.length;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      swatch.click();
      return;
    } else {
      return;
    }

    swatches[index].setAttribute('tabindex', '-1');
    swatches[nextIndex].setAttribute('tabindex', '0');
    swatches[nextIndex].focus();
  });
});
```

Also add `role="radiogroup"` to the color picker container:

```html
<!-- _includes/masthead.html -->
<div class="color-picker" role="radiogroup" aria-label="Accent color">
```

#### Focus management after Swup page transitions

```javascript
// assets/js/_main.js - add to Swup page:view hook

swup.hooks.on('page:view', function() {
  // Move focus to the main content area after navigation
  const main = document.getElementById('main');
  if (main) {
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  }
});
```

---

## 5. ARIA Live Regions

### Current State

No `aria-live` regions exist. When the language or theme is toggled, screen readers receive no announcement.

### Implementation

#### Add a live region announcer

```html
<!-- _layouts/default.html - add before </body> -->
<div id="sr-announcer" class="visually-hidden" aria-live="polite" aria-atomic="true"></div>
```

#### Announce theme changes

```javascript
// assets/js/_main.js - add to theme toggle handler

function announce(message) {
  const announcer = document.getElementById('sr-announcer');
  if (announcer) {
    announcer.textContent = message;
    // Clear after announcement is read
    setTimeout(() => { announcer.textContent = ''; }, 1000);
  }
}

// In theme toggle:
announce(isDark ? 'Dark mode enabled' : 'Light mode enabled');

// In language toggle:
announce(lang === 'es' ? 'Idioma cambiado a español' : 'Language changed to English');

// In accent color change:
announce('Accent color changed to ' + colorName);
```

---

## 6. Image Alt Text Audit

### Current State

**File:** `_includes/archive-single.html` (line 73)

Teaser images have empty `alt=""`:
```html
<img src="..." alt="" loading="lazy">
```

**File:** `_includes/sidebar.html` (line 14)

Sidebar images have conditional alt text that may be empty:
```html
alt="{% if s.image_alt %}{{ s.image_alt }}{% endif %}"
```

### Implementation

#### Fix archive teaser alt text

```html
<!-- _includes/archive-single.html - update img tag -->
<img src="..."
  alt="{{ title | strip_html | default: 'Project thumbnail' }}"
  loading="lazy"
  decoding="async">
```

#### Fix sidebar images

```html
<!-- _includes/sidebar.html - provide fallback alt -->
alt="{{ s.image_alt | default: s.title | default: 'Sidebar image' }}"
```

#### Gallery images

Ensure gallery items in front matter always include `alt` keys:

```yaml
# In portfolio/publication front matter
gallery1:
  - url: webp/image.webp
    image_path: webp/image.webp
    alt: "Descriptive alt text for the image"  # Always provide this
```

#### Decorative images

For purely decorative images (gradient orbs, dividers), ensure they have:
```html
<img src="decorative.png" alt="" role="presentation">
```

---

## 7. Language Toggle Accessibility

### Current State

**File:** `_includes/masthead.html` (line 36)

```html
<button class="lang-toggle" aria-label="Toggle language" title="Toggle language">
```

**Issues:**
- No indication of the currently active language
- Screen reader users don't know which language is selected
- The button label doesn't describe the action clearly

### Implementation

#### Update button with current state

```html
<!-- _includes/masthead.html -->
<button class="lang-toggle"
        aria-label="Switch language"
        aria-pressed="false"
        data-lang-label-en="Switch to Spanish"
        data-lang-label-es="Cambiar a inglés"
        title="Switch language">
  <span class="lang-en" aria-hidden="true">EN</span>
  <span class="lang-es" aria-hidden="true">ES</span>
</button>
```

#### Update JavaScript to manage state

```javascript
// assets/js/_main.js - in language toggle handler

langToggle.addEventListener('click', function() {
  const currentLang = document.documentElement.getAttribute('data-lang');
  const newLang = currentLang === 'en' ? 'es' : 'en';

  document.documentElement.setAttribute('data-lang', newLang);

  // Update accessible label
  const label = newLang === 'en'
    ? this.dataset.langLabelEn
    : this.dataset.langLabelEs;
  this.setAttribute('aria-label', label);

  // Announce change
  announce(newLang === 'es' ? 'Idioma cambiado a español' : 'Language changed to English');

  localStorage.setItem('language', newLang);
});
```

---

## 8. Color Picker Accessibility

### Current State

**File:** `_includes/masthead.html` (lines 40-49)

```html
<button class="color-toggle" aria-label="Change accent color" title="Change accent color">
  <i class="fas fa-palette" aria-hidden="true"></i>
</button>
<div class="color-picker" aria-hidden="true">
  <button class="color-swatch" data-color="ocean-purple" aria-label="Ocean Purple" style="..."></button>
  <!-- ... 4 more swatches -->
</div>
```

**Issues:**
- Swatches lack `role="radio"` for group selection semantics
- No `aria-checked` to indicate the active color
- No keyboard arrow navigation between swatches
- `aria-hidden="true"` on picker doesn't toggle when opened

### Implementation

```html
<!-- _includes/masthead.html - updated color picker -->
<button class="color-toggle"
        aria-label="Change accent color"
        aria-expanded="false"
        aria-controls="color-picker">
  <i class="fas fa-palette" aria-hidden="true"></i>
</button>

<div id="color-picker" class="color-picker" role="radiogroup" aria-label="Accent color scheme" hidden>
  <button class="color-swatch" role="radio" aria-checked="true"
          data-color="ocean-purple" aria-label="Ocean Purple"
          tabindex="0" style="..."></button>
  <button class="color-swatch" role="radio" aria-checked="false"
          data-color="emerald-cyan" aria-label="Emerald Cyan"
          tabindex="-1" style="..."></button>
  <button class="color-swatch" role="radio" aria-checked="false"
          data-color="amber-red" aria-label="Amber Red"
          tabindex="-1" style="..."></button>
  <button class="color-swatch" role="radio" aria-checked="false"
          data-color="pink-purple" aria-label="Pink Purple"
          tabindex="-1" style="..."></button>
  <button class="color-swatch" role="radio" aria-checked="false"
          data-color="indigo-teal" aria-label="Indigo Teal"
          tabindex="-1" style="..."></button>
</div>
```

JavaScript updates:
```javascript
// Toggle picker visibility
colorToggle.addEventListener('click', function() {
  const picker = document.getElementById('color-picker');
  const isHidden = picker.hidden;
  picker.hidden = !isHidden;
  this.setAttribute('aria-expanded', String(isHidden));

  if (isHidden) {
    // Focus the currently selected swatch
    const checked = picker.querySelector('[aria-checked="true"]');
    if (checked) checked.focus();
  }
});

// Update aria-checked on color selection
function selectColor(swatch) {
  document.querySelectorAll('.color-swatch').forEach(s => {
    s.setAttribute('aria-checked', 'false');
    s.setAttribute('tabindex', '-1');
  });
  swatch.setAttribute('aria-checked', 'true');
  swatch.setAttribute('tabindex', '0');
}
```

---

## 9. Lightbox Accessibility

### Current State

**File:** `assets/js/_main.js` (lines 160-166)

The lightbox uses a native `<dialog>` element (good), but needs verification:

```javascript
// Creates dialog dynamically
const dialog = document.createElement('dialog');
dialog.classList.add('lightbox');
// ... adds image ...
document.body.appendChild(dialog);
dialog.showModal();
```

### Implementation

Ensure the lightbox is fully accessible:

```javascript
// assets/js/_main.js - enhanced lightbox

function openLightbox(imgSrc, imgAlt) {
  const dialog = document.createElement('dialog');
  dialog.classList.add('lightbox');
  dialog.setAttribute('aria-label', imgAlt || 'Image preview');

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = imgAlt || '';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox__close';
  closeBtn.setAttribute('aria-label', 'Close image preview');
  closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.appendChild(closeBtn);
  dialog.appendChild(img);
  document.body.appendChild(dialog);

  dialog.showModal();
  closeBtn.focus(); // Focus close button on open

  // Announce to screen readers
  announce('Image preview opened: ' + (imgAlt || 'image'));

  dialog.addEventListener('close', function() {
    dialog.remove();
    // Return focus to the trigger element
    if (this._trigger) this._trigger.focus();
    announce('Image preview closed');
  });

  // Close on backdrop click (native dialog behavior)
  dialog.addEventListener('click', function(e) {
    if (e.target === dialog) dialog.close();
  });
}
```

---

## Testing Checklist

After implementing, verify with these tools:

### Automated Testing
```bash
# Install axe-cli
npm install -g @axe-core/cli

# Run accessibility audit
axe https://efrenrodriguezrodriguez.com --tags wcag2a,wcag2aa

# Or use Lighthouse
npx lighthouse https://efrenrodriguezrodriguez.com --only-categories=accessibility
```

### Manual Testing
- [ ] Tab through entire page - all interactive elements reachable
- [ ] Skip link visible on first Tab press
- [ ] Focus indicators visible on every interactive element
- [ ] Escape closes mobile nav and color picker
- [ ] Screen reader announces theme/language changes
- [ ] Color picker navigable with arrow keys
- [ ] Lightbox traps focus and returns focus on close
- [ ] All images have meaningful alt text
- [ ] Site usable with 200% browser zoom
- [ ] Content readable with Windows High Contrast mode

### Screen Readers to Test With
- **macOS:** VoiceOver (built-in, Cmd+F5)
- **Windows:** NVDA (free) or JAWS
- **Chrome:** ChromeVox extension

---

## Priority Matrix

| Improvement | Impact | Effort | Priority |
|------------|--------|--------|----------|
| Skip navigation link | High | Low | P0 |
| Focus indicator consistency | High | Medium | P0 |
| Color contrast fixes | High | Low | P0 |
| Image alt text | Medium | Low | P1 |
| ARIA live regions | Medium | Low | P1 |
| Keyboard nav (Escape key) | Medium | Low | P1 |
| Language toggle state | Medium | Low | P1 |
| Color picker a11y | Medium | Medium | P2 |
| Lightbox accessibility | Medium | Medium | P2 |
| Focus management after Swup | Low | Medium | P2 |
