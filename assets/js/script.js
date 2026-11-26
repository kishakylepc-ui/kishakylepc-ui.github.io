/* =========================================================
   Kisha Kyle Samson — Portfolio interactions
   Plain JavaScript, no libraries.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupHeaderShadow();
  setupActiveNav();
  setupProjectFilters();
  setupCaseStudies();
  setupSkillFilters();
  setupCopyEmail();
  setupScrollReveal();
  setupTitleReveal();
  setupGalleries();
  setupWorkFlow();
  setupRoute();
  setupHeroDepth();
  setupFogPause();
  setupNameLetters();

  document.getElementById("year").textContent = new Date().getFullYear();
});

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Mobile menu ---------- */
/* On phones the menu is a full-screen index. While it's open the page behind can't scroll or be tabbed into;
   it closes when you pick a section, press Escape, tap the button again, or widen the window. */
function setupMobileMenu() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  const behind = [document.querySelector("main"), document.querySelector("footer")].filter(Boolean);
  const phone = window.matchMedia("(max-width: 760px)");
  const isOpen = () => links.classList.contains("open");

  function setOpen(open, moveFocus = true) {
    links.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    document.documentElement.classList.toggle("menu-open", open);
    behind.forEach((el) => (el.inert = open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (moveFocus) (open ? links.querySelector("a") : toggle).focus({ preventScroll: true });
  }

  toggle.addEventListener("click", () => setOpen(!isOpen()));
  // Picking a section: unlock the page first, so the jump to the section can scroll
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => { if (isOpen()) setOpen(false, false); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setOpen(false);
  });
  phone.addEventListener("change", () => { if (!phone.matches && isOpen()) setOpen(false, false); });
}

/* ---------- Header: plain over the hero, then a near-solid bar once you scroll past it. It never hides. ---------- */
function setupHeaderShadow() {
  const header = document.getElementById("siteHeader");
  const hero = document.getElementById("top");
  const update = () => {
    const y = window.scrollY;
    const heroEnd = hero ? hero.offsetHeight - 96 : 400;
    header.classList.toggle("scrolled", y > 10);
    header.classList.toggle("is-floating", y > heroEnd);
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- Highlight the nav link for the section on screen ---------- */
function setupActiveNav() {
  // Only the in-page links; the Résumé link goes to another page
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  // On wide screens one underline (.nav-ink) slides from section to section; phones mark the active row instead
  const nav = document.querySelector('nav[aria-label="Main"]');
  const ink = document.createElement("span");
  ink.className = "nav-ink";
  ink.setAttribute("aria-hidden", "true");
  nav?.append(ink);
  let activeLink = null;

  function placeInk() {
    if (!nav || !activeLink || !activeLink.offsetParent || getComputedStyle(ink).display === "none") {
      ink.classList.remove("is-on");
      return;
    }
    const n = nav.getBoundingClientRect();
    const r = activeLink.getBoundingClientRect();
    const y = r.bottom - n.top - parseFloat(getComputedStyle(activeLink).paddingBottom) + 6;   // just under the word
    const first = !ink.classList.contains("is-on");
    ink.classList.toggle("is-placing", first);
    ink.style.transform = `translate(${(r.left - n.left).toFixed(1)}px, ${y.toFixed(1)}px) scaleX(${(r.width / 100).toFixed(3)})`;
    ink.classList.add("is-on");
    if (first) requestAnimationFrame(() => requestAnimationFrame(() => ink.classList.remove("is-placing")));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeLink = null;
          navLinks.forEach((link) => {
            const on = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("active", on);
            if (on) activeLink = link;
          });
          placeInk();
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
  // Above the first section (the hero) nothing is current, so the underline fades out
  const hero = document.getElementById("top");
  if (hero) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        activeLink = null;
        navLinks.forEach((link) => link.classList.remove("active"));
        placeInk();
      }
    }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
  }
  window.addEventListener("resize", () => requestAnimationFrame(placeInk));
  document.fonts?.ready.then(placeInk);
}

/* ---------- Filtering runs as a view transition where supported: what stays glides to its new place ----------
   Each item gets a view-transition-name only for the length of the transition. Without support, or with reduced
   motion, the change just happens (the items' own CSS fade still plays). */
