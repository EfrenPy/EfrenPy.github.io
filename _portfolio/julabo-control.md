---
title: "JulaboFL1703-control"
title_en: "JulaboFL1703-control -Lab Equipment Control System"
title_es: "JulaboFL1703-control -Sistema de Control de Equipos de Laboratorio"
description: "Open-source Python control suite for Julabo FL1703 recirculating chillers with 6 interface layers, Docker deployment, and 587 tests at 93% coverage."
excerpt: "Python control suite for Julabo recirculating chillers with CLI, GUI, web dashboard, Docker deployment, and 587 tests"
excerpt_en: "Python control suite for Julabo recirculating chillers with CLI, GUI, web dashboard, Docker deployment, and 587 tests"
excerpt_es: "Suite de control en Python para enfriadores recirculantes Julabo con CLI, GUI, panel web, despliegue Docker y 587 tests"
collection: portfolio
category: personal
link: https://github.com/EfrenPy/JulaboFL1703-control
header:
  teaser: webp/julabo.webp
tags:
  - Python
  - Serial Communication
  - Asyncio
  - Docker
  - Prometheus
  - MQTT
---

## Project Overview

**Role:** Developer | **Type:** Open Source | [GitHub Repository](https://github.com/EfrenPy/JulaboFL1703-control)

### The Challenge

Provide reliable, multi-interface control of precision laboratory cooling equipment (Julabo FL1703 recirculating chiller) for experimental physics environments where temperature stability is critical.

### Solution

Built a full-stack Python control suite with 6 interface layers:

- **CLI** — Subcommands for status, setpoint, start/stop, and scheduled ramps
- **Desktop GUI** — Tkinter dashboard with live Matplotlib temperature chart
- **TCP JSON Server** — Remote control with optional TLS and token auth
- **Web Dashboard** — Browser UI with Server-Sent Events and WebSocket support
- **MQTT Bridge** — Publish telemetry to external brokers for fleet monitoring
- **Prometheus Endpoint** — `/metrics` for Grafana dashboards and alerting

Additional capabilities: setpoint schedules with linear interpolation, alarm monitoring with desktop notifications, CSV/SQLite logging, Docker deployment with docker-compose + Grafana stack, and a hardware simulator for development without physical equipment.

![Julabo FL1703 recirculating chiller](/images/webp/julabo.webp){: .align-center}

### Technical Stack

`Python 3.9+` `pyserial (RS232)` `asyncio` `Tkinter` `Matplotlib` `WebSockets` `MQTT` `Docker` `Prometheus` `Grafana` `SQLite`

### Results

- **587 tests**, 93% code coverage
- **6 entry points** (`julabo`, `julabo-server`, `julabo-server-async`, `julabo-remote`, `julabo-web`, `julabo-mqtt`)
- Full documentation: deployment guide, protocol reference, security notes, troubleshooting

### Industry Relevance

End-to-end IoT platform demonstrating: serial communication protocols, async networking, real-time dashboards, observability (Prometheus/Grafana), containerized deployment, and comprehensive test coverage. Directly applicable to industrial process control, manufacturing automation, and remote monitoring systems.
