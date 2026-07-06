/* ============================================================
   Pixel black cat on the contact page.
   Sits on a button, flicks its tail, blinks, then leaps to the
   next button in a smooth arc. Loops back to the first forever.
   ============================================================ */
(function () {
  const canvas = document.getElementById("catCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const C = { c: "#1E1F23", s: "#35363C", e: "#1E1F23", w: "#FFFFFF" };

  /* sitting, facing right (12w x 11h) */
  const SIT = [
    "......e...e.",
    "......ee.ee.",
    "......ccccc.",
    "......cwcwc.",
    "......ccccc.",
    ".....cccccc.",
    "....ccccccc.",
    ".s..ccccccc.",
    "..s.ccccccc.",
    "..ssccccccc.",
    ".....cc..cc.",
  ];
  /* jumping, stretched, facing right (16w x 7h) */
  const JUMP = [
    "...........e...e",
    "...........ee.ee",
    "...........ccccc",
    "...........cwcwc",
    "..sccccccccccccc",
    "..s.cccccccccc..",
    "....cc......cc..",
  ];
  const SIT_W = 12, SIT_H = 11, JUMP_W = 16, JUMP_H = 7;

  let PX = 3, W = 0, H = 0;
  let anchors = [];        // [{x, y}] top-center of each button
  let stage = null;

  const cat = {
    i: 0,                  // current button index
    x: 0, y: 0,            // top-left of sprite
    dir: 1,
    state: "sit",          // sit | jump | land
    t: 0,                  // state timer
    sitFor: 2,
    frame: 0, frameT: 0,   // tail flick
    blinkT: 2.5,
    from: null, to: null, jumpDur: 0.55,
  };

  function measure() {
    stage = canvas.parentElement;
    const btns = stage.querySelectorAll(".contact-links .btn");
    if (!btns.length) return false;
    const sr = stage.getBoundingClientRect();
    if (!sr.width) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = sr.width; H = sr.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    PX = W < 480 ? 3 : 3;   // keep the cat dainty everywhere
    anchors = [...btns].map((b) => {
      const r = b.getBoundingClientRect();
      return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top };
    });
    return true;
  }

  function sitPos(i) {
    const a = anchors[i];
    return { x: a.x - (SIT_W * PX) / 2, y: a.y - SIT_H * PX };
  }

  function startSit() {
    cat.state = "sit";
    cat.t = 0;
    cat.sitFor = 1.4 + Math.random() * 1.4;
    const p = sitPos(cat.i);
    cat.x = p.x; cat.y = p.y;
  }

  function startJump() {
    const next = (cat.i + 1) % anchors.length;
    cat.from = sitPos(cat.i);
    cat.to = sitPos(next);
    cat.dir = cat.to.x >= cat.from.x ? 1 : -1;
    const dist = Math.abs(cat.to.x - cat.from.x);
    cat.jumpDur = Math.min(0.75, 0.4 + dist / 900);
    cat.state = "jump";
    cat.t = 0;
    cat.i = next;
  }

  function update(dt) {
    cat.t += dt;
    cat.frameT += dt;
    cat.blinkT -= dt;
    if (cat.frameT > 0.42) { cat.frame ^= 1; cat.frameT = 0; }
    if (cat.blinkT < -0.13) cat.blinkT = 2 + Math.random() * 4;

    if (cat.state === "sit" && cat.t >= cat.sitFor) startJump();
    else if (cat.state === "jump") {
      const k = Math.min(cat.t / cat.jumpDur, 1);
      const arc = Math.max(46, Math.abs(cat.to.x - cat.from.x) * 0.22);
      cat.x = cat.from.x + (cat.to.x - cat.from.x) * k;
      cat.y = cat.from.y + (cat.to.y - cat.from.y) * k - arc * Math.sin(Math.PI * k);
      if (k >= 1) { cat.state = "land"; cat.t = 0; }
    } else if (cat.state === "land" && cat.t > 0.12) startSit();
  }

  function drawMap(map, cols, x, y, dir, squash) {
    for (let r = 0; r < map.length; r++) {
      const row = map[r];
      for (let c = 0; c < cols; c++) {
        const ch = row[c];
        if (!ch || ch === ".") continue;
        const col = dir === 1 ? c : cols - 1 - c;
        ctx.fillStyle = C[ch];
        ctx.fillRect(x + col * PX, y + r * PX + (squash && r < 2 ? PX * 0.6 : 0), PX, PX);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    if (cat.state === "jump") {
      // center jump sprite on the sit sprite's footprint
      const jx = cat.x - ((JUMP_W - SIT_W) * PX) / 2;
      const jy = cat.y + (SIT_H - JUMP_H) * PX;
      drawMap(JUMP, JUMP_W, jx, jy, cat.dir, false);
    } else {
      const squash = cat.state === "land";
      drawMap(SIT, SIT_W, cat.x, cat.y, cat.dir, squash);
      // tail flick: alternate tail tip pixel
      if (cat.frame && !squash) {
        ctx.fillStyle = C.s;
        const tipCol = cat.dir === 1 ? 1 : SIT_W - 2;
        ctx.fillRect(cat.x + tipCol * PX, cat.y + 6 * PX, PX, PX);
      }
      // blink: cover white eye pixels
      if (cat.blinkT < 0) {
        ctx.fillStyle = C.c;
        for (const ec of [7, 9]) {
          const col = cat.dir === 1 ? ec : SIT_W - 1 - ec;
          ctx.fillRect(cat.x + col * PX, cat.y + 3 * PX, PX, PX);
        }
      }
    }
  }

  let last = 0, running = false, ready = false;
  function loop(ts) {
    if (!running) return;
    const dt = Math.min((ts - last) / 1000, 0.05);
    last = ts;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  function init() {
    if (!measure()) return;
    if (!ready) {
      cat.i = 0;
      startSit();
      ready = true;
    } else {
      // re-anchor after resize
      if (cat.state !== "jump") startSit();
    }
    if (reduceMotion) {
      cat.i = 0; startSit(); draw(); running = false;
      return;
    }
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); }
  }

  window.catResize = init;
  window.addEventListener("resize", () => { if (ready) init(); });

  const io = new IntersectionObserver(([entry]) => {
    if (reduceMotion) return;
    const was = running;
    running = entry.isIntersecting && ready;
    if (running && !was) { last = performance.now(); requestAnimationFrame(loop); }
  });
  io.observe(canvas);

  // in case the contact panel is the landing view
  requestAnimationFrame(init);
})();
