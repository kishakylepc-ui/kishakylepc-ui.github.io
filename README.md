# Kisha Kyle Samson — Portfolio

A personal developer portfolio built with plain **HTML, CSS and JavaScript** (no frameworks, no build step).

**Live site:** https://kishakylepc-ui.github.io/

## Folders
```
index.html                    all the page content (projects, experience, skills, about, education, contact)
PRODUCT.md                    who the site is for and what it must do (audience, voice, facts not to invent)
DESIGN.md                     the design system: colours, type, layout, components, do's and don'ts
assets/
  css/style.css               the look
  js/script.js                the interactive parts
  img/favicon.svg             the tab icon
  img/portrait/               your photos, toned for the site (see "Photos" below)
    kisha-fog-1500.webp / -900.webp / kisha-fog.png   hero: cutout, background removed
    kisha-skyward-1300.webp / -800.webp               About: looking up
    kisha-horizon-1600.webp / -900.webp               Contact: on the rock in the fog
    originals/                the untouched photos (kept on your computer only: .gitignore keeps them
                              off GitHub because they hold the GPS location your phone recorded)
  img/fx/fog.webp             the drifting fog texture (repeats sideways)
  img/projects/<project>/     screenshots, one folder per project (WebP; desktop ones also as <name>-900.webp)
    thumbs/                   144 × 96 copies used as gallery thumbnails (same file names)
  video/hemo-hero-demo.mp4    the Hemo Hero demo video
resume/
  resume.html                 your résumé in Harvard format (the source, also the online résumé)
  Kisha-Kyle-Samson-Resume.pdf  made from resume.html (the résumé page's Download PDF button; every
                              Résumé link on the site — header, hero, Contact — opens resume.html)
.impeccable/design.json       machine-readable companion to DESIGN.md
.nojekyll                     tells GitHub Pages to serve the files as they are
```

The page reads proof first: Hero → Work → Experience → Skills → About → Education → Contact.

### The look: "Field Notes in the Fog"
Three typefaces, mostly greys, four quiet accents. DESIGN.md is the full reference; the short version:

