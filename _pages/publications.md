---
layout: archive
title: "Publications"
title_en: "Publications"
title_es: "Investigación"
description: "Research publications by Efrén Rodríguez on silicon pixel detectors, timing measurements, and the LHCb experiment at CERN."
permalink: /publications/
author_profile: true
---

{% include t.html page="publications" key="intro" %} [{% include t.html page="publications" key="orcid_label" %}](https://orcid.org/0000-0002-7973-8061) {% include t.html page="publications" key="or" %} [{% include t.html page="publications" key="scholar_label" %}](https://scholar.google.com/citations?hl=en&user=pir4UaIAAAAJ)

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single-publications.html %}
{% endfor %}
