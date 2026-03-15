---
title: "Sports & Fun"
title_en: "Sports & Fun"
title_es: "Deportes y Ocio"
excerpt_en: "Volleyball, wakeboarding, rollerblading -- none of it professional-level, all of it fun."
excerpt_es: "Voleibol, wakeboard, patinaje -- nada a nivel profesional, todo divertido."
collection: personal
header:
  teaser: webp/volleyball.webp
gallery1:
  - url: webp/volleyball.webp
    image_path: webp/volleyball.webp
    alt: "Volleyball match"
gallery2:
  - url: webp/wake.webp
    image_path: webp/wake.webp
    alt: "Wakeboarding"
gallery3:
  - url: webp/rollerblading.webp
    image_path: webp/rollerblading.webp
    alt: "Rollerblading"
---

{% include t-block.html page="sports" key="intro" %}

<h3 id="volleyball">{% include t.html page="sports" key="volleyball_title" %}</h3>
{% include t-block.html page="sports" key="volleyball_text" %}
{% include gallery id="gallery1" caption=" " %}

<h3 id="wakeboarding">{% include t.html page="sports" key="wakeboarding_title" %}</h3>
{% include t-block.html page="sports" key="wakeboarding_text" %}
<div style="max-width: 50%; margin: auto;">
  {% include gallery id="gallery2" caption=" " %}
</div>

<h3 id="rollerblading">{% include t.html page="sports" key="rollerblading_title" %}</h3>
{% include t-block.html page="sports" key="rollerblading_text" %}
{% include gallery id="gallery3" caption=" " %}
