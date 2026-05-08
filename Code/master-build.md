# MASTER — Build & Status
*Current state, build sequence, file names, integration flags.*
*Permanent in Studio — Build project. Never upload manually.*
*Last updated: May 2026*

---

⚠ MAINTENANCE NOTE — This doc does not update itself.
At the end of every coding session, Claude will issue a 📋 MAINTENANCE FLAGS block
telling you exactly what changed. Update this doc manually at that point.
Things that change most often: current file names, line counts, phase statuses, build sequence order.

---

---

# CURRENT FILE STATUS

| App | Current File | Lines | Phase | Status |
|-----|-------------|-------|-------|--------|
| The Bench | `the-bench-classic-v0_4-phase4_5-carousel.html` | ~2,950 | 4.5 | Carousel shell done, full redesign in progress |
| Constellation | `constellation-v1-40.html` | ~8,846 | 1 | Linking bugs fixed, session management rebuilt, bugs 12/13 remaining |
| Decision Wizard | `decision-wizard.html` | ~1,901 | 1 | Working prototype, design session required before next code |
| Spatial Calendar | `spatial-day-v21.html` | — | 2 | Map + Clock modes built, slot calibration done |

---

# WHAT TO DO NEXT — ORDERED

**Do not skip or reorder without a design session.**

1. ⚠ **Split The Bench into modular files** — before anything else. ~2,950 lines, hitting limit.
2. ⚠ **Split Constellation into modular files** — ~8,846 lines, same urgency.
3. **Constellation — Temporary session expiry logic** — `expiresAt` stored, nothing checks it yet
4. **Constellation — Hardcore export modal at timer zero** — `endHardcoreSession()` is still a stub
5. **Finish Constellation Phase 1** — bugs 12, 13 remaining (see const-master-lean.md)
6. **Build The Bench Phase 4.5** — Studios tab carousel full build (shell done)
7. **Build The Bench Phase 6** — Pieces tab (foundation for website)
8. **Build The Bench Phase 7** — Publishing sub-tab + website
9. **Spatial Calendar Phase 3** — Multi-tier ring layers (30-min, 15-min, 5-min marks)
10. **Design and wire Constellation → Bench bridge** — dedicated integration session first
11. **Decision Wizard** — design session required (Zoom Out + Count the Cost) before any code
12. **Design Constellation structure mode** — minimum viable only
13. **Wire Wizard → Bench Skills bridge** — dedicated session
14. **Wire Spatial Calendar → Bench** — dedicated session

---

# INTEGRATION FLAGS — DO NOT WIRE WITHOUT DEDICATED SESSIONS

| Bridge | Status | Flag |
|--------|--------|------|
| Constellation → Bench | Not designed | `constellationId` on `leads[]` only touch point. Data shape not designed. |
| Wizard → Bench Skills | Not designed | Wizard identifies path. Skills walks it. No design yet. |
| Spatial Calendar → Bench | Not designed | Phase 8 of calendar. No design yet. |
| Constellation → Structure Mode | Not designed | Needs session after both modes exist. |
| Count the Cost → Structure Mode | Not designed | Needs both tools built first. |

---

# SUPABASE STATUS

- **`bench_data`** — live and wired. KV table, upsert pattern. localStorage first, Supabase async.
- **`pieces_published`** — planned, not created. Needed for website. Build Pieces tab first.
- Anon key visible in source — intentional. Relies on RLS. Not a security issue.
- RLS policies need confirmation before real user data lives there.

---

# THE BENCH — PHASE PLAN

| Phase | Status | What |
|-------|--------|------|
| 1–4 | ✅ Done | Shell, capsule, timer, todo, theme, tabs, Studios v1 kanban |
| 4.5 | 🔨 In Progress | Studios tab full redesign — carousel + immersive environments |
| 5 | — | Customers tab |
| 6 | — | Pieces tab — **priority after 4.5, foundation for website** |
| 7 | — | Pieces publishing + website integration |
| 8 | — | Bench Library tab |
| 9 | — | Schedule tab |
| 10 | — | Finance + invoices (hidden until this phase) |
| 11 | — | Intake + data |
| 12 | — | CSS + polish |

**Phase 4.5 build order:** Carousel shell (done) → full-screen transitions → Workshop → The Door → Compendium → Constellation portal stub → Archive → wire capsule On Deck

---

# CONSTELLATION — PHASE PLAN

| Phase | Status | What |
|-------|--------|------|
| 1 | 🔨 In Progress | Core mechanic, sessions, persistence — bugs 12/13 remaining, linking audit in progress |
| 1.5 | — | Visual richness: five mass states, crystallization ceremony, renders — HARD FLAG |
| 2 | — | Sketch bubble: photo + line tracing + stone placement — needs own scoped spec |
| Horizon | — | Binary star (session required), draw mode (session required), bridge (session required) |

**Next session priorities:**
1. Temporary session expiry logic
2. Hardcore export modal at timer zero
3. Linking audit — Bug 2 (breakAllLinks rename + autoSave), Bug 4 (orbit speed asymmetry), Bug 5 (link conversion side effects)
4. Voice bubble (Phase 2 entry — design session first)

---

# SPATIAL CALENDAR — PHASE PLAN

| Phase | Status | What |
|-------|--------|------|
| 1 | ✅ Done | Canvas, pipe geometry, Map mode, ring flow |
| 2 | ✅ Done | Clock mode, slot calibration, double-tap UI hide, handle offsets |
| 3 | — | Multi-tier ring layers (30-min, 15-min, 5-min marks) |
| 4 | — | NOW arc as seconds sweep |
| 5 | — | Schedule blocks at real time positions — design session first |
| 6 | — | Preset save/load system |
| 7 | — | Week/month view — design session first |
| 8 | — | Bridge to The Bench — design session first |

---

# DECISION WIZARD — STATUS

Current file is clean and working. **Do not write new code until design session locks:**
1. Gateway routing — exact wording, three routing paths
2. Zoom Out tool — question sequence, output format
3. Count the Cost — sandbox prompts, AI scene-setting, three pathways

Build order after design session:
Gateway screen → Zoom Out → Count the Cost shell → Sandbox pathway → Logistics → Financial → Transitions
