# Site Transformation Plan: Academic -> Recruiter-Ready

## Status Legend
- [x] Done
- [ ] Todo
- [~] In Progress

---

## P0 -- Hero & First Impression
- [x] Rewrite homepage hero with value proposition headline
- [x] Add prominent CTAs (Contact, Download CV, LinkedIn)
- [x] Add subtitle with business-friendly language

## P1 -- Content Reframing
- [x] Reframe bio for industry audience
- [x] Rewrite highlight cards as business value ("What I Bring to Your Team")
- [x] Add "How I Can Help Your Team" value props section (4 cards: project mgmt, cross-functional teams, hw+sw bridge, data-driven decisions)
- [x] Add "What I'm Looking For" section with target roles and secondary CTA
- [x] Add "Key Results" section with metrics in business language
- [x] Reframe CV page for recruiter scanning (7-second test)
  - Industry-first position titles, snapshot metrics strip, team size specifics
- [x] Sharpen achievements with specific business metrics (team size, budget, deadlines, defect rate, throughput)

## P2 -- Social Proof & Credibility
- [x] Add credibility logo strip (CERN, LHCb, Nikhef, IGFAE, USC logos)
- [x] Add "Impact in Numbers" section (budget managed, team size, labs, countries)
  - CV snapshot strip + Projects page numbers strip
- [ ] Add testimonials section (placeholder structure for future quotes)

## P3 -- Navigation & UX for Recruiters
- [x] Reorder navigation: CV -> Projects -> Contact -> Publications -> Blog -> Talks -> Personal
- [x] Rename "Research" to "Publications" (less academic)
- [x] Add floating/sticky CTA bar for mobile (Contact + LinkedIn + CV download, all pages)
- [ ] Review mobile experience end-to-end
- [x] LinkedIn prominently linked on every page (hero, sidebar, floating CTA, contact, "What I'm Looking For")

## P4 -- SEO & Technical Polish
- [x] Industry-focused meta description in _config.yml
- [x] Industry-focused page title for homepage
- [x] Review Open Graph / Twitter cards preview (og:type fallback for static pages)
- [ ] Add recruiter-relevant keywords to meta tags
- [x] Review JSON-LD Person schema for jobTitle targeting (BreadcrumbList schema, robots.txt)
- [x] Page speed / Core Web Vitals audit (DNS prefetch for GA, lazy loading)
- [x] Update manifest.json description to recruiter-targeted positioning
- [x] Fix blog GIF references -> WebP (3.3 MB saved per page)
- [x] Remove dead CSS (~160 lines: bento grid, highlight cards, closing CTA)
- [x] Delete dead assets (collapse.js, collapse.css)
- [x] Fix offline banner accessibility (role="status" + aria-live="polite")
- [x] Fix Nikhef logo dark mode (invert filter class)

## P5 -- Nice-to-Have
- [ ] Transition story blog post (CERN -> industry)
- [ ] Interactive project timeline
- [ ] Skills competency chart
- [ ] ATS-optimized downloadable resume
- [ ] Video introduction placeholder

---

## Learnings
- The bilingual system (t.html / t-block.html + _data/i18n/) works well -- always add both EN and ES translations
- CSS goes in _sass/_utilities.scss for component styles
- Jekyll build takes ~30s -- no JS changes needed for content-only updates
- Always re-read files before editing -- Efren actively edits alongside Ralph
- Dead CSS accumulates after HTML removal -- audit periodically
- WebP versions of assets should be preferred over GIF/PNG in front matter

## Next Priority
- P3: Mobile experience end-to-end review
- P2: Testimonials placeholder section
- P4: Recruiter-relevant meta keywords
- P5: Transition story blog post
