# bench-handoff.md
*Living document. Updated by every coding session before closing out.*
*Upload this alongside the permanent Build project docs to start any new thread.*

---

# ⟐ INSTRUCTIONS FOR THE CURRENT THREAD

You are reading this because you are starting or closing a session.

**At session START:** Read this document top to bottom before touching any code.
The decisions log at the bottom records what was tried, what broke, and what must
not be repeated. Check it before touching anything significant.

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
Remove anything fixed this session. Add anything newly discovered.
Keep this current and honest — it's the next thread's starting point.

**4. Update NEXT SESSION**
What to tackle first and why. Any warnings or context the next thread needs.

**5. Append to DECISIONS LOG**
Any new decisions made this session. Append only — never edit or delete existing entries.
Format: `[Month Year] Short description — reason. Outcome if relevant.`

**6. Flag maintenance needs for Jordan**
Before closing, explicitly tell Jordan if anything decided this session should be
reflected in the permanent project docs. Use this exact format at the end of your response:

> 📋 MAINTENANCE FLAGS
> - `master-build.md` needs: [what changed — new file name, phase status, etc.]
> - `bench-master-lean.md` needs: [any new locked decisions, hard flags, or architecture changes]
> - No updates needed to permanent docs this session. ← use this if nothing changed

Jordan updates those docs manually. Your job is to flag clearly so nothing slips.

---

# CURRENT FILE

`the-bench-classic-v0_4-phase4_5-carousel.html` — ~2,948 lines

---

# COMPLETED THIS SESSION

*(last 2 sessions only — trim older entries)*

**Phases 1–4 complete:**
- Full app shell, capsule, timer, todo, theme system, tab navigation
- Carousel shell with five cards built, card swipe navigation with weighted settling

**Phase 4.5 — in progress:**
- Carousel shell with five cards built and working
- Card swipe navigation with weighted settling transition

**Supabase:**
- Live and wired. One KV table `bench_data` with upsert pattern.
- localStorage first, Supabase async backup. Clean and solid.
- `pieces_published` table does NOT exist yet — planned for Phase 7.

---

# WHAT REMAINS

**Phase 4.5 — Studios Tab (immediate priority):**
Build order from bench-master-lean.md. Carousel shell done. Next:
- Full-screen environment transitions per card (capsule visibility rules apply)
- The Workshop — skill list view, node chain, node bubble
- The Door — conversational intake tree, four branches, routing logic
- The Compendium — search, highlights, by-skill views
- Constellation card — portal stub only until integration session
- The Archive — completed skill records, radial dot system
- Wire capsule On Deck session prompt

**Phase 6 — Pieces Tab (next major priority after 4.5):**
Currently pure stub. No piece data shape formally defined in code yet.
7 sub-tabs: Overview, Materials, Labor, Pricing, Payments, Notes, Publishing.
Foundation for website integration — must be built first.

**Phase 7 — Website Integration (3-6 week horizon):**
- Create `pieces_published` table in Supabase
- Build Publishing sub-tab with publish button
- Build public website reading from `pieces_published`
- Wire Square payment URLs per published piece

**Customers Tab:**
Phase 5. Not started.

---

# NEXT SESSION

**Start here:** Continue Phase 4.5 Studios tab build.
Read the full Phase 4.5 spec in bench-master-lean.md before writing anything.
The carousel shell is done. Build full-screen transitions next — this establishes
the capsule visibility rules for each card.

The Workshop is the most complex card — build it second after transitions are solid.
The Door intake tree is fully specced in bench-master-lean.md — build it third.
Constellation card is a portal stub only — do not attempt integration, just a placeholder.

**Warning:** Read the Studios tab spec completely in bench-master-lean.md before
writing a single line. The carousel visual design, node types, and intake conversation
all have specific locked specs.

---

# DECISIONS LOG
*Append-only. One entry per decision. Never delete or edit existing entries.*
*Before touching anything significant, read this log first.*
*Format: [Month Year] Short description — reason. Outcome if attempted.*

---

[Mar 2026] No arrow functions / template literals / spread operators.
Breaks Jordan's parser. Non-negotiable. Every file, every thread, forever.

[Mar 2026] Single HTML file architecture.
All logic in one self-contained file. No frameworks, no imports, no build tools.
Designed to survive migration to real host without structural changes.

[Mar 2026] localStorage first, Supabase async.
Never block on Supabase. Silent catch on failure. Boot tries Supabase first,
falls back to localStorage. This pattern is locked — do not change it.

[Mar 2026] addTodo(obj) is the universal task creation entry point.
Never create todos any other way. Shape defined once in bench-master-lean.md.

[Mar 2026] Flash-free is a first-class requirement.
No DOM rebuilds during live interactions. In-place DOM updates only.
No render() calls mid-gesture. Tick loop targets specific elements only.

[Apr 2026] Skills tab renamed to Studios tab.
Reflects true scope — immersive creative practice domains, not just technique tracking.

[Apr 2026] Carousel card order locked: Compendium · Constellation · The Door · Workshop · Archive.
The Door is center and default landing position.

[Apr 2026] Capsule visibility rules locked.
Visible: Workshop, Compendium. Hidden: Constellation, The Door, Archive.
Header hidden in all cards. Back arrow always visible.

[Apr 2026] Constellation card is a portal, not an embedded feature.
Standalone build. Integration session required before any wiring.
constellationId on leads[] exists conceptually — data shape not designed.
Do NOT build the bridge without a dedicated integration session.

[Apr 2026] Finance tab hidden until Phase 10.
hidden:true in ALL_TABS. Present in code, absent from UI. Do not expose.

[Apr 2026] Supabase anon key visible in source — intentional.
Relies on RLS policies for protection. Do not treat as a security issue.

[Apr 2026] pieces_published Supabase table — planned, not built.
Build Pieces tab (Phase 6) before attempting any website integration.

[Apr 2026] Product release direction established.
The Bench = official app release. Constellation = standalone or paid add-on.
Website integration = publishing feature. Keep architecture clean for this future.

[Apr 2026] Website integration architecture locked.
Supabase already wired. Add pieces_published table. Public website reads from it.
Square payment links per piece. No third-party commerce tools. Single-file HTML website.
Build sequence: Pieces tab → Publishing sub-tab → Supabase table → website → Square links.

[Apr 2026] Parser constraints are intentional and permanent for HTML distribution track.
Single HTML file that opens anywhere with zero setup is a deliberate product advantage.

[Apr 2026] App Store strategy locked — Capacitor wrapper, no rewrite needed.
Existing HTML file stays completely unchanged. Capacitor wraps it in a native shell.
One-time packaging step at submission (~50-100 lines of config, not app code).

[Apr 2026] HARD RULE — No embedded base64 images. Ever.
Base64 images caused a critical incident. File grew so large it broke context windows.
All images must be external file paths only. No exceptions.
Single-file hitting context window limits at ~2,950 lines. Must split before integration.
Full split spec in bench-master-lean.md. Dedicated session only.
