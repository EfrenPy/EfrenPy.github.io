---
title: "Trigger Interface Board"
title_en: "Trigger Interface Board (TiB) for SPS Beam Synchronization"
title_es: "Placa de Interfaz de Trigger (TiB) para Sincronización con el Haz SPS"
description: "Custom PCB synchronizing oscilloscope DAQ with CERN SPS beam structure via MCP2210 microcontroller, LVDS-to-NIM conversion, and galvanic isolation."
excerpt: "Custom PCB bridging SPS accelerator timing signals to lab DAQ electronics, with spill detection, busy logic, and galvanic isolation. Used across 3 beam campaigns without hardware failures"
excerpt_en: "Custom PCB bridging SPS accelerator timing signals to lab DAQ electronics, with spill detection, busy logic, and galvanic isolation. Used across 3 beam campaigns without hardware failures"
excerpt_es: "PCB a medida conectando señales de temporización del acelerador SPS con la electrónica DAQ del laboratorio, con detección de spill, lógica de busy y aislamiento galvánico. Usada en 3 campañas sin fallos de hardware"
schema_type: ResearchProject
collection: portfolio
category: research
header:
  teaser: webp/setup_3d.webp
tags:
  - PCB Design
  - Firmware
  - C
  - Signal Conditioning
  - DAQ
  - Hardware Integration
---

## Project Overview

**Role:** Designer & Developer | **Duration:** 2021 | **Organization:** IGFAE / CERN

### The Challenge

The SPS accelerator delivers beam in 4.8-second spills within a 30-second super-cycle. The oscilloscope DAQ needed to arm only when beam is coming, translate signal levels between the accelerator's LVDS and lab equipment's NIM/TTL, implement busy logic during readout, and isolate everything galvanically to avoid ground loops. No off-the-shelf module handled this combination.

### My Contribution

Designed and built a Trigger Interface Board from scratch:

- SN65MLVD204A quad LVDS receiver on the input stage, converting SPS timing signals (early warning, spill start, spill end) to CMOS levels
- High-speed optocouplers for galvanic isolation, protecting lab electronics from accelerator ground faults and eliminating ground-loop interference on timing measurements
- NIM-level outputs for the oscilloscope trigger, LEMO connections for the AIDA TLU, and an HDMI interface for EUDAQ busy/trigger handshake
- GPIO-controlled busy logic blocking trigger acceptance during oscilloscope readout, enabling deadtime-free operation during beam delivery
- Control software in C using the Linux hidraw interface, with a state machine coordinating spill signals and oscilloscope readout

Built around the Microchip MCP2210 USB-to-SPI/GPIO bridge (9 configurable GPIO lines, USB HID interface, no custom drivers needed).

![Testbeam setup with TiB integration](/images/webp/setup_3d.webp){: .portfolio-img}

### Technical Stack

`C` `PCB Design` `MCP2210` `LVDS` `NIM` `USB HID` `Signal Conditioning` `Optocouplers`
{: .tech-stack}

### Results

- **<1 μs trigger latency** from spill-start edge to oscilloscope arm (negligible vs 4.8 s spill)
- **Near-100% live-time** during beam delivery, limited only by inter-spill oscilloscope readout
- Used across all three 2021 SPS campaigns (June H6, August H8, October H8) without hardware failures
- Zero custom driver installations required on control PCs (USB HID)

### Industry Relevance

End-to-end hardware design project: requirements analysis, schematic design, signal conditioning, firmware development, and field deployment under demanding conditions. Directly applicable to test infrastructure design, embedded systems, industrial DAQ integration, and any role requiring bridging between heterogeneous hardware systems.
