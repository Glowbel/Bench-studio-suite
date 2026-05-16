> **Parser constraints always active:** No `=>` | no backticks | no `...` | no base64 images | no frameworks | single HTML file | flash-free | state in one object. Full spec: `main` branch `CLAUDE.md → HARD RULES`.

# THE BENCH
*Single living doc. Read at start of every Bench session.*
*Last updated: May 2026*

---

## WHY THIS APP EXISTS

Studio operations cockpit for a solo jeweler. Not small business software. The Bench holds what the mind shouldn't have to track — so when Jordan is at the bench, he is fully present there.

This is the convergent engine of the suite.

---

## THE ARC

**Center of gravity:** Pieces tab (Phase 6) is the gateway to selling work again. Studios is the path to it. The deepest purpose of this app — getting Jordan back to the bench while keeping the business viable — depends on Phase 6/7 landing well.

**Drift watch:**
- Personal cockpit, not small business software
- Don't expose Finance before Phase 10
- Don't wire integrations before splits are done
- Don't add features the system doesn't need

---

## CURRENT STATE
```
file: the-bench-classic-v2-11-node-orbs.html
lines: ~6,630
phase: 4.5 in-progress (node orbs done, L3 modal next)
```

---

## RECENT
*Thin papertrail. Newest first. Older drops off.*

```
[recent.format]
[date] verb | short-what — short-how | touches: zone1, zone2
verbs: fix | feat | ref | data | rm
zones: pre-split = ARCHITECTURE block names ([capsule], [supabase], [studios.cards])
       post-split = file names (capsule.js, theme.js)
length: <= 100 chars per line | cap: 12-15 visible

[recent.upgrade-triggers]
data verb → check ARCHITECTURE.data-model | update if shape changed
feat locks pattern → also update ARCHITECTURE
rm → check INTEGRATION FLAGS, TRIGGERS for stale refs
3rd fix same zone → consider SCARS approaching
phase milestone → MASTER RECORD entry
```

```
[recent.entries]
[may-15] feat | Nodes rendered as orbs (was shields) — tab-orb glow language at 56px, type-color halo+ring+glyph, metal arc just outside ring | touches: SKILLS-WORKSHOP, [node-progress], [node-orbs]
[may-15] rm | nodeTypeGlyph (full-shield) + nodeProgressArcSvg (52-coord helper) + dead .node-shield/.node-conn-* CSS — orphaned by orb switch | touches: SKILLS
[may-15] fix | Tab orb colors hollow + diffused outer light + quiet vs active mode — when timer runs, orbs brighten and pulse faster; idle stays soft | touches: TAB-ORBS, CAPSULE-EDGE-ORBS, CSS
[may-15] feat | Tab orb drag reorder free-form (pointer events) — dragged tab+orb follows finger, neighbors slide smoothly via FLIP when center crosses threshold | touches: EVENTS:TAB-DRAG
[may-15] feat | Color picker for tab orbs — native input, live preview, persists to localStorage bench-tab-orb-colors | touches: THEME-PANEL
[may-15] feat | Capsule edge orbs (L/R) — tap to collapse/expand, pulse travels orb-to-orb in quiet mode (14s, dim), active mode (6.4s, bright) when timer running, persists collapsed state | touches: CAPSULE
[may-15] fix | Capsule collapse/expand choreography — content fades out (180ms) → strip shrinks to 3px line → smooth snap-back on release | touches: CAPSULE, CSS
[may-15] fix | Edge orb positioning — now share vertical center with collapsed line via being parented to capsule-outer instead of wrap, line shortened with healthy breathing room (14px L/R), wrap padding balanced 6px top/bottom | touches: CAPSULE
[may-14] feat | Workshop L2 node path — parabolic column, metal states, back nav | touches: SKILLS, EVENTS:WORKSHOP
[may-14] feat | Crest creation modal — form, letter/symbol/color pickers, live preview, save | touches: SKILLS, CREST-MODAL, STATE
```

---

## ARCHITECTURE

