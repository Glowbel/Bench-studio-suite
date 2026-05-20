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

**Debrief** is NOT a picker type. It appears as:
1. Auto-inserted mini-node after any session with progress
2. A user-selectable path when creating a second note node

---

## 1. RESEARCH NODE

**Role:** Used when practice/immersion has plateaued. Captures knowledge, plans next steps, establishes direction before returning to execution.

### Completion logic
Two paths (user sets at creation or can toggle):
- **Study-based:** N sessions or hours of study (same as current system)
- **Manual readiness:** User marks ready when they feel prepared to proceed

### Modal — modular widget interface
Blank canvas with a floating **+ Add section** button. Each tap opens a type picker:

| Widget | Purpose |
|--------|---------|
| Text | Free-form notes, any length |
| Photo board | Pin-board style image collection |
| Checklist | Bullet list with checkboxes |
| Big picture | Structured questions → plan of action (design session pending — see OPEN QUESTIONS) |

Widgets are reorderable, deletable. Order persists to node data.

### Data shape additions
```
node.widgets: []  // ordered array of { id, type, content }
// text:     { type:"text", body:"" }
// photo:    { type:"photo", items:[] }  // items = external file paths only
// checklist:{ type:"checklist", items:[{ id, text, done }] }
// bigpicture:{ type:"bigpicture", answers:{} }  // questions TBD — design session pending
```

---

## 2. SESSION NODE

**Role:** Quick, direction-focused execution. Light input, heavy reps. Goal can be inherited from a completed or populated research node on the same skill.

### Completion logic
- N sessions or N hours (same as current)
- If skill has a populated research node: goal and intention can be pulled from it (user prompted at creation: "use research node direction?")

### Modal — modular picker
Lightweight. Shows:
- Progress bar + session count
- Direction label (intention or pulled from research)
- Begin button → routes to timer setup (see IMMERSION for timer wiring — same flow)
- Submenus for goal adjustment accessible but not prominent

*(Submenus and picker detail: design session pending — see OPEN QUESTIONS)*

---

## 3. IMMERSION NODE

**Role:** Long engaged sessions. Reps and flow. Minimize friction. No complex input — just start and go.

### Completion logic
Same as session: N sessions or N hours.

### Modal — minimal
- Progress + goal display
- Immediate **start session** button (primary, full-width, prominent)
  - Tap → closes node modal → opens todo/timer setup modal → timer links back to this node (node.id stored in timer session)
  - Node progress increments when timer session is logged
- May pull from note node or research node for context (shown as a dim reference line, not intrusive)

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
- Simple dashboard tab within Notes: shows all page names, tap to open, option to delete

**Ideas tab detail:**
- Free-form text area (base)
- Sidebar or pull-down: lists this skill's research nodes → tap to expand → shows widget contents → tap to insert a reference or copy section

### Second note node (user-created)
When a user taps "+ new node" and picks "note" and a primary already exists:
- System shows a follow-up prompt: **"Make this a debrief, or add a note?"**
  - **Debrief** → creates a debrief node (simple text sheet, see below)
  - **Add a note** → becomes a second access point to the primary note node, opens directly to a fresh blank page in the Notes tab

### Visual pulse states
```
baseline:        soft, dim (like any node)
has content:     gentle steady glow (note node is populated)
debrief update:  pulse burst → fades to has-content glow
unacknowledged:  rhythmic pulse until first opened after auto-populate
```

---

## 5. DEBRIEF MINI-NODE

**Role:** Quick reflection after any session with progress. Auto-inserted between the current node and the next in the L2 path. Not user-created.

### Trigger
After any timer session that increments a node's progress, a debrief prompt appears. User fills it in (or dismisses — dismissed debriefs still create a mini-node marked empty).

### Visual
Small node (half-size) positioned between the worked node and the next node in the L2 parabolic column. Uses a distinct visual — no type ring, dim paper/scroll glyph, metal-state coloring.

### Content
Single textarea. Date-stamped. Linked to the node it followed.

### Routing
Content automatically syncs to the skill's primary note node → Debriefs tab. If no note node exists yet, queued — syncs when one is created.

### Data shape
```
// Lives in skill.debriefs[] (separate from skill.nodes[])
{ id, afterNodeId, date, text, acknowledged:false }
```

---

## 6. DATA MODEL CHANGES

```
skill.nodes[]         unchanged shape, new per-type widget data on research
skill.debriefs[]      NEW — debrief mini-node records
node.widgets[]        NEW on research nodes
node.timerNodeId      NEW — timer sessions link back to node (immersion/session)
node.readiness        NEW on research — "study" | "manual"
node.readyFlag        NEW on research — boolean, manual readiness toggle
note node tracking:   state.skills[i].primaryNoteNodeId (id of first note node created)
```

### Migration note
Existing "debrief" type nodes in localStorage (from pre-spec sessions):
- Treat as a simple text note — render as a note node with content in Notes tab
- Do not silently lose content

---

## OPEN DESIGN QUESTIONS

*(Next design session — before coding these areas)*

```
research.bigpicture    structured questions not yet designed
                       → needs design session: what are the 3-5 steering questions?
                       → how do answers shape progression/next steps?

session.submenus       modular picker detail + submenus not fully defined
                       → what are the submenu paths?

note.ideas-tab         how does "pull from research" work UI-wise?
                       → inline citation? copy-paste? linked reference?

debrief.dismiss        if user dismisses debrief prompt, does it still create a mini-node?
                       → locked above as: yes, marked empty — confirm with Jordan

second-note prompt     timing: prompt appears at node-type selection or after?
```

---

## BUILD ORDER IMPACT

Phase 4.5 build order items affected:
- **#8 (L3 node modal)** — shipped as placeholder compact modal; needs full rework per this spec
- **#9 (intake / the door)** — unchanged
- **#13 (capsule on-deck wiring)** — now also includes `timerNodeId` link

New items implied:
- Research widget system (substantial — own coding session)
- Note node multi-tab (substantial — own coding session)
- Debrief mini-node auto-insertion (own coding session)
- Session/immersion timer wiring (with #13)
