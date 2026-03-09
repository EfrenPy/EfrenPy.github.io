---
title: "Cold Box Test Setup"
title_en: "Cold Box Cryogenic Test Setup for Sensor Characterization"
title_es: "Cámara Fría para Caracterización de Sensores"
description: "Custom -20°C sealed test enclosure with environmental monitoring, beam windows, and dry-gas flushing for silicon sensor characterization at SPS testbeams."
excerpt: "Designed and built a -20°C sealed test enclosure with beam windows, environmental monitoring, and dry-gas flushing for silicon sensor characterization at CERN SPS"
excerpt_en: "Designed and built a -20°C sealed test enclosure with beam windows, environmental monitoring, and dry-gas flushing for silicon sensor characterization at CERN SPS"
excerpt_es: "Diseñé y construí una cámara de pruebas sellada a -20°C con ventanas de haz, monitorización ambiental y barrido de gas seco para caracterización de sensores de silicio en el SPS del CERN"
schema_type: ResearchProject
collection: portfolio
category: research
header:
  teaser: webp/setup_3d.webp
tags:
  - Thermal Engineering
  - Mechanical Design
  - Environmental Monitoring
  - Python
  - Test Infrastructure
---

## Project Overview

**Role:** Designer & Builder | **Duration:** 2021-2022 | **Organization:** CERN EP-R&D / IGFAE

### The Challenge

The VELO detector operates at around -30°C, so testing sensors at room temperature only tells part of the story. We needed a controlled cold environment that could reach -20°C while keeping the sensor accessible to a 180 GeV/c particle beam and instrumented with all readout cables, fitting within the 80 mm gap between telescope arms.

### My Contribution

Designed and iterated through several versions of a sealed cold enclosure:

- Walls from 50 mm XPS foam panels (~0.03 W/m·K), with a glycol recirculating chiller driving an aluminium cold plate via copper tubing. PEEK standoffs isolating the DUT mounting stage from the external structure
- 50 μm aluminium beam windows maintaining the nitrogen atmosphere while adding negligible material (~2 μrad scattering for 180 GeV/c pions)
- Dry nitrogen flushing at 1-2 L/min to keep relative humidity below 10% even at lowest temperatures. Nitrogen chosen over dry air for its guaranteed -60°C dew point
- EnviE V2.0 environmental monitoring (ESP8266 WiFi microcontroller, 5× Pt100 RTD temperature sensors, 3× HIH-4021-003 humidity sensors, ADS1115 16-bit ADC) streaming data via WiFi to a central database
- Kapton flex cables for low thermal conductivity, insulated feedthroughs reducing thermal bridging, and filtered bias voltage lines

![Testbeam infrastructure including cold box](/images/webp/setup_3d.webp){: .portfolio-img}

### Technical Stack

`Thermal Design` `CAD` `Python` `ESP8266` `Pt100 RTD` `PID Control` `WiFi IoT`
{: .tech-stack}

### Results

- Reached **-18°C at sensor location** with ±0.5°C stability during extended runs
- **30-45 minute settling time** between setpoints
- Humidity held below 10% throughout all cold campaigns
- 4 temperature sensors and 3 humidity sensors streaming data via WiFi for offline correlation with beam conditions
- Operated successfully during the October 2021 campaign for 3D sensor characterization at multiple temperatures
{: .results-highlight}

### Industry Relevance

Thermal management, environmental test infrastructure, and IoT sensor integration. The design process (iterating through failures, balancing competing constraints, fitting within tight mechanical tolerances) applies directly to test chamber design, environmental qualification, and any hardware role where thermal performance meets real-world packaging constraints.
