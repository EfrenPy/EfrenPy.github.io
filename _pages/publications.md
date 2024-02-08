---
layout: archive
title: "Research"
permalink: /publications/
author_profile: true
---


  You can also find my articles on my [ORCiD](https://orcid.org/0000-0002-7973-8061) or my [Google Scholar profile](https://scholar.google.com/citations?hl=en&user=pir4UaIAAAAJ)


{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single-publications.html %}
{% endfor %}
