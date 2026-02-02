# Site Improvement Guides

Comprehensive improvement documentation for [efrenrodriguezrodriguez.com](https://efrenrodriguezrodriguez.com).

Each document contains deep analysis of the current state, concrete implementation code, and a priority matrix.

---

## Documents

| # | Document | Focus Area | Key Wins |
|---|----------|-----------|----------|
| 01 | [Performance](01-performance.md) | LCP, CLS, FID optimization | Font loading, image dimensions, script defer, service worker |
| 02 | [SEO & Structured Data](02-seo-structured-data.md) | Search visibility, rich snippets | JSON-LD schemas, OG images, meta descriptions, config fixes |
| 03 | [Accessibility](03-accessibility.md) | WCAG 2.1 AA compliance | Skip link, focus indicators, color contrast, ARIA live regions |
| 04 | [Content & UX](04-content-ux.md) | Engagement, content strategy | Blog pillars, project enhancements, search, 404 page |
| 05 | [Code Quality](05-code-quality.md) | Dead code removal, cleanup | ~475 lines removable, bundle reduction, config cleanup |
| 06 | [Missing Features](06-missing-features.md) | New functionality | Search, filtering, sharing, contact form, RSS visibility |

---

## Quick Start: Top 10 Highest-Impact Changes

These are the highest impact improvements across all documents, ordered by effort:

### Low Effort, High Impact
1. **Add `defer` to scripts** - `01-performance.md` Section 3
2. **Fill `_config.yml` social/og_image** - `02-seo-structured-data.md` Section 1
3. **Add skip navigation link** - `03-accessibility.md` Section 1
4. **Add image width/height attributes** - `01-performance.md` Section 2
5. **Fix light-mode color contrast** - `03-accessibility.md` Section 3

### Medium Effort, High Impact
6. **Add Person JSON-LD schema** - `02-seo-structured-data.md` Section 2
7. **Add ScholarlyArticle schema** - `02-seo-structured-data.md` Section 8
8. **Reduce font weights (5 to 2)** - `01-performance.md` Section 1
9. **Project page enhancements** - `04-content-ux.md` Section 2
10. **Remove dead CSS/JS** - `05-code-quality.md` Sections 1-2

---

## How to Use These Docs

1. **Start with P0 items** from each document's priority matrix
2. **Measure before and after** with Lighthouse (`npx lighthouse https://efrenrodriguezrodriguez.com`)
3. **Implement one category at a time** to isolate the impact of changes
4. **Test locally** with `bundle exec jekyll serve` before pushing
5. **Rebuild JS** after any `_main.js` changes: `npm run build:js`