```
[variants]
classic: cormorant-garamond + dm-mono | dark-teal | #080a0b body
observatory: cinzel-decorative + im-fell-english | starfield canvas
js-logic: identical across both
aesthetic: dark radial gradient | teal/cyan/antique-gold/sage | no chrome

[tabs]
order: customers, studios, schedule, pieces, bench-library, finance, [+future]
hidden: finance (until phase-10)
reserved: supplier, journal
capacity: 9-10 without structural change

[data-model]
shape: 8 flat arrays | reference by id only | never nested
arrays:
  customers: contact records
  leads: orders/repairs, pipeline-staged
  skills: craft techniques, spark→mastery
  events: calendar, linked to skills/leads/pieces
  pieces: physical objects: materials/labor/pricing/payments
  benchLibrary: services/rates + materials reference
  todos: task queue
  hoursLog: immutable log of timed sessions

[task.shape]
{ id: Date.now(), label, notes, ordered:false,
  skillId, pieceId, laborId, scheduleEventId,
  durationMins, time, isBookmark, leadId }
entry-point: addTodo(obj) | locked | never bypass

[skill.shape] (locked — survives past 4.5)
{
  id, title, letter, symbolId, glowColor,
  phase: 'workshop',
  nodes: [],
  totalHoursLogged, created
}

[storage.keys]
bench-customers, bench-hours-log, bench-todos, bench-taborder,
bench-studio-settings, bench-care-templates, bench-invoices, bench-cpick-chips,
bench-skills, bench-tab-orb-colors, bench-capsule-collapsed

[supabase]
table: bench_data | k/v/updated_at
write: ls→sb async | fail=silent | never block
boot: try sb → fallback ls
anon-key: visible=intentional | rls protects
pieces_published: planned | !built | blocked-by: pieces-tab

[tab-orbs] (May-15 shipped)
position: below tab-bar, centered under each tab via syncOrbSlotWidths()
color: per-theme palette (TAB_ORB_PALETTES) OR user override (bench-tab-orb-colors)
drag: pointer events, free-form translate, FLIP neighbors on swap, snap-back 0.18s
state: state.tabOrbColors{} | persisted | overrides theme palette if set

[capsule-edge-orbs] (May-15 shipped)
position: L/R edges of capsule-outer, on vertical centerline, negative offset
color: capsule accent color (--c-capsule-accent)
modes:
  quiet (collapsed, no timer): 14s pulse, travelers dim, orbs barely brighten
  active (collapsed, timer running): 6.4s pulse, travelers bright, orbs react strongly
collapse-state: persisted to bench-capsule-collapsed
animation: orbs pulsing with traveling dot between them

[capsule]
role: live work surface, !navigation
faces:
  1.todo: queue<=5 | checkbox | inline-add | timer-button
  2.detail: full context | goal-progress | on-deck flag | actions
  3.timer: mana-bar | elapsed/countdown | play/pause/stop+log
extras:
  collapse-bar: tap-to-collapse (orbs + thin line with pulse)
  intake-flow: piece/skill/misc → item → barrel-picker → start
  quick-count: long-hold timer-btn → hold-menu → instant-start

[studios.cards]
order: compendium, constellation, door*, workshop, archive (* = center)
capsule.visible: workshop, compendium
capsule.hidden: constellation, door, archive
header: hidden everywhere
back-arrow: always-visible
rationale: capsule-presence = work flows in | absence = reflect/discover/begin

[door]
open-q: "what's on your mind and heart today?"
branches: 4 → 1 clarifying follow-up each
graceful-degradation: yes (unknown requests handled)
role: secondary routing path into workshop | workshop is self-sufficient

[constellation.card]
mode: portal-only | full-screen | standalone-build
integration: requires-dedicated-session | !embed-yet

[pieces.tab] (phase 6)
sub-tabs: overview, materials, labor, pricing, payments, notes, publishing
publishing → pieces_published table → public website → square payment links

[distribution]
app-store: capacitor wrapper | no rewrite | one-time config at submission

[three-metal-system] (locked — survives past 4.5)
copper: desaturated | dim → locked / not-started
silver: full saturation | no-glow → active / in-progress
gold: warm rim + glow → complete
transitions: gradient ratio | NOT hard switches

[node-types] (locked — survives past 4.5)
research: scroll icon | blue-indigo | knowledge acquisition
session: bench-tools icon | teal-green | hands-on practice
immersion: lens/tunnel icon | amber-red | deep dive
debrief: quill-and-pen icon | warm-gold | reflection/synthesis

[node-progress] (locked — survives past 4.5)
ratio: node.progress / node.goalTarget (clamped 0..1)
metal-color: lerp bronze(#b87333) → silver(#c0c8cc) → gold(#c9a96e) along ratio
arc: inline in L2 renderer, 56-coord space, r=22.5 around 28,28
arc-rotates: -90 to start at top, sweeps clockwise
type-color: NODE_TYPES[].color drives ring + halo + glyph (identity)
metal-color: drives arc + connector only (state)
two-signals: type identity + progress state — never collide

[node-orbs] (may-15 shipped, locked)
size: 56px in 56-coord SVG viewport, center 28,28
layers (outer→inner): halo(r=22,r=24 strokes, low alpha) | arc(r=22.5) | ring(r=19, 1.6px) | inner-fill(6%) | glyph(translated +2,+2 from 52-coord native)
glow: drop-shadow via currentColor — type-color flows from inline color: on .node-orb
idle: 4px shadow | hover: 7px shadow
plus-button: copper dashed ring, + drawn as two crossed lines
ghost: dashed copper at low alpha, no halo, no glow
connector: 2px wide, 30px tall, metal-color background + soft box-shadow, opacity scales with progress
relationship: same glow language as tab-orbs, scaled with more presence

[voice.principle] (locked — survives past 4.5)
emotion via: pacing + space + typography (NOT words alone)
register: camaraderie, never wise-mentor
system-as: peer, not coach
ref: breath-of-the-wild

[crest.system]
renderer: buildCrestSvg(opts) — unified, all views (L1/L2/modal)
shield: Jordan's spec path (M10,80 Q140,60 200,20...) scaled by shieldH
ring: single elegant line, metal-state colored, progress arc sweeps it
metal-states: ghost | copper | silver | gold → deriveMetalState(nodes)
identity: glowColor → SW calligraphic shadow filter on centerpiece
centerpiece: letter OR symbolId (CREST_SYMBOLS) — bronze relief, 3-layer
ornament: disabled (rivets/vines/banner gated if(false)) — needs real assets
assets-needed: shield frame, botanical scroll, banner, all 6 symbols
```

