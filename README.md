# Kisha Kyle Samson — Portfolio

A personal developer portfolio built with plain **HTML, CSS and JavaScript** (no frameworks).

**Live site:** https://kishakylepc-ui.github.io/

## Files
- `index.html` — all the page content (projects, skills, experience, awards)
- `style.css` — the look; the orange is `--accent` at the top (also update `--accent-rgb`, the same color as R, G, B)
- `resume.html` — your résumé in Harvard format; `resume.pdf` is made from it
- `script.js` — the interactive parts: screenshot galleries and full-screen viewer, project & skill
  filters, case studies, portrait tilt, copy-email, mobile menu
- `images/kisha.jpg` — the photo in the hero
- `images/projects/` — project screenshots (WebP)

## Run it
Open `index.html` in a browser, or in VS Code right-click it → **Open with Live Server**.

## Screenshot galleries
Each project has a `<div class="gallery" data-gallery>` with one `<figure class="slide">` per view.
`script.js` builds the arrows, counter, thumbnails, caption and full-screen viewer by itself, so to
add a screenshot you only copy a `<figure>`:

- **Desktop screenshot**: `<div class="browser">` with a window bar and an `<img>` (1440×900 works best)
- **Phone screenshots**: `<div class="phones">` with 1–3 `<img class="phone">`
- **Tall diagram**: add `slide-doc` to the figure — hovering scrolls it top to bottom
- **Wide diagram**: add `fit-contain` to the figure — shows the whole image
- `data-caption="Title · description"` — the part before the first `·` is shown in bold
- `style="--tint: #hex"` on the gallery sets the glow behind phone screenshots

Visitors can click a screenshot to open it full size, click again to zoom, use ← → to browse,
or swipe on a phone.

## Updating the résumé
1. Edit the text in `resume.html`.
2. Open it in Chrome → **Ctrl + P** → Destination **Save as PDF**, Margins **Default**,
   turn off **Headers and footers** → save over `resume.pdf`.
3. Keep it to one page (Chrome's print preview shows the page count).

## Hemo Hero video
`images/projects/hemohero-demo.mp4` (with `hemohero-demo.webp` as its poster) is a screen recording of
the real Hemo Hero app (production web build) put inside a phone frame with captions. The app's API
calls were answered with made-up sample data, so no real users or database records appear, and the
Hemo Hero screenshots and admin portal screens were made the same way. To use your own phone recording
instead (30–60 s, MP4), save it under the same name.
A video slide is `<figure class="slide slide-video">` with a `<video … muted loop playsinline controls preload="none">`.

## To finish
1. Awards: add the school and year to each card in `index.html` and to `resume.html`.
2. OA Ledger screenshots use made-up sample data — the real ledger stays private.
3. Capstone: when it's ready, add it back as a new project (see below) with `data-tags` including `ai`,
   and add an `AI` chip back to the project filters.
4. Add a project: copy one `<article class="project">…</article>` block and set its
   `data-tags` (web, mobile, ai, database, team) so the filters pick it up.
5. Add a skill: copy one `<li class="skill">` line and set `data-cat`
   (languages, web, mobile, data, ai, hardware, tools) and `data-level` (`used` or `exploring`).

## Publish free
The site is hosted free on GitHub Pages from this repo: every push to `main` updates
https://kishakylepc-ui.github.io/ within a minute or two.
