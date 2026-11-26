---
name: Kisha Kyle Samson — Portfolio
description: Field notes from someone who builds tools for the problems around them, kept in the fog.
colors:
  deep-charcoal: "#151619"
  charcoal: "#1B1D20"
  graphite: "#303338"
  mist-gray: "#777D83"
  quiet-gray: "#8C9298"
  silver: "#BFC3C7"
  paragraph-ivory: "#BFBDB9"
  soft-ivory: "#EAE7E1"
  warm-champagne: "#C5AE91"
  muted-blue: "#8299B2"
  dusty-lavender: "#91869F"
  slate-blue: "#53677D"
typography:
  mega:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(56px, 9.2vw, 184px)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.035em"
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(44px, 6.2vw, 96px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(34px, 3.8vw, 58px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(24px, 2.4vw, 36px)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(20px, 1.7vw, 27px)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.015em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.18em"
  accent:
    fontFamily: "Cormorant Garamond, serif"
    fontWeight: 500
    letterSpacing: "-0.01em"
rounded:
  hairline: "2px"
  phone: "14px"
  dot: "50%"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(84px, 9vw, 136px)"
  container: "1240px"
  bar: "62px"
  control: "48px"
  touch: "44px"
components:
  button-primary:
    backgroundColor: "{colors.soft-ivory}"
    textColor: "{colors.deep-charcoal}"
    rounded: "{rounded.hairline}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.warm-champagne}"
    textColor: "{colors.deep-charcoal}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.soft-ivory}"
    rounded: "{rounded.hairline}"
    padding: "0 22px"
    height: "48px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.silver}"
    rounded: "{rounded.hairline}"
    padding: "0 14px"
    height: "44px"
  chip-active:
    backgroundColor: "{colors.muted-blue}"
    textColor: "{colors.deep-charcoal}"
  screenshot-stage:
    backgroundColor: "{colors.charcoal}"
    rounded: "{rounded.hairline}"
---

# Design System: Kisha Kyle Samson — Portfolio

## Overview

**Creative North Star: "Field Notes in the Fog"**

A working journal kept in bad weather. The page is dark and quiet like a foggy morning on the Ormoc coast, and on it sit plainly written notes about real tools: what the problem was, what got built, what happened. Kisha's own photographs are the weather; typography does the talking; colour appears only where a note has been underlined in pen.

Density is low and deliberate, and the hierarchy is steep: one thing on the page is giant (the name), everything else steps down so the evidence, the projects, arrives fast. Each section stages its title its own way, uses ruled rows instead of boxes, and keeps its small labels beside or below what they describe. Motion is the act of noticing: things come up into focus once, a route line is drawn as you read, controls give under a press. Nothing loops for attention except the mist.

Components are tactile and confident within that restraint: flat, nearly square, firmly outlined, with an obvious press, never glassy or rounded.

**Key Characteristics:**
- Dark neutrals carry roughly 90% of every screen; four accents each do one job.
- Three typefaces with fixed roles: Space Grotesk speaks, DM Sans explains, Cormorant Garamond italic underlines a few warm personal phrases.
- One giant moment: the name, in Space Grotesk 700 capitals.
- Real photographs of Kisha in their own natural colour, dissolving into the page with masks rather than sitting in frames.
- Hairlines and ruled rows instead of cards; corners of 2px.
- No labels above headings and no decorative numbering.

## Colors

Fog-dark neutrals warmed by an ivory text tone, with four muted accents used like a pen on a page.

### Primary
- **Warm Champagne** (#C5AE91): warmth and the personal lines. The italic in the tagline ("around me."), the highlighted phrases in About, "Tell me about it.", the availability dot, award labels, Hemo Hero's ink, the primary button's hover and press.

### Secondary
- **Muted Blue** (#8299B2): everything you can use. Link hovers, the active navigation underline, the active filter, focus rings, the Journey route line as it's drawn, OA Ledger's ink.

### Tertiary
- **Dusty Lavender** (#91869F): CompAcc POS's ink, and nothing else. It never sets italic or display text; titles, job roles and skills still being learned use weight and Silver or Quiet Gray instead.
- **Slate Blue** (#53677D): structure only. Underlines at rest, bullets, stack separators, skill dots, the dotted route track, Ledger//Life's ink. At 3.1:1 it never carries small text.

### Neutral
- **Deep Charcoal** (#151619): the main background (Hero, Work, Skills, Education, Contact).
- **Charcoal** (#1B1D20): secondary sections (Experience, About) and screenshot frames; sections are separated by this tonal step.
- **Graphite** (#303338): hairlines and borders.
- **Mist Gray** (#777D83): outline-button borders and decorative large text only (4.3:1).
- **Quiet Gray** (#8C9298): all small secondary text: labels, dates, captions, notes, the footer (5.8:1 on Deep Charcoal, 5.4:1 on Charcoal).
- **Silver** (#BFC3C7): cool labels, job roles, and the Regular second word of a section title ("Selected work", "so far").
- **Paragraph Ivory** (#BFBDB9): body paragraphs; Soft Ivory at 80% over Deep Charcoal, 10:1 contrast.
- **Soft Ivory** (#EAE7E1): headings, names and primary text.

### Named Rules
**The Pen Rule.** Accents mark; they never fill. Except the single active filter, no accent is used as a background, and the dark neutrals stay at roughly 90% of any screen.

**The One Job Rule.** Each accent has one meaning (champagne = warmth, muted blue = interaction, lavender = CompAcc's ink, slate = structure). Don't borrow one for another job because it looks nice there.

**The Per-Project Ink Rule.** Each project has its own accent for its kind line, index progress bar, current-project frame and "Outcome" label: Hemo Hero champagne, OA Ledger muted blue, CompAcc POS lavender, Ledger//Life slate (muted blue where text must be read).

**The 4.5 Rule.** Small text is Quiet Gray or lighter. Mist Gray and Slate Blue never set small text.

## Typography

**Display Font:** Space Grotesk (weights 400–700)
**Body Font:** DM Sans (400, 500)
**Accent Font:** Cormorant Garamond, italic only (400, 500), in Warm Champagne or Soft Ivory, never Lavender

**Character:** A slightly quirky grotesque that sounds technical and sure of itself, a neutral sans that explains without fuss, and a bookish italic used like handwriting in the margin. The contrast between the heavy grotesque and the soft italic is the signature.

### Hierarchy
- **Mega** (700, clamp(56px, 9.2vw, 184px), 0.82, capitals, −0.035em): the name in the hero, KISHA KYLE / SAMSON staggered over two lines in Soft Ivory. Nothing else.
- **Display** (700, clamp(44px, 6.2vw, 96px), 0.92): section titles, each staged differently.
- **Headline** (600, clamp(34px, 3.8vw, 58px), 0.96): project names.
- **Title** (500, clamp(24px, 2.4vw, 36px), 1.05): job titles and school names.
- **Lead** (DM Sans 400, clamp(20px, 1.7vw, 27px), 1.45): the opening paragraph of About.
- **Body** (DM Sans 400, 17px, 1.7): paragraphs, 46–50ch (about 65–75 characters; DM Sans's `ch` is a wide "0", so 60ch already runs near 88).
- **Label** (DM Sans 500, 11px, 0.18em, uppercase): project kind lines, dates, skill group names, captions; always beside or below what they label.
- **Accent** (Cormorant Garamond italic 400–500, about 1.12–1.2em of its surroundings): one or two warm words at a time ("around me.", the About highlights, "Tell me about it.").

### Named Rules
**The One Moment Rule.** Only the name is set at mega size. A second giant line on the page means the hierarchy has flattened.

**The No Kicker Rule.** No label, number or eyebrow sits above a heading. A heading speaks for itself; its label goes below it or in the margin beside it.

**The Margin Note Rule.** Cormorant Garamond appears only in italics, only for a word or short phrase, and only in a warm or neutral colour. Headings (section titles, project names and their second names such as "Ledger//Life"), job roles and skills never use it; there, contrast comes from weight.

**The Staged Title Rule.** No two section titles share a treatment: "Selected work" on one line (Bold, then Regular Silver) with the intro beside it; "Experience" in 600; "Skills" in 400; "About" in 500, a size up; "The route, / so far" stepped (Bold, then Regular Silver). The tracking floor is −0.04em.

### The résumé page
`resume/resume.html` is a printable Harvard-format document, deliberately outside the site's type and colour system: black Garamond on a white Letter page (stack `Garamond, "EB Garamond", "Times New Roman", serif`; EB Garamond 400/700/italic is loaded from Google Fonts for devices without a system Garamond). Only the slim screen bar above the page speaks the site's language (Space Grotesk name, DM Sans, Deep Charcoal surround, an Ivory button that turns Champagne), and it is hidden in print.

## Layout

A centred column of 1240px with fluid gutters (clamp(20px, 4vw, 56px), widened by safe-area insets) and section padding of clamp(84px, 9vw, 136px). Composition is asymmetric inside that column: projects alternate screenshots left and right, the Journey's stops alternate across a 12-column grid so the route has to wind, and every list is a set of ruled rows with a label column.

The hero is full-bleed: Kisha's portrait centred and cropped by the viewport, text on a three-column grid around the face, the name across the bottom like a film title. The Work section opens directly into the first project. The project index pins flush under the 62px bar and wraps into rows if there are more than fit.

Below 900px the portrait takes the top 70% of the screen with the name on its lower edge, and the text follows in reading order; projects stack (title, kind, screenshots, story). Below 760px navigation is a full-screen index, the project index is dropped (it can't stay pinned on a phone, so it only repeated the four names before the first project), and the gallery arrows leave the picture for the row beside the thumbnails, so they never cover a screenshot or the demo video's own controls.

Breakpoints: 1240px, 1100px, 900px, 760px, 560px, 400px.

## Elevation & Depth

Flat, with depth from light and tone rather than shadow. Sections separate by the Deep Charcoal / Charcoal step, and each holds one faint coloured light (a radial at 5–12% opacity that fades out inside the section). The hero has the one real light source: fog lit from behind Kisha's head, warm at the centre and cooling to slate. A fixed film grain (6% opacity) sits over everything. The only shadow is a long, soft one under screenshot frames (0 40px 80px −48px at 90% black), so screens sit on the page like prints.

### Named Rules
**The One Light Rule.** Only the hero has a visible light source; elsewhere light is ambient and barely there.

## Shapes

Nearly square: 2px corners on buttons, filters, frames and panels; 14px only on phone screenshots, because phones are round. Circles only for dots (bullets, skill dots, route stops, the availability dot). Lines are 1px hairlines; the route is a 1px line over a dotted track. Photos have no frames: CSS masks dissolve their edges into the background. Icons are drawn arrows with a 1.5px stroke, never typed characters.

## Components

### Buttons
Tactile and confident: firm outlines, flat fills, an obvious press (scale 0.97 over 160ms, everywhere).
- **Shape:** nearly square (2px), 48px tall (44px for the small case-study button).
- **Primary:** Soft Ivory fill, Deep Charcoal text, DM Sans 500 14.5px. Hover and press turn it Warm Champagne. One per view.
- **Outline:** transparent, 1px Mist Gray border, Soft Ivory text. Hover and press move the border to Muted Blue.
- **Text link:** DM Sans 500 with a Slate Blue underline and a drawn arrow that follows the last word; hover and press turn text and underline Muted Blue.

### Chips
- **Style:** transparent with a 1px Graphite border, Silver text, 44px tall on touch screens.
- **State:** the active filter is the only accent fill on the page: Muted Blue with Deep Charcoal text.

### Navigation
- **Desktop:** DM Sans 500 14px, no numbers; the active section is Soft Ivory with a 1px Muted Blue underline. Past the hero the bar becomes 86% Deep Charcoal with a blur. It never hides. The last item, Résumé, is the only link that leaves the page, so it is a small outline button (1px Mist Gray, 2px corners, Muted Blue on hover) set slightly apart; every Résumé link on the site goes to `resume/resume.html`, which carries the Download PDF button.
- **Phone:** a full-screen index in Space Grotesk at about 36px, ruled between items, the active one marked by a short Muted Blue rule, with Résumé as the last row; the page behind is locked and inert.

### Project row (signature)
Screenshots on one side, the story on the other, alternating. The project name, its kind as a small-capital line in the project's ink, a paragraph, three plain facts (a number and its caption, no boxes), the stack as one line of small capitals separated by Slate slashes, then actions. The project being read gets a frame in its ink. A project with no screenshots becomes one text column; a screenshot that fails to load becomes a quiet "Screenshot unavailable" panel.

### Case study
Three ruled rows, label in the margin: Problem / What I built / Outcome (the Outcome label in the project's ink). It opens and closes by height, so the content below slides rather than jumps.

### Skills
Ruled rows, one per group (Languages, Web development, Mobile development, Data, AI, Hardware, Tools), the group name as a label in the margin, the skills as a line of Space Grotesk words with slate dots; skills still being learned in Quiet Gray with hollow dots. Each filter shows one row.

### The route (signature)
The Journey's stops alternate left and right; a 1px Muted Blue line is drawn down each stop and across to the next as you scroll, over a dotted Slate track, and ends just below the last stop (awards and certifications).

### Motion
- **Material:** focus and mist. Things come up out of the fog once, through a blur-to-sharp pull and a rise from behind an edge (a clip), on the exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`. No bounce. The only loop is the mist, and it pauses while the hero is off screen.
- **Focal moment (the hero, on load):** the photo pulls into focus (1.3s), the fog light comes up behind it, the name's letters surface from below each word's edge (28ms apart), then the words around it fade up; settled in about two seconds.
- **By content, once on scroll:** section titles rise from a mask edge and come into focus; a project's screenshot is uncovered from the top; lists (job bullets, skills, awards) come in 55ms apart; paragraphs fade up.
- **Continuity:** filtering is a view transition (what stays glides to its new place, what goes fades); slides move the way you pressed; the full-screen viewer grows from the screenshot you clicked; case-study rows follow one another in; on wide screens one underline slides from section to section.
- **Feedback:** arrows nudge the way they point under a mouse; controls press to 0.97 in 160ms.
- **Reduced motion:** nothing travels. Every entrance becomes a fade, the mist stops, and every state change still shows.

## Do's and Don'ts

### Do:
- **Do** keep dark neutrals at about 90% of every screen and give each accent its one job.
- **Do** keep one giant moment: the name.
- **Do** use ruled rows, hairlines and margin labels instead of cards.
- **Do** stage each section title differently and keep Cormorant to one or two warm italic words, never in titles' second words, roles or skills.
- **Do** use only Kisha's own photographs, dissolved into the page with masks.
- **Do** keep small text at 4.5:1 or better and touch targets at 44px.
- **Do** let motion mean noticing: things come into focus once (a blur-to-sharp pull, a rise from behind an edge), the route is drawn as you read, a press gives.

### Don't:
- **Don't** put a label, number or eyebrow above a heading, or number sections for decoration.
- **Don't** add floating shapes, glowing orbs, particles, cursor effects or icons that only decorate.
- **Don't** put glass on cards; it belongs only to the bar that content scrolls beneath.
- **Don't** use rounded cards, pill buttons or three-card grids.
- **Don't** fill with accent colour except the one active filter; don't use gradients brighter than 12% opacity.
- **Don't** set Mist Gray or Slate Blue small text.
- **Don't** use stock or AI-generated people, or typed characters as icons.
