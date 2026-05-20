# Node System Design Spec
*Bench — Workshop*
*Captured: May 2026. Read before coding any node modal work.*

---

## Overview

Four user-creatable node types in the picker. Each has a distinct modal, distinct completion logic, and distinct role in the skill lifecycle.

```
research    knowledge & planning          widget-based modal, manual or study-based progression
session     execution, direction-focused  lightweight picker, timer-linked
immersion   deep flow, reps               minimal friction, immediate timer launch
note        accumulation & synthesis      multi-tab, one primary per skill
```

**Debrief** is NOT a picker type. Auto-inserted only — appears after any session with progress. Not user-created.

---

## NODE CREATION MODAL — VISUAL SYSTEM

This is the shared visual language for all four node types. The creation modal is the ceremonial threshold — the moment the node comes into existence should feel significant, not like filling out a form.

### Layout — Explorer/Slideshow

```
┌──────────────────────────────────────┐
│                                      │
│         [HERO — full width]          │  ← selected node, main event
│                                      │
│  [type 1]  [type 2]  [type 3]  [type 4]  │  ← selector strip
│                                      │
│  "short description of this type"   │  ← one italic sentence
│                                      │
│  intention input / goal config       │  ← type-specific config below
│                                      │
│  [ cancel ]          [ create ]      │
└──────────────────────────────────────┘
```

- **Hero zone** (~220px tall): the selected node type orb at full ceremony
- **Selector strip**: all 4 types as smaller dim orbs; tap to bring one to hero with bloom animation
- **Description line**: one italic Cormorant sentence beneath the strip, describing the selected type
- **Config area**: type-specific setup fields below the description

### Hero Orb — Visual Anatomy

The hero orb is a hollow double-bordered ring with a smoke atmosphere and arcane pulse. Same glow language as the capsule edge orbs but more ornate.

```
layers (outer → inner):

  smoke atmosphere     blurred animated divs at low opacity, slow drift
                       SVG feTurbulence for organic texture — no images, no base64

  outer ring           type color | low opacity (~30%) | 1.5px stroke
  gap                  ~6px of breathing room
  inner ring           type color | higher opacity (~70%) | 1px stroke
  hollow interior      empty — glow bleeds inward from both rings
  glyph                centered in hollow | ~28px SVG | type color | feels floating

  arcane pulse         single bright traveling point orbiting outer ring
                       CSS animation: one full orbit ~4s ease-in-out infinite
                       same family as capsule edge orb traveling dot, adapted circular
```

**Orb sizing in hero:** ~120px diameter. Centered horizontally with generous vertical breathing room above and below.

### Color immersion

When a type is selected, the modal atmosphere shifts to carry that type's color:
- Modal background: subtle tint of type color at ~4% opacity
- Hero zone: soft radial glow behind the orb in type color
- Border of the modal card: type color at ~20% opacity
- Selector strip selected orb: type color, slightly brighter
- All transitions: 0.32s ease

Type color reference (existing, locked):
```
research:   #7a8fc4  blue-indigo
session:    #6ab3a0  teal-green
immersion:  #c48570  amber-red
note:       #c9a96e  warm-gold
```

### Selector strip orbs (unselected)

~44px. Single border, type color at 30% opacity. Glyph at 40% opacity. Tap triggers:
1. Selected orb blooms (brief scale 1.0 → 1.12 → 1.0, glow brightens)
2. Hero transitions to new type (opacity fade or cross-dissolve, 0.28s)
3. Modal atmosphere recolors

### One-sentence descriptions

Shown in italic Cormorant beneath the selector strip. Shift with selected type.

```
research    "for when you need to understand before you can build"
session     "set a direction and show up for it"
immersion   "long focus, no friction — just reps"
note        "where thoughts about the work live"
```

### Bloom transition (type change animation)

When a new type is selected from the strip:
- The incoming orb in the hero fades in with a brief glow bloom (scale + opacity)
- The modal border and background shift color simultaneously
- Description line cross-fades
- Total transition: ~0.3s — deliberate, not instant, not slow

---

## 1. RESEARCH NODE

