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
  setupGalleries();
  setupWorkFlow();
  setupScrollCue();
  setupSplitHeadings();
  setupRoute();
  setupHeroDepth();
  setupNameLetters();

  const year = new Date().getFullYear();
  document.getElementById("year").textContent = year;
  const heroYear = document.getElementById("heroYear");
  if (heroYear) heroYear.textContent = year;
});

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Mobile menu ---------- */
function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the menu after tapping a link
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

/* ---------- Header: plain at the top, then a floating glass bar once you scroll past the hero ---------- */
function setupHeaderShadow() {
  const header = document.getElementById("siteHeader");
  const hero = document.getElementById("top");
  const links = document.getElementById("navLinks");
  const update = () => {
    const y = window.scrollY;
    const heroEnd = hero ? hero.offsetHeight - 96 : 400;
    const floating = y > heroEnd;
    header.classList.toggle("scrolled", y > 10);
    header.classList.toggle("is-floating", floating);
    // While you're reading the hero, the bar steps out of the way (unless the menu is open)
    header.classList.toggle("is-hidden", !floating && y > 80 && !links.classList.contains("open"));
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- Highlight the nav link for the section on screen ---------- */
function setupActiveNav() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
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
  const total = projects.length;

  setupChipGroup(document.getElementById("projectFilters"), (filter) => {
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

    countText.textContent = `Showing ${shown} of ${total} projects`;
    emptyState.hidden = shown !== 0;
    document.dispatchEvent(new CustomEvent("projects:filtered"));
  });

  countText.textContent = `Showing ${total} of ${total} projects`;
}

/* ---------- Expand / collapse case studies ---------- */
function setupCaseStudies() {
  document.querySelectorAll(".toggle-case").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest(".project").querySelector(".case-study");
      const isOpen = button.getAttribute("aria-expanded") === "true";

      panel.hidden = isOpen;
      button.setAttribute("aria-expanded", !isOpen);
      button.textContent = isOpen ? "Read case study" : "Hide case study";
    });
  });
}

/* ---------- Skill filters ---------- */
function setupSkillFilters() {
  const skills = document.querySelectorAll(".skill");

  setupChipGroup(document.getElementById("skillFilters"), (filter) => {
    skills.forEach((skill) => {
      skill.hidden = !(filter === "all" || skill.dataset.cat === filter);
    });
  });
}

/* ---------- Copy email to clipboard ---------- */
function setupCopyEmail() {
  const button = document.getElementById("copyEmail");
  const label = button.querySelector("span");
  const email = button.dataset.email;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied: " + email);
    } catch (err) {
      // Clipboard can be blocked when opening the file directly; fall back to mailto
      window.location.href = "mailto:" + email;
      return;
    }
    label.textContent = "Copied!";
    button.classList.add("is-copied");
    setTimeout(() => {
      label.textContent = "Copy email";
      button.classList.remove("is-copied");
    }, 1800);
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

function setupGalleries() {
  const viewer = createLightbox();

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    gallery.galleryApi = initGallery(gallery, viewer);
  });

  // Buttons like "See the system flow →" open a gallery at a given slide
  document.querySelectorAll(".open-gallery").forEach((button) => {
    button.addEventListener("click", () => {
      const gallery = button.closest(".project").querySelector("[data-gallery]");
      gallery?.galleryApi.openSlide(Number(button.dataset.slide) || 0);
    });
  });
}

