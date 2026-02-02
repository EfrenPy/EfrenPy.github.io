# Content & UX Improvements

Deep analysis and implementation guide for improving content strategy, user experience, and engagement.

---

## Table of Contents

1. [Blog Content Strategy](#1-blog-content-strategy)
2. [Project Pages Enhancement](#2-project-pages-enhancement)
3. [CV Interactive Timeline](#3-cv-interactive-timeline)
4. [404 Page Enhancement](#4-404-page-enhancement)
5. [RSS Feed Visibility](#5-rss-feed-visibility)
6. [Client-Side Search](#6-client-side-search)
7. [Reading Progress & Engagement](#7-reading-progress--engagement)

---

## 1. Blog Content Strategy

### Current State

**Directory:** `_posts/`

7 blog posts exist, all conference/event recaps:
1. Advanced Detector Technologies Conference (2022)
2. Hiroshima Symposium on Particle Physics (2023)
3. New Horizons at CERN (2024)
4. + 4 more conference-related posts

**Issues:**
- All posts are conference recaps (single content type)
- No technical tutorials or how-to content
- No "day in the life at CERN" personal content
- Limited SEO value (niche conference keywords only)
- No regular publishing cadence

### Recommendations

#### Content pillars to develop

| Pillar | Example Topics | SEO Value | Effort |
|--------|---------------|-----------|--------|
| **Technical tutorials** | "Python for particle physics analysis", "ROOT data visualization guide", "FPGA programming basics" | High (long-tail keywords) | Medium |
| **Research explainers** | "How silicon detectors work", "What is LHCb VELO?", "Understanding particle tracking" | High (educational queries) | Medium |
| **Career/life at CERN** | "A day as a CERN postdoc", "How I transitioned from PhD to postdoc", "Working in international collaborations" | Medium (career queries) | Low |
| **Tool/project deep dives** | "Building MapToPoster", "Automating test beam data analysis", "Why I built CERN Starter Pack" | Medium (project-specific) | Low |
| **Conference/event recaps** | Continue current format | Low | Low |

#### Post template

Create a reusable front matter template:

```yaml
---
title: "Your Post Title"
title_en: "English Title"
title_es: "Spanish Title"
date: YYYY-MM-DD
excerpt: "150-character description for SEO and social sharing"
excerpt_en: "English excerpt"
excerpt_es: "Spanish excerpt"
tags:
  - Tag1
  - Tag2
header:
  teaser: webp/post-image.webp
  og_image: /images/og/post-title.png  # Optional 1200x630 image
toc: true
toc_label: "Contents"
---

{% include t-block.html en="English intro paragraph." es="Párrafo introductorio en español." %}

## Section Title

{% include t-block.html en="English content..." es="Contenido en español..." %}
```

#### Publishing cadence

Aim for 1-2 posts per month. A reasonable schedule:
- 1 technical/tutorial post per month
- 1 lighter post (career, event, project update) per month

---

## 2. Project Pages Enhancement

### Current State

**Directory:** `_portfolio/`

8 projects with consistent structure:
- Title (bilingual), excerpt, teaser image, tags
- Markdown content: overview, challenges, solutions, technical stack, results

**Missing elements:**
- No live demo links prominently displayed
- No GitHub badges (stars, language, last updated)
- No tech stack visual tags
- No project status indicator (active, completed, archived)

### Implementation

#### Enhanced front matter

```yaml
# _portfolio/example-project.md

---
title: "Project Title"
title_en: "English Title"
title_es: "Spanish Title"
excerpt: "Brief description"
collection: portfolio
header:
  teaser: webp/project.webp

# New fields
status: active          # active | completed | archived
demo_url: https://example.com
repo_url: https://github.com/EfrenPy/project
tech_stack:
  - Python
  - ROOT
  - FPGA
  - LabVIEW
started: 2023-01
role: "Lead Developer"
tags:
  - Python
  - Data Analysis
---
```

#### Updated archive-single template

Add badges and links to `_includes/archive-single.html`:

```html
<!-- _includes/archive-single.html - add after the title -->

{% if post.status %}
  <span class="archive__item-status archive__item-status--{{ post.status }}">
    {{ post.status | capitalize }}
  </span>
{% endif %}

{% if post.demo_url or post.repo_url %}
  <div class="archive__item-links">
    {% if post.demo_url %}
      <a href="{{ post.demo_url }}" class="btn btn--small btn--primary" target="_blank" rel="noopener">
        <i class="fas fa-external-link-alt" aria-hidden="true"></i>
        <span class="lang-en">Live Demo</span>
        <span class="lang-es">Demo</span>
      </a>
    {% endif %}
    {% if post.repo_url %}
      <a href="{{ post.repo_url }}" class="btn btn--small btn--inverse" target="_blank" rel="noopener">
        <i class="fab fa-github" aria-hidden="true"></i>
        Source
      </a>
    {% endif %}
  </div>
{% endif %}

{% if post.tech_stack %}
  <div class="archive__item-tech">
    {% for tech in post.tech_stack %}
      <span class="tech-tag">{{ tech }}</span>
    {% endfor %}
  </div>
{% endif %}
```

#### CSS for new elements

```scss
// _sass/_archive.scss - add new styles

.archive__item-status {
  display: inline-block;
  padding: 0.15em 0.5em;
  font-size: 0.7em;
  font-weight: 600;
  border-radius: 1em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  vertical-align: middle;
  margin-left: 0.5em;

  &--active {
    background: rgba(16, 185, 129, 0.15);
    color: #059669;
  }
  &--completed {
    background: rgba(99, 102, 241, 0.15);
    color: #4f46e5;
  }
  &--archived {
    background: rgba(107, 114, 128, 0.15);
    color: #6b7280;
  }

  [data-theme="dark"] & {
    &--active { color: #34d399; }
    &--completed { color: #818cf8; }
    &--archived { color: #9ca3af; }
  }
}

.archive__item-links {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;

  .btn--small {
    font-size: 0.75em;
    padding: 0.25em 0.75em;
  }
}

.archive__item-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}

.tech-tag {
  display: inline-block;
  padding: 0.1em 0.5em;
  font-size: 0.7em;
  background: var(--color-background-secondary, #f1f5f9);
  color: var(--color-text-light, #64748b);
  border-radius: 0.25em;
  font-family: $monospace;
}
```

#### GitHub stats badges (optional)

For open-source projects, embed GitHub badges dynamically:

```html
{% if post.repo_url contains "github.com" %}
  {% assign repo_path = post.repo_url | remove: "https://github.com/" %}
  <img src="https://img.shields.io/github/stars/{{ repo_path }}?style=flat-square"
       alt="GitHub stars" loading="lazy" decoding="async" width="80" height="20">
  <img src="https://img.shields.io/github/last-commit/{{ repo_path }}?style=flat-square"
       alt="Last commit" loading="lazy" decoding="async" width="130" height="20">
{% endif %}
```

---

## 3. CV Interactive Timeline

### Current State

**File:** `_pages/cv.md`

The CV uses custom HTML with CSS classes:
- `.cv-timeline` and `.cv-timeline-item` for experience
- `.cv-edu-card` for education
- `.cv-skill-tag` for skills
- Font Awesome icons per entry

The current layout is a vertical timeline with icons, position titles, company names, dates, and bullet descriptions. It's already well-structured.

### Enhancements

#### Add expandable descriptions

For long CV entries, make descriptions collapsible:

```html
<!-- In _pages/cv.md - wrap long descriptions -->
<div class="cv-timeline-item">
  <div class="cv-timeline-icon"><i class="fas fa-briefcase"></i></div>
  <div class="cv-timeline-content">
    <h3>Postdoctoral Researcher</h3>
    <p class="cv-timeline-company">CERN</p>
    <p class="cv-timeline-date">Oct 2024 - Present</p>
    <details class="cv-details">
      <summary>
        <span class="lang-en">View responsibilities</span>
        <span class="lang-es">Ver responsabilidades</span>
      </summary>
      <ul>
        <li>...</li>
        <li>...</li>
      </ul>
    </details>
  </div>
</div>
```

```scss
// _sass/_utilities.scss - add details/summary styling

.cv-details {
  margin-top: 0.5rem;

  summary {
    cursor: pointer;
    color: var(--color-primary);
    font-size: 0.85em;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }

    &::marker {
      color: var(--color-primary);
    }
  }

  ul {
    margin-top: 0.5rem;
    padding-left: 1.25rem;
  }
}
```

#### Add a visual timeline connector

Enhance the timeline with a connecting line:

```scss
// _sass/_utilities.scss - enhance timeline

.cv-timeline {
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0.75rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--gradient-primary, linear-gradient(180deg, var(--color-primary), var(--color-accent)));
    border-radius: 1px;
  }
}

.cv-timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 1.5rem;

  .cv-timeline-icon {
    position: absolute;
    left: -1.5rem;
    top: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    font-size: 0.65rem;
    color: var(--color-primary);
    z-index: 1;
  }
}
```

#### Add print-friendly version

The CV page already has a PDF download link. Enhance the print stylesheet to make the web version printable:

```scss
// _sass/_print.scss - add CV-specific print styles

@media print {
  .cv-download-btn { display: none; }
  .cv-timeline::before { background: #000; }
  .cv-timeline-icon { border-color: #000; color: #000; }
  .cv-details[open] summary { display: none; }
  .cv-details { display: block; }
  .cv-skill-tag { border: 1px solid #ccc; }
}
```

---

## 4. 404 Page Enhancement

### Current State

**File:** `_pages/404.md`

Current 404 page has:
- "404" large text
- Bilingual error message
- "Back to Home" button
- Witty excerpt

### Enhancements

Add links to key sections and a search suggestion:

```html
<!-- _pages/404.md - enhanced version -->

<div class="error-page">
  <div class="error-page__code">404</div>
  <div class="error-page__message">
    <span class="lang-en">Oops! This page doesn't exist.</span>
    <span class="lang-es">Esta pagina no existe.</span>
  </div>
  <p class="error-page__description">
    <span class="lang-en">It might have been moved or deleted. Try one of these instead:</span>
    <span class="lang-es">Puede que haya sido movida o eliminada. Prueba con alguna de estas:</span>
  </p>

  <div class="error-page__links">
    <a href="/" class="btn btn--primary">
      <i class="fas fa-home" aria-hidden="true"></i>
      <span class="lang-en">Home</span>
      <span class="lang-es">Inicio</span>
    </a>
    <a href="/portfolio/" class="btn btn--inverse">
      <i class="fas fa-code" aria-hidden="true"></i>
      <span class="lang-en">Projects</span>
      <span class="lang-es">Proyectos</span>
    </a>
    <a href="/publications/" class="btn btn--inverse">
      <i class="fas fa-book" aria-hidden="true"></i>
      <span class="lang-en">Research</span>
      <span class="lang-es">Investigacion</span>
    </a>
    <a href="/cv/" class="btn btn--inverse">
      <i class="fas fa-file-alt" aria-hidden="true"></i>
      CV
    </a>
  </div>
</div>
```

```scss
// _sass/_utilities.scss or inline styles

.error-page__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}
```

---

## 5. RSS Feed Visibility

### Current State

- `jekyll-feed` plugin generates `/feed.xml` automatically
- `_includes/head.html` includes `<link rel="alternate" type="application/atom+xml" href="/feed.xml">`
- **No visible RSS link** in navigation or footer
- No subscribe call-to-action anywhere on the site

### Implementation

#### Add RSS icon to footer

```html
<!-- _includes/footer.html - add to social-icons list -->
<li>
  <a href="{{ base_path }}/feed.xml" title="RSS Feed" aria-label="RSS Feed">
    <i class="fas fa-rss" aria-hidden="true"></i> RSS
  </a>
</li>
```

#### Add subscribe CTA to blog archive

```html
<!-- _pages/year-archive.html - add at top of page -->
<div class="archive__subscribe">
  <p>
    <span class="lang-en">Stay updated with new posts:</span>
    <span class="lang-es">Mantente al dia con nuevas publicaciones:</span>
    <a href="{{ base_path }}/feed.xml" class="btn btn--small btn--primary">
      <i class="fas fa-rss" aria-hidden="true"></i>
      <span class="lang-en">RSS Feed</span>
      <span class="lang-es">Canal RSS</span>
    </a>
  </p>
</div>
```

---

## 6. Client-Side Search

### Current State

`_config.yml` has `search: true` but no search implementation exists (no Lunr.js, Algolia, or custom search).

### Implementation with Lunr.js

#### Step 1: Create search data JSON

Create `assets/js/search-data.json`:

```liquid
---
layout: null
---
{
  {% assign collections = site.portfolio | concat: site.publications | concat: site.posts | concat: site.talks %}
  {% for item in collections %}
  "{{ item.url | slugify }}": {
    "title": {{ item.title | strip_html | jsonify }},
    "excerpt": {{ item.excerpt | strip_html | strip_newlines | truncate: 200 | jsonify }},
    "url": {{ item.url | prepend: site.baseurl | jsonify }},
    "tags": {{ item.tags | jsonify | default: "[]" }},
    "collection": {{ item.collection | jsonify }},
    "date": {{ item.date | date: "%Y-%m-%d" | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
}
```

#### Step 2: Create search page

Create `_pages/search.md`:

```yaml
---
layout: archive
title: "Search"
title_en: "Search"
title_es: "Buscar"
permalink: /search/
---

<div id="search-container">
  <input type="search" id="search-input"
         placeholder="Search publications, projects, posts..."
         aria-label="Search site content"
         autocomplete="off">
  <div id="search-results" role="region" aria-live="polite" aria-label="Search results"></div>
</div>
```

#### Step 3: Add Lunr.js search script

```javascript
// assets/js/search.js

(function() {
  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  if (!searchInput) return;

  var searchIndex = null;
  var searchData = null;

  // Load search data on first focus
  searchInput.addEventListener('focus', function loadData() {
    if (searchData) return;
    fetch('/assets/js/search-data.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        searchData = data;
        searchIndex = lunr(function() {
          this.ref('id');
          this.field('title', { boost: 10 });
          this.field('excerpt', { boost: 5 });
          this.field('tags', { boost: 3 });
          this.field('collection');

          Object.keys(data).forEach(function(key) {
            var item = data[key];
            item.id = key;
            this.add(item);
          }, this);
        });
      });
  });

  // Debounced search
  var timeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      var query = searchInput.value.trim();
      if (query.length < 2 || !searchIndex) {
        resultsContainer.innerHTML = '';
        return;
      }

      var results = searchIndex.search(query + '~1'); // Fuzzy match
      if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="search-no-results">No results found.</p>';
        return;
      }

      var html = '<ul class="search-results-list">';
      results.slice(0, 10).forEach(function(result) {
        var item = searchData[result.ref];
        html += '<li class="search-result-item">';
        html += '<a href="' + item.url + '">';
        html += '<strong>' + item.title + '</strong>';
        html += '<span class="search-result-collection">' + item.collection + '</span>';
        html += '</a>';
        if (item.excerpt) {
          html += '<p>' + item.excerpt + '</p>';
        }
        html += '</li>';
      });
      html += '</ul>';
      resultsContainer.innerHTML = html;
    }, 300);
  });
})();
```

#### Step 4: Add Lunr.js dependency

Download `lunr.min.js` from [lunrjs.com](https://lunrjs.com/) and place it in `assets/js/`.

Include in search page only (not globally):

```html
<!-- _layouts/search.html or conditional in scripts.html -->
{% if page.url == "/search/" %}
  <script src="{{ base_path }}/assets/js/lunr.min.js" defer></script>
  <script src="{{ base_path }}/assets/js/search.js" defer></script>
{% endif %}
```

#### Step 5: Add search to navigation

```yaml
# _data/navigation.yml - add search icon
main:
  # ... existing items ...
  - title: "Search"
    title_en: "Search"
    title_es: "Buscar"
    url: /search/
    icon: "fas fa-search"  # Optional icon indicator
```

---

## 7. Reading Progress & Engagement

### Current State

A scroll progress bar exists (`_main.js`) showing page scroll position. Blog posts show read time.

### Enhancements

#### Add "related posts" section

```html
<!-- _includes/related-posts.html -->
{% assign maxRelated = 3 %}
{% assign minCommonTags = 1 %}
{% assign related = "" | split: "" %}

{% for post in site.posts %}
  {% if post.url != page.url %}
    {% assign commonTags = 0 %}
    {% for tag in post.tags %}
      {% if page.tags contains tag %}
        {% assign commonTags = commonTags | plus: 1 %}
      {% endif %}
    {% endfor %}
    {% if commonTags >= minCommonTags %}
      {% assign related = related | push: post %}
    {% endif %}
  {% endif %}
{% endfor %}

{% if related.size > 0 %}
<div class="related-posts">
  <h2>
    <span class="lang-en">Related Posts</span>
    <span class="lang-es">Publicaciones Relacionadas</span>
  </h2>
  <div class="related-posts__grid">
    {% for post in related limit: maxRelated %}
      {% include archive-single.html type="grid" %}
    {% endfor %}
  </div>
</div>
{% endif %}
```

#### Add table of contents for long posts

Enable TOC in post front matter:

```yaml
---
toc: true
toc_label: "Contents"
toc_sticky: true  # Sticky sidebar TOC
---
```

The Minimal Mistakes theme already supports this - just needs to be enabled per post.

---

## Priority Matrix

| Improvement | Impact | Effort | Priority |
|------------|--------|--------|----------|
| Project page enhancements (status, tech, links) | High | Medium | P0 |
| 404 page enhancement | Medium | Low | P1 |
| RSS feed visibility | Low | Low | P1 |
| Blog content strategy | High | Ongoing | P1 |
| Client-side search | Medium | Medium | P2 |
| CV timeline enhancements | Low | Medium | P2 |
| Related posts | Medium | Medium | P2 |
| TOC for long content | Low | Low | P2 |