function withViewTransition(elements, update) {
  if (!document.startViewTransition || prefersReducedMotion()) { update(); return; }
  elements.forEach((el, i) => { el.style.viewTransitionName = `vt-item-${i}`; });
  document.documentElement.classList.add("vt");
  const transition = document.startViewTransition(update);
  transition.finished.finally(() => {
    elements.forEach((el) => { el.style.viewTransitionName = ""; });
    document.documentElement.classList.remove("vt");
  });
}

/* ---------- Reusable: make a group of chip buttons act like tabs ---------- */
function setupChipGroup(groupEl, onChange) {
  const chips = groupEl.querySelectorAll(".chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");
      onChange(chip.dataset.filter);
    });
  });
}

/* ---------- Project filters ---------- */
function setupProjectFilters() {
  const projects = document.querySelectorAll(".project");
  const countText = document.getElementById("projectCount");
  const emptyState = document.getElementById("emptyState");
  const filters = document.getElementById("projectFilters");
  const total = projects.length;
  const plural = new Intl.PluralRules("en");
  const projectsWord = (n) => (plural.select(n) === "one" ? "project" : "projects");
  const describe = (shown) => `Showing ${shown} of ${total} ${projectsWord(total)}`;

  // No projects at all: no count, no filters, no index, just the empty-state line
  if (!total) {
    countText.hidden = true;
    filters.hidden = true;
    emptyState.hidden = false;
    emptyState.textContent = "No projects to show yet.";
    return;
  }

  setupChipGroup(document.getElementById("projectFilters"), (filter) => withViewTransition([...projects], () => {
    let shown = 0;

    projects.forEach((project) => {
      const tags = project.dataset.tags.split(" ");
      const match = filter === "all" || tags.includes(filter);
      project.hidden = !match;
      if (match) {
        shown++;
        project.classList.add("visible"); // skip the scroll animation for filtered items
      }
    });

    countText.textContent = describe(shown);
    emptyState.hidden = shown !== 0;
    document.dispatchEvent(new CustomEvent("projects:filtered"));
  }));

  countText.textContent = describe(total);
}

/* ---------- Expand / collapse case studies ----------
   The panel stays in the layout and opens or closes by height (CSS .case-study.is-open), so the content
   below slides instead of jumping. While closed it is inert: not focusable, not read out. */
function setupCaseStudies() {
  document.querySelectorAll(".toggle-case").forEach((button) => {
    const panel = button.closest(".project").querySelector(".case-study");
    if (!panel) return;
    panel.hidden = false;
    panel.inert = true;

    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      panel.classList.toggle("is-open", open);
      panel.inert = !open;
      button.setAttribute("aria-expanded", String(open));
      button.textContent = open ? "Hide case study" : "Read case study";
    });
  });
}

/* ---------- Skill filters: each filter shows one group of skills ---------- */
function setupSkillFilters() {
  const groups = document.querySelectorAll(".skill-group");

  setupChipGroup(document.getElementById("skillFilters"), (filter) => withViewTransition([...groups], () => {
    groups.forEach((group) => {
      group.hidden = !(filter === "all" || group.dataset.cat === filter);
      group.classList.add("visible"); // skip the scroll animation for groups shown by a filter
    });
  }));
}