function initGallery(gallery, viewer) {
  const stage = gallery.querySelector(".stage");
  const slides = [...stage.querySelectorAll(".slide")];
  if (!slides.length) return null;

  // Every image across all slides, in order — this is what the viewer flips through
  const images = slides.flatMap((slide, slideIndex) =>
    [...slide.querySelectorAll("img")].map((img) => {
      img.draggable = false;
      return { img, slideIndex, caption: slide.dataset.caption || img.alt };
    })
  );
  const firstImageOf = (slideIndex) => images.findIndex((item) => item.slideIndex === slideIndex);

  let current = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  const many = slides.length > 1;

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
    prev.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
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
      const img = document.createElement("img");
      img.src = video ? video.getAttribute("poster") : source.getAttribute("src");
      img.alt = "";
      img.loading = "lazy";
      img.draggable = false;
      thumb.append(img);
      thumb.addEventListener("click", () => show(i));
      strip.append(thumb);
      return thumb;
    });
    foot.append(strip);
  }
  gallery.append(foot);

  function show(index) {
    current = (index + slides.length) % slides.length;
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
  const justSwiped = addSwipe(stage, (dir) => show(current + dir), () => many);
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
    if (many && e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
    else if (many && e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const video = slides[current].querySelector("video");
      if (video) video.paused ? video.play().catch(() => {}) : video.pause();
      else openViewer(firstImageOf(current));
    }
  });

  // Videos play (muted, looping) only while their slide is showing and the gallery is on screen
  let onScreen = false;
  const autoplay = !prefersReducedMotion() && !(navigator.connection && navigator.connection.saveData);
  function syncVideos() {
    slides.forEach((slide, i) => {
      const video = slide.querySelector("video");
      if (!video) return;
      if (i === current && onScreen && autoplay) video.play().catch(() => {});
      else video.pause();
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
  const image = document.getElementById("lbImg");
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
    image.src = item.img.currentSrc || item.img.src;
    image.alt = item.img.alt;
    caption.textContent = item.caption;
    counter.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : "";
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

  return {
    open(list, startIndex, changeCallback) {
      items = list;
      index = startIndex;
      onChange = changeCallback;
      render();
      if (!dialog.open) dialog.showModal();
      document.getElementById("lbClose").focus();
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
  function build() {
    shown = projects.filter((p) => !p.hidden);
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
  build();
}

/* ---------- Scroll cue: hide it once the visitor starts scrolling ---------- */
function setupScrollCue() {
  const cue = document.getElementById("scrollCue");
  if (!cue) return;
  const update = () => cue.classList.toggle("is-hidden", window.scrollY > 60);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ---------- Text reveal: words in [data-split] headings rise into place when the heading scrolls in ----------
   Each word becomes <span class="sw"><span class="sw-i">word</span></span>; the CSS slides .sw-i up once an
   ancestor gets the "visible" class from setupScrollReveal. Text nodes only, so <em> and spans stay intact. */
function setupSplitHeadings() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll("[data-split]").forEach((heading) => {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    let index = 0;
    textNodes.forEach((node) => {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(" "); return; }
        const outer = document.createElement("span");
        outer.className = "sw";
        const inner = document.createElement("span");
        inner.className = "sw-i";
        inner.style.setProperty("--wi", index++);
        inner.textContent = part;
        outer.append(inner);
        frag.append(outer);
      });
      node.replaceWith(frag);
    });
    heading.classList.add("sw-host");
  });
}

/* ---------- The route: a winding line through the education stops, ending at "destination." ----------
   Drawn through the .stop-dot of every stop in #journeyBody and on to .route-end. The solid line follows
   your scroll (its tip stays near the middle of the screen), and each stop lights up once it's passed. */
function setupRoute() {
  const body = document.getElementById("journeyBody");
  if (!body) return;
  const svg = body.querySelector(".route-line");
  const stops = [...body.querySelectorAll(".stop")];
  const end = body.querySelector(".route-end");
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
    // The finish: curve over to a point just above the statement, straight over the full stop after "destination",
    // then drop down into it. That line is right-aligned, so the drop passes beside the shorter lines, not through them.
    if (end) {
      const stop = pointIn(end, 0.74);                     // the full stop's dot sits low in its line box
      const top = pointIn(end.closest(".statement"), 0).y - 12;
      points.push({ x: stop.x, y: top, down: stop.y });
    }
    let d = `M${f(points[0].x)} ${f(points[0].y)}`;
    points.forEach((a, i) => {
      d += ` L${f(a.x)} ${f(a.down)}`;                     // straight down (the left edge of a stop, or into the full stop)
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
    end?.classList.toggle("is-reached", at >= len - 1);
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
    const scrolled = Math.min(Math.max(window.scrollY, 0), hero.offsetHeight);
    layers.forEach(({ el, lag }) => { el.style.translate = `0 ${(scrolled * lag).toFixed(1)}px`; });
    if (wide.matches) {
      copy.style.opacity = Math.max(0, 1 - scrolled / (hero.offsetHeight * 0.75)).toFixed(3);
      title.style.translate = `0 ${(scrolled * -0.12).toFixed(1)}px`;
    } else {
      copy.style.opacity = title.style.translate = "";
    }
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

/* ---------- Hero name: each letter rises in on load and jumps when you hover it ---------- */
function setupNameLetters() {
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
