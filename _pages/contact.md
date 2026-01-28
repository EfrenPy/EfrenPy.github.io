---
layout: single
title: "Contact"
title_en: "Contact"
title_es: "Contacto"
permalink: /contact/
author_profile: true
---

{% include t-block.html page="contact" key="intro" %}

---

### {% include t.html page="contact" key="reach_out_title" %}

<div class="contact-methods">
  <a href="mailto:{{ site.author.email }}" class="contact-card">
    <div class="contact-icon"><i class="fas fa-envelope"></i></div>
    <div class="contact-info">
      <div class="contact-label">{% include t.html page="contact" key="email_label" %}</div>
      <div class="contact-detail">{{ site.author.email }}</div>
    </div>
  </a>

  <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}" class="contact-card" target="_blank" rel="noopener">
    <div class="contact-icon"><i class="fab fa-linkedin"></i></div>
    <div class="contact-info">
      <div class="contact-label">LinkedIn</div>
      <div class="contact-detail">{% include t.html page="contact" key="connect" %}</div>
    </div>
  </a>

  <a href="https://github.com/{{ site.author.github }}" class="contact-card" target="_blank" rel="noopener">
    <div class="contact-icon"><i class="fab fa-github"></i></div>
    <div class="contact-info">
      <div class="contact-label">GitHub</div>
      <div class="contact-detail">{% include t.html page="contact" key="see_code" %}</div>
    </div>
  </a>
</div>

---

### {% include t.html page="contact" key="interests_title" %}

{% include t-block.html page="contact" key="interests_text" %}

---

### {% include t.html page="contact" key="location_title" %}

{% include t.html page="contact" key="location_text" %}

---

<a href="{{ site.baseurl }}/files/Efren_Rodriguez_CV.pdf" class="cv-download-btn">
  <i class="fas fa-download"></i> {% include t.html page="contact" key="download_cv" %}
</a>
