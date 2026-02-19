---
title: "MapToPoster"
title_en: "MapToPoster -City Map Poster Generator"
title_es: "MapToPoster -Generador de Pósters de Mapas Urbanos"
description: "Python tool that generates minimalist city map posters from OpenStreetMap data, with customizable styles and high-resolution output."
excerpt: "Python tool that transforms any city into minimalist map posters using OpenStreetMap data"
excerpt_en: "Python tool that transforms any city into minimalist map posters using OpenStreetMap data"
excerpt_es: "Herramienta Python que transforma cualquier ciudad en pósters de mapas minimalistas usando datos de OpenStreetMap"
collection: portfolio
category: personal
link: https://github.com/EfrenPy/maptoposter
header:
  teaser: webp/maptoposter_tokyo.webp
tags:
  - Python
  - OSMnx
  - Matplotlib
  - Geospatial
  - CLI
---

## Project Overview

**Role:** Developer | **Type:** Open Source | [GitHub Repository](https://github.com/EfrenPy/maptoposter)

### The Challenge

Generate print-ready, publication-quality city map posters from code — with full control over style, typography, and output format — for any city in the world.

### Solution

![Tokyo map poster in japanese ink style](/images/webp/maptoposter_tokyo.webp){: .portfolio-img}

A Python CLI tool that fetches OpenStreetMap data via OSMnx and renders layered map artwork:

- **17 built-in themes** — noir, blueprint, neon cyberpunk, japanese ink, terracotta, sunset, and more
- **Multilingual typography** — Google Fonts integration for non-Latin scripts (Japanese, Korean, Arabic, Thai, Chinese)
- **Print-ready output** — A0–A4 paper presets, up to 1200 DPI, in PNG/SVG/PDF formats
- **Layered rendering** — Background, water, green areas, streets, buildings, and labels composed independently
- **Batch mode** — Generate all 17 theme variants in one command

Usage examples:

```bash
# Basic poster
python create_map_poster.py -c "Paris" -C "France" -t sunset

# Japanese typography
python create_map_poster.py -c "Tokyo" -C "Japan" -dc "東京" --font-family "Noto Sans JP"

# Print-ready A2 at 600 DPI
python create_map_poster.py -c "London" -C "UK" -p A2 --dpi 600
```

### Technical Stack

`Python` `OSMnx` `Matplotlib` `Pillow` `OpenStreetMap` `Google Fonts` `SVG` `PDF`
{: .tech-stack}

### Industry Relevance

Demonstrates geospatial data processing, automated rendering pipelines, configurable output generation, and CLI design. The pattern — ingest external data, apply transformations, produce publication-ready output — applies directly to report generation, data visualization tools, and ETL pipelines.