/* ---------- Copy email to clipboard ---------- */
function setupCopyEmail() {
  const button = document.getElementById("copyEmail");
  if (!button) return;
  const label = button.querySelector(".copy-label") || button;
  const resting = label.dataset.label || label.textContent;
  const email = button.dataset.email;
  let timer = 0;

  // Swap the label: the old word slides up and out, the new one rises in (a crossfade with reduced motion)
  function swap(text) {
    if (prefersReducedMotion() || !label.animate) { label.textContent = text; return; }
    const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
    label.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-50%)" }], { duration: 120, easing: "ease-in" })
      .finished.then(() => {
        label.textContent = text;
        label.animate([{ opacity: 0, transform: "translateY(50%)" }, { opacity: 1, transform: "none" }], { duration: 180, easing: ease });
      });
  }

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // Clipboard can be blocked (for example when the page is opened as a file): say so, then open the mail app
      showToast("Couldn't copy here. Opening your mail app instead.");
      setTimeout(() => { window.location.href = "mailto:" + email; }, 700);
      return;
    }
    showToast("Copied " + email);
    swap("Copied");
    clearTimeout(timer);
    timer = setTimeout(() => swap(resting), 1800);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Fade sections in as you scroll ---------- */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  // Lists come in as lists: number each item so the CSS can delay it a beat after the one before
  items.forEach((block) => {
    block.querySelectorAll(".what li, .skill, .award").forEach((item, i) => item.style.setProperty("--i", Math.min(i, 8)));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- Section titles surface line by line, the way the name does ----------
   Each line is wrapped in .t-mask > .t-in; the CSS lifts .t-in from below the mask's edge and into focus once the
   title scrolls in. Lines are the title's own .d-line / .big-1 / .big-2 spans, or the whole title. */
function setupTitleReveal() {
  const titles = document.querySelectorAll("main h2.display, main h2.big");
  if (!titles.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  titles.forEach((title) => {
    const lines = title.querySelectorAll(":scope > .d-line, :scope > .big-1, :scope > .big-2");
    (lines.length ? [...lines] : [title]).forEach((line, i) => {
      const mask = document.createElement("span");
      mask.className = "t-mask";
      const inner = document.createElement("span");
      inner.className = "t-in";
      inner.style.setProperty("--li", i);
      inner.append(...line.childNodes);
      mask.append(inner);
      line.append(mask);
    });
    title.classList.add("t-host");
    observer.observe(title);
  });
}

/* =========================================================
   Screenshot galleries + full-screen viewer
   Each [data-gallery] holds <figure class="slide"> blocks;
   the arrows, counter, thumbnails and caption are built here.
   ========================================================= */
const ICONS = {
  prev: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  next: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  expand: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
};

function makeButton(className, label, html = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);
  button.innerHTML = html;
  return button;
}

// "Title · rest" → <b>Title</b> · rest  (built with DOM nodes, no innerHTML)
function fillCaption(el, text) {
  el.replaceChildren();
  const cut = text.indexOf(" · ");
  if (cut === -1) {
    el.textContent = text;
    return;
  }
  const bold = document.createElement("b");
  bold.textContent = text.slice(0, cut);
  el.append(bold, text.slice(cut));
}

// Calls onSwipe(-1 | 1) for a horizontal swipe; returns a function that says
// whether a swipe just happened (so the click that follows can be ignored).
function addSwipe(el, onSwipe, isEnabled = () => true) {
  let startX = 0, startY = 0, tracking = false, swipedAt = 0;
  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" || !isEnabled() || e.target.closest("video")) return;
    tracking = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  el.addEventListener("pointerup", (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swipedAt = Date.now();
      onSwipe(dx < 0 ? 1 : -1);
    }
  });
  el.addEventListener("pointercancel", () => (tracking = false));
  return () => Date.now() - swipedAt < 400;
}

function playFullscreen(video) {
  video.play().catch(() => {});
  if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
  else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); // iPhone
}

// A screenshot that 404s: hide the broken image and leave a plain panel in its place
function markMissing(img) {
  img.hidden = true;
  img.dataset.missing = "true";
  const slide = img.closest(".slide");
  const holder = img.closest(".browser, .phones");
  if (holder && [...holder.querySelectorAll("img")].every((i) => i.hidden) && !holder.querySelector(".g-missing")) {
    const note = document.createElement("p");
    note.className = "g-missing";
    note.textContent = "Screenshot unavailable";
    holder.append(note);
    slide?.classList.add("is-missing");
  }
}

function setupGalleries() {
  const viewer = createLightbox();

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    gallery.galleryApi = initGallery(gallery, viewer);
  });

  // Buttons like "See the system flow →" open a gallery at a given slide
  document.querySelectorAll(".open-gallery").forEach((button) => {
    button.addEventListener("click", () => {
      const gallery = button.closest(".project").querySelector("[data-gallery]");
      gallery?.galleryApi?.openSlide(Number(button.dataset.slide) || 0);
    });
  });
}

