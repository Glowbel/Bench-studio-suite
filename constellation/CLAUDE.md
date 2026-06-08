> **Parser constraints always active:** No `=>` | no backticks | no `...` | no base64 images | no frameworks | single HTML file | flash-free | state in one object. Full spec: root `CLAUDE.md → HARD RULES`.

# CONSTELLATION
*Single living doc. Read at start of every Constellation session.*
*Last updated: May 2026*

---

## WHY THIS APP EXISTS

A divergent thinking space. Ideas and theoretical resources get allocated into places, organized into hierarchies, expressed through specialized interfaces that match the shape of complex thought. The tool's architecture provides stability so the mind can roam freely without losing what it finds.

The deeper purpose: pushing divergent thought toward convergent space. Crystallization and export are the bridges — the moment a constellation of scattered ideas becomes a cohesive thought, and potentially a real action plan. This is where Constellation hands off to The Bench, the Wizard, or to action itself.

The infrastructure aims to support deep dives — extended creative sessions, design, idea generation, brainstorming, collaborative idea sharing, and the connecting of ideas and processes in ways that help us understand more.

Ideas are minerals. Interaction is pressure. Crystallization is commitment. The tool reads the difference between idle viewing and meaningful engagement, and lets weight accumulate accordingly.

*(Note: a stellar metaphor is also being explored — see OPEN QUESTIONS below.)*

---

## THE ARC

**Center of gravity:** Hardcore audit of core features. Phase 1 shipped. Phase 1.5/2 is about making sure the foundation can carry everything that comes next — geometry, persistence, mode transitions, export. Beta-testing readiness is the proximate target.

**Drift watch:**
- Don't let Constellation become an organizer. It's a divergent thinking space first.
- Don't add features the mineral metaphor doesn't justify.
- Don't visually embellish before the geometry, core functions, and friction-free interaction are locked.
- Don't wire integration to Bench before the file split is verified.
- Don't bypass the audit. Unusual bugs are signal, not noise.

---

## CURRENT STATE
```
file: index.html
lines: ~11,900
state: mid-build | stable but finding unusual bugs | hardcore audit underway
phase: 1 shipped | 1.5/2 active (bug fixes + core audit + phase-change rethink)
external-work: file split in progress (developer friend, testing in Claude artifacts)
proximate-target: early beta testing for functions and export
```

---

## RECENT
*Thin papertrail. Newest first. Older drops off.*

```
[recent.format]
[date] verb | short-what — short-how | touches: zone1, zone2
verbs: fix | feat | ref | data | rm
zones: ARCHITECTURE block names ([bubbles], [physics], [persistence], [modes], [export])
       post-split: file names (will update zone vocabulary after split lands)
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
[2026-06-08] ref  | autoSave coalesced — debounced 800ms (was full sync write per interaction); critical saves stay immediate, flush on hide/unload | touches: PERSISTENCE
[2026-06-08] ref  | loop rests when tab hidden + skips tether canvas when no links — battery/heat win; one-shot clear avoids ghost tether | touches: ANIMATION-LOOP, TETHER-LINES
[2026-06-08] feat | star texture memory cap — STAR_TEX evicts orphaned (off-bubble) combos over 128MB soft cap, revokes blob urls; on-screen combos never touched | touches: STAR-BAKE
[2026-06-08] ref  | getBubbleById → O(1) id index — lazy, count-guarded; was linear scan making physics tick O(n²) at scale | touches: PHYSICS, TETHER-LINES
[2026-06-08] feat | corona border baked — corona-fx rings rasterized once via generalized bake queue (job carries svg markup); no live feTurbulence left in stars | touches: STAR-BAKE, STAR-RENDERER
[2026-06-08] feat | resume warming gate — loadSession bakes all present combos (field 384 + atm 1024) behind a brief frozen-field loader, reveals on queue-drain or 8s cap; resumed project opens already baked | touches: STAR-BAKE, LOAD-GATE
[2026-06-08] fix  | bake flood on big projects — serialized bakes (1 at a time, idle-scheduled, visible-first/warm-last); was main-thread freeze + "loading movement" on maximize | touches: STAR-BAKE
[2026-06-08] fix  | maximize jump — pre-promote zoom star + page to GPU layers (will-change/backface), kills Android layer-creation snap on full-screen toggle | touches: ZOOM
[2026-06-08] feat | star gas-layers baked — feTurbulence rasterized once to blob-url <image>; cheap CSS transforms still animate; kills zoom lag (worst on iOS Safari) | touches: STAR-RENDERER, ZOOM, STAR-BAKE
[2026-06-08] feat | interior-size control — zoomFramedScale (0.6-1.5×) multiplies framed atm; star+page combo scales as one locked unit, live-calibrates while zoomed open (_relayoutZoomLive) | touches: ZOOM, SETTINGS-PANEL, PERSISTENCE
[2026-06-08] fix  | desktop maximize grows as one unit — uniform framed-page scale-up (was reshaping under 760×660 cap); mobile unchanged | touches: ZOOM
[2026-06-08] feat | starfield swap — CSS twinkle dots replace canvas drift field; +density slider 0.5-2.5× | touches: AMBIENT-STARS, SETTINGS-PANEL, PERSISTENCE
[2026-06-08] ref  | zoom interior settings pruned — baked 5 constants (anchor/atm-opacity/sharp/pullback/melt), +zoom-out-speed, removed dead vignette (invalid gradient %) | touches: ZOOM, SETTINGS-PANEL, PERSISTENCE
[2026-06-06] fix  | bg star lag — pause field gas-anims on drag/zoom/compass/dial + reduced-motion | touches: BUBBLES, STAR-SYSTEM, ZOOM
[2026-06-03] fix  | star dial center — scale 1.0→1.6; transform centering; mass tab parity | touches: COMPASS, VISUAL-SETTINGS-STATE
[2026-06-03] fix  | bubble-star body missing — renderBubbleStar moved after appendChild so getElementById finds el | touches: BUBBLES
[2026-06-03] fix  | swirl canvas bleed removed; paintCrystalSwirl on-demand; starDefaults moved to VISUAL-SETTINGS-STATE; dial 320→420px full-size preview | touches: BUBBLES, CRYSTAL-SWIRL, VISUAL-SETTINGS-STATE, STAR-DIAL
[2026-06-03] feat | gaseous-star system — SVG renderer replaces swirl canvas; 8 movements × 8 palettes × 5 edges | touches: BUBBLES, COMPASS, PERSISTENCE, VISUAL-SETTINGS-STATE
[2026-06-03] fix  | mass scale extended 0-3 → 0-10; bubbleRadius normalized; --bubble-mass-t CSS var added | touches: BUBBLE-DATA, BUBBLES
[2026-06-03] feat | per-bubble star dial (compass customize); global modal in visual settings; override confirm | touches: COMPASS, SETTINGS-PANEL
```

