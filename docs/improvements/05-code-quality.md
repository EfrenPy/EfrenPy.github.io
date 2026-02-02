# Code Quality & Cleanup

Deep analysis and implementation guide for removing dead code, consolidating duplicates, and reducing bundle size.

---

## Table of Contents

1. [Dead CSS Classes](#1-dead-css-classes)
2. [Dead JavaScript Code](#2-dead-javascript-code)
3. [Disabled Features Cleanup](#3-disabled-features-cleanup)
4. [Orphaned Files](#4-orphaned-files)
5. [SCSS Duplication](#5-scss-duplication)
6. [Bundle Size Optimization](#6-bundle-size-optimization)
7. [Configuration Cleanup](#7-configuration-cleanup)

---

## 1. Dead CSS Classes

### Unused Utility Classes

**File:** `_sass/_utilities.scss` (1,248 lines)

The following classes are defined but never used anywhere in the codebase:

| Class | Lines | Description | Action |
|-------|-------|-------------|--------|
| `.load` | 18-20 | Preloading utility | Remove |
| `.transparent` | 22-24 | Sets opacity to 0 | Remove |
| `.well` | 390-398 | Bootstrap-style well | Remove |
| `.modal` | 405-430 | Modal dialog overlay | Remove |
| `.show-modal` | 432-453 | Modal visible state | Remove |
| `.sticky` | ~150 | Position sticky utility | Verify usage, likely remove |

**Estimated savings:** ~80 lines of SCSS

#### Implementation

Remove each unused class block. Example for `.well` and `.modal`:

```scss
// _sass/_utilities.scss - REMOVE these blocks

// DELETE: .well (lines 390-398)
// DELETE: .modal and .show-modal (lines 405-453)
// DELETE: .load (lines 18-20)
// DELETE: .transparent (lines 22-24)
```

### Unused Form Styles

**File:** `_sass/_forms.scss` (393 lines)

| Class | Lines | Description | Action |
|-------|-------|-------------|--------|
| `.form--loading` | 333-349 | Loading spinner state | Remove |
| `.form-inline` | 265-289 | Inline form layout | Remove |
| `.form-search` | 295-326 | Search form specific | Remove |
| `#goog-fixurl`, `#goog-wm-qt`, `#goog-wm-sb` | 365-392 | Google Webmaster search | Remove |
| `.input-mini`, `.input-small` | 94-100 | Bootstrap sizing | Remove |
| `.help-block`, `.help-inline` | 243-258 | Bootstrap help text | Remove |

**Estimated savings:** ~130 lines of SCSS

#### Implementation

```scss
// _sass/_forms.scss - REMOVE these blocks

// DELETE: .form--loading (lines 333-349)
// DELETE: .form-inline (lines 265-289)
// DELETE: .form-search (lines 295-326)
// DELETE: Google Webmaster IDs (lines 365-392)
// DELETE: .input-mini, .input-small (lines 94-100)
// DELETE: .help-block, .help-inline (lines 243-258)
```

### Notices (Conditionally Used)

**File:** `_sass/_notices.scss` (101 lines)

The `.notice` classes (`.notice--primary`, `.notice--info`, `.notice--warning`, `.notice--success`, `.notice--danger`) are only used in demo/example pages (`_pages/markdown.md` and `_pages/archive-layout-with-content.md`), not in production content.

**Decision:** Keep if you plan to use notices in future blog posts. Remove if not.

### Tables (Unused)

**File:** `_sass/_tables.scss` (62 lines)

No data tables exist on the site currently. Table styles are defined but never applied.

**Decision:** Keep if you plan to add tables to publications or blog posts. Consider keeping the basic styles but removing vendor-prefix overrides.

---

## 2. Dead JavaScript Code

### Unused `initCounters()` Function

**File:** `assets/js/_main.js` (lines 533-566)

```javascript
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        // ... counter animation logic (34 lines)
      }
    });
  });

  counters.forEach(counter => observer.observe(counter));
}
```

**Status:** This function animates number counters, but **no HTML element** on the site uses the `data-counter` attribute. The function is defined but never called from `initPageFeatures()`.

#### Implementation

Remove the entire `initCounters()` function (lines 533-566) from `_main.js`, then rebuild:

```bash
npm run build:js
```

**Savings:** 34 lines of JS, ~0.5KB from minified bundle

---

## 3. Disabled Features Cleanup

### Comments System

**Current state:**
- `_config.yml` line 24: `provider:` (empty/null)
- Multiple pages have `comments: true` in defaults
- `_includes/comments.html` (81 lines) is included but never renders
- `_includes/comments-providers/` directory contains:
  - `disqus.html`
  - `discourse.html`
  - `facebook.html`
  - `google-plus.html` (deprecated platform)
  - `staticman.html`
  - `staticman-v2.html`
  - `custom.html`
  - `scripts.html`

#### Implementation

**Option A: Clean removal (recommended if comments won't be added)**

1. Delete the comments providers directory:
```bash
rm -rf _includes/comments-providers/
```

2. Simplify `_includes/comments.html` to an empty file or remove the include from layouts:
```html
<!-- _includes/comments.html - replace with empty or remove entirely -->
```

3. Remove comments configuration from `_config.yml`:
```yaml
# Remove these lines
comments:
  provider:
```

4. Remove `comments: true` from page scope defaults in `_config.yml`.

**Option B: Keep for future use**

If you might add comments later, just remove the deprecated providers:
```bash
rm _includes/comments-providers/google-plus.html
rm _includes/comments-providers/staticman.html
```

### Analytics

**Current state:**
- `_config.yml`: `provider: false`
- `_includes/analytics.html` (13 lines) - just a conditional wrapper

**Decision:** Keep as-is. The file is small and correctly disabled. When you want analytics, just update the config.

---

## 4. Orphaned Files

### `assets/js/collapse.js`

**File:** `assets/js/collapse.js` (16 lines)

This file is NOT included in the esbuild pipeline (`package.json` only bundles `_main.js`). It's a standalone script for collapsible content.

**Usage check:** Search for `collapse.js` or `collapse` class usage:
- `assets/css/collapse.css` exists (companion stylesheet)
- Check if any page includes these files

#### Implementation

If unused:
```bash
rm assets/js/collapse.js
rm assets/css/collapse.css
```

If used by specific pages, integrate it into the main bundle or document its purpose.

### Demo/example pages

Check if these files serve any purpose:
- `_pages/markdown.md` - Markdown rendering demo
- `_pages/archive-layout-with-content.md` - Archive layout demo

If these are leftover from the Minimal Mistakes theme and not linked in navigation:
```bash
# Verify they're not linked
grep -r "markdown" _data/navigation.yml
grep -r "archive-layout" _data/navigation.yml
```

If not linked, consider removing them or adding `published: false` to front matter.

---

## 5. SCSS Duplication

### Duplicate `.navicon` Definitions

The hamburger menu icon (`.navicon`) CSS is defined in **two places**:

1. `_sass/_utilities.scss` (lines 313-365) - Full animation definitions
2. `_sass/_navigation.scss` - Navigation-specific styling

#### Implementation

Keep the definition in `_navigation.scss` (where it's contextually used) and remove the duplicate from `_utilities.scss`.

Search for any references to ensure nothing breaks:
```bash
grep -rn "navicon" _sass/ _includes/ assets/
```

### Duplicate focus styles

As noted in the accessibility doc, focus styles are defined in multiple files:
- `_utilities.scss` - Global `*:focus-visible`
- `_mixins.scss` - `%tab-focus` placeholder
- `_base.scss` - Link focus using `%tab-focus`
- `_forms.scss` - Input focus with box-shadow
- `_masthead.scss` - Button hover (no focus)

**See `03-accessibility.md` Section 2** for the standardization plan.

---

## 6. Bundle Size Optimization

### Current Bundle Analysis

| File | Raw Size | Minified | Notes |
|------|----------|----------|-------|
| `_main.js` | ~18KB (567 lines) | ~7.6KB | esbuild minified |
| `swup.min.js` | ~15KB | Already minified | Page transitions |
| `main.css` | Unknown | Jekyll compressed | SCSS compiled |
| Font Awesome (3 files) | ~30KB CSS | Unknown after compile | Could reduce |

### JavaScript optimization

#### Remove unused counter code

As described in section 2, removing `initCounters()` saves ~0.5KB.

#### Consider removing Swup

Swup provides SPA-like page transitions but adds 15KB to every page load. Evaluate:
- **Keep if:** Page transitions are important to the site's feel
- **Remove if:** Performance is more important than smooth transitions

If removing:
1. Delete `assets/js/swup.min.js`
2. Remove Swup initialization from `_includes/head.html` (lines 54-56)
3. Remove `swup-transition-*` classes from `_layouts/default.html`
4. Remove Swup animation CSS from `_sass/_animations.scss`
5. In `_main.js`, remove the `page:view` hook and update `initPageFeatures()` to only run on DOMContentLoaded

### CSS optimization

#### Audit Font Awesome usage

As noted in `01-performance.md` Section 6, only ~20 icons are used from the full Font Awesome library. Consider:
- Subsetting to only used icons
- Switching to SVG icons
- Using a Font Awesome kit with only needed icons

#### Remove vendor prefixes for modern browsers

If targeting only modern browsers (which GitHub Pages visitors likely use), remove old vendor prefixes from SCSS:
- `-webkit-` prefixes for flexbox
- `-moz-` prefixes
- `-ms-` prefixes

Check with [Can I Use](https://caniuse.com/) if the base property is supported in all target browsers before removing.

---

## 7. Configuration Cleanup

### `_config.yml` cleanup

Remove or consolidate unused configuration:

```yaml
# REMOVE: Empty social media configs
twitter:
  username:          # Remove if not using Twitter
facebook:
  username:          # Remove if not using Facebook
  app_id:
  publisher:

# REMOVE: Empty verification codes (add when you actually verify)
google_site_verification:
bing_site_verification:
yandex_site_verification:

# REMOVE or UPDATE: Comments section (if not using)
comments:
  provider:          # Remove entire section if not using comments
```

### Gemfile cleanup

Review if all gems are needed:

```ruby
# These are actively used:
gem 'jekyll-paginate'      # Keep - pagination
gem 'jekyll-sitemap'       # Keep - SEO
gem 'jekyll-feed'          # Keep - RSS
gem 'jekyll-redirect-from' # Keep - redirects
gem 'jemoji'               # Keep if using emoji in content

# Evaluate:
gem 'jekyll-gist'          # Remove if not embedding GitHub gists
gem 'jekyll-twitter-plugin'# Remove if not embedding tweets
```

---

## Cleanup Checklist

### High Priority (do first)

- [ ] Remove `initCounters()` from `_main.js` and rebuild
- [ ] Remove unused CSS classes from `_utilities.scss` (`.load`, `.transparent`, `.well`, `.modal`, `.show-modal`)
- [ ] Remove unused form styles from `_forms.scss`
- [ ] Remove deprecated comment providers (`google-plus.html`, `staticman.html`)
- [ ] Remove or integrate orphaned `collapse.js` and `collapse.css`

### Medium Priority

- [ ] Remove duplicate `.navicon` from `_utilities.scss`
- [ ] Standardize focus styles (see accessibility doc)
- [ ] Clean up `_config.yml` empty values
- [ ] Verify and remove demo pages if unused

### Low Priority

- [ ] Evaluate removing Swup (15KB JS)
- [ ] Font Awesome subsetting
- [ ] Remove old vendor prefixes
- [ ] Audit Gemfile for unused plugins

---

## Estimated Impact

| Category | Lines Removed | Bundle Impact |
|----------|--------------|---------------|
| Dead CSS utilities | ~80 lines | ~2KB CSS |
| Dead form CSS | ~130 lines | ~3KB CSS |
| Dead JS (initCounters) | 34 lines | ~0.5KB JS |
| Comment providers | ~200+ lines | No runtime impact |
| Orphaned files | ~30 lines | ~1KB |
| **Total** | **~475+ lines** | **~6.5KB** |

This doesn't account for potential Swup removal (~15KB) or Font Awesome optimization (potentially 20-30KB).

---

## Verification

After each cleanup pass:

```bash
# Rebuild JS
npm run build:js

# Rebuild site locally
bundle exec jekyll build

# Check for broken references
bundle exec jekyll build 2>&1 | grep -i "error\|warning"

# Visual regression test
# Open the site locally and check:
# - Homepage renders correctly
# - Portfolio page shows all projects
# - CV page displays properly
# - Mobile navigation works
# - Dark mode toggles correctly
# - Language toggle works
```
