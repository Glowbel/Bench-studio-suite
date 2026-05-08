# spatial-calendar-handoff.md
*Living document. Updated by every coding session before closing out.*
*Upload this alongside the permanent Build project docs to start any new thread.*

---

# ⟐ INSTRUCTIONS FOR THE CURRENT THREAD

You are reading this because you are starting or closing a session.

**At session START:** Read this document top to bottom before touching any code.
The decisions log records what was tried, what broke, and what must not be repeated.

**At session END:** Follow the full closing checklist below before delivering anything.
Use plain, direct language. Write to another developer, not to Jordan.

---

## CLOSING CHECKLIST — complete every item before ending the session

**1. Update CURRENT FILE**
New filename and approximate line count.

**2. Update COMPLETED THIS SESSION**
What was built or fixed, one line each. Be specific.
⚠ TRIMMING RULE: Keep this section to the last 2 sessions maximum — roughly 15-20 lines total.
If it's longer than that, trim the oldest entries. Older work is captured in the decisions log.
Do not carry completed work twice.

**3. Update WHAT REMAINS**
Remove anything resolved. Add anything newly discovered.

**4. Update NEXT SESSION**
What to tackle first and why. Any warnings or gotchas the next thread needs.

**5. Append to DECISIONS LOG**
Any new decisions made this session. Append only — never edit or delete existing entries.
Format: `[Month Year] Short description — reason. Outcome if relevant.`

**6. Flag maintenance needs for Jordan**
Before closing, explicitly tell Jordan if anything decided this session should be
reflected in the permanent project docs. Use this exact format at the end of your response:

> 📋 MAINTENANCE FLAGS
> - `master-build.md` needs: [what changed — phase status, file name, etc.]
> - `spatial-calendar-master.md` needs: [any new locked decisions, hard flags, or architecture changes]
> - No updates needed to permanent docs this session. ← use this if nothing changed

Jordan updates those docs manually. Your job is to flag clearly so nothing slips.

---

# CURRENT FILE

`spatial-day-v21.html`

---

# COMPLETED THIS SESSION

*(last 2 sessions only — trim older entries)*

**Phase 2 session (April 19):**
- Mode toggle (Map ↔ Clock) — segmented button, geometry shared across modes, persisted
- Clock-synced ring flow — each hour mark at real-time position, atomic-clock accurate
- Perspective and depth math — ring size scales linearly, smooth brightness curve
- Slot calibration system — replaces earlier node/magnetism system entirely
- Per-slot drag handles (amber), focus/shown states, long-press popup with delta + reset
- Double-tap to hide/show UI (300ms max, 40px max distance, 10px movement tolerance)
- Handles offset from dots by 85px with dashed connector line
- Long-press popups for A, B, NOW handles — bigger thumbs, row spacing
- Paste-image target for bg image (for Claude artifact viewer sandbox)
- NOW arc auto-derives size from ring math, drag handle scrubs arcT
- Rings always circular (ry = rx) — elliptical parameters removed
- Faint pipe floor line traces when any slot is visible (cyan A→NOW, amber NOW→B)

---

# WHAT REMAINS

**Phase 3 — Multi-tier ring layers (next session)**
Four tiers: hour (exists), 30-min, 15-min, 5-min marks.
Each tier: base thickness multiplier, base brightness multiplier, enable toggle, pulse rate.
Universal atmospheric depth curve layered on top of all tiers.
Master + per-tier brightness knobs in dev panel.
All tiers flow through slot interpolation — slots are the position authority.
Full spec in spatial-calendar-master.md.

**Phase 4 — NOW arc as seconds sweep**
Static arc replaced with light rotating once per 60 seconds.
Anchored to Date.now() — stays true to real seconds.
Arrival at top/bottom marks minute boundaries.

**Phase 5 — Schedule blocks at real time positions**
Dormant block system. Design session required before any code.
Visual treatment, curved card surface, pass-through animation, label legibility,
bridge to lead records in The Bench — none designed yet.

**Phase 6 — Preset save/load system**
Named presets for calibration state. Save/load/switch without losing work.
Prerequisite before public-facing presets in real UI.

**Phase 7 — Week/month view**
Outer cylinder concept. Separate design session required.

**Phase 8 — Bridge to The Bench**
How spatial calendar connects to lead records and Idea Space.
Dedicated integration session required.

---

# NEXT SESSION

**Start here:** Build Phase 3 — multi-tier ring layers.
Read the full Phase 3 spec in spatial-calendar-master.md before writing anything.
Key constraint: all tiers flow through the same slot interpolation as hour rings.
Slots are the calibration authority for position — tiers layer on for density only.

**Known technical gotchas (carry forward):**
- `pts` is undefined until first `resizeCanvases()`. All drawing functions guard with `if (!pts) return`.
- Slot handle DOM is dynamically created/removed per frame based on `slotVisible(i)`. Stale DOM swept on each `renderAll`.
- `document.getElementById` doesn't search detached trees — use `el.querySelector` when building popups before appending.
- `clockTimeToT` returns null for times outside the window. Callers filter these out.
- Changing `windowHours` resets all slot deltas — acceptable, presets system handles this later.

---

# DECISIONS LOG
*Append-only. One entry per decision. Never delete or edit existing entries.*
*Before touching anything significant, read this log first.*

---

[Apr 2026] Parser constraints inherited from The Bench suite.
No arrow functions, no template literals, no spread operators. ES5-compatible. v21 verified clean.

[Apr 2026] Tunnel orientation locked — slightly downhill.
Point B (present) higher on screen. Point A (vanishing) lower. Do not invert.

[Apr 2026] Rings always circular. ry = rx. No exceptions.
Elliptical roundness parameters removed. NOW arc also always circular.

[Apr 2026] Two modes locked: Map (calibration) and Clock (real-time viewer).
Geometry (A/B/C, arc, bg image) shared across modes. Mode persists across reloads.

[Apr 2026] Slot calibration is the position authority for all ring tiers.
Replaces earlier node/magnetism system entirely. That system fully removed.
Between adjacent slots, time moves at proportional real-time rate — "an hour is an hour."

[Apr 2026] Slot handle scrub rate: window.innerWidth × 1.2 — slower than NOW for precision.

[Apr 2026] Handles offset from dots by 85px with dashed connector.
Dots mark true geometric position. Handles live beside so finger doesn't obscure the point.

[Apr 2026] Double-tap to hide/show UI — 300ms max, 40px max distance, 10px movement tolerance per tap.

[Apr 2026] Depth brightness curve locked.
A→NOW: 0.55 baseline, smoothstep ramp to 1.0.
NOW→B: softer rolloff to 0.40. Physically consistent with tunnel photography.

[Apr 2026] Changing windowHours resets all slot deltas — acceptable by design.
Presets system (Phase 6) handles multi-configuration workflows.

[Apr 2026] Schedule blocks (Phase 5) — dormant until design session.
Visual treatment, rigidity on curve, pass-through animation, label legibility not designed.
Bridge to The Bench lead records not designed. Do not touch block system without session.

[Apr 2026] Part of The Bench suite. May also release as standalone.
Same dual-track distribution decision as Constellation.
