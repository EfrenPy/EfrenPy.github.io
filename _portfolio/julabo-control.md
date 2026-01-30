---
title: "JulaboFL1703-control"
title_en: "JulaboFL1703-control — Lab Equipment Control System"
title_es: "JulaboFL1703-control — Sistema de Control de Equipos de Laboratorio"
excerpt: "Python control suite for operating a Julabo recirculating chiller via CLI, GUI, and network interfaces"
excerpt_en: "Python control suite for operating a Julabo recirculating chiller via CLI, GUI, and network interfaces"
excerpt_es: "Suite de control en Python para operar un enfriador recirculante Julabo mediante CLI, GUI e interfaces de red"
collection: portfolio
category: personal
link: https://github.com/EfrenPy/JulaboFL1703-control
header:
  teaser: webp/python_certificado.webp
tags:
  - Python
  - Serial Communication
  - GUI
  - TCP Server
---

![Python development](/images/webp/python_certificado.webp){: .align-center}

## Project Overview

**Role:** Developer | **Type:** Personal Project | [GitHub Repository](https://github.com/EfrenPy/JulaboFL1703-control)

### Description

A comprehensive Python control suite for operating a Julabo FL1703 recirculating chiller, providing multiple interfaces for laboratory temperature control — from command-line to remote GUI.

### Features

- Reusable Python library with RS232 serial communication
- CLI with subcommands: version, status, get/set setpoint, start, stop, and interactive GUI
- Desktop GUI with live temperature chart via Matplotlib
- TCP JSON server for remote network-based control with companion GUI client
- Auto-detection of USB serial adapters on Linux and Windows

### Technical Stack

`Python` `Serial (RS232)` `Tkinter` `TCP/IP` `Matplotlib`
