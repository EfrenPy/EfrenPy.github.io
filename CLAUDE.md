# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic website built with Jekyll using the Minimal Mistakes theme with **extensive modern design enhancements (2025)**. The site is hosted on GitHub Pages and showcases publications, talks, teaching activities, portfolio items, and personal content for Efrén Rodríguez Rodríguez, a Postdoctoral Researcher in particle physics silicon detectors at CERN.

### Modern Design System

The site features a comprehensive modern design system implemented in early 2025:

- **Modern color palette** with purple/blue gradients (#667eea, #764ba2)
- **Card-based layouts** with shadows, rounded corners, and hover effects
- **Gradient backgrounds** throughout the site
- **Sticky navigation** with frosted glass effect
- **Dark modern footer** with gradient background
- **Enhanced typography** with larger sizes and better hierarchy
- **Smooth animations** and transitions on all interactive elements
- **Contemporary UI patterns** including badges, pills, and modern cards

## Development Commands

### Local Development

```bash
# Serve the site locally with development config (disables analytics)
bundle exec jekyll serve --config _config.yml,_config.dev.yml

# Serve with production config
bundle exec jekyll serve

# Build the site (output to _site/)
bundle exec jekyll build
```

### JavaScript Build

```bash
# Minify and concatenate JavaScript files
npm run build:js

# Watch for JavaScript changes and rebuild automatically
npm run watch:js
```

### Content Generation

The `markdown_generator/` directory contains Jupyter notebooks and Python scripts for batch-generating markdown files from TSV data:

```bash
# Generate publication pages from TSV
python markdown_generator/publications.py

# Generate publications from BibTeX
python markdown_generator/pubsFromBib.py

# Generate talk pages from TSV
python markdown_generator/talks.py
```

Alternatively, run the corresponding `.ipynb` files in Jupyter for interactive generation with documentation.

### Talk Map Generation

Generate an interactive map of talk locations:

```bash
cd _talks
python ../talkmap.py
```

This requires the `getorg` and `geopy` packages and outputs to the `talkmap/` directory.

## Architecture

### Jekyll Collections

The site uses five main Jekyll collections defined in `_config.yml`:

- **`_publications/`**: Research publications with metadata (date, venue, DOI, etc.)
- **`_talks/`**: Conference talks and presentations with location data
- **`_teaching/`**: Teaching activities and courses
- **`_portfolio/`**: Project portfolio items
- **`_personal/`**: Personal blog posts or content

Each collection outputs to `/:collection/:path/` and uses specific layouts and default front matter configurations.

### Key Directories

- **`_pages/`**: Static pages (About, CV, Publications index, etc.)
- **`_layouts/`**: Page templates (`single.html`, `talk.html`, `archive.html`, etc.)
- **`_includes/`**: Reusable HTML components (author profile, analytics, comments, etc.)
- **`_sass/`**: SCSS stylesheets (includes modern design system)
  - **`_modern.scss`**: Modern design components (NEW - 2025 design system)
  - **`_variables.scss`**: Updated with modern colors and typography
  - **`_page.scss`**: Enhanced with modern card layouts
  - **`_sidebar.scss`**: Sticky sidebar with modern styling
  - **`_footer.scss`**: Dark gradient footer design
  - **`_archive.scss`**: Modern card-based archive layouts
  - **`_masthead.scss`**: Frosted glass navigation
  - **`_buttons.scss`**: Modern button styles with hover effects
  - **`_animations.scss`**: Enhanced animations (slide-up, fade-in)
- **`assets/`**: Compiled assets and theme resources
- **`files/`**: Downloadable files (PDFs, CVs, etc.)
- **`images/`**: Image assets
- **`_data/`**: YAML data files (navigation, UI text, authors, comments)

### Front Matter Structure

Content files use YAML front matter. Example for publications:

```yaml
---
title: "Paper Title"
collection: publications
permalink: /publication/short-name
excerpt: 'Brief description'
date: 2023-03-01
link: 'https://doi.org/...'
venue: 'Journal Name'
smallinfo: '(Year) Author. <b><i>Journal</i></b>'
paperurl: 'https://...'
gallery1:
  - url: image.png
    image_path: image.png
    alt: "Description"
    title: "Title"
---
```

### Configuration Notes

- **Locale**: Spanish (`es_ES`)
- **Timezone**: `Europe/Madrid`
- **Base URL**: https://EfrenPy.github.io
- **Markdown Engine**: kramdown with GFM input
- **Plugins**: jekyll-sitemap, jekyll-feed, jemoji, jekyll-twitter-plugin, jekyll-redirect-from

### Development vs Production

The `_config.dev.yml` override sets:
- Local URL (`http://localhost:4000`)
- Disables analytics
- Expanded SASS output for debugging

Always use `--config _config.yml,_config.dev.yml` for local development.

## Content Management

### Adding New Content

1. **Publications**: Add markdown file to `_publications/` or use `markdown_generator/publications.tsv` + generator script
2. **Talks**: Add markdown file to `_talks/` or use `markdown_generator/talks.tsv` + generator script
3. **Teaching/Portfolio/Personal**: Add markdown files directly to respective collection directories

### TSV-Based Workflow

For bulk additions, edit the TSV files in `markdown_generator/`:
- `publications.tsv`: Publication metadata
- `talks.tsv`: Talk metadata

Then run the corresponding Python script or Jupyter notebook to generate individual markdown files.

### Image Assets

- Profile images go in root (e.g., `profile.jpg`)
- Publication/talk images go in `images/`
- Reference images in front matter using relative paths

## Automation and Workflows

### GitHub Actions

The project includes several automated workflows in `.github/workflows/`:

1. **jekyll.yml**: Builds and deploys the site to GitHub Pages automatically on push to master
2. **test.yml**: Runs HTML validation and link checking on all pushes and PRs
3. **optimize-images.yml**: Manual workflow to optimize images (JPEG/PNG compression)
4. **backup-tsv.yml**: Weekly automated backup of markdown content to TSV format

### Pre-commit Hooks

Install with `pre-commit install` to enable automatic validation before commits:
- YAML/JSON validation
- Markdown linting (academic-friendly rules)
- Python code formatting (Black) and linting (Flake8)
- YAML front matter validation
- Large file detection and security checks

### Utility Scripts

Located in `scripts/`:
- **upgrade-jquery.sh**: Upgrades jQuery to latest version
- **optimize-images.js**: Optimizes images using imagemin
- **validate-frontmatter.py**: Validates YAML front matter in collection files
- **backup-to-tsv.py**: Backs up markdown files to TSV format

## Development Setup

### Initial Setup

```bash
# Install Ruby dependencies
bundle install

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Setup pre-commit hooks
pip install pre-commit
pre-commit install
```

### Quick Development

```bash
# Start development server with dev config
npm run dev

# Build production site
npm run build

# Optimize images
npm run optimize-images

# Backup content to TSV
python scripts/backup-to-tsv.py
```

## Modern Design System (2025)

### Design Philosophy

The site implements a contemporary design system inspired by 2025 web design trends:

1. **Visual Hierarchy**: Clear separation using cards, shadows, and spacing
2. **Color Psychology**: Purple/blue gradients for technology and innovation
3. **Smooth Interactions**: All elements have hover states and transitions
4. **Accessibility**: High contrast text, large touch targets, proper semantics
5. **Performance**: CSS-based animations, optimized gradients, efficient selectors

### Key Design Components

#### Colors (_variables.scss)
```scss
// Primary colors
$darker-gray: #1a202c;
$dark-gray: #2d3748;
$gray: #6c757d;
$light-gray: #cbd5e0;
$lighter-gray: #f7fafc;

// Accent colors
$link-color: #3182ce;
$info-color: #4299e1;

// Gradient colors
Purple-Blue: #667eea → #764ba2
```

#### Typography
- **H1**: 2.75em (44px), weight 800
- **H2**: 2.25em (36px), weight 700
- **H3**: 1.75em (28px), weight 700
- **Body**: 1.05em, line-height 1.7
- **Font smoothing**: Enabled for crisp text

#### Shadows
- **Standard**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Large**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Footer**: `0 -4px 20px rgba(0, 0, 0, 0.1)`

#### Spacing & Sizing
- **Border radius**: 8px (elements), 16px (cards), 20px (pills)
- **Card padding**: 2.5em
- **Section padding**: 4rem desktop, 3rem mobile
- **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Modern Components Available

Use these classes in markdown/HTML for modern styling:

- **`.modern-section`**: Container with proper spacing
- **`.modern-grid`**: Responsive grid layout
- **`.modern-card`**: Card with shadow and hover effects
- **`.modern-badge`**: Pill-shaped badge with gradient
- **`.gradient-bg`**: Purple gradient background
- **`.gradient-accent`**: Blue gradient background
- **`.text-gradient`**: Gradient text effect
- **`.glow-on-hover`**: Glowing hover effect

### Layout Features

1. **Sticky Sidebar**: Follows scroll at `top: 100px`
2. **Sticky Navigation**: Always visible at top with blur effect
3. **Card-based Pages**: All content in white cards with shadows
4. **Gradient Backgrounds**: Subtle gradients on main container
5. **Dark Footer**: Gradient footer (#1a202c → #2d3748)

### Animation System

- **Intro animations**: Slide-up with fade (0.3s delay)
- **Hover effects**: Transform, scale, and color transitions
- **Card lifts**: translateY(-4px to -8px) on hover
- **Icon animations**: Scale and rotate on hover
- **Smooth transitions**: All changes use cubic-bezier easing

### Responsive Design

- **Mobile-first**: Grid collapses to single column
- **Breakpoints**:
  - Small: 600px
  - Medium: 768px
  - Large: 925px
  - X-Large: 1280px
- **Touch-friendly**: 44px minimum touch targets
- **Readable**: Larger fonts on mobile devices

## Important Notes

- Site is configured for GitHub Pages deployment
- CNAME file sets custom domain: `EfrenPy.github.io`
- Changes to `_config.yml` require server restart (not auto-reloaded)
- **Changes to SCSS files**: Require Jekyll rebuild to see updates
- The site excludes `node_modules`, `vendor`, and build-related files from Jekyll processing
- jQuery has been upgraded to 3.7.1 (from 1.12.4) - run `npm run build:js` after updates
- Lock files (Gemfile.lock) are now tracked in git for reproducible builds
- **Modern design system**: Implemented in `_sass/_modern.scss` and integrated throughout
- **NPM packages**: Recently updated to fix deprecation warnings
- See `IMPROVEMENTS.md` for detailed information about recent enhancements

## Styling Best Practices

When modifying the site design:

1. **Use existing variables**: Reference `_sass/_variables.scss` for colors, sizes, shadows
2. **Follow naming conventions**: BEM-like naming for new classes
3. **Maintain transitions**: All interactive elements should have smooth transitions
4. **Test hover states**: Ensure all clickable elements have visual feedback
5. **Check mobile**: Always test responsive behavior
6. **Use modern components**: Leverage classes in `_sass/_modern.scss`
7. **Maintain consistency**: Follow the established gradient and shadow patterns
8. **Accessibility**: Maintain color contrast ratios (WCAG AA minimum)

## Common Design Tasks

### Adding a new gradient
```scss
.my-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Creating a new card component
```html
<div class="modern-card">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### Adding hover effects
```scss
.my-element {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: $box-shadow-lg;
  }
}
```
