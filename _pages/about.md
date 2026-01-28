---
permalink: /
title: "Welcome!"
title_en: "Welcome!"
title_es: "¡Bienvenido!"
excerpt: "About me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% include t-block.html page="about" key="bio" %}

{% include t.html page="about" key="cv_link" %} [{% include t.html page="about" key="cv_label" %}](http://EfrenPy.github.io/files/Efren_Rodriguez_CV.pdf).

### {% include t.html page="about" key="interests_title" %}
- {% include t.html page="about" key="interests_engaged" %}
- {% include t.html page="about" key="interests_explore" %}

### {% include t.html page="about" key="education_title" %}
:hatched_chick: {% include t.html page="about" key="edu_phd" md=true %}

:hatching_chick: {% include t.html page="about" key="edu_master" md=true %}

:egg: {% include t.html page="about" key="edu_bachelor" md=true %}

{% include t-block.html page="about" key="explore_publications" %}

{% include t.html page="about" key="publications_title" %}
======
  <ul>{% for post in site.publications %}
    {% include archive-single-publications-about.html %}
  {% endfor %}</ul>
