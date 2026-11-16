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
  setupPortraitTilt();
  setupWorkFlow();
  setupScrollCue();

  document.getElementById("year").textContent = new Date().getFullYear();
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

/* ---------- Header border when scrolled ---------- */
function setupHeaderShadow() {
  const header = document.getElementById("siteHeader");
  const update = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", update, { passive: true });
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
    setTimeout(() => (label.textContent = "Copy email"), 1800);
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

/* ---------- Portrait tilts toward the pointer ---------- */
function setupPortraitTilt() {
  const card = document.getElementById("portraitCard");
  if (!card || !canHover() || prefersReducedMotion()) return;

  const MAX_TILT = 8; // degrees

  card.addEventListener("pointermove", (e) => {
    const box = card.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    const y = (e.clientY - box.top) / box.height;
    card.style.setProperty("--ry", ((x - 0.5) * MAX_TILT * 2).toFixed(2) + "deg");
    card.style.setProperty("--rx", ((0.5 - y) * MAX_TILT * 2).toFixed(2) + "deg");
    card.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
    card.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
    card.classList.add("is-tilting");
  });

  card.addEventListener("pointerleave", () => {
    card.classList.remove("is-tilting");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}

/* ---------- Selected work: zig-zag layout, pinned project index, and curves between projects ---------- */
function setupWorkFlow() {
  const section = document.getElementById("work");
  if (!section) return;

  const projects = [...section.querySelectorAll(".project")];
  const links = [...document.querySelectorAll("#workIndex a")];
  const linkFor = (p) => links.find((a) => a.getAttribute("href") === `#${p.id}`);
  const stacked = window.matchMedia("(max-width: 900px)");
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const tintOf = (p) => getComputedStyle(p).getPropertyValue("--pt").trim() || "#FB923C";
  let shown = [];
  let curves = [];
  let uid = 0;

  // Let the text lines enter one after another
  projects.forEach((p) => {
    [...p.querySelector(".project-info").children].forEach((el, i) => el.style.setProperty("--i", i));
  });

  // Rebuild after filtering: flip every other project and put a curve between neighbours
  function build() {
    curves.forEach((c) => c.el.remove());
    shown = projects.filter((p) => !p.hidden);
    projects.forEach((p) => {
      const a = linkFor(p);
      if (a) a.hidden = p.hidden;
    });
    projects.forEach((p) => p.classList.toggle("is-flip", !p.hidden && shown.indexOf(p) % 2 === 1));
    curves = shown.slice(0, -1).map((from, i) => {
      const el = document.createElement("div");
      el.className = "flow-link";
      el.setAttribute("aria-hidden", "true");
      from.after(el);
      return { el, from, to: shown[i + 1] };
    });
    measure();
  }

  // Draw each curve from the bottom of one project's screenshots to the top of the next one's
  function measure() {
    curves.forEach((c) => {
      const box = c.el.getBoundingClientRect();
      const w = box.width;
      const h = box.height;
      const g1 = c.from.querySelector(".gallery").getBoundingClientRect();
      const g2 = c.to.querySelector(".gallery").getBoundingClientRect();
      const study = c.from.querySelector(".case-study");
      const above = study && !study.hidden ? study.getBoundingClientRect().bottom : stacked.matches ? box.top : g1.bottom;
      const y1 = Math.min(0, above - box.top + 14);
      const y2 = stacked.matches ? h : Math.max(h, g2.top - box.top - 14);
      let d;
      let x1;
      let x2;
      if (stacked.matches) {
        // Down the left edge, into the next project's number
        const n = c.to.querySelector(".p-num").getBoundingClientRect();
        x1 = x2 = n.left + n.width / 2 - box.left;
        d = `M${x1} ${y1} C${x1 + 24} ${y1 + (y2 - y1) * 0.35}, ${x2 - 24} ${y1 + (y2 - y1) * 0.65}, ${x2} ${y2}`;
      } else {
        x1 = g1.left + g1.width / 2 - box.left;
        x2 = g2.left + g2.width / 2 - box.left;
        const mid = y1 + (y2 - y1) / 2;
        d = `M${x1} ${y1} C${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
      }
      const c1 = tintOf(c.from);
      const c2 = tintOf(c.to);
      const id = `flg${++uid}`;
      c.el.innerHTML = `
        <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
          <defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}">
            <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
          </linearGradient></defs>
          <path class="fl-track" d="${d}"/>
          <path class="fl-draw" d="${d}" pathLength="1" stroke="url(#${id})"/>
          <circle class="fl-end" cx="${x1}" cy="${y1}" r="4.5" stroke="${c1}"/>
          <circle class="fl-end fl-end--to" cx="${x2}" cy="${y2}" r="4.5" stroke="${c2}"/>
          <g class="fl-dot"><circle r="10" fill="${c2}" opacity="0.22"/><circle r="4.5" fill="#fff"/></g>
        </svg>`;
      c.draw = c.el.querySelector(".fl-draw");
      c.dot = c.el.querySelector(".fl-dot");
      c.endDot = c.el.querySelector(".fl-end--to");
      c.len = c.draw.getTotalLength();
      c.y1 = y1;
      c.y2 = y2;
      c.c2 = c2;
    });
    onScroll();
  }

  function onScroll() {
    const vh = window.innerHeight;
    const still = prefersReducedMotion();

    // Curves fill in as they pass through the middle of the screen
    curves.forEach((c) => {
      if (!c.draw) return;
      const top = c.el.getBoundingClientRect().top + c.y1;
      const span = c.y2 - c.y1;
      const p = still ? 1 : clamp((vh * 0.8 - top) / (vh * 0.4 + span));
      c.draw.style.strokeDashoffset = String(1 - p);
      const pt = c.draw.getPointAtLength(p * c.len);
      c.dot.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      c.el.classList.toggle("is-moving", p > 0.01 && p < 0.99);
      c.endDot.style.fill = p >= 0.99 ? c.c2 : "";
    });

    // The project crossing the middle of the screen is "current"; the index shows how far through it you are
    const mark = vh * 0.45;
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
      if (a) {
        a.classList.toggle("is-current", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    });
  }

  let frame = 0;
  const schedule = (fn) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fn);
  };
  window.addEventListener("scroll", () => schedule(onScroll), { passive: true });
  window.addEventListener("resize", () => schedule(measure));
  window.addEventListener("load", measure);
  document.fonts?.ready.then(measure);
  document.addEventListener("projects:filtered", build);
  // Opening a case study or loading images changes heights, so re-measure
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => schedule(measure));
    projects.forEach((p) => ro.observe(p));
  }

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
