---
permalink: /
title: "Welcome!"
title_en: "Welcome!"
title_es: "¡Bienvenido!"
excerpt: "Particle Physics Researcher | Silicon Detector Expert | CERN"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<section class="homepage-hero">
  <div class="homepage-hero__content">
    <h1 class="homepage-hero__name gradient-text">Efrén Rodríguez</h1>
    <p class="homepage-hero__tagline">
      <span class="lang-en">Particle Physics Researcher · Silicon Detector Expert · CERN</span>
      <span class="lang-es">Investigador en Física de Partículas · Experto en Detectores de Silicio · CERN</span>
    </p>
    <div class="homepage-hero__cta">
      <a href="{{ site.baseurl }}/files/Efren_Rodriguez_CV.pdf" class="btn btn--large cv-download-btn" data-no-swup target="_blank" rel="noopener">
        <i class="fas fa-download"></i> <span class="lang-en">Download CV</span><span class="lang-es">Descargar CV</span>
      </a>
      <a href="{{ site.baseurl }}/portfolio/" class="btn btn--large btn--outline">
        <span class="lang-en">View Projects</span><span class="lang-es">Ver Proyectos</span>
      </a>
    </div>
  </div>
  <div class="homepage-hero__mesh" aria-hidden="true">
    <div class="hero-orb hero-orb--1"></div>
    <div class="hero-orb hero-orb--2"></div>
  </div>
</section>

{% include t-block.html page="about" key="bio" %}

---

### {% include t.html page="about" key="highlights_title" %}

<div class="bento-grid">
  <div class="highlight-card bento-span-2">
    <i class="fas fa-users"></i>
    <h4>{% include t.html page="about" key="highlight_research_title" %}</h4>
    <p>{% include t.html page="about" key="highlight_research_desc" %}</p>
  </div>
  <div class="highlight-card">
    <i class="fas fa-code"></i>
    <h4>{% include t.html page="about" key="highlight_tech_title" %}</h4>
    <p>{% include t.html page="about" key="highlight_tech_desc" %}</p>
  </div>
  <div class="highlight-card">
    <i class="fas fa-globe"></i>
    <h4>{% include t.html page="about" key="highlight_collab_title" %}</h4>
    <p>{% include t.html page="about" key="highlight_collab_desc" %}</p>
  </div>
</div>

---

### {% include t.html page="about" key="achievements_title" %}

{% include t-block.html page="about" key="achievements" %}

---

### {% include t.html page="about" key="certifications_title" %}

<div class="certifications-grid">
  <div class="cert-card">
    <div class="cert-icon"><i class="fab fa-python"></i></div>
    <div class="cert-info">
      <div class="cert-name">{% include t.html page="about" key="cert_python" %}</div>
      <div class="cert-issuer">{% include t.html page="about" key="cert_python_issuer" %}</div>
    </div>
  </div>
</div>

---

### {% include t.html page="about" key="education_title" %}

:hatched_chick: {% include t.html page="about" key="edu_phd" md=true %}

:hatching_chick: {% include t.html page="about" key="edu_master" md=true %}

:egg: {% include t.html page="about" key="edu_bachelor" md=true %}

---

{% include t-block.html page="about" key="explore_publications" %}

### {% include t.html page="about" key="publications_title" %}

<ul>{% for post in site.publications %}
  {% include archive-single-publications-about.html %}
{% endfor %}</ul>
