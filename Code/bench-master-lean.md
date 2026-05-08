# THE BENCH — Blueprint (Lean)
*Architecture, data model, locked decisions, hard flags.*
*Load alongside hard-rules.md and bench-handoff.md for any Bench coding session.*
*Last updated: May 2026*

---

## WHAT IT IS

Single-file vanilla JS app for a solo jeweler. Dark, focused, personal.
Operations cockpit — not small business software.

**Two visual variants (identical JS logic):**
- **Classic:** Cormorant Garamond + DM Mono, dark teal, `#080a0b` body
- **Observatory:** Cinzel Decorative + IM Fell English, starfield canvas, orrery loading

**Aesthetic:** Dark radial gradient. Teal/cyan/antique gold/sage palette. No borders for borders' sake.

---

## TAB ARCHITECTURE

```
[ Customers ] [ Studios ] [ Schedule ] [ Pieces ] [ Bench Library ] [ Finance ] [ + future ]
```

Seven tabs. Built for 9-10 without structural change.
Finance tab: `hidden:true` in ALL_TABS — present in code, absent from UI until Phase 10.
Future slots reserved: `supplier`, `journal`.

---

## DATA MODEL

Eight flat arrays, persisted via localStorage + Supabase background sync.
Reference each other by `id` only — never nested.

```
customers[]     — customer contact records
leads[]         — individual orders/repairs, pipeline-staged
skills[]        — craft techniques, full journey from spark to mastery
events[]        — calendar entries, linked to skills/leads/pieces by id
pieces[]        — physical objects: materials, labor, pricing, payments, photos
benchLibrary    — services/rates + materials reference libraries
todos[]         — the task queue
hoursLog[]      — immutable log of every timed work session
```

**Universal task object shape:**
```javascript
{
  id: Date.now(),
  label: "",
  notes: "",
  ordered: false,
  skillId: null, pieceId: null, laborId: null,
  scheduleEventId: null, durationMins: null,
  time: "", isBookmark: false, leadId: null
}
```

`addTodo(obj)` is the universal task creation entry point. Use it always. Never create todos any other way.

**Storage keys:** `bench-customers`, `bench-hours-log`, `bench-todos`, `bench-taborder`,
`bench-studio-settings`, `bench-care-templates`, `bench-invoices`, `bench-cpick-chips`

---

## ARCHITECTURE — THE SPLIT (critical, do this first)

File is ~2,950 lines. Context window pressure is real. Emergency base64 purge already performed.
**The split must happen before any app integration.**

Target modular structure:
```
the-bench/
├── index.html
├── styles.css
├── assets/skills/     ← external image paths only
└── js/
    ├── state.js       ← state object + constants + defaults
    ├── theme.js       ← theme system + color helpers
    ├── carousel.js    ← carousel drag handlers + render
    ├── capsule.js     ← capsule component
    ├── intake.js      ← intake bar, float pause, bench fade
    ├── timer.js       ← timer modal + logic + duration UI
    ├── skills.js      ← skills tab + card image references
    ├── modals.js      ← shared modal refresh + event binding
    ├── events.js      ← top-level event bindings
    ├── data.js        ← data actions (load/save/export)
    └── boot.js        ← boot sequence (loads last)
```

Split rules: parser constraints still apply. Load order matters. No-DOM-rebuild rule applies across all modules.
Extract CSS first, then assets, then JS in dependency order. Test after each extraction.
Current file is source of truth until split is verified. Dedicated session only.

---

## SUPABASE ARCHITECTURE

- One table: `bench_data` — flat key-value store. `key / value / updated_at`.
- Every `saveData(key, value)` POSTs with upsert behavior.
- Every `loadData(key, fallback)` GETs, falls back to localStorage if missing.
- localStorage writes first, Supabase fires async, silent catch on fail. Never block on Supabase.
- On boot: try Supabase first, fall back to localStorage.
- Anon key visible in source — expected for Supabase anon keys, relies on RLS. Not a security issue.
- `pieces_published` table: planned, not created. Do not build without Pieces tab first.

---

## THE CAPSULE WIDGET

Operational heart — live work surface, not navigation.

- **Face 1 (Todo):** Task queue up to 5, checkbox, inline add, timer button
- **Face 2 (Task Detail):** Full context, goal progress, On Deck flag, actions
- **Face 3 (Timer):** Mana bar, elapsed/countdown, play/pause/stop+log
- **CollapseBar:** Slim strip above capsule, tap to collapse
- **Timer Intake Flow:** Piece/Skill/Misc → specific item → barrel picker → start
- **Quick Count-Up:** Long-hold timer button → HoldMenu → instant start

---

## STUDIOS TAB — FIVE CAROUSEL CARDS

| Position | Card | Capsule | Feel |
|----------|------|---------|------|
| ① | The Compendium | Yes | Cataloging |
| ② | Constellation / Dreaming | No | Divergent |
| ③ CENTER | The Door | No | Intake |
| ④ | The Workshop | Yes | Journeying |
| ⑤ | The Archive | No | Honoring |

**Capsule visibility locked:** Visible in Workshop + Compendium only. Hidden in Constellation, Door, Archive.
Header hidden in all cards. Back arrow always visible.

**The Door intake tree** (opening: *"What's on your mind and heart today?"*)
Four branches → one clarifying follow-up each → graceful degradation for unknown requests.

**Constellation card:** Full-screen portal only. Standalone build. Integration session required before embedding.

---

## PIECES TAB

7 sub-tabs: Overview, Materials, Labor, Pricing, Payments, Notes, Publishing.
Currently pure stub. No piece data shape formally defined in code yet.
Foundation for website integration — must be built first.

**Publishing sub-tab:** Syncs to `pieces_published` Supabase table.
Piece marked published in Bench → writes to table → public website reads it → Square payment link → purchase.

---

## LOCKED DECISIONS

- `addTodo(obj)` — universal task creation. Never create todos another way.
- Finance tab hidden until Phase 10. `hidden:true` in ALL_TABS. Do not expose.
- Studios tab carousel card order locked: Compendium · Constellation · Door · Workshop · Archive.
- The Door is center and default landing position.
- Supabase anon key visible in source — intentional. Do not treat as security issue.
- App Store via Capacitor — no rewrite. Wrap existing file. One-time config at submission.
- Parser constraints are permanent for HTML distribution track. Not a limitation to fix.
- localStorage first, Supabase async. Never block on Supabase. This pattern is locked.

---

## HARD FLAGS — STOP AND ASK BEFORE BUILDING

- **Constellation integration** — standalone first, integration session required
- **Bridge to Constellation data** — `constellationId` on `leads[]`, data shape not designed
- **Finance tab** — hidden until Phase 10. Do not expose.
- **pieces_published website** — needs Pieces tab (Phase 6) built first
- **Event Operations Mode** — bulk repricing, inventory, distribution channels. Needs Phase 6 first.
