# SPATIAL CALENDAR — Blueprint (Lean)
*Architecture, data model, locked decisions, hard flags.*
*Load alongside hard-rules.md and spatial-calendar-handoff.md for any Spatial Calendar session.*
*Last updated: May 2026*

---

## WHAT IT IS

A spatial time interface. Instead of a flat calendar grid, the user moves through time.
Schedule blocks travel down a 3D tunnel toward a NOW threshold and are consumed as they cross it.

**The metaphor:** You are standing inside a pipe looking downhill.
Time comes at you. The NOW arc is the threshold into the present.

Part of The Bench suite. May also release as a standalone — same dual-track
distribution decision as Constellation.

**Current file:** `spatial-day-v21.html`
**Parser constraints:** Same as all suite apps — no arrow functions, template literals, spread operators. v21 verified clean.

---

## TWO MODES

**Map Mode — calibration/editor**
Full kit exposed. Tune pipe geometry to match a background image.
A, B, C handles + NOW arc handle all draggable. Abstract animated ring flow.
Full dev panel. State dump for exporting calibration. No time anchoring.

**Clock Mode — real-time viewer**
Handles, dots, connectors, bezier beam, readout all hidden.
Ring positions anchored to `Date.now()` at real clock rate.
Hour rings march A → B as time passes.
Window defaults to 8 hours: 80% future ahead of NOW, 20% past behind.
Only `time` and `slot positions` sections visible in dev panel.
Mode persists across reloads.

---

## DATA MODEL

```javascript
// Geometry + animation params (map mode)
var DP = {
  aSize:  0.040,    // vanishing-end ring radius as fraction of VW
  bSize:  0.550,    // present-end ring radius as fraction of VW
  speed:  0.004,    // map-mode phase increment per frame
  count:  14,       // map-mode ring count
  alpha:  0.45,     // peak opacity
  arcT:     0.82,   // position along A→B bezier (0=vanish, 1=present)
  arcRX:    0.75,   // scale multiplier on auto-sized arc radius
  arcSpan:  0.50    // fraction of ellipse drawn (0.5 = bottom half)
};

// Clock-mode config
var TC = {
  windowHours: 8,
  slots: {
    count: 8,         // auto-derived from windowHours
    deltas: [],       // per-slot t-offset from linear default
    focus: -1,        // currently-focused slot index (-1 = none)
    shown: []         // per-slot manual-show toggles
  }
};
```

---

## PERSISTENCE

| localStorage key | Contents |
|-----------------|----------|
| `spatialday_prefs` | JSON: `{dp, tc, panelX/Y, minimized, secState, mode}` |
| `spatialday_bg_data` | Base64 image data (skipped if >3MB) |
| `spatialday_bg_name` | Filename string |
| `spatialday_bg_opacity` | Float 0–1 |

Slot deltas, focus, show states all roundtrip via `spatialday_prefs.tc.slots`.
Changing `windowHours` resets all slot deltas — acceptable, presets system (Phase 6) handles this.

---

## LAYER STACK (z-index order)

| z | Element | Role |
|---|---------|------|
| 0 | `#bg-tunnel` | Dark radial gradient base |
| 1 | `#bg-image` | User-loaded background image |
| 2 | `#bg-occlusion` | Vignette/darkening overlay |
| 3 | `#ghost-canvas` | Animated rings (canvas) |
| 4 | `#now-arc` | NOW arc SVG |
| 5 | `#blocks-layer` | Schedule block SVG (dormant) |
| 14 | `#beam-canvas` | Map-mode bezier beam |
| 49 | `#connectors` | Handle-to-dot dashed lines + pipe floor |
| 50 | `#ui-layer` | Draggable handles + dots |
| 110 | `.nav-arrow` | Clock-mode calibration nav arrows |
| 200 | `#dev-panel` | Dev control panel |

---

## DESIGN LANGUAGE

- **Point A** — vanishing end (small rings, far, bottom of screen)
- **Point B** — present end (large rings, close to viewer, higher on screen)
- **Point C** — bezier control point (bends the pipe axis)
- **NOW arc** — green, rides the bezier wire, threshold into the present
- **Slot handles** — amber, numbered, focused slot glows
- **Floating carpets** — schedule block metaphor (dormant until Phase 5)
- **Inner tunnel** — mathematically present, visually invisible
- **Wire** — the A→B bezier axis, conceptual spine of the pipe

