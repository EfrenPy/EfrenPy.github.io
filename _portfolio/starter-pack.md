---
title: "CERN Starter Pack"
title_en: "CERN Starter Pack -Newcomer Onboarding Guide"
title_es: "CERN Starter Pack -Guia de Acogida para Recien Llegados"
description: "Multilingual onboarding guide for CERN newcomers in 4 languages with 40+ pages, search, cost calculator, and 355 Playwright tests — built with Eleventy."
excerpt: "Multilingual onboarding guide for CERN newcomers in 4 languages with 40+ pages, search, and 355 Playwright tests"
excerpt_en: "Multilingual onboarding guide for CERN newcomers in 4 languages with 40+ pages, search, and 355 Playwright tests"
excerpt_es: "Guia de acogida multilingue para recien llegados al CERN en 4 idiomas con 40+ paginas, busqueda y 355 tests Playwright"
collection: portfolio
category: personal
link: https://starter-pack.efrenrodriguezrodriguez.com/
header:
  teaser: webp/starter_pack_cern.webp
tags:
  - Eleventy
  - Nunjucks
  - JavaScript
  - Playwright
  - i18n
  - Fuse.js
---

## Project Overview

**Role:** Developer | **Type:** Open Source | [Website](https://starter-pack.efrenrodriguezrodriguez.com/) · [GitHub Repository](https://github.com/EfrenPy/Starter-Pack)

### The Challenge

New CERN employees face a maze of legal, tax, housing, and technical setup requirements spread across dozens of disconnected sources — with no single, searchable, multilingual resource.

### Solution

A fully static knowledge base serving **40+ content pages in 4 languages** (Spanish, English, Italian, French):

- **Legal & Tax Hub** — Contracts, work permits, health insurance, taxation, pension, social security, country-specific guides (French/Swiss taxes, Spain's Modelo 720)
- **Daily Life Hub** — Housing, banking, transportation, childcare, language training, utilities
- **Technical Hub** — CERN IT basics, Kerberos/SSH, LXPLUS, EOS storage, GitLab, SWAN/Jupyter, ROOT, VS Code Remote setup
- **Interactive Tools** — Client-side search with accent-insensitive fuzzy matching (Fuse.js), onboarding checklist, and cost-of-living calculator
- **Accessibility** — Dark mode with system preference detection, print-friendly layouts, offline support via service worker, responsive design

Architecture: Eleventy (11ty) v3 static generator with Nunjucks templating, search index built at compile time, and zero server-side dependencies.

![CERN aerial view](/images/webp/starter_pack_cern.webp){: .align-center}

### Technical Stack

`Eleventy (11ty)` `Nunjucks` `JavaScript (ES modules)` `Fuse.js` `Playwright` `GitHub Actions` `FTP Deploy`

### Results

- **4 languages**, 40+ pages each (160+ pages total)
- **355 Playwright tests** with full CI pipeline
- **Lighthouse CI** monitoring on every push
- Live at [starter-pack.efrenrodriguezrodriguez.com](https://starter-pack.efrenrodriguezrodriguez.com/)

### Industry Relevance

Designed a multilingual knowledge-base product solving a real onboarding pain point. Demonstrates: i18n architecture at scale, static-site engineering, automated testing (355 E2E tests), CI/CD pipelines, client-side search, and the ability to identify process gaps and build tools that improve team productivity.
