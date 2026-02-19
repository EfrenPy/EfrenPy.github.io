---
layout: archive
title: "Publications"
title_en: "Publications"
title_es: "Publicaciones"
description: "Published research by Efren Rodriguez on silicon detector systems, precision timing, and the LHCb experiment at CERN."
keywords: "publications, silicon detectors, LHCb VELO, particle physics instrumentation, pixel sensors, timing detectors, nuclear instruments methods"
permalink: /publications/
author_profile: true
---

{% include t.html page="publications" key="intro" %} [{% include t.html page="publications" key="orcid_label" %}](https://orcid.org/0000-0002-7973-8061) {% include t.html page="publications" key="or" %} [{% include t.html page="publications" key="scholar_label" %}](https://scholar.google.com/citations?hl=en&user=pir4UaIAAAAJ)

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single-publications.html %}
{% endfor %}