**Role:** Used when practice/immersion has plateaued. Captures knowledge, plans next steps, establishes direction before returning to execution.

### Completion logic
Two paths (user sets at creation, can toggle later):
- **Study-based:** N sessions or hours of study
- **Manual readiness:** User marks ready when they feel prepared to proceed

### Modal — modular widget interface
Blank canvas with a floating **+ Add section** button. Each tap opens a type picker:

| Widget | Purpose |
|--------|---------|
| Text | Free-form notes, any length |
| Photo board | Pin-board style image collection (external file paths only — no base64) |
| Checklist | Bullet list with checkboxes |
| Big picture | Five steering questions → plan of action (see BIG PICTURE WIDGET below) |

Widgets are reorderable, deletable. Order persists to node data.

### Big picture widget — locked design

**Five questions (locked):**
```
1. "Where does the work stand?"
2. "What does progress look like from here?"
3. "What's standing in the way?"
4. "What's already in reach to work with?"
5. "What's the next step?"
```

Register: grounded, peer-voiced, broadly applicable across any craft skill. Slight emotional resonance without being feeling-heavy.

**A/B mode picker:**
- Persistent left-edge panel inside the big picture widget
- Two compact options: `A · one at a time` | `B · all together`
- **A (sequential):** one question visible at a time, tap next to advance. Feels like a conversation.
- **B (all together):** all five textareas visible, fill in any order. Faster for someone already oriented.
- Persists to localStorage key `bench-bigpicture-mode` — remembers across sessions
- No confirmation needed to switch — tap and it shifts immediately

**Data shape additions:**
```
node.widgets: []  // ordered array of { id, type, content }
// text:     { type:"text", body:"" }
// photo:    { type:"photo", items:[] }  // items = external file paths only
// checklist:{ type:"checklist", items:[{ id, text, done }] }
// bigpicture:{ type:"bigpicture", mode:"A"|"B", answers:{ q1:"", q2:"", q3:"", q4:"", q5:"" } }
//   q1: "Where does the work stand?"
//   q2: "What does progress look like from here?"
//   q3: "What's standing in the way?"
//   q4: "What's already in reach to work with?"
//   q5: "What's the next step?"
```

---

## 2. SESSION NODE

**Role:** Quick, direction-focused execution. Light input, heavy reps. Goal can be inherited from a populated research node on the same skill.

### Completion logic
- N sessions or N hours
- If skill has a populated research node: goal and intention can be pulled from it (user prompted at creation: "use research node direction?")

### Modal
Lightweight. Shows:
- Progress bar + session count
- Direction label (intention or pulled from research)
- Begin button → routes to timer setup
- Submenus for goal adjustment accessible but not prominent

*(Submenus and picker detail: design session pending — see OPEN QUESTIONS)*

---

## 3. IMMERSION NODE

**Role:** Long engaged sessions. Reps and flow. Minimize friction. No complex input — just start and go.

### Completion logic
N sessions or N hours.

### Modal
- Progress + goal display
- Immediate **start session** button (primary, full-width, prominent)
  - Tap → closes node modal → opens todo/timer setup modal → timer links back to this node
  - Node progress increments when timer session is logged
- May pull from note node or research node for context (dim reference line, not intrusive)

### Timer link
`timerSkillId` already exists. Add `timerNodeId` to timer state when session is launched from a node. On session log, increment `node.progress` for that node.

