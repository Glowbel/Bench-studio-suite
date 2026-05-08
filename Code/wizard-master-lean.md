# DECISION WIZARD — Blueprint (Lean)
*Architecture, locked decisions, hard flags.*
*Load alongside hard-rules.md and wizard-handoff.md for any Wizard coding session.*
*Last updated: May 2026*

---

## WHAT IT IS

Not one tool — a three-tool suite with gateway routing.

**The Feasibility Principle:**
Feasibility = mental clarity + emotional alignment + physical execution capacity.
Not just "can I do this logistically" — can I carry this forward without burning out?

**Emotional UX principle — non-negotiable:**
Acknowledge the weight before starting to solve. Hold the tension.
Move forward anyway. Feel personal. Not a productivity system. Not a form.
Any feature that makes it feel like a business tool violates this principle.

**Current file:** `decision-wizard.html` — ~1,901 lines. Parser audit complete and clean.

---

## THREE-TOOL SUITE ARCHITECTURE (designed April 28, not yet built)

### Gateway Entry
Before any flow: *"What's unclear for you right now?"*
- "I'm not sure what direction I should even be heading" → **Zoom Out**
- "I know the direction, choosing between ways to do it" → **Decision Wizard**
- "I know what I'm leaning toward but need to understand the real cost" → **Count the Cost**

Tools are interwoven. After any tool: "Do you have clarity, or do you need to go deeper?"
Backlink always available. Tool tracks where user has been — does not repeat completed steps.

---

### Tool 1 — Zoom Out (NOT YET BUILT)

**Purpose:** Surface the real underlying decision when direction is unclear.
Entry: *"What's pulling at you right now?"* — not "what decision do you need to make."

Designed flow (not finalized — design session required):
1. Name the surface tension
2. "What's making it hard to decide?" — surfaces the real block
3. Route: scoped decision or deeper unresolved direction?
4. If deeper: zoom out questions revealing the bigger pattern
5. Output: clarified direction statement that makes the specific decision answerable

**Do not build without locking question sequence, output format, and routing logic in design session.**

---

### Tool 2 — Decision Wizard (BUILT)

**Purpose:** Map values alignment across decision paths once direction is clear.

**Three-stage flow:** Discover → Align → Choose (seven internal screens)
- Screen 0a: Name the decision
- Screen 0b: Uncover options — manual add + quick-add chips
- Screen 1a: Value categories — five broad areas
- Screen 1b: Specific values — full row layout, tap to select
- Screen 2: Visual mapper — SVG curved lines, per-path colors, three non-overlapping interaction modes
- Screen 3: Results — ranked by value connection count
- Screen 4: Feasibility — drag-to-rank with ghost element, frosted glass lift

**No changes needed to existing screens.** Gateway handles the prior layer.

---

### Tool 3 — Count the Cost (NOT YET BUILT)

**Purpose:** Witness what a chosen path actually costs before committing.
Not intellectual analysis — embodied reckoning. Makes invisible costs visible.

**Three pathways (routes based on what user needs):**

**Pathway A — Sandbox** (visual/embodied thinkers)
AI sets scene with 2-3 sparse sentences placing user inside decision in motion.
Five dimensions: Seeing / Hearing / Feeling (heart) / Sensing (body) / Thinking.
AI does not evaluate. Does not redirect. Witnesses and reflects only.
Safe because nothing is decided yet. Permission to walk in and walk out.

**Pathway B — Logistics Breakdown** (feel it but need the steps)
Honest itemization: time, energy, skills, resources, momentum.
Not a to-do list — an inventory of what you're carrying.
This is the original Phase Two intake wizard repositioned:
Capability → goal → time willingness → one concrete immediate action.

**Pathway C — Financial Reckoning** (need numbers)
Real cost calculation. Up-front, ongoing, cash flow timing. Not just net outcome.

Combinations possible. Tool asks what would help, routes accordingly.

**Do not build without locking sandbox prompts, AI scene-setting, and reflection mechanics in design session.**

---

## VISUAL SYSTEM

- **Fonts:** Cormorant Garamond (serif, headings) + DM Mono (monospace, body)
- **Palette:** Deep sea blue background, translucent surface cards, cyan/gold accents
- **Border radius:** 14px throughout. Chips: 20px (pill shape).
- **Mobile-first.** Touch gestures. All interactions mouse + touch.

---

## KEY FUNCTIONS

- `buildMapper()` — rebuilds mapper, resets connections/state
- `tapDecision(d)` — activates decision path edit mode
- `tapValue(v)` — read mode or connect if path active
- `toggleConnection(v, d)` — add/remove connection, saves state
- `drawLines()` — redraws SVG lines with correct opacity per mode
- `buildResults()` — scores and ranks decisions, stores `_sortedDecisions`
- `buildFeasibility()` — initializes feasibility screen
- `renderFeasList()` — renders unified select+order list
- `feasStartDrag()` — creates ghost element, begins drag
- `feasOnDragEnd()` — drops and reorders, skips dragging element in calculation
- `saveState()` / `restoreState()` — localStorage persistence

---

## LOCKED DECISIONS

- Three-stage architecture: Discover → Align → Choose. Phase bar shows three landmarks only.
  Do not add stages without design session — simplicity is intentional.
- Value mapper interaction modes are non-overlapping by design.
  Tap path = activate. Tap value (no path active) = read. Drag = connect.
  These three must never interfere.
- Feasibility drag: ghost element with frosted glass (backdrop-filter blur, subtle border, scale + rotation on lift).
  Calculate drop position among non-dragging items only.
- localStorage persistence — no save button, ever. Saves on every meaningful interaction.
- Reset button in header and on feasibility screen.
- Voice input: Whisper API + Claude API. Confirm integration approach in dedicated session before building.
- Original Phase Two intake wizard = Pathway B (Logistics Breakdown) inside Count the Cost. Still valid, repositioned.

---

## INTEGRATION WITH OTHER APPS

- **The Bench Skills tab** — wizard output routes to a Skills node after decision. Not designed yet.
- **Values Card in The Bench** — dedicated card, referenced by all decision tools. Not built yet.
- **Constellation Structure Mode** — Count the Cost → Structure Mode bridge identified. Needs both tools first.
- **All integration deferred.** Do not decide or build without dedicated design sessions.

---

## HARD FLAGS

- **Do not write new code until design session locks:** Gateway routing, Zoom Out question sequence, Count the Cost sandbox.
- **Voice input** — deferred. Whisper + Claude API. Confirm approach in session before building.
- **Where this lives in The Bench** — intentionally deferred. Do not decide without design session.
- **Bench Event Operations Mode** — flagged April 28. Bulk repricing, inventory, distribution channels. Not a wizard concern. Depends on Phase 6 Pieces tab.
