# CONSTELLATION — VISUAL SYSTEMS + BAKE LOGIC AUDIT
*Spec file (transitional). Produced 2026-06-10. Distill → CLAUDE.md + delete when fixes ship.*
*Scope: STAR-BAKE, LOAD-GATE, ZOOM, STAR-RENDERER, ANIMATION-LOOP, PHYSICS, AMBIENT-STARS.*
*Trigger: iPad-only laggy loading + zoom glitch.*

---

## VERDICT — WHAT'S SOUND

The bake architecture is right. Keep all of it:

```
[bake.keep] ✓
serialized queue (concurrency 1) | visible-first (_bakeQ) → warm-last (_bakeQLow)
fingerprint-gated renders | blob-url PNG (never base64) | live fallback + _texWaiters
dedup via STAR_TEX_PENDING | cache key movement|palette|layer|size
load-gate concept (freeze field, warm combos, reveal on drain)
```

The iPad problem is **scheduling + WebKit compositing**, not the bake design.

---

## THE iPAD GLITCH — THREE STACKED CAUSES (ranked)

### 1. Load gate starves itself → 8s cap hit → opens half-baked

```
[cause]
gate enqueues bakes → queue waits for requestIdleCallback (timeout 1000ms/bake)
BUT loop() (line ~5357) keeps rAF'ing drawTethers() every frame while frozen
  → idle slots scarce → worst case ~1 bake/second
iPad: 1024px feTurbulence raster genuinely slower than desktop
combo cost: 4 layers × 2 sizes + corona = 8-10 bakes/combo
  → a few combos + idle-wait ≈ blows the 8000ms cap
result: gate reveals with _bakeQLow still loaded → field stars render LIVE
  feTurbulence (laggy loading) → first zoom = live 1024px turbulence during
  camera move, pops to baked when ready (the visible glitch)
why iPad-only: desktop drains well under cap | iPad Safari also evicts tabs
  aggressively → cold reload → re-pick session → hits this path far more often

[fix — gate fast-drain]
while load gate active: bypass rIC — chain bakes back-to-back (toBlob is
  already async; setTimeout 0 between jobs keeps UI alive for the loader orb)
AND: loop() early-returns BEFORE drawTethers when state.fieldFrozen
expected: iPad gate ~1-3s real completion instead of 8s cap w/ leftovers
note: requestIdleCallback exists only iPadOS 18+ — older iPads use the
  setTimeout(16) fallback (ironically more aggressive). test on both.
```

### 2. Zoom star animations repaint on WebKit instead of compositing

```
[cause]
#zoom-zone3 star deliberately NOT in the pause scope ("keeps living inside")
gas rotation/breathe animate <g class="gas-anim"> INSIDE the SVG (CSS
  rotate:/scale: on SVG inner elements, line ~3848+)
WebKit does not composite transforms on SVG inner elements (Blink does)
  → every frame = main-thread repaint of up to 1024px × 4 blend-mode-screen
  layers + corona ring — exactly while the zoomStage camera scale runs
why iPad-only: Chrome/Android composites these → free | WebKit repaints

[fix — two stages]
quick stage (SHIPPED 2026-06-10): zone3 .bubble-star anims pause under
  body.zoom-animating — class set when either camera move starts (openZoom
  main path, closeZoom), removed on settle (+ clearField safety). reduced-
  motion open path skips the class (media query already pauses everything).
  if iPad zoom is now smooth → diagnosis confirmed; HTML restructure below
  becomes optional polish (star motion during the fly itself stays paused).
real fix (NOT YET — do only if lag persists while zoomed/reading inside):
  restructure baked layers as stacked HTML <img> elements
  (wrapper div: clip-path circle | img: mix-blend-mode screen + CSS anim)
  HTML transforms ARE composited on WebKit → identical look, GPU-cheap
  applies to field stars too (384px × N bubbles repainting on iPad)

[secondary suspect — only if lag persists after both]
zoomZone1 backdrop-filter blur(7px) fades in at 76% of camera move —
  backdrop blur during ancestor transform is expensive on iOS
  → defer applying backdrop-filter until camera settles
```

### 3. Texture memory has no ceiling — iPad squeezed first

```
[cause]
1024px layer ≈ 4.2MB decoded × 4/combo ≈ 17MB + corona | no eviction (known watch)
many distinct movement|palette combos → 100MB+ decoded textures
iPad Safari memory pressure → drops/redecodes compositor layers → stutter/flash

[fix]
LRU eviction: cap distinct 1024 combos (~6-8), revokeObjectURL on evict,
  evicted combo re-bakes on next zoom (live fallback already handles the gap)
optional: device-aware zoom texture size — 768px on iPad ≈ visually identical
  at typical atmosphere diameters, ~44% less memory
```

---

## FIELD SMOOTHNESS — ALL PLATFORMS

### 4. Bubble motion via style.left/top = layout every frame (biggest single win)

```
[cause]
physics tick writes b.el.style.left/top per bubble per frame (~5393-5471)
  + mutualRingEl + orbitalPathEl — left/top changes force LAYOUT each frame
.bubble has static transform: translate(-50%,-50%) (line 506)

[fix]
left/top set once (0) | per-frame: transform =
  'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)'
→ motion rides the compositor, layout cost gone | hits iPad hardest
caveat: mechanical but touches every left/top write site (physics ×3,
  spawn, drag, summon, induced sweep) — positions live in state (b.x/b.y),
  nothing reads back from style, so the switch is safe
compass/overlays keep left/top (set once per open, not per frame) — fine
```

### 5. Tether canvas redraws every frame unconditionally

```
loop() → drawTethers() clears + redraws full-screen canvas even when
  fieldFrozen, zoom open, or zero links
fix: skip when fieldFrozen | skip when !state.links.length
  (during zoom, physics still moves bubbles → tethers must keep drawing)
```

---

## SMALL PARITY + POLISH

```
zip-import gap: import path (deserializeSession at ~10294) never runs
  runLoadGate() — imported project opens unbaked | loadSession does (10481)
  → one-line parity fix
starfield: 220-550 .star-dot infinite opacity anims (some blurred) keep
  twinkling during zoom/drag — usually composited, low priority | if hunting
  last frames on iPad, add .starfield to the pause scopes
scheduleZoomWarm: rIC timeout 1500 + queue rIC 1000 → on iPad a NEW combo's
  1024 warm can take seconds to even start while field animates — acceptable
  by design (never compete with animation), but note it means first zoom of a
  brand-new combo on iPad will likely show the live→baked pop until fix #1's
  fast-drain idea is optionally extended to a "zoom imminent" hint
```

---

## RECOMMENDED ORDER

```
1. gate fast-drain + freeze-aware loop()        → fixes iPad laggy loading
2. zone3 pause-during-camera test → confirm     → then HTML <img> layer
   restructure (zoom star first, field stars after)  → fixes iPad zoom
3. left/top → transform3d bubble motion         → field smoothness everywhere
4. LRU texture eviction (+768px iPad textures)  → long-session stability
5. tether gating | zip-import gate | backdrop-filter timing → polish
```

Each step is independently shippable and testable by feel. 1+2 are the iPad bug;
3 is the biggest universal smoothness win; 4 prevents the next iPad bug.