*(Full timer wiring is Phase 4.5 step #13 — design the link here, implement with that step)*

---

## 4. NOTE NODE

**Role:** Synthesis, accumulation, structured reflection. One primary note node per skill. Multi-tab.

### Primary node rule
- First note node created on a skill = the **primary note node**
- Debrief mini-nodes automatically route their content to this node's Debrief tab
- Each debrief update → pulse notification on the note node center in L2

### Tabs (3)
```
1. Debriefs    log of all debrief mini-nodes — linked node, date, content (read-only)
2. Notes       paged writing space — arrow nav between saved pages
3. Ideas       consolidation space — can pull sections from any research node on this skill
```

**Notes tab detail:**
- One "page" visible at a time, full-width textarea
- Bottom arrow controls: navigate between saved pages
- Each page has a name (auto: "Note 1", "Note 2" — editable)
- Dashboard tab within Notes: shows all page names, tap to open, option to delete

**Ideas tab detail:**
- Free-form text area (base)
- Pull-down: lists this skill's research nodes → tap to expand → shows widget contents → tap to copy section

### Second note node (user-created)
When a user picks "note" and a primary already exists:
- Prompt: **"Add a note or open a debrief?"**
  - **Add a note** → second access point to primary note node, opens to fresh blank page in Notes tab, plus a tab to navigate all saved notes (name, edit, delete)
  - **Debrief** → creates a standalone debrief entry (simple text sheet — see DEBRIEF MINI-NODE content model)

### Visual pulse states
```
baseline:        soft, dim
has content:     gentle steady glow
debrief update:  pulse burst → fades to has-content glow
unacknowledged:  rhythmic pulse until first opened after auto-populate
```

---

## 5. DEBRIEF MINI-NODE

**Role:** Quick reflection auto-inserted after any session with progress. Captures the idea while it's fresh. Not user-created from the picker.

### Trigger
After any timer session that increments a node's progress, a debrief prompt appears. User fills it in or dismisses. Either way a mini-node record is created (dismissed = empty, still logged).

### Voice capture
Debrief prompt includes a mic button. Uses browser-native `SpeechRecognition` / `webkitSpeechRecognition` — no API key, no cost. Tap mic, speak, text lands in the field. Works in Chrome and Safari. Graceful fallback if unsupported: mic button hidden, text input only.

### Visual in L2 path
Half-size node (~32px) positioned between the worked node and the next node in the parabolic column. Distinct from main nodes — no type color ring, dim paper/scroll glyph, warm-dim coloring. Tappable to open the debrief content.

### Content
Single textarea. Date-stamped. Linked to the node it followed (afterNodeId).

### Routing
Syncs to the skill's primary note node → Debriefs tab. If no note node exists: queued, syncs when one is created.

### Data shape
```
// Lives in skill.debriefs[] (separate from skill.nodes[])
{ id, afterNodeId, date, text, dismissed:false }
```

---

## 6. DATA MODEL CHANGES

```
skill.nodes[]              unchanged shape + new per-type widget data on research nodes
skill.debriefs[]           NEW — debrief mini-node records
skill.primaryNoteNodeId    NEW — id of first note node created for this skill
node.widgets[]             NEW on research nodes
node.timerNodeId           NEW — timer sessions link back to node
node.readiness             NEW on research — "study" | "manual"
node.readyFlag             NEW on research — boolean, manual readiness toggle
timer state: timerNodeId   NEW — set when session launched from immersion/session node
```

### Migration note
Existing "debrief" type nodes in localStorage (pre-spec):
- Treat as simple text note — render as note node with content in Notes tab
- Do not silently lose content

---

## OPEN DESIGN QUESTIONS

*(Next design session — before coding these areas)*

```
research.bigpicture    ✓ LOCKED — five questions + A/B picker designed (see above)

session.submenus       modular picker submenus not fully defined

note.ideas-tab         how does "pull from research" work exactly?
                       → inline citation? copy text? linked reference block?

debrief.dismiss        confirmed: dismissed debriefs still create a mini-node (empty, logged)
                       → confirm with Jordan before coding

second-note prompt     timing: appears at type selection step or after intention is filled?
```

---

## BUILD ORDER IMPACT

Phase 4.5 items affected:
- **#8 (L3 node modal)** — placeholder shipped; full rework per this spec is a dedicated coding session
- **#9 (intake / the door)** — unchanged
- **#13 (capsule on-deck wiring)** — now also includes timerNodeId link

New sessions implied (in rough sequence):
1. Node creation modal — ceremonial visual system (hero orb, selector strip, color immersion) ← NEXT
2. Research widget system (big picture questions locked, ready to build)
3. Note node multi-tab
4. Debrief mini-node auto-insertion + voice capture
5. Session/immersion timer wiring (with #13)
