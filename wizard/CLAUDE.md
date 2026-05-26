> **Parser constraints always active:** No `=>` | no backticks | no `...` | no base64 images | no frameworks | single HTML file | flash-free | state in one object. Full spec: root `CLAUDE.md → HARD RULES`.

# DECISION WIZARD
*Single living doc. Read at start of every Wizard session.*
*Last updated: May 2026*

---

## WHY THIS APP EXISTS

A three-stage tool for navigating decisions when the path forward is unclear. Not a productivity tool. Not a form. A space that holds the weight of a decision while you find your way through it.

The deeper purpose: getting through hard decisions without bypassing the parts that hurt. Most decision tools optimize for speed. This one optimizes for honesty — making invisible costs visible, making real direction findable, making feasibility include emotional capacity, not just logistics.

---

## THE ARC

**Center of gravity:** Decision Wizard (the middle stage) is built and stable. Now extending the flow forward (Zoom Out before) and backward (Count the Cost after) to complete the full progression.

**Drift watch:**
- Don't make it feel like a business tool. The emotional UX principle is non-negotiable.
- Don't bypass weight. Acknowledge difficulty before solving.
- Don't force linearity in interaction even though the design is sequential. Real decisions loop. Backlinks must always work.
- Don't build before designing. Zoom Out and Count the Cost both need their design sessions.

---

## CURRENT STATE
```
file: index.html
lines: ~2,173
state: Decision Wizard (middle stage) built and stable | parser audit clean
zones: 21 top-level zones | in-file registry + rebuilder (line 2)
phase: suite-build (extending forward + backward — design pending for both)
```

---

## RECENT
*Thin papertrail. Newest first. Older drops off.*

```
[recent.format]
[date] verb | short-what — short-how | touches: zone1, zone2
verbs: fix | feat | ref | data | rm
zones: ARCHITECTURE block names ([zoom-out], [decision-wizard], [count-the-cost], [navigation])
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
[2026-05-18] ref | zone markers + in-file registry — 21 zones, BEGIN/END pairs throughout | touches: all
```

---

## ARCHITECTURE

```
[file-shape]
single HTML file | parser constraints locked (see root CLAUDE.md)
no frameworks | localStorage persistence | mobile-first | mouse + touch

[suite-shape] the progression
sequential by design, fluid in practice:
  zoom-out → clarify direction when the real decision is unclear
  decision-wizard → map values across paths once direction is known [BUILT]
  count-the-cost → witness real cost of the leaning before commit
flow:
  default progression: zoom-out → decision-wizard → count-the-cost
  flexible entry: user can start at any stage if their need is clearly there
  flexible navigation: backlinks at every stage | "go deeper" routes back
  state preservation: progress in any stage held when navigating away

[navigation]
between-stage transitions: "do you have clarity, or do you need to go deeper?"
backlink: always available | jumps to prior stage with state intact
forward-skip: user-driven only | tool doesn't auto-advance through unfilled stages
re-entry: tool tracks where user has been | doesn't repeat completed work

[decision-wizard] (the built middle stage)
purpose: map values alignment across decision paths once direction is clear
entry-state: user knows what they're deciding between, has named options
output: values-ranked decision paths + feasibility assessment

three-stage internal flow: discover → align → choose
seven internal screens:
  0a: name the decision
  0b: uncover options — manual add + quick-add chips
  1a: value categories — five broad areas
  1b: specific values — full row layout, tap to select
  2: visual mapper — SVG curved lines, per-path colors, three non-overlapping interaction modes
  3: results — ranked by value-connection count
  4: feasibility — drag-to-rank with ghost element, frosted glass lift

key-functions:
  buildMapper() rebuilds mapper, resets connections/state
  tapDecision(d) activates decision path edit mode
  tapValue(v) read mode | connect if path active
  toggleConnection(v,d) add/remove connection, saves state

locked: phase bar shows three landmarks only | seven internal screens
  no additional stages without dedicated design session
  simplicity is intentional

[zoom-out] (not built — design pending)
purpose: surface the real underlying decision when direction is unclear
entry-prompt: "what's pulling at you right now?" or "what are you circling?"
  not "what decision do you need to make" — assumes too much
designed-flow: (not finalized — design session required)
  1. name the surface tension
  2. "what's making it hard to decide?" — surfaces the real block
  3. route: scoped decision or deeper unresolved direction?
  4. if deeper: zoom-out questions revealing the bigger pattern
  5. output: clarified direction statement that makes the specific decision answerable
key-insight: users often think they have one decision when they actually have
  multiple hidden sub-paths inside it | pre-mapper discovery is essential
needs-locking-in-design: exact question sequence | output format | routing logic to wizard

[count-the-cost] (not built — design in progress, Jordan working separately)
purpose: witness what a chosen path actually costs before committing
  not intellectual analysis — embodied reckoning
  makes invisible costs visible
shape-tbd: design active externally — fetch latest design when session begins
do-not-build: until design is locked

[emotional-ux] (locked — non-negotiable across all stages)
acknowledge weight before solving
hold tension | move forward anyway
feel personal, not procedural
any feature that makes it feel like a business tool violates this principle

[visual-system]
fonts: cormorant-garamond (serif, headings) + dm-mono (monospace, body)
palette: deep sea blue background | translucent surface cards | cyan/gold accents
border-radius: 14px throughout | chips: 20px (pill shape)
mobile-first | all interactions mouse + touch
```

