# Missing Features

Deep analysis and implementation guide for adding valuable features not yet present on the site.

---

## Table of Contents

1. [Client-Side Search](#1-client-side-search)
2. [RSS Feed Subscribe UI](#2-rss-feed-subscribe-ui)
3. [Reading Time Estimates](#3-reading-time-estimates)
4. [Social Sharing Buttons](#4-social-sharing-buttons)
5. [Back-to-Top Enhancements](#5-back-to-top-enhancements)
6. [Related Content Suggestions](#6-related-content-suggestions)
7. [Project Filtering & Sorting](#7-project-filtering--sorting)
8. [Contact Form](#8-contact-form)
9. [Sitemap Page](#9-sitemap-page)

---

## 1. Client-Side Search

### Why

The site has 8 portfolio items, 3 publications, 5 talks, and 7 blog posts. As content grows, visitors need a way to find specific topics. The `_config.yml` already has `search: true` but no implementation exists.

### Implementation

See `04-content-ux.md` Section 6 for the full Lunr.js implementation with:
- Search data JSON generation from all collections
- Fuzzy search with Lunr.js
- Lazy-loaded search index (only fetched on focus)
- Debounced input handling
- Results with collection type badges

### Alternative: Simple filter search

If Lunr.js feels heavy, implement a simpler filter-based search:

```javascript
// Lightweight search without Lunr.js dependency
// Filter visible items on archive pages

function initFilterSearch() {
  const searchInput = document.getElementById('filter-input');
  if (!searchInput) return;

  const items = document.querySelectorAll('.archive__item');

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();

    items.forEach(function(item) {
      const title = item.querySelector('.archive__item-title');
      const excerpt = item.querySelector('.archive__item-excerpt');
      const tags = item.querySelectorAll('.archive__item-tag');

      const text = [
        title ? title.textContent : '',
        excerpt ? excerpt.textContent : '',
        Array.from(tags).map(t => t.textContent).join(' ')
      ].join(' ').toLowerCase();

      item.style.display = text.includes(query) ? '' : 'none';
    });
  });
}
```

Add a filter input to archive pages:
```html
<input type="search" id="filter-input"
       placeholder="Filter projects..."
       aria-label="Filter items"
       autocomplete="off">
```

**Trade-offs:**
- Lunr.js: Full-text search, fuzzy matching, ranking, but adds ~8KB dependency
- Filter search: Zero dependencies, instant, but only matches visible text

---

## 2. RSS Feed Subscribe UI

### Why

`jekyll-feed` generates `/feed.xml` but there's no visible way for visitors to discover or subscribe to it. RSS is valuable for academic audiences who use feed readers.

### Implementation

See `04-content-ux.md` Section 5 for:
- Footer RSS icon
- Blog archive subscribe CTA

### Additional: Add to masthead

For maximum visibility, add an RSS icon to the masthead utility buttons:

```html
<!-- _includes/masthead.html - add alongside theme/lang toggles -->
<a href="{{ base_path }}/feed.xml" class="rss-link" aria-label="RSS Feed" title="RSS Feed">
  <i class="fas fa-rss" aria-hidden="true"></i>
</a>
```

```scss
// _sass/_masthead.scss

.rss-link {
  color: var(--color-text-light);
  font-size: 0.9em;
  padding: 0.35rem;

  &:hover {
    color: #f26522; // RSS orange
  }
}
```

---

## 3. Reading Time Estimates

### Current State

The `_includes/read-time.html` include exists and is used in blog post listings. However, it may not be visible on all content types.

### Implementation

Ensure reading time is shown on:
- Blog post listings (archive pages)
- Individual blog post pages
- Publication pages (for the abstract/description)

```html
<!-- _includes/read-time.html - verify this exists and is correct -->
{% if page.read_time %}
  <span class="page__meta-readtime">
    <i class="far fa-clock" aria-hidden="true"></i>
    {% assign words = content | number_of_words %}
    {% if words < 360 %}
      1 min read
    {% else %}
      {{ words | divided_by: 180 }} min read
    {% endif %}
  </span>
{% endif %}
```

Enable in `_config.yml` defaults if not already:
```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      read_time: true
```

---

## 4. Social Sharing Buttons

### Current State

`_includes/social-share.html` exists in the includes directory. Check if it's included in post layouts.

### Implementation

Ensure social sharing is enabled on blog posts and publications:

```yaml
# _config.yml - in defaults
defaults:
  - scope:
      path: ""
      type: posts
    values:
      share: true
  - scope:
      path: ""
      type: publications
    values:
      share: true
```

If the existing `social-share.html` is outdated, create a modern version:

```html
<!-- _includes/social-share.html -->
{% if page.share %}
<section class="page__share">
  <h4>
    <span class="lang-en">Share</span>
    <span class="lang-es">Compartir</span>
  </h4>
  <div class="share-links">
    <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ page.url | prepend: site.url | url_encode }}&title={{ page.title | url_encode }}"
       class="share-link share-link--linkedin"
       target="_blank" rel="noopener"
       aria-label="Share on LinkedIn">
      <i class="fab fa-linkedin" aria-hidden="true"></i> LinkedIn
    </a>
    <a href="https://twitter.com/intent/tweet?url={{ page.url | prepend: site.url | url_encode }}&text={{ page.title | url_encode }}"
       class="share-link share-link--twitter"
       target="_blank" rel="noopener"
       aria-label="Share on Twitter">
      <i class="fab fa-twitter" aria-hidden="true"></i> Twitter
    </a>
    <a href="mailto:?subject={{ page.title | url_encode }}&body={{ page.url | prepend: site.url | url_encode }}"
       class="share-link share-link--email"
       aria-label="Share via email">
      <i class="fas fa-envelope" aria-hidden="true"></i> Email
    </a>
  </div>
</section>
{% endif %}
```

```scss
// _sass/_page.scss or _utilities.scss

.page__share {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.share-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.share-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4em 0.8em;
  font-size: 0.85em;
  border-radius: 0.35em;
  text-decoration: none;
  color: #fff;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.85; }

  &--linkedin { background: #0077b5; }
  &--twitter { background: #1da1f2; }
  &--email { background: var(--color-text-light, #64748b); }
}
```

---

## 5. Back-to-Top Enhancements

### Current State

A scroll-to-top button exists in `_includes/footer.html` with logic in `_main.js`. It appears after 300px of scrolling.

### Enhancement

Add smooth scroll behavior and improve the button's position/animation:

```scss
// _sass/_utilities.scss - enhance existing styles

.scroll-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
}
```

---

## 6. Related Content Suggestions

### Why

When visitors finish reading a blog post or viewing a project, they have no guidance on what to explore next. Related content increases time on site and engagement.

### Implementation

See `04-content-ux.md` Section 7 for the full tag-based related posts implementation.

### Cross-collection suggestions

For a more interesting approach, suggest content across collections:

```html
<!-- _includes/explore-more.html -->
<div class="explore-more">
  <h3>
    <span class="lang-en">Explore More</span>
    <span class="lang-es">Explorar Mas</span>
  </h3>
  <div class="explore-more__grid">
    {% if page.collection == "publications" %}
      <!-- Show related portfolio items -->
      {% for item in site.portfolio limit: 2 %}
        {% include archive-single.html type="grid" post=item %}
      {% endfor %}
    {% elsif page.collection == "portfolio" %}
      <!-- Show related publications -->
      {% for item in site.publications limit: 2 %}
        {% include archive-single.html type="grid" post=item %}
      {% endfor %}
    {% else %}
      <!-- Show mix of recent content -->
      {% for item in site.portfolio limit: 1 %}
        {% include archive-single.html type="grid" post=item %}
      {% endfor %}
      {% for item in site.publications limit: 1 %}
        {% include archive-single.html type="grid" post=item %}
      {% endfor %}
    {% endif %}
  </div>
</div>
```

---

## 7. Project Filtering & Sorting

### Why

The portfolio page has 8 projects split between research and personal categories. As projects grow, filtering by category or technology becomes valuable.

### Implementation

#### Category filter tabs

```html
<!-- _pages/portfolio.html - add filter controls -->
<div class="portfolio-filters" role="tablist" aria-label="Filter projects">
  <button class="filter-btn active" role="tab" aria-selected="true" data-filter="all">
    <span class="lang-en">All</span>
    <span class="lang-es">Todos</span>
  </button>
  <button class="filter-btn" role="tab" aria-selected="false" data-filter="research">
    <span class="lang-en">Research</span>
    <span class="lang-es">Investigacion</span>
  </button>
  <button class="filter-btn" role="tab" aria-selected="false" data-filter="personal">
    <span class="lang-en">Personal</span>
    <span class="lang-es">Personal</span>
  </button>
</div>
```

#### Filter JavaScript

```javascript
// Add to _main.js

function initPortfolioFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.archive__item');

  if (!buttons.length || !items.length) return;

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = this.getAttribute('data-filter');

      // Update active state
      buttons.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Filter items
      items.forEach(function(item) {
        if (filter === 'all') {
          item.style.display = '';
          return;
        }
        var category = item.getAttribute('data-category');
        item.style.display = (category === filter) ? '' : 'none';
      });
    });
  });
}
```

#### Add data attributes to portfolio items

In `_includes/archive-single.html`, add the category as a data attribute:

```html
<article class="archive__item" data-category="{{ post.category | default: 'other' }}">
```

#### CSS for filter buttons

```scss
// _sass/_archive.scss

.portfolio-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.4em 1em;
  border: 1px solid var(--color-border);
  border-radius: 2em;
  background: transparent;
  color: var(--color-text-light);
  cursor: pointer;
  font-size: 0.85em;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #fff;
  }
}
```

---

## 8. Contact Form

### Current State

**File:** `_pages/contact.md`

Check the current contact page structure. If it only lists email/social links, consider adding a contact form.

### Implementation with Formspree (free tier)

```html
<!-- _pages/contact.md - add contact form -->

<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
  <div class="form-group">
    <label for="name">
      <span class="lang-en">Name</span>
      <span class="lang-es">Nombre</span>
    </label>
    <input type="text" id="name" name="name" required
           autocomplete="name">
  </div>

  <div class="form-group">
    <label for="email">
      <span class="lang-en">Email</span>
      <span class="lang-es">Correo electronico</span>
    </label>
    <input type="email" id="email" name="_replyto" required
           autocomplete="email">
  </div>

  <div class="form-group">
    <label for="subject">
      <span class="lang-en">Subject</span>
      <span class="lang-es">Asunto</span>
    </label>
    <select id="subject" name="subject">
      <option value="collaboration">Research Collaboration</option>
      <option value="speaking">Speaking / Talks</option>
      <option value="opportunity">Job Opportunity</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="form-group">
    <label for="message">
      <span class="lang-en">Message</span>
      <span class="lang-es">Mensaje</span>
    </label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

  <!-- Honeypot for spam prevention -->
  <input type="text" name="_gotcha" style="display:none">

  <button type="submit" class="btn btn--primary">
    <span class="lang-en">Send Message</span>
    <span class="lang-es">Enviar Mensaje</span>
  </button>
</form>
```

**Setup:**
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace `YOUR_FORM_ID` with your form ID
4. Submissions are forwarded to your email

**Alternative services:**
- [Netlify Forms](https://www.netlify.com/products/forms/) (if migrating to Netlify)
- [Basin](https://usebasin.com/) (free tier)
- [Web3Forms](https://web3forms.com/) (no signup required)

---

## 9. Sitemap Page

### Why

While `jekyll-sitemap` generates an XML sitemap for search engines, a human-readable sitemap page helps visitors navigate all content at a glance.

### Implementation

Create `_pages/sitemap-page.md`:

```yaml
---
layout: archive
title: "Sitemap"
title_en: "Sitemap"
title_es: "Mapa del Sitio"
permalink: /sitemap-page/
---
```

```html
<div class="sitemap-human">
  <h2><span class="lang-en">Main Pages</span><span class="lang-es">Paginas Principales</span></h2>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/cv/">CV</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>

  <h2><span class="lang-en">Research</span><span class="lang-es">Investigacion</span></h2>
  <ul>
    {% for pub in site.publications reversed %}
      <li><a href="{{ pub.url }}">{{ pub.title }}</a> ({{ pub.date | date: "%Y" }})</li>
    {% endfor %}
  </ul>

  <h2><span class="lang-en">Projects</span><span class="lang-es">Proyectos</span></h2>
  <ul>
    {% for project in site.portfolio %}
      <li><a href="{{ project.url }}">{{ project.title }}</a></li>
    {% endfor %}
  </ul>

  <h2><span class="lang-en">Talks</span><span class="lang-es">Charlas</span></h2>
  <ul>
    {% for talk in site.talks reversed %}
      <li><a href="{{ talk.url }}">{{ talk.title }}</a> ({{ talk.date | date: "%Y" }})</li>
    {% endfor %}
  </ul>

  <h2>Blog</h2>
  <ul>
    {% for post in site.posts %}
      <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%B %Y" }})</li>
    {% endfor %}
  </ul>
</div>
```

Add to footer:
```html
<!-- _includes/footer.html -->
<a href="/sitemap-page/">Sitemap</a>
```

---

## Priority Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Client-side search | High | Medium | P1 |
| Project filtering | Medium | Low | P1 |
| Social sharing buttons | Medium | Low | P1 |
| RSS feed subscribe UI | Low | Low | P1 |
| Contact form | Medium | Low | P2 |
| Related content | Medium | Medium | P2 |
| Reading time | Low | Low | P2 |
| Human sitemap | Low | Low | P3 |
| Back-to-top enhancement | Low | Low | P3 |

---

## Implementation Order

Recommended order for maximum impact with minimum effort:

1. **Project filtering tabs** - Quick win, improves portfolio navigation
2. **Social sharing buttons** - Easy, increases content reach
3. **RSS feed visibility** - Trivial, helps returning visitors
4. **Client-side search** - Medium effort, high value as content grows
5. **Contact form** - Quick setup with Formspree
6. **Related content** - Increases engagement and page views
7. **Human sitemap** - Quick, helps navigation
