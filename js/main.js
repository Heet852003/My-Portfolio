/* Panel routing (tab style nav), reveals, header state, mobile menu */
(function () {
  const panels = document.querySelectorAll(".panel");
  const navAnchors = document.querySelectorAll("[data-nav]");
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  const valid = new Set([...panels].map((p) => p.dataset.panel));

  function runReveals(panel) {
    const items = panel.querySelectorAll(".reveal");
    items.forEach((el) => el.classList.remove("in"));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        items.forEach((el, i) => {
          el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
          el.classList.add("in");
        });
      });
    });
  }

  function show(name, push) {
    if (!valid.has(name)) name = "home";
    panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === name));
    navAnchors.forEach((a) => a.classList.toggle("active", a.dataset.nav === name));
    const active = document.querySelector(`.panel[data-panel="${name}"]`);
    runReveals(active);
    window.scrollTo({ top: 0, behavior: "auto" });
    if (push && location.hash !== `#${name}`) history.pushState(null, "", `#${name}`);
    // let canvases size themselves once their panel is visible
    if (name === "home" && window.pugResize) requestAnimationFrame(window.pugResize);
    if (name === "contact" && window.catResize) requestAnimationFrame(window.catResize);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-nav]");
    if (!a) return;
    e.preventDefault();
    show(a.dataset.nav, true);
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });

  window.addEventListener("popstate", () => show(location.hash.slice(1) || "home", false));

  /* header border on scroll */
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  /* initial route */
  show(location.hash.slice(1) || "home", false);
})();
