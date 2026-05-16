> **Parser constraints always active:** No `=>` | no backticks | no `...` | no base64 images | no frameworks | single HTML file | flash-free | state in one object. Full spec: `main` branch `CLAUDE.md → HARD RULES`.

# SPATIAL CALENDAR
*Single living doc. Read at start of every Spatial session.*
*Last updated: May 2026*

---

## WHY THIS APP EXISTS

Time is a tunnel you're moving through, not a grid you're reading. The pipe is your day — vanishing behind you, opening ahead. NOW is where you stand. You feel proximity to events by their size and brightness, not by counting cells.

Spatial is the face of a calendar app — viewer and scheduler in one. It redefines how we feel about events in time moving toward us. Not a perceptual gimmick layered on top of a traditional calendar, but the calendar itself, reimagined around proximity rather than grids.

---

## THE ARC

**Center of gravity:** Phase 5 — events traveling the pipe. This is where Spatial stops being a beautiful abstraction and becomes a viewer with real content. Everything downstream (Bench bridge, PWA, native calendar read) waits on Phase 5 landing.

**Drift watch:**
- It IS a calendar app — but built around proximity, not grids. If features start looking like traditional calendar UI (week views, grid layouts, cell-counting), name the drift.
- Don't add features the time-tunnel metaphor doesn't justify.
- Don't bridge to Bench or external sources before events have a visual shape on the pipe.
- Don't mix layers — canvas/SVG/DOM each own their role. Crossing roles erodes the architecture.

---

## CURRENT STATE
```
file: spatial-day-v24.html
lines: ~2,765
state: working, stable, no mid-build
phase: 4 shipped | 5 active (events on pipe — design session pending)
```

---

## RECENT
*Thin papertrail. Newest first. Older drops off.*

```
[recent.format]
[date] verb | short-what — short-how | touches: zone1, zone2
verbs: fix | feat | ref | data | rm
zones: ARCHITECTURE block names ([pipe], [rings], [now-arc], [time-display])
length: <= 100 chars per line | cap: 10-12 visible

[recent.upgrade-triggers]
data verb → check ARCHITECTURE.data-model | update if shape changed
feat locks pattern → also update ARCHITECTURE
rm → check INTEGRATION FLAGS, TRIGGERS for stale refs
3rd fix same zone → consider SCARS approaching
phase milestone → MASTER RECORD entry
```

```
[recent.entries]
(empty — populate as fixes/features ship)
```

---

## ARCHITECTURE

```
[file-shape]
single HTML file | ES5 only | no dependencies | no build step
parser-constraints: locked (see main branch CLAUDE.md)

[pipe]
core spatial metaphor: bezier curve
  A = past / vanishing point
  C = control point (the curve's bend)
  B = future / present-side endpoint
direction-of-travel: A <- C <- B (time flows toward the viewer)
universal currency: t in [0,1] along bezier
  every position on screen → t value
  every event → t value
  every ring → t value
  conversion: position <-> t is the only math that matters

[clock]
source: Date.now()
slot-positions: deltas from now
  slot.t = f(slot.timestamp - Date.now())
  recomputed on each tick
no fixed time grid — positions are always relative to NOW

[rings]
multi-tier (Phase 3 shipped):
  hour rings | day rings | etc. (existing implementation)
purpose: spatial reference, not data
render: canvas

[now-arc]
the viewer's standpoint marker
render: SVG (precision needed for arc geometry)

[time-display + pulse]
Phase 4 shipped
purpose: ambient awareness of current time without breaking the spatial metaphor

[layer-ownership] (locked — never cross)
canvas: rings, atmosphere, anything that paints the tunnel
SVG: NOW arc, anything needing precise geometry
DOM: handles for drag interaction, anything user-grabbable
crossing layers = architectural drift | refuse without dedicated session

[interaction]
drag: pulls bezier control point | reshapes the day's curve
touch: same as drag (mobile-first feel)
```

---

## PHASE 5 — EVENTS ON THE PIPE (active, design pending)

*This phase has not yet had its design session. Section will be populated when design lands.*
*When phase ships: locked patterns → ARCHITECTURE | substantial moments → MASTER RECORD | delete the rich middle.*