function initGallery(gallery, viewer) {
  const stage = gallery.querySelector(".stage");
  const slides = [...stage.querySelectorAll(".slide")];
  if (!slides.length) {
    gallery.hidden = true;
    gallery.closest(".project")?.classList.add("no-media");
    return null;
  }

  // Every image across all slides, in order — this is what the viewer flips through
  const images = slides.flatMap((slide, slideIndex) =>
    [...slide.querySelectorAll("img")].map((img) => {
      img.draggable = false;
      img.addEventListener("error", () => markMissing(img), { once: true });
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) markMissing(img);
      return { img, slideIndex, caption: slide.dataset.caption || img.alt };
    })
  );
  const firstImageOf = (slideIndex) => images.findIndex((item) => item.slideIndex === slideIndex);

  let current = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  const many = slides.length > 1;
  const phone = window.matchMedia("(max-width: 760px)");   // same breakpoint as the CSS

  // Stage controls
  stage.tabIndex = 0;
  stage.setAttribute("role", "group");
  stage.setAttribute("aria-roledescription", "carousel");
  stage.setAttribute("aria-label", (gallery.getAttribute("aria-label") || "Screenshots") +
    (many ? " — use the arrow keys to browse, Enter to open full size" : " — press Enter to open full size"));

  const count = document.createElement("span");
  count.className = "g-count";
  const zoom = makeButton("g-btn g-zoom", "Open full size", ICONS.expand);
  stage.append(count, zoom);

  let prev, next;
  if (many) {
    prev = makeButton("g-btn g-prev", "Previous screenshot", ICONS.prev);
    next = makeButton("g-btn g-next", "Next screenshot", ICONS.next);
    stage.append(prev, next);
    prev.addEventListener("click", () => show(current - 1, -1));
    next.addEventListener("click", () => show(current + 1, 1));
  }
  zoom.addEventListener("click", () => {
    const video = slides[current].querySelector("video");
    if (video) playFullscreen(video);
    else openViewer(firstImageOf(current));
  });

  // Caption + thumbnails under the stage
  const foot = document.createElement("div");
  foot.className = "g-foot";
  const caption = document.createElement("p");
  caption.className = "g-caption";
  caption.setAttribute("aria-live", "polite");
  foot.append(caption);

  let thumbs = [];
  if (many) {
    const strip = document.createElement("div");
    strip.className = "g-thumbs";
    strip.setAttribute("role", "group");
    strip.setAttribute("aria-label", "Choose a screenshot");
    thumbs = slides.map((slide, i) => {
      const source = slide.querySelector("img");
      const video = slide.querySelector("video");
      const thumb = makeButton("g-thumb" + (video ? " g-thumb--video" : ""), "Show: " + (slide.dataset.caption || source?.alt || "video"));
      // Thumbnails are small copies in a "thumbs" folder beside each screenshot (144 x 96); if one is missing,
      // fall back to the full image. Set loading before src, or the browser fetches it straight away.
      const full = video ? video.getAttribute("poster") : source?.getAttribute("src");
      const img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = "";
      img.draggable = false;
      if (full) {
        img.addEventListener("error", () => {
          if (img.src !== new URL(full, location.href).href) img.src = full;
          else { img.remove(); thumb.classList.add("is-missing"); }
        });
        img.src = full.replace(/([^/]+)$/, "thumbs/$1");
      }
      thumb.append(img);
      thumb.addEventListener("click", () => show(i));
      strip.append(thumb);
      return thumb;
    });
    foot.append(strip);

    // On phones the arrows sit beside the thumbnails instead of on the picture, so they never land on a
    // video's own controls (fullscreen, the overflow menu) or on the bottom of a screenshot
    const nav = document.createElement("div");
    nav.className = "g-nav";
    foot.append(nav);
    const placeArrows = () => (phone.matches ? nav : stage).append(prev, next);
    phone.addEventListener("change", placeArrows);
    placeArrows();
  }
  gallery.append(foot);

  // dir: 1 = forward (Next), -1 = back; worked out from the indexes when not given (thumbnails, the viewer)
  function show(index, dir) {
    const target = (index + slides.length) % slides.length;
    if (dir === undefined) dir = target === current ? 0 : target > current ? 1 : -1;
    if (dir) stage.dataset.dir = dir > 0 ? "next" : "prev";
    current = target;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    thumbs.forEach((thumb, i) => thumb.setAttribute("aria-current", String(i === current)));
    count.textContent = `${current + 1} / ${slides.length}`;
    count.hidden = !many;

    const slide = slides[current];
    const activeVideo = slide.querySelector("video");
    stage.classList.toggle("is-video", !!activeVideo);
    zoom.setAttribute("aria-label", activeVideo ? "Play full screen" : "Open full size");
    syncVideos();
    fillCaption(caption, slide.dataset.caption || "");
    const hintText = slide.classList.contains("slide-doc")
      ? (canHover() ? "↕ hover to scroll · click to zoom" : "tap to zoom")
      : slide.classList.contains("fit-contain") ? (canHover() ? "click to zoom" : "tap to zoom") : "";
    if (hintText) {
      const hint = document.createElement("span");
      hint.className = "g-hint";
      hint.textContent = hintText;
      caption.append(hint);
    }
  }

  function openViewer(imageIndex) {
    viewer.open(images, Math.max(0, imageIndex), (i) => show(images[i].slideIndex));
  }

  // Click a screenshot (or anywhere on the stage) to open it full size
  const justSwiped = addSwipe(stage, (dir) => show(current + dir, dir), () => many);
  stage.addEventListener("click", (e) => {
    if (justSwiped() || e.target.closest(".g-btn") || e.target.closest("video")) return;
    const video = slides[current].querySelector("video");
    if (video) { video.paused ? video.play().catch(() => {}) : video.pause(); return; }
    const img = e.target.closest("img");
    const index = img ? images.findIndex((item) => item.img === img) : -1;
    openViewer(index >= 0 ? index : firstImageOf(current));
  });

  stage.addEventListener("keydown", (e) => {
    if (e.target !== stage) return;
    if (many && e.key === "ArrowLeft") { e.preventDefault(); show(current - 1, -1); }
    else if (many && e.key === "ArrowRight") { e.preventDefault(); show(current + 1, 1); }
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const video = slides[current].querySelector("video");
      if (video) video.paused ? video.play().catch(() => {}) : video.pause();
      else openViewer(firstImageOf(current));
    }
  });

  // Videos play (muted, looping) only while their slide is showing and the gallery is on screen. On phones
  // they wait for a tap instead (the poster and the play control show), so nobody spends 2 MB of mobile data
  // on a demo they scrolled past.
  let onScreen = false;
  const autoplay = !prefersReducedMotion() && !(navigator.connection && navigator.connection.saveData);
  function syncVideos() {
    slides.forEach((slide, i) => {
      const video = slide.querySelector("video");
      if (!video) return;
      if (i === current && onScreen && autoplay && !phone.matches) video.play().catch(() => {});
      else if (i !== current || !onScreen) video.pause();
    });
  }
  if (slides.some((slide) => slide.querySelector("video"))) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      syncVideos();
    }, { threshold: 0.4 }).observe(stage);
  }

  show(current);

  return {
    openSlide(index) {
      show(index);
      openViewer(firstImageOf(current));
    },
  };
}