---

## PHASE 4.5 — STUDIOS DESIGN (active)

*This section is hot during Phase 4.5 work. When 4.5 ships:*
*locked patterns → ARCHITECTURE | substantial moments → here | delete the rich middle.*

```
[carousel]
layout: horizontal | center scale=1.0 | flanking scale=0.82 opacity=0.55
snap: momentum-physics on swipe/drag release
indicators: dots below | active=filled | others=dim
reset: double-tap skills tab → center card (workshop)
card.anatomy:
  full-bleed scene image
  vignette layer (darkens bottom third for legibility)
  ornate gold border 1-2px + corner-bracket flourishes
  label: cormorant-garamond | subtitle: dm-mono small-caps
interaction:
  tap.center → enters section (skillsView = "list")
  tap.non-center → snaps to it (no enter)
  drag-anywhere → drags track | live scale + dot update
  release → momentum snap to nearest
  back → returns to carousel

[card.scenes]
1 compendium | ancient scroll room | candlelight | elvish script
2 dreaming | nebula | swirling stars | pendant forming from light
2* the-door | stone archway ajar | golden light spilling through
3 workshop | elvish jeweler workshop | forge lit | tools everywhere
4 archive | grand archive hall | tall display cases | candles
```

---

### WORKSHOP — L1 DASHBOARD BUILT (may-11)

*Full-width skill rows. Always visible. Always interactive. Self-sufficient.*

```
[L1.layout]
each skill = full-width row (flex, row direction):
  left: 80px crest (80x80 frame) — hero element
  middle: skl-card-body — skill name (cormorant) + stats (dm-mono)
  right: three-dot menu (edit/delete stubs)
  below (expanded): full-width notes block when toggled open

[L1.card.assets]
355 x 120px card background (stone/steel texture) — placeholder path
355 x 3px banner strip — color-keyed to skill or metal-state
80 x 80px crest frame — replaces parametric SVG (ready to accept external path)

[L1.stats]
format: "[N] nodes . [N] done . [X]h . [N] notes"
omit hours if 0 | omit notes count if 0

[L1.notes-expand]
toggle per card | state.skillsNotesOpen = skill id | null = all closed
notes block: node type tag (teal dm-mono) + discovered text (italic cormorant)
card gets class skl-card-notes-open when expanded

[L1.new-skill]
ghost-crest row — always last in list | id="skNewSkill"
dashed border | copper-dim palette
80px SVG: dashed shield + "+" glyph
text: "new skill" italic copper-dim
tap → crest modal (next session)

[L1.state-fields]
skillsView: "carousel" | "list" | "chain"
skillsActiveCard: 2 (workshop center)
skillsActiveSkillId: null | skill.id
skillsNotesOpen: null | skill.id
```

