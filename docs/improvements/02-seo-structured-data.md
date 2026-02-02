# SEO & Structured Data Improvements

Deep analysis and implementation guide for improving search engine visibility, structured data, and social sharing.

---

## Table of Contents

1. [Fill Missing Config Values](#1-fill-missing-config-values)
2. [JSON-LD Structured Data](#2-json-ld-structured-data)
3. [Open Graph Images](#3-open-graph-images)
4. [Hreflang Tags for Bilingual Content](#4-hreflang-tags-for-bilingual-content)
5. [Robots.txt Configuration](#5-robotstxt-configuration)
6. [Search Engine Verification](#6-search-engine-verification)
7. [Breadcrumbs](#7-breadcrumbs)
8. [Publication-Specific Schema](#8-publication-specific-schema)
9. [Meta Description Audit](#9-meta-description-audit)

---

## 1. Fill Missing Config Values

### Current State

**File:** `_config.yml` (lines 53-78)

Multiple SEO-critical fields are empty:

```yaml
twitter:
  username:          # EMPTY
facebook:
  username:          # EMPTY
  app_id:            # EMPTY
  publisher:         # EMPTY
og_image:            # EMPTY - no default OG image
social:
  type:              # EMPTY
  name:              # EMPTY
  links:             # EMPTY
analytics:
  provider: false    # DISABLED
```

### Implementation

```yaml
# _config.yml - update these sections

# Twitter (even if you don't use Twitter, needed for card metadata)
twitter:
  username: &twitter ""  # Add if you have one, or leave empty

# Default Open Graph image (shown when pages lack custom images)
og_image: /images/og-default.png  # Create a 1200x630 image

# Social profiles (enables Person JSON-LD with sameAs links)
social:
  type: Person
  name: "Efrén Rodríguez Rodríguez"
  links:
    - https://github.com/EfrenPy
    - https://www.linkedin.com/in/efren-rodriguez-rodriguez
    - https://orcid.org/0000-0002-XXXX-XXXX  # Your ORCID
    - https://scholar.google.com/citations?user=XXXXXX  # Your Google Scholar

# Analytics (optional but recommended)
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "G-XXXXXXXXXX"  # Your GA4 measurement ID
    anonymize_ip: true
```

### Create default OG image

Create a 1200x630px image at `/images/og-default.png` with:
- Your name
- "CERN Researcher | Silicon Detectors"
- Your profile photo
- Site URL

This image will be used as the fallback when sharing any page that lacks a custom teaser.

---

## 2. JSON-LD Structured Data

### Current State

**File:** `_includes/seo.html` (lines 105-125)

Two JSON-LD blocks exist but are conditionally rendered and incomplete:
- Organization schema only renders if `site.og_image` is set (currently empty)
- Person schema only renders if `site.social` is configured (currently empty)

**File:** `_layouts/single.html` (line 17)

Uses microdata `itemtype="http://schema.org/CreativeWork"` for all content types (generic, not specific).

### Implementation

#### Enhanced Person schema

Create a new include `_includes/jsonld-person.html`:

```html
<!-- _includes/jsonld-person.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{{ site.author.name }}",
  "url": "{{ site.url }}",
  "image": "{{ site.url }}/images/webp/profile.webp",
  "jobTitle": "Postdoctoral Researcher",
  "worksFor": {
    "@type": "Organization",
    "name": "CERN",
    "url": "https://home.cern"
  },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "Universidade de Santiago de Compostela",
      "url": "https://www.usc.gal"
    }
  ],
  "knowsAbout": [
    "Particle Physics",
    "Silicon Detectors",
    "Python",
    "Data Analysis",
    "FPGA Design"
  ],
  "sameAs": [
    {% if site.author.github %}"https://github.com/{{ site.author.github }}"{% endif %}
    {% if site.author.linkedin %}, "https://www.linkedin.com/in/{{ site.author.linkedin }}"{% endif %}
    {% if site.author.orcid %}, "{{ site.author.orcid }}"{% endif %}
    {% if site.author.googlescholar %}, "{{ site.author.googlescholar }}"{% endif %}
  ]
}
</script>
```

Include it in `_includes/head.html`:
```html
{% if page.url == "/" %}
  {% include jsonld-person.html %}
{% endif %}
```

#### WebSite schema (enables Google Sitelinks search box)

Create `_includes/jsonld-website.html`:

```html
<!-- _includes/jsonld-website.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ site.title }}",
  "url": "{{ site.url }}",
  "description": "{{ site.description }}",
  "inLanguage": ["en", "es"],
  "author": {
    "@type": "Person",
    "name": "{{ site.author.name }}"
  }
}
</script>
```

#### BreadcrumbList schema

Create `_includes/jsonld-breadcrumbs.html`:

```html
<!-- _includes/jsonld-breadcrumbs.html -->
{% assign crumbs = page.url | split: '/' %}
{% if crumbs.size > 1 %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{ site.url }}"
    }
    {% for crumb in crumbs %}{% if crumb != "" and crumb != "index.html" %}
    ,{
      "@type": "ListItem",
      "position": {{ forloop.index | plus: 1 }},
      "name": "{{ crumb | replace: '-', ' ' | capitalize }}",
      "item": "{{ site.url }}{% for c in crumbs limit: forloop.index %}{% if c != "" %}/{{ c }}{% endif %}{% endfor %}/"
    }
    {% endif %}{% endfor %}
  ]
}
</script>
{% endif %}
```

---

## 3. Open Graph Images

### Current State

- `og_image` in `_config.yml` is empty (no default)
- Publication teasers use placeholder paths (`path-to-your-image.png`)
- Portfolio items have teasers but they're small thumbnails (150px)

### Implementation

#### Create per-section OG images

For optimal social sharing, create 1200x630px images:

```
images/
  og-default.png          # Fallback: name + role + photo
  og-publications.png     # "Research Publications" header
  og-portfolio.png        # "Projects" header
  og-talks.png            # "Talks & Conferences" header
```

#### Add og_image to page front matter

For pages that should have custom social images:

```yaml
# _pages/publications.md
---
title: "Publications"
og_image: /images/og-publications.png
---
```

#### Update portfolio items with proper teasers

Fix placeholder teaser paths in publications:

```yaml
# _publications/silicon-vertex-detector-timing-upgrade-II-lhcb.md
header:
  teaser: webp/upgradeII.webp  # Use actual image, not 'path-to-your-image.png'

# _publications/the-lhcb-upgrade-i.md
header:
  teaser: webp/lhcb-upgrade.webp  # Replace placeholder
```

#### Update seo.html for better OG image handling

In `_includes/seo.html`, the current OG image logic (around line 86-90) can be improved:

```html
<!-- _includes/seo.html - enhanced OG image logic -->
{% if page.header.image %}
  {% assign og_image = page.header.image %}
{% elsif page.header.overlay_image %}
  {% assign og_image = page.header.overlay_image %}
{% elsif page.header.teaser %}
  {% assign og_image = page.header.teaser | prepend: "/images/" %}
{% elsif page.og_image %}
  {% assign og_image = page.og_image %}
{% elsif site.og_image %}
  {% assign og_image = site.og_image %}
{% endif %}

{% if og_image %}
  {% unless og_image contains "://" %}
    {% assign og_image = og_image | prepend: site.url %}
  {% endunless %}
  <meta property="og:image" content="{{ og_image }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
{% endif %}
```

---

## 4. Hreflang Tags for Bilingual Content

### Current State

The site has full bilingual support (EN/ES) via JavaScript toggle, but:
- No `hreflang` tags in `<head>`
- The locale is set to `es_ES` but content renders in both languages
- No alternate language hints for search engines

### Implementation

Since the site uses client-side language switching (same URL for both languages), traditional `hreflang` is not applicable. However, you can signal to search engines that the content is multilingual:

```html
<!-- _includes/head.html - add after canonical link -->
<link rel="alternate" hreflang="en" href="{{ page.url | prepend: site.url }}">
<link rel="alternate" hreflang="es" href="{{ page.url | prepend: site.url }}">
<link rel="alternate" hreflang="x-default" href="{{ page.url | prepend: site.url }}">
```

**Better long-term approach:** If you want proper SEO for both languages, consider URL-based language routing:
- `efrenrodriguezrodriguez.com/en/` for English
- `efrenrodriguezrodriguez.com/es/` for Spanish

This would require significant restructuring but gives search engines proper language-specific URLs to index.

---

## 5. Robots.txt Configuration

### Current State

No `robots.txt` file exists in the repository root. The `jekyll-sitemap` plugin may generate a default one, but it's better to be explicit.

### Implementation

Create `robots.txt` in the repository root:

```
# robots.txt
User-agent: *
Allow: /

Sitemap: https://efrenrodriguezrodriguez.com/sitemap.xml

# Block crawling of non-content paths
Disallow: /assets/js/
Disallow: /assets/fonts/
Disallow: /files/
```

**Note:** Add `---\n---` YAML front matter if you want Jekyll to process it (for variable substitution), or leave it as a plain text file.

---

## 6. Search Engine Verification

### Current State

Verification meta tags exist in `_includes/seo.html` but config values are empty.

### Implementation

1. **Google Search Console:**
   - Go to [Search Console](https://search.google.com/search-console)
   - Add property: `https://efrenrodriguezrodriguez.com`
   - Choose "HTML tag" verification method
   - Copy the `content` value

2. **Bing Webmaster Tools:**
   - Go to [Bing Webmaster](https://www.bing.com/webmasters)
   - Add site and get verification code

3. Update `_config.yml`:

```yaml
google_site_verification: "your-google-verification-code"
bing_site_verification: "your-bing-verification-code"
```

4. After verification, submit your sitemap URL in both consoles:
   `https://efrenrodriguezrodriguez.com/sitemap.xml`

---

## 7. Breadcrumbs

### Current State

**File:** `_config.yml` (line 18): `breadcrumbs: false`

Breadcrumbs are disabled. The include `_includes/breadcrumbs.html` exists but is never rendered.

### Implementation

Enable breadcrumbs in `_config.yml`:

```yaml
breadcrumbs: true
```

This will automatically render the breadcrumb trail on subpages, improving:
- Navigation UX for deep pages
- Search engine understanding of site hierarchy
- Potential for breadcrumb rich snippets in Google results

Combine with the JSON-LD BreadcrumbList schema from section 2 for maximum SEO benefit.

---

## 8. Publication-Specific Schema

### Current State

Publications use generic `CreativeWork` microdata. For academic content, Google Scholar and Google Search support `ScholarlyArticle` schema.

### Implementation

Create `_includes/jsonld-publication.html`:

```html
<!-- _includes/jsonld-publication.html -->
{% if page.collection == "publications" %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "headline": "{{ page.title | strip_html | truncate: 110 }}",
  "description": "{{ page.excerpt | strip_html | strip_newlines | truncate: 200 }}",
  {% if page.date %}"datePublished": "{{ page.date | date_to_xmlschema }}",{% endif %}
  "author": {
    "@type": "Person",
    "name": "{{ site.author.name }}",
    "affiliation": {
      "@type": "Organization",
      "name": "CERN"
    }
  },
  {% if page.venue %}
  "publisher": {
    "@type": "Organization",
    "name": "{{ page.venue | strip_html }}"
  },
  "isPartOf": {
    "@type": "PublicationVolume",
    "name": "{{ page.venue | strip_html }}"
  },
  {% endif %}
  {% if page.paperurl %}
  "url": "{{ page.paperurl }}",
  {% endif %}
  {% if page.link %}
  "sameAs": "{{ page.link }}",
  {% endif %}
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ page.url | prepend: site.url }}"
  }
}
</script>
{% endif %}
```

Include it in `_layouts/single.html`:

```html
{% include jsonld-publication.html %}
```

#### Portfolio project schema

Create `_includes/jsonld-project.html`:

```html
<!-- _includes/jsonld-project.html -->
{% if page.collection == "portfolio" %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "{{ page.title | strip_html }}",
  "description": "{{ page.excerpt | strip_html | strip_newlines | truncate: 200 }}",
  "author": {
    "@type": "Person",
    "name": "{{ site.author.name }}"
  },
  {% if page.link %}"codeRepository": "{{ page.link }}",{% endif %}
  {% if page.tags %}
  "programmingLanguage": [
    {% for tag in page.tags %}"{{ tag }}"{% unless forloop.last %}, {% endunless %}{% endfor %}
  ],
  {% endif %}
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ page.url | prepend: site.url }}"
  }
}
</script>
{% endif %}
```

---

## 9. Meta Description Audit

### Current State

Pages use the `excerpt` field as the meta description (via `seo.html`). This is functional but some are missing or generic.

### Recommendations

Review each page's `excerpt` to ensure it's:
- 150-160 characters max
- Contains relevant keywords
- Unique per page
- Describes the page content accurately

**Pages to review:**

| Page | Current Excerpt | Action |
|------|----------------|--------|
| Homepage | "Particle Physics Researcher \| Silicon Detector Expert \| CERN" | Good, but could include name |
| CV | None | Add: "CV of Efrén Rodríguez Rodríguez - CERN postdoctoral researcher specializing in silicon particle detectors" |
| Contact | None | Add: "Contact Efrén Rodríguez Rodríguez for research collaborations, speaking engagements, or project inquiries" |
| Publications | None | Add: "Published research papers on silicon detectors, LHCb VELO upgrade, and particle physics instrumentation" |
| Portfolio | None | Add: "Research and personal projects: LHCb VELO, Timepix4, 3D sensor simulation, and open-source tools" |

Add `excerpt` to any page front matter that lacks one:

```yaml
# _pages/cv.md
---
excerpt: "CV of Efrén Rodríguez Rodríguez - CERN postdoctoral researcher in silicon particle detectors and instrumentation."
---
```

---

## Priority Matrix

| Improvement | Impact | Effort | Priority |
|------------|--------|--------|----------|
| Fill _config.yml social/og_image | High | Low | P0 |
| Default OG image | High | Low | P0 |
| Fix publication placeholder images | Medium | Low | P0 |
| Person JSON-LD | High | Medium | P1 |
| ScholarlyArticle schema | High | Medium | P1 |
| Meta description audit | Medium | Low | P1 |
| Search engine verification | Medium | Low | P1 |
| Robots.txt | Low | Low | P1 |
| Enable breadcrumbs | Medium | Low | P2 |
| BreadcrumbList JSON-LD | Medium | Medium | P2 |
| Hreflang tags | Low | Low | P2 |
| URL-based language routing | High | Very High | P3 (future) |

---

## Validation

After implementing, validate structured data:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