---

## ARCHITECTURE

```
[file-shape]
single HTML file | parser constraints locked (see root CLAUDE.md)
no frameworks | mobile-first | mouse + touch

[mineral-metaphor] (locked — the spine)
ideas: minerals — elemental, accumulating mass through meaningful interaction
interaction: pressure — only meaningful engagement adds weight, not passive viewing
crystallization: commitment — the moment idea becomes form, divergent → convergent
weight: tracked per bubble | drives visual prominence + tier behavior

[two-modes] (locked — relationship unchanged)
creative-mode: entropy | divergent | bubbles drift, accumulate, suggest connections
structure-mode: organization | convergent | hierarchies, parent-child, ordered relationships
mode-transition: explicit user action | state preserved across switches

[bubbles] (the core unit)
mass: increases through meaningful interaction only | not passive viewing
tiers: based on accumulated mass | drives orbit speed multiplier + visual prominence
free-bubbles vs moons: free bubbles physics-pass first, moons after (two-pass)
orbit-speed: global value with per-tier multipliers | NOT per-bubble setting
manual-completion-circle: required for crystallization | no auto-trigger
lookup: getBubbleById is O(1) via lazy id→bubble index (_bubbleIdx, count-guarded,
  invalidated on add/remove) — never reintroduce a linear scan in a hot path

[physics] (locked geometry rules)
two-pass: free bubbles processed first, then moons
global orbit speed | tier-based multipliers
no DOM rebuilds during physics tick | in-place updates only
flash-free principle is locked

[persistence] (three-layer)
localStorage: primary, fast, immediate writes
IndexedDB: binary assets (images, audio if/when added)
ZIP export/import: portable session, full state capture
expiry: temporary sessions have expiresAt stored | logic for checking it pending

[export + crystallization]
purpose: divergent → convergent | the bridge to action
manual completion circle triggers crystallization (no auto-trigger)
hardcore export modal at timer zero (pending implementation)
export shape carries enough state to rebuild or hand off

[interaction-principles] (locked)
friction-free: no UI gesture should fight against thought
geometry must feel inevitable | not a system being operated
visual prominence: weight, mass, tier — not arbitrary styling

[bubble-tools] (kept specific — design depth lives in constellation-bubble-tools.md)
core interface for bubble interaction

[star-system] (locked patterns — as of 2026-06-03)
per-bubble: starMovement / starPalette / starBorder (null = global default)
global defaults: visualSettings.starDefaults {movement, palette, border}
mass scale: 0-10 (starMassCap=10) → 0..1 via bubbleMassToStarMass()
phase thresholds: 3=Main Sequence, 6=Giant, 10=Supergiant
renderer: renderBubbleStar(b) — idempotent, fingerprint-gated SVG rebuild
baking (STAR-BAKE, locked Jun 2026): gas-layer feTurbulence rasterized ONCE to a
  PNG blob-url (createObjectURL + canvas.toBlob — NEVER base64), reused as <image>
  texture; cheap CSS transforms (rotation/breathe) animate the bitmap. cache key =
  movement|palette|layer|size (size: field 384, atm 1024). async + fingerprint-gated:
  un-baked layer renders the live <circle filter> + registers a _texWaiter that
  re-renders to baked when ready. _starBakeOK=false → permanent live fallback.
  bakes are SERIALIZED through a queue (concurrency 1, idle-scheduled): visible
  stars via _bakeQ (high), proactive warm via _bakeQLow (low). never parallel —
  a burst of 1024px feTurbulence rasters + PNG encodes froze big projects on
  maximize (Jun 2026). memory: 1024px combos are ~16MB (size²×4/layer). cache is
  now bounded (STAR_TEX_CAP, 128MB soft) — over cap, LRU-evicts textures whose
  movement|palette combo is NOT on any current bubble (orphaned styling combos),
  revoking their blob urls; on-screen combos are never evicted so nothing blanks.
  evicted keys re-bake on demand. _enforceTexCap runs on each bake completion.
compass 'customize' direction → openStarDial(b) — per-bubble dial
settings panel 'customize stars' row → openGlobalStarsModal() — field defaults
override confirm: 'unstyled' (default) | 'all' — only shown if any bubble customized
fetch: constellation-bubble-tools.md when working on bubble tool design
```