---

### WORKSHOP — L2 NODE PATH (shipped may-14)

*Vertical path view for a single skill. Entry: tap skill row. Exit: back button.*

```
[L2.layout — mobile-first vertical path]
CREST: sticky/pinned at top | does not scroll | z-index above nodes
  size: ~100px SVG | arc-progress wraps around | tap → crest modal
  skill title below sticky crest
  bleed background so scrolling nodes disappear beneath it

NODES: flow top → down | gentle parabolic offset (NOT aggressive snaking)
  offset alternates slightly left/right of center column
  feel: path through terrain | NOT a list | ref: Duolingo node path
  node size: 56px tap target | orb glyph (see [node-orbs]) | metal state coloring
  below each node: intention label (italic, dim, cormorant, small)
  connector lines between nodes: lit gold if complete, silver if active, dim copper if locked

GHOST NODES: 1-2 dim placeholders ahead of + button

+ BUTTON: ONE only | ghost node shape with + glyph
  position: immediately below current active node
  tap → node creation flow (see below)

[L2.adaptive]
mobile: vertical parabolic column (build this)
desktop (future): unroll horizontal OR wider vertical — decide separately
```

---

### WORKSHOP — CREST MODAL (shipped may-14)

```
[crest-modal.trigger]
L1 row: tap crest area → modal for that skill
L2: tap sticky crest → modal for active skill
new-skill: tap ghost row → create skill → open modal immediately

[crest-modal.content]
floating modal | dark bg | gold border | NOT full-screen
  1. name input — bare text | current name pre-filled
  2. letter/symbol picker — "choose your symbol"
  3. glow color — "aura" (grid of preset swatches, no color wheel)
  4. done button — saves title + symbolId + glowColor | closes modal
```

---

```
[4.5.build-order]
1. carousel shell | 5 cards | swipe | center prominence [DONE]
2. workshop L1 dashboard | orbit-crest rows | arc progress | ghost new-row [DONE may-11]
3. tab-orb system | reorder via free-form drag, colors per theme | hollow rings, quiet/active pulse [DONE may-15]
4. capsule edge orbs | collapse/expand, pulse mode states | geometry balanced [DONE may-15]
5. workshop L2 node path | sticky crest | vertical parabolic nodes [DONE may-14]
6. crest modal | name + letter picker + symbol picker + glow color picker [DONE may-14]
7. node creation | type picker + intention input [DONE may-14]
8. L3 node modal | journal layout | 4 types | begin/complete/+to-do/delete [NEXT]
9. intake conversation (the door) | icon picker
10. dreaming list | begin-the-journey
11. archive | crest field + dossier
12. compendium stubs | 3 nav modes | search data model
13. capsule on-deck wiring | session prompt by type
14. completion animation | water-droplet → gold burst
```

---

## DESIGN CONSTRAINTS (next session must preserve)

**Two-language symbol system:**
- Elvish (flowing): torch, fire, water — tapered strokes, decorative terminals, asymmetric movement
- Dwarvish (blocky): anvil, gem, chisel — bold geometry, runic angularity, hammered edges
- Current symbols are placeholder SVGs. Real assets needed before ship.

**Crest color system:**
- Glow color = skill identity (chosen at creation, fixed) → SW shadow on centerpiece calligraphy
- Metal state = progress (earned over time) → ring arc color (ghost → copper → silver → gold)
- Two separate visual signals, never competing

**Card asset slots (ready to receive):**
- 355 x 120px card background (stone/steel texture)
- 355 x 3px banner strip (or taller, clipped)
- 80 x 80px crest frame (replaces parametric SVG)
- Asset integration architecture is already in place — buildCrestSvg() can accept external path