function createLightbox() {
  const dialog = document.getElementById("lightbox");
  const frame = document.getElementById("lbFrame");
  // The image is created here rather than shipped empty in the HTML
  const image = document.getElementById("lbImg") || frame.appendChild(Object.assign(document.createElement("img"), { id: "lbImg", alt: "", draggable: false }));
  const caption = document.getElementById("lbCaption");
  const counter = document.getElementById("lbCount");
  const prev = document.getElementById("lbPrev");
  const next = document.getElementById("lbNext");

  let items = [];
  let index = 0;
  let onChange = null;

  function render() {
    const item = items[index];
    frame.classList.remove("is-zoomed");
    image.src = item.img.src;   // always the full-size file, even when the page showed a smaller srcset copy
    image.alt = item.img.alt;
    caption.textContent = item.caption;
    // Count in slides, like the gallery under the screenshot does ("6 / 7"); a slide with several phone
    // screens adds where you are inside it ("2 / 7 · 1 of 3")
    const slideCount = items[items.length - 1].slideIndex + 1;
    const sameSlide = items.filter((it) => it.slideIndex === item.slideIndex);
    const part = sameSlide.length > 1 ? ` · ${sameSlide.indexOf(item) + 1} of ${sameSlide.length}` : "";
    counter.textContent = items.length > 1 ? `${item.slideIndex + 1} / ${slideCount}${part}` : "";
    prev.hidden = next.hidden = items.length < 2;
    frame.scrollTo(0, 0);
    // restart the fade-in
    image.style.animation = "none";
    void image.offsetWidth;
    image.style.animation = "";
    if (onChange) onChange(index);
  }

  function go(step) {
    if (items.length < 2) return;
    index = (index + step + items.length) % items.length;
    render();
  }

  // Click the image to zoom to full resolution, centered on where you clicked
  image.addEventListener("error", () => { if (image.getAttribute("src")) frame.classList.add("is-missing"); });
  image.addEventListener("load", () => frame.classList.remove("is-missing"));

  image.addEventListener("click", (e) => {
    if (justSwiped()) return;
    const box = image.getBoundingClientRect();
    const rx = (e.clientX - box.left) / box.width;
    const ry = (e.clientY - box.top) / box.height;
    const zoomed = frame.classList.toggle("is-zoomed");
    if (zoomed) {
      frame.scrollLeft = image.offsetWidth * rx - frame.clientWidth / 2;
      frame.scrollTop = image.offsetHeight * ry - frame.clientHeight / 2;
    } else {
      frame.scrollTo(0, 0);
    }
  });

  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  document.getElementById("lbClose").addEventListener("click", () => dialog.close());

  // Clicking the dark area around the image closes the viewer
  dialog.addEventListener("click", (e) => {
    if (justSwiped()) return;
    if (e.target === dialog || e.target === frame) dialog.close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  });

  const justSwiped = addSwipe(frame, go, () => !frame.classList.contains("is-zoomed"));

  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
  });

  // Opening: the image starts at the size and place of the screenshot you clicked and grows into the viewer.
  // It starts at once with the copy already on screen (no waiting on the download), then swaps in the
  // full-size file when that arrives; same picture, so the swap is invisible. If the shapes differ (a cropped
  // diagram) or nothing is ready within a moment, it just fades in.
  function growFrom(source, from) {
    const full = image.src;                                   // render() set the full-size file
    const quick = source.currentSrc || source.src;
    if (quick && quick !== full) image.src = quick;
    image.style.animation = "none";

    const grow = () => {
      image.style.opacity = "";
      const to = image.getBoundingClientRect();
      const sx = from.width / to.width, sy = from.height / to.height;
      if (!to.width || !to.height || Math.abs(sx / sy - 1) > 0.12) image.style.animation = "";
      else image.animate(
        [
          { transformOrigin: "0 0", transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${(sx + sy) / 2})` },
          { transformOrigin: "0 0", transform: "none" },
        ],
        { duration: 460, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
      if (image.src !== full) {
        const hi = new Image();
        hi.src = full;
        (hi.decode ? hi.decode() : Promise.resolve()).then(() => { if (image.src === quick && items[index]?.img === source) image.src = full; }, () => {});
      }
    };

    if (image.complete && image.naturalWidth) { grow(); return; }
    // Not in the cache after all: wait a moment for it, otherwise fall back to the plain fade
    image.style.opacity = "0";
    let settled = false;
    const timer = setTimeout(() => { if (!settled) { settled = true; image.style.opacity = ""; image.style.animation = ""; } }, 350);
    (image.decode ? image.decode() : Promise.resolve()).catch(() => {}).then(() => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      grow();
    });
  }

  return {
    open(list, startIndex, changeCallback) {
      items = list;
      index = startIndex;
      onChange = changeCallback;
      const source = items[index]?.img;
      const from = source && source.offsetParent ? source.getBoundingClientRect() : null;
      render();
      if (!dialog.open) dialog.showModal();
      document.getElementById("lbClose").focus();
      if (from && from.width && from.height && image.animate && !prefersReducedMotion()) growFrom(source, from);
    },
  };
}


/* ---------- Selected work: zig-zag layout and the pinned project index ---------- */
function setupWorkFlow() {
  const section = document.getElementById("work");
  if (!section) return;

  const projects = [...section.querySelectorAll(".project")];
  const links = [...document.querySelectorAll("#workIndex a")];
  const linkFor = (p) => links.find((a) => a.getAttribute("href") === `#${p.id}`);
  const clamp = (v) => Math.min(1, Math.max(0, v));
  let shown = [];

  // After filtering: hide the index links of hidden projects and flip every other visible project
  const index = document.getElementById("workIndex");
  // Names cut off by the index's width get their full text as a tooltip
  function labelTruncated() {
    links.forEach((a) => {
      const name = a.querySelector(".wi-name"), type = a.querySelector(".wi-type");
      const cut = [name, type].some((el) => el && el.offsetParent && el.scrollWidth > el.clientWidth + 1);
      if (cut) a.title = [name?.textContent, type?.textContent].filter(Boolean).join(" · ");
      else a.removeAttribute("title");
    });
  }

  function build() {
    shown = projects.filter((p) => !p.hidden);
    if (index) index.hidden = !shown.length;
    projects.forEach((p) => {
      const a = linkFor(p);
      if (a) a.hidden = p.hidden;
      p.classList.toggle("is-flip", !p.hidden && shown.indexOf(p) % 2 === 1);
    });
    onScroll();
  }

  // The project crossing the middle of the screen is "current"; the index shows how far through it you are
  function onScroll() {
    frame = 0;
    const mark = window.innerHeight * 0.45;
    const sec = section.getBoundingClientRect();
    let current = null;
    shown.forEach((p) => {
      const r = p.getBoundingClientRect();
      linkFor(p)?.style.setProperty("--prog", clamp((mark - r.top) / r.height).toFixed(3));
      if (r.top <= mark) current = p;
    });
    if (sec.bottom < mark) current = null;
    projects.forEach((p) => {
      const on = p === current;
      p.classList.toggle("is-current", on);
      const a = linkFor(p);
      if (!a) return;
      a.classList.toggle("is-current", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  let frame = 0;
  const schedule = () => { if (!frame) frame = requestAnimationFrame(onScroll); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  document.addEventListener("projects:filtered", build);
  window.addEventListener("resize", () => requestAnimationFrame(labelTruncated));
  document.fonts?.ready.then(labelTruncated);
  build();
  labelTruncated();
}

/* ---------- The route: a winding line through the education stops ----------
   Drawn through the .stop-dot of every stop in #journeyBody, ending below the last one. The solid line follows
   your scroll (its tip stays near the middle of the screen), and each stop lights up once it's passed. */
function setupRoute() {
  const body = document.getElementById("journeyBody");
  if (!body) return;
  const svg = body.querySelector(".route-line");
  const stops = [...body.querySelectorAll(".stop")];
  if (!svg || stops.length < 2) return;

  const still = prefersReducedMotion();
  let track, draw, len = 0, points = [];

  // Position inside the journey body, ignoring transforms (the reveal animations move things).
  // fy = how far down the element the point sits (0.5 = its centre).
  const pointIn = (el, fy = 0.5) => {
    let x = el.offsetWidth / 2, y = el.offsetHeight * fy;
    for (let n = el; n && n !== body; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
    return { x, y };
  };
  const f = (n) => n.toFixed(1);

  function measure() {
    // Each stop: its dot, then straight down its left edge to just below its text, so the line never crosses words
    points = stops.map((s) => {
      const dot = pointIn(s.querySelector(".stop-dot"));
      const bottom = pointIn(s, 1).y + 18;
      return { x: dot.x, y: dot.y, down: bottom };
    });
    let d = `M${f(points[0].x)} ${f(points[0].y)}`;
    points.forEach((a, i) => {
      d += ` L${f(a.x)} ${f(a.down)}`;                     // straight down the left edge of a stop
      const b = points[i + 1];
      if (!b) return;
      const dy = b.y - a.down;                             // then curve across the gap to the next point
      d += ` C${f(a.x)} ${f(a.down + dy * 0.6)}, ${f(b.x)} ${f(b.y - dy * 0.6)}, ${f(b.x)} ${f(b.y)}`;
    });
    svg.setAttribute("viewBox", `0 0 ${body.offsetWidth} ${body.offsetHeight}`);
    svg.innerHTML = `<path class="rl-track" d="${d}"/><path class="rl-draw" d="${d}" pathLength="1"/>`;
    track = svg.querySelector(".rl-track");
    draw = svg.querySelector(".rl-draw");
    len = track.getTotalLength();
    update();
  }

  // The path only ever runs downward, so the length at a given height can be found by halving
  function lengthAtY(y) {
    if (y <= points[0].y) return 0;
    if (y >= points[points.length - 1].down) return len;
    let lo = 0, hi = len;
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      if (track.getPointAtLength(mid).y < y) lo = mid; else hi = mid;
    }
    return lo;
  }

  function update() {
    pending = 0;
    if (!track) return;
    const reach = still ? Infinity : window.innerHeight * 0.62 - body.getBoundingClientRect().top;
    const at = still ? len : lengthAtY(reach);
    draw.style.strokeDashoffset = String(1 - at / len);
    stops.forEach((s, i) => s.classList.toggle("is-passed", reach >= points[i].y - 4));
  }

  let pending = 0;
  const schedule = () => { if (!pending) pending = requestAnimationFrame(update); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(measure));
  window.addEventListener("load", measure);
  document.fonts?.ready.then(measure);
  if ("ResizeObserver" in window) new ResizeObserver(() => requestAnimationFrame(measure)).observe(body);
  measure();
}


/* ---------- Hero depth ----------
   As you scroll past the hero, each [data-depth] layer (the light, the mist, the portrait) lags behind a little,
   farther layers more; on wide screens the text fades out. Layers move through the CSS "translate" property,
   so their own "transform" can position them. */
function setupHeroDepth() {
  const hero = document.getElementById("top");
  if (!hero || prefersReducedMotion()) return;

  const layers = [...hero.querySelectorAll("[data-depth]")].map((el) => ({ el, lag: Math.max(0.05, 0.3 - (parseFloat(el.dataset.depth) || 0) * 0.55) }));
  const copy = hero.querySelector(".hero-copy");
  const title = hero.querySelector(".hero-title");
  const wide = window.matchMedia("(min-width: 901px)");
  let frame = 0;

  function update() {
    frame = 0;
    // Tablets and phones scroll the hero as one piece: no parallax to cost frames on a phone
    if (!wide.matches) {
      layers.forEach(({ el }) => (el.style.translate = ""));
      copy.style.opacity = title.style.translate = "";
      return;
    }
    const scrolled = Math.min(Math.max(window.scrollY, 0), hero.offsetHeight);
    layers.forEach(({ el, lag }) => { el.style.translate = `0 ${(scrolled * lag).toFixed(1)}px`; });
    copy.style.opacity = Math.max(0, 1 - scrolled / (hero.offsetHeight * 0.75)).toFixed(3);
    title.style.translate = `0 ${(scrolled * -0.12).toFixed(1)}px`;
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

/* ---------- The drifting mist is the page's only loop: it pauses while the hero is off screen ---------- */
function setupFogPause() {
  const hero = document.getElementById("top");
  if (!hero) return;
  new IntersectionObserver(([entry]) => hero.classList.toggle("is-away", !entry.isIntersecting)).observe(hero);
}

/* ---------- Hero name: split into letters so each can surface on load (CSS .hero-name .ch) ---------- */
function setupNameLetters() {
  // index.html already splits the name inline, before the first paint; this only runs if that didn't happen
  if (document.querySelector(".hero-name .ch")) return;
  let index = 0;
  document.querySelectorAll(".hero-name .nm").forEach((word) => {
    const letters = [...word.textContent].map((char) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.textContent = char;
      span.style.setProperty("--ci", index++);
      return span;
    });
    word.replaceChildren(...letters);
  });
}