```
[5.scope]
goal: events become visible objects traveling the pipe
status: design-session-required before any code

[5.open-questions]
visual shape: how does an event render on the pipe? (size, color, glow, label behavior)
data contract: what's the minimum event shape Spatial needs to display + edit?
density: how many events before the pipe gets visually crowded?
proximity-feel: how does "soonness" translate to visual prominence beyond t value?
overlap: what happens when two events share a t window?
crossing NOW: what does it look like when an event passes from future → past?
event-creation: how does scheduling a new event work from the pipe? (gesture? long-press? input bar?)
event-edit: tap an event → modify time/duration/details — what's the interaction shape?
drag-to-reschedule: can events be dragged along the pipe to change their time?
duration: how is event length represented? (longer pipe segment? thicker glow? both?)

[5.dependencies]
all downstream bridges (bench, pwa, native-cal) wait on this phase
data contract decided here = data contract for bench bridge later
```

---

## TRIGGERS

```
bezier math / t-value conversion → universal currency, everything depends on it
clock / Date.now() recompute → tick performance matters | watch for jank
canvas vs SVG vs DOM choice → layer-ownership rule, never cross
event rendering work → Phase 5 design session must happen first
PWA / install prompt code → home-screen install bridge, not active yet
external calendar API code → native-cal bridge, not active yet
```

---

## SCARS

### Past — do not repeat

*(none yet — this section grows as the app matures)*

### Approaching — warn on approach

```
phase-5-without-design: if work touches event rendering before design session, surface this
  data contract decisions cascade into bench bridge
layer-crossing: if work attempts canvas drawing of UI handles, or DOM rendering of arcs,
  name the layer-ownership rule
clock-recompute-perf: if t-value recomputation moves out of tick boundary, watch for jank
  Date.now() calls should stay cheap and predictable
metaphor-drift: if features start treating the pipe as a grid (counting, snapping, cell-listing,
  week-views, traditional cal UI), name it as drift from the time-tunnel thesis
```

---

## INTEGRATION FLAGS

*Each is its own bridge. Different data sources, different trust models, different sequencing.*

```
[bench → spatial] PRIMARY FEED
status: !designed | waits on Phase 5 (events visual + data contract)
trust: highest | jordan's own records, richest data
direction: bench events → spatial display
contract: TBD in phase 5 design

[pwa install] ACCESS BRIDGE
status: !built | waits on bench bridge stable
type: not a data bridge — an access bridge
purpose: home-screen install, ambient glanceability without browser
priority: medium — depends on bench feed working first

[native-cal <-> spatial] EXTERNAL READ + WRITE
status: !designed | waits on bench bridge + pwa stable
trust: mixed | external commitments jordan didn't create + ones he creates here
direction: bidirectional | ios/google cal <-> spatial
needs: de-duplication layer (same event from bench + native = collapse)
  write-back rules (events created in spatial → which native cal?)
priority: last — most architectural complexity, least core to the thesis
```

**Right sequencing:** bench → pwa install → native cal last. None touch until Phase 5 ships.

---

## MASTER RECORD
*Immortalized history. One entry per shipped phase.*

```
phases 1-3 [shipped pre-may-2026]:
  built: pipe foundation | bezier core | t-value currency | multi-tier rings
  locked: bezier as universal coordinate system | t∈[0,1] as position currency |
    Date.now() as clock source | layer-ownership (canvas/SVG/DOM)

phase 4 [shipped may-2026]:
  built: time display + pulse
  locked: ambient time awareness without breaking spatial metaphor

phase 5 [active]: see PHASE 5 section above
  on-ship: distill locked patterns → ARCHITECTURE | substantial moments → here
```

---

## FETCH IF NEEDED

- **`vision.md`** (main branch root) — when a decision touches the heart-vs-craft tension or when the time-perception thesis itself is under question
- **Hard rules** — see main branch `CLAUDE.md → HARD RULES`
- **`bench/CLAUDE.md`** — when Phase 5 design or bench bridge work begins, fetch Bench's events[] data shape and integration flags section
- **Session close** — delete the auto-created session branch: `git push origin --delete [your claude/* branch name]` (branch name is in your session instructions)