**Tab orbs and Capsule orbs (May-15 shipped, locked):**
- Tab orbs: hollow rings, theme palette override via localStorage, draggable via pointer events, free-form drag with FLIP neighbor transitions
- Capsule edge orbs: hollow rings, capsule accent color, two modes (quiet 14s / active 6.4s), pulse travels between them, tap to collapse/expand
- Geometry: tab orbs centered under tabs, capsule orbs share vertical center with collapsed line, healthy breathing room between elements (14px line margins, ~17.5px gap to orbs)

---

## TRIGGERS

```
addTodo / task creation → confirm shape !drifted
capsule timer logic → no DOM rebuilds during tick | in-place only
pieces tab work → piece data shape !defined yet | may need design session
carousel work → settling transition is weighted | !break the feel
theme system → classic+observatory share JS | update in lockstep
new tab → finance pattern (hidden:true) | reserved: supplier, journal
workshop L2/L3 → skill.shape locked | nodes by id | never nested
node modal save → write full skill back to state.skills | saveData()
symbol-language → two registers locked | real assets needed before ship
crest-colors → two independent signals | test their distinction live
tab-orb drag → FLIP neighbor transitions | syncOrbSlotWidths() on swap | pointer capture release
capsule collapse → state.capsuleCollapsed persisted | timer state triggers mode flips (quiet vs active)
```

---

## SCARS

### Past — do not repeat

**[Apr 2026] Base64 images broke context windows.** Inline image data caused the file to grow so large it broke context across multiple threads. Required emergency surgical strip. **All images must be external file paths only. Refuse any inline base64 suggestion. Codified in hard-rules.**

**[May 2026] Orb positioning parity.** Early orb implementation had orbs anchored to wrap (asymmetric padding) while line anchored to outer (no padding), causing misalignment. Fix: moved orbs to be children of outer so both share vertical center via top:50%. **When adding elements that should be visually aligned, anchor them to the same parent.**

### Approaching — warn on approach

```
file-size: ~6,630 lines | PAST 3,500 warn threshold
  split required before app integrations
  plan dedicated split session before wiring any bridges

integration: !wire constellation/wizard/spatial → bench before split + design sessions
  premature integration = nightmare scenario

finance-tab: !expose without confirming with jordan

pieces-data: !build sub-tabs before piece data shape formally defined

capsule-rebuild: any capsule work → in-place DOM only | flash-free locked

asset-paths: card backgrounds, banners, frames still placeholder
  lock symbol-language + crest-color system first
  only then commission real assets

orb-system: tab + capsule orbs shipped, locked. !modify geometry arbitrarily.
  changes to spacing/sizing should reference the breathing-room principle
```

---

## INTEGRATION FLAGS

```
constellation → bench: !designed | constellationId on leads[] = only touch point
wizard → bench-skills: !designed | wizard identifies path, skills walks it
spatial → bench: !designed | phase 8 of calendar
ALL: dedicated session required before wiring
```

---

## MASTER RECORD
*Immortalized history. One entry per shipped phase.*

```
phases 1-4 [shipped pre-may-2026]:
  built: shell + capsule + timer + todo + theme + tabs + studios v1 (kanban, superseded)
  locked: addTodo() pattern | flash-free principle | localStorage→supabase async |
    single-file architecture | parser constraints | two-variant system (classic/observatory)

phase 4.5 [shipping may-15]:
  built: carousel | L1 dashboard | tab-orb system | capsule-edge-orbs + collapse | L2 node path | crest modal | node creation | node orbs (v2-11)
  locked: skill.shape | node.types | two-language symbol system | three-metal-system |
    tab drag reorder (free-form, FLIP) | capsule quiet/active pulse modes | geometry breathing-room principle |
    node-orbs (56px, type-color halo+ring+glyph, metal arc) | two-signals rule (type-color vs metal-color)
  next-in-4.5: L3 node modal (#8)
```

---

## FETCH IF NEEDED

- **`vision.md`** (main branch root) — when a decision touches heart-vs-craft tension or grounding is needed
- **Hard rules** — see main branch `CLAUDE.md → HARD RULES`
- **`product-strategy.md`** (main branch root) — when integration or release strategy surfaces
- **Session close** — delete the auto-created session branch: `git push origin --delete [your claude/* branch name]` (branch name is in your session instructions)
