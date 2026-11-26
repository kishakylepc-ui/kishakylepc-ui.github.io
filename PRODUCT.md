# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** recruiters and hiring managers screening candidates for internships and junior web or mobile developer roles. They arrive from a résumé, a job application or a GitHub profile, often on a phone, and decide in under a minute whether to look closer.
- **Secondary:** potential employers or clients and other people interested in Kisha's development work, who explore the projects in more depth.

Their job: understand who Kisha is and what Kisha builds, check that the projects are real and technically substantial, and view or download the résumé or get in touch.

## Product Purpose

A personal portfolio for Kisha Kyle Samson, a 3rd-year BS Information Technology student at Western Leyte College in Ormoc City, Philippines, who also works remotely as an Amazon product researcher. It presents skills, experience, projects, education and personality as an aspiring software developer.

Success: a visitor knows within the first screen who Kisha is and what Kisha does, can explore the projects easily, and reaches the résumé or contact details in one step.

## Positioning

Kisha builds working tools for real problems and people nearby, not tutorial projects: a shared ledger that replaced the sourcing team's spreadsheets, a planner Kisha uses every day, and a blood-donor app for the local area. The tools are actually used. Confirmed by the owner as the core claim.

## Operating Context

- Visitors usually come from a résumé, job application or GitHub link; many open it on a phone.
- The site is a single page (`index.html`) plus an online résumé (`resume/resume.html`) that is the source of the one-page PDF (`resume/Kisha-Kyle-Samson-Resume.pdf`), rebuilt from Chrome's print-to-PDF.
- Hosted on GitHub Pages from the `main` branch of `kishakylepc-ui/kishakylepc-ui.github.io`; a push goes live within minutes.

## Capabilities and Constraints

- Plain static HTML, CSS and JavaScript. No frameworks, build step or runtime dependencies; fonts load from Google Fonts.
- Features that must keep working: project filters, case-study toggles, screenshot galleries with a full-screen viewer (keyboard, swipe, zoom), the Hemo Hero demo video, skill filters, copy-email, the pinned project index, the phone menu, and the Journey route animation.
- Open to internships and junior web or mobile roles.
- Projects, in this order (Hemo Hero leads, confirmed): Hemo Hero (mobile app + admin portal + API; source private), OA Ledger (private tool, no public link), CompAcc POS (school project, team of 2; public GitHub repo), Ledger//Life personal planner (live demo at choom.netlify.app).
- Education: STI Ormoc senior high (With Honors, GWA 93, 2020); Visayas State University for a while before transferring; Western Leyte College, BS IT, 3rd year. No VSU dates or program are known.
- The original photos (with GPS metadata) stay off GitHub via `.gitignore`; only the toned copies are published.

## Brand Commitments

- Name: Kisha Kyle Samson. Use they/them pronouns for Kisha unless Kisha states otherwise.
- Imagery is Kisha's own photos only (`assets/img/portrait/`); never AI-generated or stock people. Facial features stay recognisable.
- Voice: plain, direct, first person, a little wry. Small dry asides are welcome; no buzzwords and no generic lines like "passionate developer crafting digital experiences". Confirmed by the owner.
- Visual constraints the owner pinned in earlier briefs (recorded, not expanded here):
  - a dark, misty, cinematic identity with editorial typography;
  - Space Grotesk (headings), DM Sans (body and interface), Cormorant Garamond italic (accents);
  - mostly dark neutrals (Deep Charcoal #151619, Soft Ivory #EAE7E1) with sparing accents: Slate Blue #53677D, Muted Blue #8299B2, Dusty Lavender #91869F, Warm Champagne #C5AE91.
- The résumé is Harvard format, one page, Garamond, and should feel like the same person as the site.

## Evidence on Hand

- Screenshots and a 40-second demo of the real apps running on made-up sample data (`assets/img/projects/`, `assets/video/hemo-hero-demo.mp4`), labelled as sample data on the page.
- Real numbers stated by Kisha: Hemo Hero 82 commits, v1.2.0, 3 apps on one API, 25 server test files; CompAcc 37 of 49 commits; OA Ledger 2 live editors, 14-day recheck; Game Tester claims of 15% UX and 30% satisfaction improvements.
- Award "Best in Computer Networking" and TESDA Computer Systems Servicing NC II; their school and year are not yet known.
- Absent, and not to be fabricated: testimonials, employer or client names beyond what is on the page, dates for VSU, award years, extra metrics, extra skills or certifications.

## Product Principles

1. Show the real thing. Real apps, real screenshots, real numbers; sample data is labelled and nothing is invented.
2. The person is the product. Kisha's own photos and own voice carry the site.
3. A recruiter's two jobs come first: know who and what from the first screen, and reach the projects and résumé in one step.
4. Every project is evidence for the claim: built for a real problem, used for real.
5. Plain words, a little wry. Confident without overselling.

## Accessibility & Inclusion

- WCAG 2.2 AA text contrast; small text never uses colours under 4.5:1.
- Touch targets at least 44 × 44px on touch screens; nothing relies on hover alone.
- Motion respects `prefers-reduced-motion` (everything shows, nothing moves).
- Works from 320px phones to wide desktops with no horizontal scrolling.
