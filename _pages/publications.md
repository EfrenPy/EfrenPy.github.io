---
layout: archive
title: "Research"
title_en: "Research"
title_es: "Investigación"
permalink: /publications/
author_profile: true
---

{% include t.html page="publications" key="intro" %} [{% include t.html page="publications" key="orcid_label" %}](https://orcid.org/0000-0002-7973-8061) {% include t.html page="publications" key="or" %} [{% include t.html page="publications" key="scholar_label" %}](https://scholar.google.com/citations?hl=en&user=pir4UaIAAAAJ)

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single-publications.html %}
{% endfor %}