---

## OPEN QUESTIONS — METAPHOR DEEPENING (active exploration)

```
[metaphor-evolution]
status: brainstorm session pending | not locked yet | live exploration

current locked metaphor: ideas as minerals (density, accumulation, crystallization)
emerging thought: ideas as stars (mass, energy, gravitational relationship)

why stellar feels precise:
  mass / orbit / tier-multipliers / moons — already celestial language
  energy affecting relationship between bodies maps naturally onto how
  weighted bubbles influence each other
  scientifically grounded interaction model (gravity, orbital resonance, binary systems)

what might be lost:
  "crystallization" is the perfect word for commitment | hard to give up
  minerals are warm and earthy | stars are grand and cold | tonal shift real

possible synthesis:
  stars: how ideas RELATE (gravity, mass, orbit, energy)
  minerals: what ideas BECOME when they commit (cooled form, the artifact)
  both metaphors describing different phases of the same arc

next step: dedicated brainstorm session
```

---

## PHASE 1.5 / 2 — CORE AUDIT + PHASE-CHANGE RETHINK (active)

*This phase is hot. When it ships:*
*locked patterns → ARCHITECTURE | substantial moments → MASTER RECORD | delete the rich middle.*

```
[1.5.scope]
goal: rock-solid foundation | beta-ready functions + export
not-goal: new features | visual embellishment

[1.5.workstreams]
core-audit: hardcore review of geometry, physics, persistence, mode transitions
  unusual bugs are signal — find their roots, not just their symptoms
bug-fixes: 12, 13, 14 (tracked separately by Jordan) | fetch when ready to address
  others surfaced by audit get their own entries
phase-change-rethink: how do phases transition? | current model under review
  may shift how phase work gets framed in this doc going forward
export-readiness: export shape carries enough state | hardcore export modal at timer zero
session-expiry: expiresAt is stored but not checked | needs implementation

[1.5.proximate-target]
early beta testing for functions and export
proves the foundation can carry phase 2+ work
proves the file split is safe to integrate when developer finishes
```

---

## TRIGGERS

```
geometry / physics tick work → no DOM rebuilds | in-place only | flash-free locked
two-pass physics → free bubbles first, moons second | order matters
bubble mass logic → meaningful-interaction-only rule | passive viewing doesn't count
mode transition (creative ↔ struct) → state preservation across switch | both modes still locked
manual completion circle → required trigger for crystallization | no auto-trigger
export work → carries enough state to rebuild or hand off
persistence work → three-layer model (localStorage + IndexedDB + ZIP)
session expiry → expiresAt stored but not yet checked
bubble tools UI → fetch constellation-bubble-tools.md before deep work
visual embellishment → DEFERRED until geometry + core functions locked
file split → external work in progress | don't restructure file inline
```

---

## SCARS

### Past — do not repeat

