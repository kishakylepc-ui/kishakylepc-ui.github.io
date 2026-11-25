# Kisha Kyle Samson — Portfolio

A personal developer portfolio built with plain **HTML, CSS and JavaScript** (no frameworks).

**Live site:** https://kishakylepc-ui.github.io/

## Folders
```
index.html                    all the page content (projects, skills, experience, awards)
assets/
  css/style.css               the look
  js/script.js                the interactive parts
  img/portrait/               your photos, toned for the site (see "Photos" below)
    kisha-fog-1500.webp / -900.webp / kisha-fog.png   hero: cutout, background removed
    kisha-skyward-1300.webp / -800.webp               About: looking up
    kisha-horizon-1600.webp / -900.webp               Contact: on the rock in the fog
    originals/                the untouched photos (kept on your computer only: .gitignore keeps them
                              off GitHub because they hold the GPS location your phone recorded)
  img/fx/fog.webp             the drifting fog texture (repeats sideways)
  img/projects/<project>/     screenshots, one folder per project (WebP)
    hemo-hero/  oa-ledger/  compacc-pos/  ledger-life/
  video/hemo-hero-demo.mp4    the Hemo Hero demo video
resume/
  resume.html                 your résumé in Harvard format (the source)
  Kisha-Kyle-Samson-Resume.pdf  made from resume.html (linked from the site)
.nojekyll                     tells GitHub Pages to serve the files as they are
```

### The look: dark editorial
Three typefaces, six greys, one light. The rule for the design is to remove before adding: there are no
floating shapes, glows, particles, cursor effects or icons that only decorate. `assets/css/style.css` is split
into numbered sections (listed at the top of the file): tokens, base, shared pieces, header, hero, one block
per page section, then screen sizes and reduced motion.

- **Colours**: only these six, as tokens at the top of `style.css`. Sections use solid backgrounds
  (obsidian or charcoal), separated by tone, not gradients.

  | Token | Hex | Used for |
  |---|---|---|
  | `--obsidian` | `#101113` | main background: Hero, Work, Experience, Journey, Contact |
  | `--charcoal` | `#1B1D20` | secondary sections (Skills, About), screenshot frames, the active index link |
  | `--graphite` | `#303338` | hairlines, borders, resting project numbers |
  | `--mist-gray` | `#777D83` | secondary text and labels on obsidian |
  | `--silver` | `#BFC3C7` | body text, italic accents |
  | `--soft-white` | `#F0F0EE` | headings and primary text |

  Mist Gray on Charcoal is only 4.0:1 contrast, so in the two charcoal sections the secondary-text token
  (`--quiet`) switches to Silver instead of inventing a seventh grey.
- **Fonts**, loaded from Google Fonts in `index.html` with only the weights that are used:
  - `--font-heading`: **Space Grotesk** 400 / 500 / 600 / 700 — the name, section titles, project names,
    job and school titles, the skills, the statement.
  - `--font-body`: **DM Sans** 400 / 500 — paragraphs, descriptions, navigation, buttons, filters, captions,
    and the small spaced-capital labels.
  - `--font-accent`: **Cormorant Garamond** italic 400 / 500 — accents only (class `it` or `editorial-accent`):
    *around me.*, *Samson*, *work*, *About*, the job roles, the highlighted phrases in About (`<mark>`),
    the project numbers, the skills you're still exploring, *destination.*
  - The type scale is a set of tokens too (`--fs-mega`, `--fs-display`, `--fs-title`, `--fs-subtitle`,
    `--fs-lead`, `--fs-body`, `--fs-small`, `--fs-label`).
  - Each section title is staged on its own: "Selected / *work*" heavy and stepped with the intro beside it;
    "Skills" in the regular weight and the largest; "Experience" sized to run exactly the width of the
    column (`.display--exp`); *About* entirely in Cormorant; "The route, / *so far*".
- **Motion**, kept to what carries meaning:
  - headings with `data-split` rise into place word by word when they scroll in (`setupSplitHeadings`)
  - screenshots stay grey until their project is the one you're reading, then come into colour
  - the Journey route draws as you scroll (`setupRoute`)
  - the name comes up out of the fog once, on load (`setupNameLetters`); the hero's mist drifts slowly,
    and its layers lag a little as you scroll away (`setupHeroDepth`)
  - everything else just fades up once (`.reveal`). All of it turns off for visitors who set "reduce motion".
- **Atmosphere**: the film grain is `body::after`; the light behind your head (`.fog-light`) is the only
  light on the page; the two bands of mist in the hero are `<span class="fog"><i></i></span>` using
  `img/fx/fog.webp`. Glass is used only on the header and the pinned project index, where content scrolls
  beneath them.
- **Journey** (`#journey`): your education told as a route. Each `<li class="stop">` is a stop; script.js
  (`setupRoute`) draws a line down each stop's left edge and across to the next, and finishes on the full
  stop after "destination", which turns white when the line arrives. To add a date or detail, edit that
  stop's paragraph; to add a stop, copy one `<li class="stop">` (the grid places stops 1–4 left, right,
  left, right in `.stop:nth-child(…)`).
- **Case studies** open as three ruled rows (Problem / What I built / Outcome), each with its label beside it.
- **script.js** also handles the screenshot galleries and full-screen viewer, project & skill filters,
  case studies, the pinned project index, the scroll cue, copy-email and the mobile menu. The header is
  plain at the top, out of the way while you read the hero, then a thin bar.

### Photos
All three photos are your own, toned the same way: mostly grey with a hint of the original warmth,
a filmic curve, and cool shadows.

- **Hero** (`kisha-fog-*`): the background was removed with an AI model run locally (rembg / ISNet),
  the fog colour was taken out of the semi-transparent edges (so there's no light halo on the dark page),
  the face was lifted a little, and a soft rim light was added along the edge, like the fog behind you in
  the original. In the page the bottom and lower sides fade out with a CSS mask, so the jacket melts into
  the dark. To use another photo, make a transparent cutout about 1500 × 2045 and save it under the same names.
- **About** (`kisha-skyward-*`) and **Contact** (`kisha-horizon-*`) are the full photos, darkened; the CSS
  masks dissolve their edges into the section background.

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
- `style="--tint: #hex"` on the gallery sets the muted glow behind phone screenshots

Visitors can click a screenshot to open it full size, click again to zoom, use ← → to browse,
or swipe on a phone. Put new screenshots in that project's folder under `assets/img/projects/`.

## Updating the résumé
1. Edit the text in `resume/resume.html`.
2. Open it in Chrome → **Ctrl + P** → Destination **Save as PDF**, Margins **Default**,
   turn off **Headers and footers** → save over `resume/Kisha-Kyle-Samson-Resume.pdf`.
3. Keep it to one page (Chrome's print preview shows the page count).

## Hemo Hero video
`assets/video/hemo-hero-demo.mp4` (with `assets/img/projects/hemo-hero/demo-poster.webp` as its poster) is a screen recording of
the real Hemo Hero app (production web build) put inside a phone frame with captions. The app's API
calls were answered with made-up sample data, so no real users or database records appear, and the
Hemo Hero screenshots and admin portal screens were made the same way. To use your own phone recording
instead (30–60 s, MP4), save it under the same name.
A video slide is `<figure class="slide slide-video">` with a `<video … muted loop playsinline controls preload="none">`.

## To finish
1. Awards: add the school and year to each card in `index.html` and to `resume/resume.html`.
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
