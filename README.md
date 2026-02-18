# efrenrodriguezrodriguez.com

Personal portfolio and professional site for **Efren Rodriguez Rodriguez** -- technical project manager and R&D engineer with 8+ years at CERN.

Live at [efrenrodriguezrodriguez.com](https://efrenrodriguezrodriguez.com)

## What This Is

A recruiter-targeted portfolio site showcasing project leadership, technical skills, and career history. Originally forked from [Academic Pages](https://github.com/academicpages/academicpages.github.io), it has been heavily customised with a modern design system, bilingual support, and industry-focused content.

## Key Features

- **Bilingual (EN/ES)** -- client-side language toggle with `localStorage` persistence; translations in `_data/i18n/*.yml`
- **Recruiter-optimised homepage** -- hero with value proposition, credibility logo strip (CERN, Nikhef, IGFAE, USC, LHCb), value props, key results, career timeline
- **Dark mode** -- automatic OS detection + manual toggle, persisted in `localStorage`
- **ATS-friendly CV** -- downloadable PDFs (EN/ES), plus printable HTML versions
- **Service worker** -- offline support with cached pages and graceful fallback
- **Search** -- client-side full-text search overlay (JSON index)
- **Floating mobile CTA** -- contact + LinkedIn + CV download bar on small screens
- **Responsive** -- mobile-first layout with CSS breakpoints

## Tech Stack

| Layer | Tool |
|-------|------|
| Static site generator | Jekyll (via `github-pages` gem) |
| Styling | SCSS (`_sass/`) compiled by Jekyll |
| JavaScript | Vanilla ES modules, bundled with esbuild |
| Hosting | GitHub Pages |
| Domain | Custom domain via CNAME |

## Project Structure

```
_config.yml          # Site settings, author info, collections, plugins
_data/
  i18n/              # Translation files (about.yml, cv.yml, contact.yml, ...)
  navigation.yml     # Nav bar links and order
_includes/           # Reusable HTML partials (head, sidebar, footer, ...)
_layouts/            # Page templates (default, single, talk, ...)
_pages/              # Top-level pages (about.md=homepage, cv.md, contact.md, ...)
_posts/              # Blog posts
_portfolio/          # Project entries
_publications/       # Publication entries
_talks/              # Conference talks
_personal/           # Personal interests pages
_sass/               # SCSS partials
  _utilities.scss    # Component styles (hero, cards, logo strip, timeline, ...)
  _page.scss         # Page layout styles
  _variables.scss    # Design tokens and theme variables
assets/
  js/
    _main.js         # JS entry point (bundled to main.min.js)
    modules/         # Feature modules (theme, search, nav, offline, ...)
  css/               # Additional stylesheets
images/              # All images, including logos/ and webp/
files/               # Downloadable files (CV PDFs)
```

## Development

### Prerequisites

- Ruby + Bundler (`gem install bundler`)
- Node.js (for JS bundling)

### Local Development

```bash
bundle install
bundle exec jekyll serve
```

Site will be available at `http://localhost:4000`.

### Build

```bash
bundle exec jekyll build                  # Build the site (~30s)
npx esbuild assets/js/_main.js \
  --bundle --outfile=assets/js/main.min.js --minify   # Bundle JS
```

### Adding Translations

1. Add keys to the relevant file in `_data/i18n/` (always both `en:` and `es:`)
2. Reference in templates with `{% include t.html page="about" key="my_key" %}` (inline) or `{% include t-block.html page="about" key="my_key" %}` (block)
3. For elements needing language-specific display, add CSS rules in `_sass/_utilities.scss`

## Content Pages

| Page | File | URL |
|------|------|-----|
| Homepage | `_pages/about.md` | `/` |
| CV | `_pages/cv.md` | `/cv/` |
| Projects | `_pages/portfolio.html` | `/portfolio/` |
| Contact | `_pages/contact.md` | `/contact/` |
| Publications | `_pages/publications.md` | `/publications/` |
| Blog | `_pages/year-archive.html` | `/year-archive/` |
| Talks | `_pages/talks.html` | `/talks/` |
| Personal | `_pages/personal.html` | `/personal/` |

## License

Based on [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) by Michael Rose, released under the MIT License. See [LICENSE](LICENSE).
