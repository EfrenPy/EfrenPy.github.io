# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Efrén Rodríguez Rodríguez, a postdoctoral researcher at CERN. Built on Jekyll using a fork of the academicpages template (based on Minimal Mistakes theme). Hosted on GitHub Pages at https://EfrenPy.github.io.

## Development Commands

```bash
# Install dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Build site for production
bundle exec jekyll build

# Build JavaScript assets (minify)
npm run build:js

# Watch JavaScript changes
npm run watch:js
```

Note: After modifying `_config.yml`, restart the server as Jekyll doesn't auto-reload config changes.

## Architecture

### Jekyll Collections

The site uses Jekyll collections defined in `_config.yml`:
- `_posts/` - Blog posts (news, announcements)
- `_publications/` - Research publications
- `_talks/` - Conference talks and presentations
- `_teaching/` - Teaching experience
- `_portfolio/` - Project portfolio
- `_personal/` - Personal interests (hiking, sports, travel)

Each collection has its own layout defaults and permalink structure.

### Key Directories

- `_layouts/` - Page templates (single.html, talk.html, archive.html, splash.html)
- `_includes/` - Reusable HTML partials (author-profile.html, archive-single.html, header, footer)
- `_data/navigation.yml` - Main site navigation menu
- `_sass/` - SCSS stylesheets; `_variables.scss` for theme customization
- `assets/` - CSS, JS, fonts
- `images/` - Site images including author avatar
- `files/` - Downloadable files (CV PDFs, papers)

### Content Generation

`markdown_generator/` contains Jupyter notebooks and Python scripts to generate markdown files from TSV data:
- `talks.ipynb`/`talks.py` - Generate talk pages from `talks.tsv`
- `publications.ipynb`/`publications.py` - Generate publication pages from `publications.tsv`
- `PubsFromBib.ipynb`/`pubsFromBib.py` - Generate publications from BibTeX

### Configuration

- `_config.yml` - Main site config (author info, social links, collections, plugins)
- `_config.dev.yml` - Development overrides
- `Gemfile` - Ruby dependencies (github-pages gem for GitHub Pages compatibility)

## Content Front Matter

Posts and collection items use YAML front matter. Example for talks:
```yaml
---
title: "Talk Title"
collection: talks
type: "Conference"
permalink: /talks/talk-slug/
venue: "Conference Name"
date: 2024-01-15
location: "City, Country"
---
```

## Deployment

Push to `master` branch triggers automatic GitHub Pages deployment via the `github-pages` gem.