*(none yet at the Constellation level — the audit may surface root causes that get logged here as they're found)*

### Approaching — warn on approach

```
star-turbulence-cost: animated SVG turbulence (feTurbulence) on every bubble star
  re-rasterized every frame — was root of the post-zoom background lag (Jun 2026 audit)
  field-star gas-anims PAUSE on drag/zoom/compass/dial + reduced-motion
  never animate a transform on a live-filtered element without a pause path
  real fix SHIPPED (Jun 2026): gas-layers baked once → blob-url <image>, cheap
    transforms animate the bitmap (STAR-BAKE). atmosphere star (#zoom-zone3) is
    NOT in the .bubble pause scope, so its bake is what smooths the zoom camera.
  corona border (corona-fx) also baked (Jun 2026) — its two rings rasterize once,
    the .corona-ring CSS spin/flicker animates the baked bitmap. NO live feTurbulence
    remains in the star system.
  first-ever zoom of a new movement|palette combo warms the 1024px cache (one
    live frame then swaps); every repeat zoom + all field stars render baked

asset-handling: base64 inline images broke The Bench's context window in Apr 2026
  Constellation hasn't had this incident, but it's the next-largest HTML file
  preserve the code | be creative with how external assets get included
  all images = external file paths only | refuse any inline base64 suggestion

file-size: ~8,907 lines | external file split in progress
  do NOT inline-restructure | wait for developer's split work
  until split lands, context pressure is real on every session

unusual-bug-signal: audit is underway because some bugs feel deeper than their surface
  don't patch symptoms | trace to root | escalate to architecture if pattern emerges

embellishment-creep: visual polish is tempting | DEFERRED until foundation is locked
  beta-ready functions + export comes first

organizer-drift: features that make Constellation feel like an outliner or task tool
  drift away from divergent-thinking-space thesis
  name it as drift, not as feature

integration-pressure: bench bridge work pressure may rise as bench Phase 6 approaches
  do NOT wire before file split is verified AND dedicated session held

mode-asymmetry: if creative mode gets features that structure mode doesn't (or vice versa)
  without explicit design rationale, name the drift
  the two modes are a locked pair | feature parity matters

phase-change-mechanics: current phase-transition model is under review
  if work assumes the old model, surface this trigger
  design session may be needed mid-flight
```

---

## INTEGRATION FLAGS

```
[constellation → bench]
status: !designed | blocked-by: file split + dedicated integration session
touch-point: constellationId on leads[] (Bench side) — only known integration surface
direction: constellation outputs (crystallized ideas) → bench leads/skills/pieces
contract: TBD | requires dedicated integration session
priority: waits on Bench Phase 6 (Pieces) and Constellation file split

[file split] (external work in progress)
status: active externally | developer friend | testing in Claude artifacts
do-not: inline-restructure during regular sessions
when-lands: verify | then update [zones] vocabulary in this doc to file names
  then re-evaluate integration flag readiness

[ALL]: dedicated session required before wiring
```

---

## MASTER RECORD
*Immortalized history. One entry per shipped phase.*

```
phase 1 [shipped pre-may-2026]:
  built: full divergent thinking space | bubble physics | two-mode system |
    three-layer persistence | manual completion crystallization |
    core export shape | mineral metaphor implementation
  locked: mineral metaphor (ideas as minerals, pressure as interaction, crystallization as commitment) |
    two-mode system (creative + structure) with state preservation |
    two-pass physics (free bubbles first, moons after) |
    global orbit speed with tier-based multipliers (not per-bubble) |
    mass-from-meaningful-interaction-only (passive viewing doesn't count) |
    manual completion circle for crystallization (no auto-trigger) |
    three-layer persistence (localStorage + IndexedDB + ZIP) |
    flash-free principle | no DOM rebuilds in physics tick

phase 1.5 / 2 [active]: see PHASE 1.5 / 2 section above
  on-ship: distill locked patterns → ARCHITECTURE | substantial moments → here
```

---

## FETCH IF NEEDED

- **`vision.md`** (repo root) — when a design decision touches the heart-vs-craft tension or when the divergent-thinking-space thesis itself is being tested
- **Hard rules** — see root `CLAUDE.md → HARD RULES`
- **`constellation-bubble-tools.md`** — fetch when working on bubble tool design or the core interaction interface
- **External bug list** — Jordan tracks bugs 12, 13, 14 (and others) separately; fetch when ready to address them
- **`bench/CLAUDE.md`** — when constellation → bench integration design begins, fetch Bench's leads[] data shape and integration flags
- **Session close** — delete the auto-created session branch: `git push origin --delete [your claude/* branch name]` (branch name is in your session instructions)
