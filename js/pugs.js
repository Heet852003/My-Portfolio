/* ============================================================
   Max & Happy — two pixel pugs living in the hero.
   Original pixel art drawn from pixel maps, canvas-rendered.
   Behaviors: wander, run, chase, jump, sniff, sit, bark "wow".
   ============================================================ */
(function () {
  const canvas = document.getElementById("pugCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- palettes: Max = fawn, Happy = black ---------- */
  const PAL = {
    max: {   /* white pug, blue collar */
      c: "#FFFFFF", s: "#D8D1C1", m: "#4A3B33", e: "#4A403C", b: "#F3EFE4",
      y: "#1A1D24", n: "#241D18", t: "#E58A8A", k: "#4468A8", g: "#E4A24C",
    },
    happy: { /* fawn pug, amber collar */
      c: "#D9B380", s: "#C09A63", m: "#4A3B33", e: "#4A403C", b: "#EBD3A8",
      y: "#1A1D24", n: "#241D18", t: "#E58A8A", k: "#E4A24C", g: "#4468A8",
    },
  };

  /* ---------- sprite: 18w x 10h body (legs drawn per-frame) ----------
     facing RIGHT. legend: c coat s shade m mask e ear b belly
     y eye n nose t tongue k collar g tag                              */
  const BODY = [
    "..........ee...ee.",
    "...ss....eecccee..",
    "..s..s...ccccccc..",
    "..s.ss...cyccycc..",
    "...ss....ccmmmmn..",
    "...ccccccccmmmm...",
    "...ccccccccmtm....",
    "..cccccccckcc.....",
    "..ccccccccgcc.....",
    "..ccbbbbbbccc.....",
  ];
  const COLS = 18, BODY_ROWS = 10;
  // leg anchor columns (facing right): back = 3, front = 10
  const LEGS = { back: 3, front: 10 };

  let PX = 4;
  let SPRITE_W = COLS * PX;
  let SPRITE_H = 12 * PX; // body + legs

  /* ---------- entities ---------- */
  function makePug(name, palKey, x) {
    return {
      name, pal: PAL[palKey],
      x, y: 0, vx: 0, vy: 0, dir: 1,
      state: "idle", stateT: 0,
      frame: 0, frameT: 0,
      bubbleT: 0, blinkT: rand(2, 5),
    };
  }
  const pugs = [makePug("max", "max", 40), makePug("happy", "happy", 200)];

  /* ---------- sizing ---------- */
  let W = 0, H = 0, groundY = 0;
  function resize() {
    const cw = canvas.clientWidth, chh = canvas.clientHeight;
    if (!cw || !chh) return;               // panel hidden; retry when shown
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cw; H = chh;
    PX = W < 480 ? 3 : 4;                  // smaller logical pixels on phones
    SPRITE_W = COLS * PX;
    SPRITE_H = 12 * PX;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    groundY = H - (W < 480 ? 20 : 24);
    pugs.forEach(p => { p.x = clamp(p.x, 8, W - SPRITE_W - 8); });
  }
  window.addEventListener("resize", resize);
  window.pugResize = resize;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

  /* ---------- behavior ---------- */
  function nextState(p, other) {
    const roll = Math.random();
    if (roll < 0.15) return "sit";
    if (roll < 0.32) return "sniff";
    if (roll < 0.42) return "jump";
    if (roll < 0.55) return "run";
    if (roll < 0.67 && Math.abs(other.x - p.x) > 140) return "chase";
    if (roll < 0.84) return "walk";
    return "idle";
  }

  function enterState(p, s, other) {
    p.state = s;
    switch (s) {
      case "walk":
        p.stateT = rand(1.6, 3.4);
        p.dir = p.x < 50 ? 1 : p.x > W - SPRITE_W - 50 ? -1 : pick([-1, 1]);
        p.vx = 34 * p.dir;
        break;
      case "run":
        p.stateT = rand(1.0, 2.2);
        p.dir = p.x < 70 ? 1 : p.x > W - SPRITE_W - 70 ? -1 : pick([-1, 1]);
        p.vx = (W < 480 ? 80 : 105) * p.dir;
        break;
      case "chase":
        p.stateT = rand(1.4, 2.6);
        p.dir = other.x > p.x ? 1 : -1;
        p.vx = (W < 480 ? 92 : 122) * p.dir;
        if (other.state !== "jump" && Math.random() < 0.8) {
          other.state = "run";
          other.stateT = p.stateT;
          other.dir = p.dir;
          other.vx = (W < 480 ? 85 : 112) * other.dir;
        }
        break;
      case "jump":
        p.stateT = 0.9;
        p.vy = -155;
        if (Math.random() < 0.5) p.bubbleT = 1.2;
        break;
      case "sniff": p.stateT = rand(1.4, 2.6); p.vx = 0; break;
      case "sit":
        p.stateT = rand(2.0, 4.5); p.vx = 0;
        if (Math.random() < 0.3) p.bubbleT = 1.4;
        break;
      default: p.stateT = rand(0.8, 2.0); p.vx = 0;
    }
  }

  function update(p, other, dt) {
    p.stateT -= dt; p.frameT += dt; p.blinkT -= dt;
    if (p.bubbleT > 0) p.bubbleT -= dt;
    if (p.blinkT <= -0.14) p.blinkT = rand(2.5, 6);

    const gait = p.state === "run" || p.state === "chase" ? 0.09 : 0.18;
    if (p.frameT > gait) { p.frame ^= 1; p.frameT = 0; }

    if (p.state === "jump" || p.y < 0) {
      p.vy += 620 * dt;
      p.y += p.vy * dt;
      if (p.y >= 0) { p.y = 0; p.vy = 0; }
    }
    p.x += p.vx * dt;

    if (p.x < 8) { p.x = 8; p.dir = 1; p.vx = Math.abs(p.vx); }
    if (p.x > W - SPRITE_W - 8) { p.x = W - SPRITE_W - 8; p.dir = -1; p.vx = -Math.abs(p.vx); }

    if (p.state === "chase" && Math.abs(other.x - p.x) < 46) {
      p.stateT = 0; p.bubbleT = 1.2;
    }
    if (p.stateT <= 0 && p.y === 0) enterState(p, nextState(p, other), other);
  }

  /* ---------- drawing ---------- */
  function drawMap(map, px0, py0, dir, pal) {
    for (let r = 0; r < map.length; r++) {
      const row = map[r];
      for (let c = 0; c < COLS; c++) {
        const ch = row[c];
        if (!ch || ch === ".") continue;
        const col = dir === 1 ? c : COLS - 1 - c;
        ctx.fillStyle = pal[ch];
        ctx.fillRect(px0 + col * PX, py0 + r * PX, PX, PX);
      }
    }
  }

  function legX(anchor, dir) {
    return dir === 1 ? anchor : COLS - 2 - anchor; // 2px-wide leg mirrored
  }

  function drawLegs(p, baseY, bob) {
    const y = baseY + BODY_ROWS * PX + bob;
    let backLift = 0, frontLift = 0;
    if (p.y < 0) { backLift = 1; frontLift = 0; }             // tucked mid-air
    else if (p.state === "run" || p.state === "chase") {
      backLift = p.frame ? 1 : 0; frontLift = p.frame ? 0 : 1;
    } else if (p.state === "walk") {
      backLift = p.frame ? 1 : 0; frontLift = p.frame ? 0 : 1;
    }
    for (const [anchor, lift] of [[LEGS.back, backLift], [LEGS.front, frontLift]]) {
      const cx = legX(anchor, p.dir);
      const h = lift ? 1 : 2;
      ctx.fillStyle = p.pal.c;
      ctx.fillRect(p.x + cx * PX, y, PX * 2, PX * h);
      if (!lift) {
        ctx.fillStyle = p.pal.s;
        ctx.fillRect(p.x + cx * PX, y + PX, PX * 2, PX);
      }
    }
  }

  function drawPug(p, t) {
    const baseY = groundY - SPRITE_H + p.y;
    const moving = p.state === "walk" || p.state === "run" || p.state === "chase";
    const bob = moving && p.frame ? -PX * 0.5 : 0;

    // shadow
    ctx.fillStyle = "rgba(38,37,31,0.10)";
    ctx.beginPath();
    ctx.ellipse(p.x + SPRITE_W / 2, groundY + 6,
      (SPRITE_W * (p.y < 0 ? 0.62 : 0.85)) / 2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    if (p.state === "sit") {
      // haunches down: shift body down 1px at the back via a simple skew fake —
      // draw body one row lower, then front legs straight
      drawMap(BODY, p.x, baseY + PX + bob, p.dir, p.pal);
      const fx = legX(LEGS.front, p.dir);
      ctx.fillStyle = p.pal.c;
      ctx.fillRect(p.x + fx * PX, baseY + (BODY_ROWS + 1) * PX + bob, PX * 2, PX);
      ctx.fillStyle = p.pal.s;
      ctx.fillRect(p.x + fx * PX, baseY + (BODY_ROWS + 1) * PX + bob + PX * 0.0 + PX, PX * 2, 0);
    } else {
      const tilt = p.state === "sniff" && p.frame ? PX : 0;
      drawMap(BODY, p.x, baseY + bob + tilt, p.dir, p.pal);
      drawLegs(p, baseY + tilt, bob);
    }

    // tail wag: extra shade pixel flicking above the curl
    if (p.state !== "sit" && p.frame) {
      const tx = p.dir === 1 ? 4 : COLS - 5;
      ctx.fillStyle = p.pal.s;
      ctx.fillRect(p.x + tx * PX, baseY + bob, PX, PX);
    }

    // blink: cover eyes (row 3; cols 10 & 13) with coat color
    if (p.blinkT < 0 && p.state !== "sniff") {
      ctx.fillStyle = p.pal.c;
      for (const ec of [10, 13]) {
        const col = p.dir === 1 ? ec : COLS - 1 - ec;
        ctx.fillRect(p.x + col * PX, baseY + 3 * PX + bob, PX, PX);
      }
    }

    // name label
    ctx.font = (PX >= 4 ? "10px" : "9px") + " 'IBM Plex Mono', monospace";
    ctx.fillStyle = "rgba(107,103,92,0.65)";
    ctx.textAlign = "center";
    ctx.fillText(p.name, p.x + SPRITE_W / 2, groundY + 18);

    // wow bubble
    if (p.bubbleT > 0) {
      const bx = p.x + SPRITE_W / 2;
      const by = baseY - 12 + Math.sin(t * 6) * 1.5;
      ctx.font = "600 11px 'IBM Plex Mono', monospace";
      const pad = 6, tw = ctx.measureText("wow").width;
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#E3DCCB";
      ctx.lineWidth = 1;
      roundRect(bx - tw / 2 - pad, by - 14, tw + pad * 2, 18, 5);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#3F5E9E";
      ctx.fillText("wow", bx, by - 1);
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawGround() {
    ctx.fillStyle = "#E3DCCB";
    const step = W < 480 ? 64 : 90;
    for (let i = 30; i < W; i += step) {
      ctx.fillRect(i, groundY + 4, 3, 3);
      ctx.fillRect(i + 5, groundY + 2, 3, 5);
      ctx.fillRect(i + 10, groundY + 4, 3, 3);
    }
    // amber ball prop
    const bx = Math.round(W * 0.62);
    ctx.fillStyle = "#E4A24C";
    ctx.fillRect(bx, groundY - 5, 6, 6);
    ctx.fillStyle = "#C98A38";
    ctx.fillRect(bx + 3, groundY - 2, 3, 3);
  }

  /* ---------- loop ---------- */
  let last = 0, running = true;
  function loop(ts) {
    if (!running) return;
    const t = ts / 1000;
    const dt = Math.min((ts - last) / 1000, 0.05);
    last = ts;
    ctx.clearRect(0, 0, W, H);
    drawGround();
    update(pugs[0], pugs[1], dt);
    update(pugs[1], pugs[0], dt);
    const order = pugs[0].x < pugs[1].x ? pugs : [pugs[1], pugs[0]];
    drawPug(order[0], t);
    drawPug(order[1], t);
    requestAnimationFrame(loop);
  }

  const io = new IntersectionObserver(([entry]) => {
    const was = running;
    running = entry.isIntersecting && !reduceMotion;
    if (running && !was) { last = performance.now(); requestAnimationFrame(loop); }
  });
  io.observe(canvas);

  resize();

  if (reduceMotion) {
    pugs[0].state = "sit"; pugs[1].state = "sit";
    pugs[1].bubbleT = 1;
    drawGround();
    drawPug(pugs[0], 0);
    drawPug(pugs[1], 0);
    running = false;
  } else {
    enterState(pugs[0], "walk", pugs[1]);
    enterState(pugs[1], "sniff", pugs[0]);
    requestAnimationFrame(loop);
  }
})();
