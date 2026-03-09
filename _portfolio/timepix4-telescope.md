---
title: "Timepix4 Beam Telescope"
title_en: "Timepix4 Beam Telescope"
title_es: "Telescopio de Haz Timepix4"
excerpt: "Led cross-institutional team to build precision tracking system achieving 92 ps timing and 2.3 μm spatial resolution, the only telescope combining both. 12+ campaigns across 4 years"
excerpt_en: "Led cross-institutional team to build precision tracking system achieving 92 ps timing and 2.3 μm spatial resolution, the only telescope combining both. 12+ campaigns across 4 years"
excerpt_es: "Lideré equipo interinstitucional para construir sistema de seguimiento de precisión logrando 92 ps temporal y 2,3 μm espacial, el único telescopio que combina ambas. 12+ campañas en 4 años"
schema_type: ResearchProject
collection: portfolio
header:
  teaser: webp/setup_3d.webp
tags:
  - Python
  - Data Analysis
  - Hardware Integration
  - Project Management
---

## Project Overview

**Role:** Project Lead | **Duration:** 2022-Present | **Organization:** CERN/Nikhef

### The Challenge

Design and build a particle tracking telescope capable of sub-100 picosecond timing resolution and micrometre-level spatial precision for validating next-generation detectors at CERN's SPS beam facility. No existing system combined both capabilities.

### My Contribution

- Led a cross-institutional team across CERN and Nikhef
- Designed 8-plane detector configuration mixing thin (100 μm) sensors for timing and thick (300 μm) sensors for spatial resolution
- Built calibration procedures: per-pixel VCO frequency correction, four-parameter timewalk model, and intra-run drift subtraction
- Developed Python/C++ analysis pipeline processing TB-scale datasets (185,000+ grid jobs for timing characterization)
- Implemented CO₂ cooling system achieving stable -30°C operation
- Coordinated 12+ test beam campaigns at CERN SPS (2021-2025), serving as campaign coordinator for 2

![Timepix4 beam telescope setup](/images/webp/setup_3d.webp){: .align-center}

### Technical Stack

`Python` `ROOT` `C++` `Git` `Data Analysis` `Hardware Integration` `Cryogenics`

### Results

- **92 ± 5 ps** track timing resolution, a 4× improvement over the Timepix3 predecessor (350 ps)
- **2.3 ± 0.1 μm** pointing resolution at the device-under-test position
- 98-99% cluster efficiency on thin planes, sustaining 2×10⁶ particles/s with <1% efficiency loss
- The only beam telescope combining micrometre pointing with sub-100 ps track timing
- Results presented at the Hiroshima Symposium (HSTD13) and adopted for characterizing LGAD and 3D sensors in the 20-40 ps regime

### Industry Relevance

This project demonstrates skills directly applicable to:
- **Project Management:** Coordinating international teams and resources
- **System Integration:** Combining hardware, software, and infrastructure
- **Data Engineering:** Processing TB-scale datasets with quick turnaround
- **Problem Solving:** Optimizing complex multi-variable systems
