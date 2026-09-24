/* The Fat Mechanic — main.js (no dependencies) */
(() => {
  const C = window.TFM || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const arrow = '<svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>';

  /* ---------- Socials + small bits of config ---------- */
  const socials = C.socials || {};
  const socialNames = { tiktok: "TikTok", instagram: "Instagram", youtube: "YouTube", facebook: "Facebook" };
  const socialHTML = '<div class="socials">' + Object.keys(socialNames)
    .filter(k => socials[k])
    .map(k => `<a href="${esc(socials[k])}" target="_blank" rel="noopener" aria-label="The Fat Mechanic on ${socialNames[k]}"><svg class="ico" aria-hidden="true"><use href="#i-${k}"/></svg></a>`)
    .join("") + "</div>";
  $$("[data-socials]").forEach(el => (el.innerHTML = socialHTML));
  $$("[data-social-link]").forEach(el => { const u = socials[el.dataset.socialLink]; if (u) el.href = u; });
  if (C.tiktokFollowers) $$("[data-followers]").forEach(el => (el.textContent = C.tiktokFollowers));
  $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  const ws = C.workshop || {};
  if (ws.name) $$("[data-workshop]").forEach(el => (el.textContent = ws.name));
  if (ws.url) { $("[data-workshop-plug]").hidden = false; $("[data-workshop-link]").href = ws.url; }

  const credit = $("[data-credit]");
  if (credit) {
    const cu = (C.credit || {}).url;
    if (cu) credit.href = cu;
    else { credit.removeAttribute("href"); credit.removeAttribute("target"); credit.removeAttribute("rel"); }
  }

  /* ---------- Header: shrink on scroll, mobile menu, active link ---------- */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });

  const nav = $("#nav"), menuBtn = $(".menu-btn");
  const setMenu = open => {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); } });

  const navLinks = $$('.nav a[href^="#"]:not([data-filter])');
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["videos", "story", "events", "merch", "contact"].forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Videos ---------- */
  const tagLabels = { projects: "Projects", tips: "Tips & fixes", realtalk: "Real talk", oscar: "Oscar" };
  const grid = $("[data-videos]"), empty = $("[data-videos-empty]");
  const videos = (C.videos || []).slice(0, 8);
  const videoId = url => (String(url).match(/\/video\/(\d+)/) || [])[1];

  function renderVideos(filter = "all") {
    const list = videos.filter(v => filter === "all" || v.tag === filter);
    grid.innerHTML = list.map((v, i) => `
      <button class="vid" type="button" data-i="${videos.indexOf(v)}" aria-label="Play: ${esc(v.title || "TikTok video")}">
        ${v.thumb ? `<img src="${esc(v.thumb)}" alt="" loading="lazy">` : ""}
        <span class="vid-play" aria-hidden="true"><svg class="ico"><use href="#i-play"/></svg></span>
        <span class="vid-cap">${v.tag ? `<span class="vid-tag">${esc(tagLabels[v.tag] || v.tag)}</span><br>` : ""}${esc(v.title || "")}</span>
      </button>`).join("");
    empty.hidden = list.length > 0;
  }
  renderVideos();

  // Pull thumbnail + caption from TikTok for any real video link without a thumb
  videos.forEach(v => {
    if (v.thumb || !videoId(v.url)) return;
    fetch("https://www.tiktok.com/oembed?url=" + encodeURIComponent(v.url))
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(d => { v.thumb = d.thumbnail_url; if (!v.title && d.title) v.title = d.title.slice(0, 70); renderVideos(currentFilter); })
      .catch(() => {});
  });

  let currentFilter = "all";
  function setFilter(f) {
    currentFilter = f;
    $$(".chip").forEach(c => { const on = c.dataset.chip === f; c.classList.toggle("is-on", on); c.setAttribute("aria-pressed", on); });
    renderVideos(f);
  }
  $$(".chip").forEach(c => c.addEventListener("click", () => setFilter(c.dataset.chip)));
  $$("[data-filter]").forEach(a => a.addEventListener("click", () => setFilter(a.dataset.filter)));

  // Modal player
  const modal = $("[data-modal]"), frame = $("[data-modal-frame]");
  grid.addEventListener("click", e => {
    const b = e.target.closest(".vid"); if (!b) return;
    const v = videos[+b.dataset.i]; const id = videoId(v.url);
    if (!id || !modal.showModal) { window.open(v.url || socials.tiktok, "_blank", "noopener"); return; }
    frame.innerHTML = `<iframe src="https://www.tiktok.com/player/v1/${id}?autoplay=1&music_info=1&description=1&rel=0" allow="autoplay; fullscreen; encrypted-media" allowfullscreen title="${esc(v.title || "TikTok video")}"></iframe>`;
    modal.showModal();
  });
  const closeModal = () => { modal.close(); };
  $("[data-modal-close]").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  modal.addEventListener("close", () => (frame.innerHTML = ""));

  /* ---------- Events ---------- */
  $("[data-events]").innerHTML = (C.events || []).map(ev => {
    const inner = `
      ${ev.img ? `<img src="${esc(ev.img)}" alt="" loading="lazy">` : ""}
      <div class="event-body">
        <h3>${esc(ev.title)}</h3>
        <p>${esc(ev.blurb)}</p>
        ${ev.url ? `<span class="go">Find out more ${arrow}</span>` : ""}
      </div>`;
    return ev.url
      ? `<a class="event" href="${esc(ev.url)}" target="_blank" rel="noopener">${inner}</a>`
      : `<article class="event">${inner}</article>`;
  }).join("");

  /* ---------- Merch ---------- */
  const M = C.merch || {};
  const tee = `<svg class="garment" viewBox="0 0 200 200" aria-hidden="true"><path fill="#111" d="M70 22c6 10 18 16 30 16s24-6 30-16l44 20 18 40-30 14-10-18v108H48V78l-10 18L8 82l18-40z"/></svg>`;
  const hoodie = `<svg class="garment" viewBox="0 0 200 200" aria-hidden="true"><path fill="#111" d="M72 26c-2-8 12-18 28-18s30 10 28 18l46 18 18 58c2 8-2 14-8 16l-18 4-10-40v114H44V82l-10 40-18-4c-6-2-10-8-8-16l18-58z"/><path fill="#2a2a2a" d="M78 30c4 14 12 24 22 24s18-10 22-24c-6 6-14 8-22 8s-16-2-22-8zM66 128h68l6 34H60z"/></svg>`;
  const stubby = `<svg class="garment" viewBox="0 0 200 200" aria-hidden="true"><rect x="52" y="30" width="96" height="150" rx="14" fill="#111"/><rect x="52" y="30" width="96" height="16" rx="8" fill="#2a2a2a"/><rect x="60" y="52" width="10" height="120" rx="5" fill="#fff" opacity=".08"/></svg>`;
  const art = t => {
    if (t === "stickers") return `<img class="sticker-a" src="assets/img/logo-stacked.webp" alt=""><img class="sticker-b" src="assets/img/logo-tfm.webp" alt="">`;
    const g = t === "hoodie" ? hoodie : t === "stubby" ? stubby : tee;
    return g + `<img class="garment-logo ${t === "stubby" ? "stubby-logo" : ""}" src="assets/img/logo-white.webp" alt="">`;
  };
  const fallback = "#contact";
  $("[data-merch]").innerHTML = (M.items || []).map(p => {
    const href = p.url || M.storeUrl || fallback;
    const ext = /^https?:/.test(href);
    return `<a class="product" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""} data-merch-item>
      <div class="product-art">${art(p.type)}</div>
      <h3>${esc(p.name)}</h3>${p.price ? `<p class="price">${esc(p.price)}</p>` : ""}
    </a>`;
  }).join("");
  const storeLink = $("[data-store-link]");
  if (M.storeUrl) { storeLink.href = M.storeUrl; storeLink.target = "_blank"; storeLink.rel = "noopener"; }
  else {
    storeLink.innerHTML = `Get on the list ${arrow.replace('class="ico"', 'class="ico arrow"')}`;
    $("[data-store-note]").hidden = false;
    $$('[data-merch-item][href="#contact"], [data-store-link]').forEach(a =>
      a.addEventListener("click", () => { const s = $("#f-topic"); if (s) s.value = "Merch"; }));
  }

  /* ---------- Contact form ---------- */
  const form = $("[data-contact]"), status = $("[data-form-status]");
  const cc = C.contact || {};
  form.addEventListener("submit", async e => {
    e.preventDefault();
    status.className = "form-status"; status.textContent = "";
    const req = $$("[required]", form);
    let bad = null;
    req.forEach(f => { const ok = f.value.trim() && (f.type !== "email" || /^\S+@\S+\.\S+$/.test(f.value)); f.classList.toggle("is-bad", !ok); if (!ok && !bad) bad = f; });
    if (bad) { status.classList.add("err"); status.textContent = bad.type === "email" ? "That email doesn't look right. Check it and try again." : "Fill in your name, email and a message so I can get back to you."; bad.focus(); return; }
    if (form._gotcha.value) return; // bot

    const data = Object.fromEntries(new FormData(form));
    if (cc.formEndpoint) {
      const btn = $("button[type=submit]", form); btn.disabled = true;
      try {
        const r = await fetch(cc.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (!r.ok) throw 0;
        form.reset(); status.classList.add("ok"); status.textContent = "Message sent. I'll get back to you soon.";
      } catch {
        status.classList.add("err"); status.innerHTML = `That didn't send. Email me directly at <a href="mailto:${esc(cc.email)}">${esc(cc.email)}</a>.`;
      } finally { btn.disabled = false; }
    } else {
      const body = `${data.message}\n\n${data.name}\n${data.email}`;
      location.href = `mailto:${cc.email}?subject=${encodeURIComponent("[" + data.topic + "] from " + data.name)}&body=${encodeURIComponent(body)}`;
      status.classList.add("ok"); status.textContent = "Opening your email app to send it.";
    }
  });
})();