- **Colours** are tokens at the top of `style.css`. Dark neutrals carry about 90% of the page
  (`--deep-charcoal` #151619 main background, `--charcoal` #1B1D20 for Experience and About, `--graphite`
  hairlines, `--quiet` #8C9298 for small text, `--text` for paragraphs, `--ivory` #EAE7E1 for headings).
  Four accents each do one job: **champagne** (#C5AE91) for warmth and the personal lines, **muted blue**
  (#8299B2) for anything you can use, **lavender** (#91869F) only as CompAcc POS's project colour, **slate blue** (#53677D)
  for structure only. Each project also has its own accent (`--pt`) for its kind line, index bar and frame.
- **Fonts** (Google Fonts, loaded in `index.html`): **Space Grotesk** for the name, titles, project names and
  skills; **DM Sans** for paragraphs, buttons, navigation and labels; **Cormorant Garamond** italic only for a
  few warm champagne phrases ("around me.", the About highlights, "Tell me about it."). Titles use weight
  instead: "Selected **work**" is Bold then Regular Silver.
- **Hierarchy**: only one thing is giant, your name (KISHA KYLE / SAMSON in Space Grotesk Bold capitals);
  section titles are 44–96px and each is staged differently. No labels or numbers sit above headings.
- **Atmosphere**: film grain (`body::after`), the light behind your head (`.fog-light`, the only light), two
  bands of mist in the hero, and one faint coloured light per section.

### Motion
- Sections fade up once as you reach them (`.reveal`, hidden only when the script runs, so nothing is lost
  without JavaScript).
- Your name comes up letter by letter on load (`setupNameLetters`), and the hero's layers drift a little as you
  scroll away on wide screens (`setupHeroDepth`).
- Buttons, filters and gallery controls shrink slightly under a press.
- Case studies open and close by height; filtered projects fade back in; the screenshot viewer fades in and out.
- "Copy" swaps to "Copied" with a small slide; the Education route draws as you scroll (`setupRoute`), from
  the first school down to the awards.
- Everything shows and nothing moves for visitors who set "reduce motion".

### Phones and tablets
- The portrait takes the top 70% of the screen with your name on its lower edge, so the face, the name and
  "See my work" are on the first screen.
- Below 760px the menu is a full-screen index (the page behind is locked), thumbnails are one swipeable
  row, and the gallery arrows sit beside them instead of on the picture, so they never cover a screenshot
  or the demo video's own controls.
- Every control is at least 44 × 44px on touch screens; hover effects only apply to a mouse or trackpad.
- Tested at 320, 375, 390, 430, 768px, a phone held sideways and desktop: nothing is wider than the screen.

### Photos
All three photos are your own.
- **Hero** (`kisha-fog-*`): the background was removed with an AI model run locally (rembg / ISNet), the fog
  colour was taken out of the semi-transparent edges, and everything else is the photo's own natural colour,
  with no lightening, toning or retouching. To use another photo, make a transparent cutout about
  1500 × 2045 and save it under the same names.
- **About** and **Contact** are the full photos, darkened, with a little of their natural colour kept; CSS
  masks dissolve their edges into the section.

## Run it
Open `index.html` in a browser, or in VS Code right-click it → **Open with Live Server**.

## Screenshot galleries
Each project has a `<div class="gallery" data-gallery>` with one `<figure class="slide">` per view.
`script.js` builds the arrows, counter, thumbnails, caption and full-screen viewer by itself, so to
add a screenshot you only copy a `<figure>`:

- **Desktop screenshot**: `<div class="browser">` with a window bar and an `<img>` (1440×900 works best).
  Also save a 900px-wide copy as `<name>-900.webp` beside it and give the `<img>`
  `srcset="…/<name>-900.webp 900w, …/<name>.webp 1440w" sizes="(max-width: 900px) 92vw, 580px"`, so ordinary
  (1×) screens download the small one; the full-screen viewer always opens the full file.
- **Phone screenshots**: `<div class="phones">` with 1–3 `<img class="phone">`
- **Tall diagram**: add `slide-doc` to the figure — hovering scrolls it top to bottom
- **Wide diagram**: add `fit-contain` to the figure — shows the whole image
- `data-caption="Title · description"` — the part before the first `·` is shown in bold
- **Thumbnail**: put a 144 × 96 copy with the same file name in that project's `thumbs/` folder. If it's
  missing, the full image is used instead.

Only the screenshot on screen is downloaded; the others load when someone browses to them. A screenshot that
fails to load shows "Screenshot unavailable" instead of a broken image, and a project with no screenshots
becomes one text column. Visitors can click a screenshot to open it full size, click again to zoom, use the
arrow keys to browse, or swipe on a phone. Put new screenshots in that project's folder under `assets/img/projects/`.

## Updating the résumé
1. Edit the text in `resume/resume.html` (on screen it sits on the site's dark background with a back link
   and a Download PDF button; when printed only the white page comes out).
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
On wider screens it plays by itself (muted) while its slide is on screen; on phones it waits for a tap, so
the 2 MB file is only downloaded by people who want to watch it.

## To finish
1. Awards: add the school and year to each award in `index.html` and to `resume/resume.html`.
2. Visayas State University: add your program and years to the Education stop and the résumé when you want them shown.
3. OA Ledger screenshots use made-up sample data — the real ledger stays private.
4. Capstone: when it's ready, add it as a new project (see below) with `data-tags` including `ai`,
   and add an `AI` chip back to the project filters.
5. Add a project: copy one `<article class="project">…</article>` block, give it a new `id`, set its
   `data-tags` (web, mobile, ai, database, team), add a matching link in `#workIndex`, and give it an accent
   in `style.css` next to the other four (`#your-id { --pt: …; --pt-text: …; }`).
6. Add a skill: copy one `<li class="skill">` into the right `.skill-group` and set `data-level`
   (`used` or `exploring`). Each group's `data-cat` matches one of the Skills filter buttons.

## Publish free
The site is hosted free on GitHub Pages from this repo: every push to `main` updates
https://kishakylepc-ui.github.io/ within a minute or two.