---

## TRIGGERS

```
work on zoom-out → design session required first | don't write code yet
work on count-the-cost → design active externally | fetch latest before touching
emotional UX shifts → non-negotiable principle | check against drift-watch
adding stages or screens → simplicity is locked | design session required
mapper logic in decision-wizard → no overlap between three interaction modes
voice input integration → essential for count-the-cost | dedicated session before wiring
```

---

## SCARS

### Past — do not repeat

*(none yet at the suite level — Decision Wizard middle stage shipped clean)*

### Approaching — warn on approach

```
zoom-out-without-design: if work touches zoom-out before design session, stop and surface
  question sequence + output format + routing must be locked first

count-the-cost-without-design: same rule | design is active externally | fetch latest before
  even sketching architecture in this doc

linearity-creep: if features start enforcing strict zoom-out → wizard → cost progression
  without supporting fluid navigation, name the drift
  real decisions loop | the tool must too

emotional-drift: if copy or interactions start feeling productivity-tool-flavored,
  name it as drift from the emotional UX principle
  specific watch: time pressure | progress bars that feel like ranking |
  language that gamifies the decision

scope-creep-in-wizard: decision-wizard middle stage is locked at 7 screens
  new features go in zoom-out or count-the-cost, NOT inside the middle
```

---

## INTEGRATION FLAGS

```
[wizard → bench skills]
status: !designed
direction: wizard identifies a path | bench skills walks it
purpose: when a decision lands on "learn this skill" or "build this capability,"
  the wizard's output should hand off cleanly to a bench skill record
contract: TBD | requires dedicated integration session

[voice input]
status: !built | essential for count-the-cost especially
deps: whisper + claude api integration approach must be confirmed in dedicated session
priority: blocked-by: count-the-cost design

[ALL]: dedicated session required before wiring
```

---

## MASTER RECORD
*Immortalized history. One entry per shipped phase.*

```
phase 1 [shipped apr-2026]: decision-wizard middle stage
  built: discover → align → choose | seven internal screens |
    visual mapper with SVG curved lines | values-ranked results |
    drag-to-rank feasibility | localStorage persistence | parser audit clean
  locked: emotional UX principle non-negotiable |
    three-stage simplicity (no additional stages without design session) |
    parser constraints (single HTML, ES5, no frameworks)

phase 2 [active]: extending the flow — zoom-out + count-the-cost
  on-ship: distill locked patterns → ARCHITECTURE | substantial moments → here
```

---

## FETCH IF NEEDED

- **`vision.md`** (repo root) — when a design decision touches the heart-vs-craft tension or when the emotional UX principle is being tested
- **Hard rules** — see root `CLAUDE.md → HARD RULES`
- **`wizard-suite-architecture.md`** — full design spec for the three-tool suite; fetch when working on Zoom Out or Count the Cost design
- **External Count the Cost design** — when count-the-cost work begins, fetch Jordan's latest design notes (active externally)
- **`bench/CLAUDE.md`** — when wizard → bench skills integration is being designed, fetch Bench skill data shape
- **Session close** — the platform auto-creates a `claude/*` branch; Jordan cleans it up manually — never push code there, it's a platform artifact

<!-- pipeline-test: wizard append confirmed -->