---
layout: archive
title: "Sitemap"
title_en: "Sitemap"
title_es: "Mapa del sitio"
description: "Full sitemap for Efrén Rodríguez's portfolio. Navigate to CV, projects, publications, talks, and contact."
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

<span class="lang-en" lang="en">A list of all the posts and pages found on the site. For you robots out there is an</span><span class="lang-es" lang="es">Una lista de todas las publicaciones y páginas del sitio. Para los robots, hay una</span> [<span class="lang-en" lang="en">XML version</span><span class="lang-es" lang="es">versión XML</span>]({{ base_path }}/sitemap.xml) <span class="lang-en" lang="en">available for digesting as well.</span><span class="lang-es" lang="es">disponible también.</span>

<h2><span class="lang-en" lang="en">Pages</span><span class="lang-es" lang="es">Páginas</span></h2>
{% for post in site.pages %}
  {% include archive-single.html %}
{% endfor %}

<h2><span class="lang-en" lang="en">Posts</span><span class="lang-es" lang="es">Publicaciones</span></h2>
{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h2>{{ label }}</h2>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% unless collection.output == false or collection.label == "posts" %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}
