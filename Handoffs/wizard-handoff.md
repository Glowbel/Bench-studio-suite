# wizard-handoff.md
*Living document. Updated by every coding session before closing out.*
*Upload this alongside the permanent Build project docs to start any new thread.*

---

# ⟐ INSTRUCTIONS FOR THE CURRENT THREAD

You are reading this because you are starting or closing a session.

**At session START:** Read this document top to bottom before touching any code.
The decisions log records what was tried, what broke, and what must not be repeated.

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
Remove anything resolved. Add anything newly discovered.

**4. Update NEXT SESSION**
What to tackle first and why. Any warnings the next thread needs.

**5. Append to DECISIONS LOG**
Any new decisions made this session. Append only — never edit or delete existing entries.
Format: `[Month Year] Short description — reason. Outcome if relevant.`

**6. Flag maintenance needs for Jordan**
Before closing, explicitly tell Jordan if anything decided this session should be
reflected in the permanent project docs. Use this exact format at the end of your response:

> 📋 MAINTENANCE FLAGS
> - `master-build.md` needs: [what changed — phase status, file name, etc.]
> - `wizard-master-lean.md` needs: [any new locked decisions, hard flags, or architecture changes]
> - No updates needed to permanent docs this session. ← use this if nothing changed

Jordan updates those docs manually. Your job is to flag clearly so nothing slips.

---

# CURRENT FILE

`decision-wizard.html` — ~1,901 lines

---

# COMPLETED THIS SESSION

*(last 2 sessions only — trim older entries)*

**April 15 session:**
- Full three-stage flow: Discover → Align → Choose (seven internal screens)
- Value categories, specific values, SVG visual mapper, results ranking, feasibility drag-to-rank
- localStorage persistence, reset button, parser audit complete and clean
- Stress tested on real scenario (gold/silver inventory) — tool confirmed working

**April 28 session:**
- Design session only — no code written
- Three-tool suite architecture designed: Zoom Out + Decision Wizard + Count the Cost
- Gateway routing designed: entry question routes user to correct tool
- Count the Cost three pathways designed: Sandbox, Logistics Breakdown, Financial Reckoning
- Original Phase Two intake wizard repositioned as Pathway B inside Count the Cost

---

# WHAT REMAINS

## ⚠ DO NOT START CODING — design session required first

Three things to lock before any code is written:
1. Zoom Out — exact question sequence, output format, routing logic
2. Count the Cost sandbox — prompt wording, how AI sets scene, reflection mechanics
3. Gateway routing — exact wording of entry question and three routing paths

Once locked, build in this order:
1. Gateway entry screen (small — routing logic only)
2. Zoom Out tool
3. Count the Cost shell with pathway routing
4. Sandbox pathway (Pathway A)
5. Logistics Breakdown pathway (Pathway B)
6. Financial Reckoning pathway (Pathway C)
7. Transition logic between all three tools

Voice input (Whisper + Claude API) essential for Count the Cost especially.
Do not build without confirming integration approach in dedicated session.

---

# NEXT SESSION

**Do not start coding.** Design session required first.
See WHAT REMAINS above for the three things to lock before any code.

Parser audit: file is already clean. Verify stays clean before any new code is added.

---

# DECISIONS LOG
*Append-only. One entry per decision. Never delete or edit existing entries.*
*Before touching anything significant, read this log first.*

---

[Apr 2026] Parser constraints apply — same as The Bench and Constellation.
No arrow functions, no template literals, no spread operators. Single HTML file.

[Apr 2026] Three-stage architecture locked: Discover → Align → Choose.
Phase bar shows three landmarks only. Seven internal screens.
Do not add stages without design session — simplicity is intentional.

[Apr 2026] Emotional UX principle is non-negotiable.
Tool must feel WITH the person in the difficulty. Not a productivity system.
Any feature that makes it feel like a form or business tool violates this principle.

[Apr 2026] localStorage persistence — no save button, ever.

[Apr 2026] Value mapper interaction modes are non-overlapping by design.
Tap path = activate. Tap value (no path active) = read. Drag = connect.
These three must never interfere. Test carefully after any changes to mapper.

[Apr 2026] Feasibility drag: ghost element with frosted glass appearance.
backdrop-filter blur, subtle border, scale and rotation on lift.
Calculate drop position among non-dragging items only.

[Apr 2026] Stress test confirmed tool works on real scenario.
Gold/silver inventory — surfaced hybrid path not initially considered.
Key learning: what looks like one decision often contains hidden sub-paths.

[Apr 2026] Phase Two intake wizard — sequential, not comparative.
One path at a time. One question at a time. Sequential revelation only.
Do NOT build a comparison matrix — front-loaded, mentally crippling.

[Apr 2026] Voice input deferred. Whisper + Claude API is intended stack.
Confirm approach before building. Essential for Count the Cost especially.

[Apr 2026] Where this lives in The Bench — intentionally deferred.
Do not decide without a dedicated design session.

[Apr 2026] Parser audit complete — file is clean.
No arrow functions, template literals, or spread operators.
The ... instances are HTML placeholder text only, not JS.

[Apr 2026] Three-tool suite architecture designed.
Current tool is Tool 2 (Decision Wizard). Two new tools: Zoom Out (Tool 1), Count the Cost (Tool 3).
Gateway routes user to correct tool at entry. Tools interwoven — not strictly sequential.
Do not build any new code until Zoom Out and Count the Cost are fully designed.

[Apr 2026] Current Screen 0a entry point is too narrow for pre-decision users.
Solved by gateway routing — Zoom Out fires first when direction is unclear.
No change needed to existing screens.

[Apr 2026] Count the Cost has three pathways — sandbox, logistics, financial.
Routes based on what user actually needs. Combinations possible.

[Apr 2026] Original Phase Two intake wizard = Pathway B (Logistics Breakdown) inside Count the Cost.
Gemstone scenario question sequence maps directly. Still valid, repositioned.

[Apr 2026] Sandbox principle locked — AI sets scene, gets out of the way.
2-3 sparse evocative sentences place user inside decision already in motion.
AI does not evaluate responses. Does not redirect. Witnesses and reflects only.
No commitment pressure inside the sandbox.

[Apr 2026] Bench Event Operations Mode flagged as needed.
Bulk repricing, inventory visibility, distribution channels, event checklists.
Not a wizard concern — depends on Pieces tab (Phase 6) first.
