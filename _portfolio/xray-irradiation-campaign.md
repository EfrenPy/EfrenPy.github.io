---
title: "X-Ray Irradiation Campaign"
title_en: "X-Ray Irradiation Campaign for VELO Adhesive Qualification"
title_es: "Campaña de Irradiación con Rayos X para Cualificación de Adhesivos del VELO"
description: "Planned and executed 600 Mrad X-ray irradiation campaigns for LHCb VELO adhesive samples, achieving 5% dose uniformity using optimized sample positioning and double-irradiation technique."
excerpt: "Planned and executed 600 Mrad X-ray irradiation of VELO adhesive samples with 5% dose uniformity using custom holders, 3D dose mapping, and a double-irradiation technique"
excerpt_en: "Planned and executed 600 Mrad X-ray irradiation of VELO adhesive samples with 5% dose uniformity using custom holders, 3D dose mapping, and a double-irradiation technique"
excerpt_es: "Planifiqué y ejecuté irradiación con rayos X de 600 Mrad en muestras de adhesivo del VELO con 5% de uniformidad de dosis usando soportes a medida, mapeo 3D de dosis y técnica de doble irradiación"
schema_type: ResearchProject
collection: portfolio
category: research
header:
  teaser: webp/lhcb_upgrade.webp
tags:
  - Radiation Testing
  - Python
  - Experimental Design
  - Quality Assurance
  - Data Analysis
---

## Project Overview

**Role:** Campaign Lead | **Duration:** 2020-2021 | **Organization:** IGFAE / University of Santiago de Compostela

### The Challenge

The VELO detector's silicon pixels are bonded to modules with a special adhesive. Before installation, these adhesive samples needed to survive radiation doses equivalent to their full operational lifetime in the LHCb. The task: deliver a uniform 600 Mrad dose to 4 silicon-sandwich samples using a shared X-ray tube at the university's radiology service, with limited machine availability.

### My Contribution

Led the full campaign from planning to sample delivery:

- Extended a Python analysis framework (originally developed in my master's thesis) to interpolate X-ray dose distributions in 3D, adding functions to calculate optimal sample angle for uniform irradiation on non-parallel planes
- Calculated beam attenuation through the first sample (35% transmission) using X-ray energy profiles and NIST mass attenuation coefficients, then placed two samples in series, swapping them mid-campaign so both received equal total dose
- Designed rigid sample holders with micrometer alignment guides for repeatable positioning between irradiation sessions, optimizing the tilt angle to compensate for the non-uniform beam profile
- Negotiated 15 days continuous X-ray tube access over Christmas holidays for the first 2 samples (600 Mrad each) and organized weekend-only sessions for the remaining 2 (300 Mrad each)

![LHCb VELO detector modules](/images/webp/lhcb_upgrade.webp){: .portfolio-img}

### Technical Stack

`Python` `X-Ray Physics` `NIST Data` `NumPy` `SciPy` `Data Interpolation` `Experimental Design`
{: .tech-stack}

### Results

- **600 Mrad** delivered to 2 samples (15 days continuous exposure)
- **300 Mrad** delivered to 2 samples (weekend sessions)
- **5% dose uniformity** across each sample (max-to-min variation)
- All samples passed downstream resistance testing by the module construction team
- Irradiation technique validated for future VELO component qualification campaigns
{: .results-highlight}

### Industry Relevance

End-to-end experimental campaign management: requirements gathering from another team, facility negotiation, Python-based dose simulation, custom fixturing design, and execution under tight scheduling constraints. Applicable to any role involving radiation testing, materials qualification, reliability engineering, or hardware validation in regulated environments.
