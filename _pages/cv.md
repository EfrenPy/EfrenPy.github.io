---
layout: archive
title: "Curriculum Vitae"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<a href="{{ base_path }}/files/Efren_Rodriguez_CV.pdf" class="cv-download-btn">
  <i class="fas fa-download"></i> Download Full CV (PDF)
</a>

<div class="cv-section">
  <h2 class="cv-section-title"><i class="fas fa-graduation-cap"></i> Education</h2>
  <div class="cv-education">
    <div class="cv-edu-card">
      <div class="degree">Ph.D. in Particle Physics</div>
      <div class="institution">University of Santiago de Compostela</div>
      <div class="year">2020 - 2024</div>
    </div>
    <div class="cv-edu-card">
      <div class="degree">M.S. in Physics</div>
      <div class="institution">University of Santiago de Compostela</div>
      <div class="year">2019 - 2020</div>
    </div>
    <div class="cv-edu-card">
      <div class="degree">B.S. in Physics</div>
      <div class="institution">University of Santiago de Compostela</div>
      <div class="year">2015 - 2019</div>
    </div>
  </div>
</div>

<div class="cv-section">
  <h2 class="cv-section-title"><i class="fas fa-briefcase"></i> Work Experience</h2>
  <div class="cv-timeline">
    <div class="cv-timeline-item">
      <div class="cv-position">Postdoctoral Researcher</div>
      <div class="cv-company"><i class="fas fa-building"></i> CERN</div>
      <div class="cv-date">Oct 2024 - Present</div>
      <div class="cv-description">
        Leading a team responsible for three key projects in advanced particle detection technology:
        <ul>
          <li><strong>Simulation of 3D column silicon sensors:</strong> Overseeing sensor simulation and optimization to enhance precision in high-energy experiments</li>
          <li><strong>Development of a Timepix4 telescope:</strong> Managing construction, operation, and data analysis for test beam campaigns</li>
          <li><strong>Testing techniques:</strong> Coordinating innovative setups and techniques to validate new high-energy physics sensors</li>
        </ul>
      </div>
    </div>
    <div class="cv-timeline-item">
      <div class="cv-position">Invited Researcher</div>
      <div class="cv-company"><i class="fas fa-building"></i> Nikhef</div>
      <div class="cv-date">Jun 2022 - Jun 2023</div>
      <div class="cv-description">
        <ul>
          <li>Characterization of Timepix4 ASICs for silicon sensor readout</li>
          <li>Development of a Timepix4-based telescope for test-beam campaigns</li>
          <li>Achieved <strong>90 picosecond track time resolution</strong> through timing analysis</li>
        </ul>
      </div>
    </div>
    <div class="cv-timeline-item">
      <div class="cv-position">Invited Researcher</div>
      <div class="cv-company"><i class="fas fa-building"></i> CERN</div>
      <div class="cv-date">Aug 2021 - Feb 2022</div>
      <div class="cv-description">
        <ul>
          <li>Commissioning of the upgraded LHCb VELO detector</li>
          <li>3D-column silicon pixel sensors research in test beam campaigns</li>
        </ul>
      </div>
    </div>
    <div class="cv-timeline-item">
      <div class="cv-position">PhD Researcher</div>
      <div class="cv-company"><i class="fas fa-university"></i> IGFAE</div>
      <div class="cv-date">Jan 2019 - Sep 2024</div>
      <div class="cv-description">
        <ul>
          <li>Development and characterization of high-speed data transmission lines and high-voltage flat cables for the LHCb VELO upgrade</li>
          <li>Commissioning of the upgraded LHCb VELO detector</li>
          <li>3D-column silicon pixel sensors development in test beam campaigns</li>
          <li>Characterization of Timepix4 ASICs for silicon sensor readout</li>
        </ul>
      </div>
    </div>
    <div class="cv-timeline-item">
      <div class="cv-position">Research Intern</div>
      <div class="cv-company"><i class="fas fa-university"></i> IGFAE</div>
      <div class="cv-date">Jun 2018 - Sep 2020</div>
      <div class="cv-description">
        Research project collaboration with CERN; development and characterization of a 3D X-ray mapping experiment.
      </div>
    </div>
  </div>
</div>

<div class="cv-section">
  <h2 class="cv-section-title"><i class="fas fa-code"></i> Technical Skills</h2>
  <div class="cv-skill-category">
    <h4>Programming & Software</h4>
    <div class="cv-skills">
      <span class="cv-skill-tag"><i class="fab fa-python"></i> Python</span>
      <span class="cv-skill-tag">C++</span>
      <span class="cv-skill-tag">ROOT</span>
      <span class="cv-skill-tag">VHDL</span>
      <span class="cv-skill-tag">FPGA</span>
      <span class="cv-skill-tag">LabVIEW</span>
      <span class="cv-skill-tag">Fortran</span>
      <span class="cv-skill-tag"><i class="fab fa-git-alt"></i> Git</span>
      <span class="cv-skill-tag">WinCC</span>
    </div>
  </div>
  <div class="cv-skill-category">
    <h4>Hardware & Research</h4>
    <div class="cv-skills">
      <span class="cv-skill-tag cv-skill-tag--secondary">Silicon Sensors</span>
      <span class="cv-skill-tag cv-skill-tag--secondary">Electronic Design</span>
      <span class="cv-skill-tag cv-skill-tag--secondary">Detector Development</span>
      <span class="cv-skill-tag cv-skill-tag--secondary">Test Beam Campaigns</span>
      <span class="cv-skill-tag cv-skill-tag--secondary">Data Analysis</span>
    </div>
  </div>
  <div class="cv-skill-category">
    <h4>Soft Skills</h4>
    <div class="cv-skills">
      <span class="cv-skill-tag cv-skill-tag--secondary">Project Management</span>
      <span class="cv-skill-tag cv-skill-tag--secondary">Team Leadership</span>
      <span class="cv-skill-tag cv-skill-tag--secondary">Scientific Communication</span>
      <span class="cv-skill-tag cv-skill-tag--secondary">Problem Solving</span>
    </div>
  </div>
</div>

<div class="cv-section">
  <h2 class="cv-section-title"><i class="fas fa-book"></i> Publications</h2>
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
</div>

<div class="cv-section">
  <h2 class="cv-section-title"><i class="fas fa-chalkboard-teacher"></i> Talks & Presentations</h2>
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
</div>
