---
title: "3D Silicon Sensor Simulation"
title_en: "3D Silicon Sensor Simulation"
title_es: "Simulación de Sensores de Silicio 3D"
excerpt: "Built TCAD + Python simulation framework optimizing next-gen sensor geometry for extreme radiation environments (10¹⁶ particles/cm²)"
excerpt_en: "Built TCAD + Python simulation framework optimizing next-gen sensor geometry for extreme radiation environments (10¹⁶ particles/cm²)"
excerpt_es: "Construí framework de simulación TCAD + Python optimizando geometría de sensores de nueva generación para entornos de radiación extrema (10¹⁶ partículas/cm²)"
schema_type: ResearchProject
collection: portfolio
header:
  teaser: webp/3d_sensor.webp
tags:
  - Python
  - Simulation
  - Scientific Computing
  - Optimization
---

## Project Overview

**Role:** Lead Developer | **Duration:** 2024-Present | **Organization:** CERN EP-R&D

### The Challenge

Optimize 3D columnar silicon sensor geometry for extreme radiation environments (10^16 particles/cm²) targeting the LHCb VELO Upgrade II. Sensors must deliver ~20 ps timing per track while surviving HL-LHC radiation levels.

### Technical Approach

- Developed TCAD simulation framework for electric field modeling of 3D columnar electrode architectures
- Built Python-based parameter optimization pipeline sweeping cell size, electrode depth, and doping profiles
- Automated analysis of charge collection efficiency across geometry variants (baseline: CNM 50×50 μm² cells, 280 μm active thickness)
- Validated simulation predictions against testbeam data from 3 SPS campaigns (180 GeV/c pions at H6/H8 beamlines)
- Created visualization tools for electric field distributions and weighting potential maps

![3D Silicon Sensor cross-section](/images/webp/3d_sensor.webp){: .align-center}

### Technical Stack

`Python` `TCAD` `NumPy` `Matplotlib` `Git` `Scientific Computing`

### Current Progress

- Framework operational and producing results for VELO Upgrade II sensor selection
- Multiple geometry configurations under evaluation, feeding back into CNM fabrication runs
- Simulation results cross-checked with EUDAQ telescope measurements (~5 μm pointing resolution at DUT)
- Collaboration with sensor manufacturers for prototype fabrication

### Industry Relevance

Skills directly applicable to:
- **Semiconductor R&D:** Sensor development and characterization methodologies
- **Scientific Computing:** Large-scale simulation frameworks
- **Optimization:** Parameter sweeps and design space exploration
- **Data Visualization:** Communicating complex technical results
