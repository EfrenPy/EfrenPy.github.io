---
title: "Test Beam Data Pipeline"
title_en: "Test Beam Data Pipeline"
title_es: "Pipeline de Datos de Haz de Pruebas"
description: "Automated TB-scale data pipeline for beam test analysis, cutting turnaround from days to hours across 10+ experimental campaigns."
excerpt: "Built TB-scale automated pipeline cutting analysis turnaround from days to hours, processing data from 10+ beam test campaigns"
excerpt_en: "Built TB-scale automated pipeline cutting analysis turnaround from days to hours, processing data from 10+ beam test campaigns"
excerpt_es: "Construí pipeline automatizado a escala TB reduciendo el análisis de días a horas, procesando datos de más de 10 campañas de test beam"
collection: portfolio
header:
  teaser: webp/grid_score_nikhef.webp
tags:
  - Python
  - Data Engineering
  - ROOT
  - Automation
  - GRID Computing
---

## Project Overview

**Role:** Developer & Analyst | **Duration:** 2021-Present | **Data Volume:** TB-scale per campaign

### The Challenge

Process and analyze TB-scale datasets from particle beam experiments with quick turnaround to guide ongoing data-taking decisions. Manual analysis took weeks; beam campaigns run on tight schedules with limited access.

### Solution

Developed the LGADUtils C++/ROOT analysis framework with modular architecture:

- **WaveformAnalysis:** Oscilloscope parsing, baseline subtraction, signal extraction
- **TimingExtraction:** Configurable constant-fraction discriminator (CFD) algorithm with per-pixel timewalk correction
- **TrackMatching:** Spatial and temporal correlation between telescope tracks and device-under-test hits
- **CalibrationTools:** VCO frequency calibration, drift correction, charge calibration via test-pulse injection
- **GRID processing:** 185,000+ HTCondor jobs for timing characterization across campaigns
- **Real-time monitoring:** Data quality checks at ~50 MB/s TCP throughput, near-100% live-time during beam spills

![GRID computing usage statistics](/images/webp/grid_score_nikhef.webp){: .align-center}

### Technical Stack

`Python` `ROOT` `Pandas` `NumPy` `Git` `Bash` `HTCondor` `GRID Computing`

### Results

- Reduced analysis turnaround from weeks to days across 12+ campaigns
- 185,849 grid jobs processed for the Timepix4 timing characterization alone (3rd highest usage at Nikhef)
- Framework adopted by collaborating institutions within the EP-R&D programme
- Enabled same-day feedback during beam time, directly informing detector configuration decisions

### Industry Relevance

Skills directly applicable to:
- **Data Engineering:** Building robust data pipelines
- **DevOps:** Automation and workflow orchestration
- **Scientific Computing:** Statistical analysis and visualization
- **Distributed Systems:** GRID/cluster computing experience