---

## SLOT CALIBRATION SYSTEM

Pipe divided into N slots (one per hour by default, derived from `windowHours`).
Each slot draggable along the pipe to manually set its visual position.
Rings flowing at real-time rate pass through these positions, interpolating smoothly.
Between adjacent slots, time moves at proportional real-time rate — "an hour is an hour."

**Per-slot state:** `delta` (t-offset from linear default) + `shown` (manual visibility toggle)

**Math:** Linear interpolation between adjacent slot t-positions based on real-time position within each band.
Rings before slot 0 or after slot N blend linearly to pipe endpoints (t=0 / t=1).

**Slot handle scrub rate:** `window.innerWidth × 1.2` — slower than NOW for precision.

---

## DEPTH + ATMOSPHERE

- Ring size scales linearly with t from `aSize` to `bSize`
- Rings always circular (`ry = rx`) — elliptical parameters removed
- Smooth depth brightness: A→NOW: 0.55 baseline → smoothstep ramp to 1.0. NOW→B: rolloff to 0.40.
- Line thickness tied to depth: thin far, thick near.
- `pts` is undefined until first `resizeCanvases()`. All drawing functions guard with `if (!pts) return`.

---

## LOCKED DECISIONS

- **Tunnel orientation:** Slightly downhill. Point B (present) higher on screen, Point A (vanishing) lower.
- **Rings always circular.** Elliptical roundness parameters removed. `ry = rx`. No exceptions.
- **NOW arc always circular.** Arc roundness parameter removed. `ry = rx`.
- **Double-tap to hide/show UI** — 300ms max between taps, 40px max distance, 10px movement tolerance per tap.
- **Handles offset from dots by 85px** with subtle dashed connector — dots mark true geometric position.
- **Slot calibration is the authority for ring position.** Tiers (Phase 3) layer on for density.
- **`clockTimeToT` returns null for times outside window.** Callers filter these out.
- **Saved prefs from pre-slot builds ignored gracefully** — no migration needed, no crash on load.
- **Slot handle DOM dynamically created/removed per frame** based on `slotVisible(i)`. Stale DOM swept on each `renderAll`.

---

## BUILD PLAN

| Phase | Status | What |
|-------|--------|-------|
| 1 | ✅ Done | Canvas, pipe geometry, Map mode, animated ring flow |
| 2 | ✅ Done | Clock mode, real-time ring anchoring, slot calibration, double-tap UI hide, handle offsets, paste-image target |
| 3 | — | Multi-tier ring layers (30-min, 15-min, 5-min marks) |
| 4 | — | NOW arc as seconds sweep |
| 5 | — | Schedule blocks at real time positions — **design session required first** |
| 6 | — | Preset save/load system |
| 7 | — | Week/month view — **design session required first** |
| 8 | — | Bridge to The Bench — **dedicated integration session required** |

---

## PHASE 3 SPEC — Multi-Tier Ring Layers

Four tiers total. Each gets: base thickness multiplier, base brightness multiplier, enable toggle, pulse rate.

| Tier | Marks | Visibility |
|------|-------|-----------|
| Primary | Hour | Full pipe length — what exists now |
| Secondary | 30-min | Fades in around midpoint, thinner, gentle pulse |
| Tertiary | 15-min | Fades in at 2/3 point, thinner yet, subtler pulse |
| Quaternary | 5-min | Near-present stretch only, dense but quiet |

**Universal atmospheric depth curve** layered on top of all tiers — distant marks emerge from haze naturally.
**Master + per-tier brightness knobs:** `tierMaster × tierX × depthCurve × depthAtmosphere`
**All tiers flow through the same slot interpolation.** Slots are the calibration authority for position.
Nested pulse rhythm: hour pulses slower, 5-min pulses faster.

---

## HARD FLAGS — STOP AND ASK BEFORE BUILDING

- **Schedule blocks (Phase 5)** — dormant. Design session required before any block code. Visual treatment of curved card surface, rigidity on curve, pass-through animation, label legibility, bridge to lead records — none of this is designed yet.
- **Week/month view (Phase 7)** — separate design session. Outer cylinder concept only.
- **Bridge to The Bench (Phase 8)** — dedicated integration session. How spatial calendar connects to lead records and Idea Space not yet designed.
