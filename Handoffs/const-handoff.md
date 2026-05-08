# const-handoff.md
*Living document. Updated by every coding session before closing out.*
*Upload this alongside the permanent Build project docs to start any new thread.*

---

# ⟐ INSTRUCTIONS FOR THE CURRENT THREAD

You are reading this because you are starting or closing a session.

**At session START:** Read this document top to bottom before touching any code.
The decisions log is especially important — it records what was tried, what broke,
and what must not be repeated. Check it before touching anything significant.

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

**3. Update BUGS REMAINING**
Remove fixed bugs. Keep open ones. Add newly discovered ones.
Each entry: bug number, one-line description, any known cause or constraint.

**4. Update NEXT SESSION**
What to tackle first and why. Any warnings the next thread needs.

**5. Append to DECISIONS LOG**
Any new decisions made this session. Append only — never edit or delete existing entries.
Format: `[Month Year] Short description — reason. Outcome if relevant.`

**6. Flag maintenance needs for Jordan**
Before closing, explicitly tell Jordan if anything decided this session should be
reflected in the permanent project docs. Use this exact format at the end of your response:

> 📋 MAINTENANCE FLAGS
> - `master-build.md` needs: [what changed — new file name, phase status, line count, etc.]
> - `const-master-lean.md` needs: [any new locked decisions, hard flags, or architecture changes]
> - No updates needed to permanent docs this session. ← use this if nothing changed

Jordan updates those docs manually. Your job is to flag clearly so nothing slips.

---

# CURRENT FILE

`constellation-v1-40.html` — 8,846 lines

---

# COMPLETED THIS SESSION

*(last 2 sessions only — trim older entries)*

**Previous session (May 2026):**
- Dashboard drawer built and wired — left-edge trigger, slides from left, scrim closes
- Three tabs built: Projects (active), Exports (full UI), Bridge (placeholder)
- Session types built: Saved, Temporary, Hardcore — all initiation flows complete
- Hardcore countdown timer dock: stone tablet + gold SVG scrollwork + carved Cinzel numerals
- Red vignette field overlay during Hardcore sessions
- Three-layer persistence system built and verified: localStorage + IndexedDB + ZIP export/import
- Thought editing inside zoomed bubble — three-dot menu pattern
- Mutual link grounding rule — bubble with 2+ mutual links skips orbit-join
- Session list: delete with confirmation modal, clearField() on delete

**Current session (May 2026):**
- Self-Awareness Loop added to Special Features (Settings Menu 4) — opt-in, user-defined threshold, custom message, fires once per session
- Bubble cap system removed — `bubbleCap` state field gone, old capacity prompt HTML/CSS/JS fully stripped
- `ensureSession()` added — first field interaction silently creates an Untitled saved session if none exists
- Session switching fixed — all three creation paths (Saved, Temporary, Hardcore) now save current session and call clearField() before switching
- Session drawer redesigned — ✕ replaced with ⋯ three-dot menu, inline action tray: Rename, Export, Delete
- Rename bug fixed — `settled` flag prevents Enter+blur double-fire; parentNode guard prevents NotFoundError
- Link type conversion — `commitLink` now detects existing link of different type, breaks it cleanly, then creates new type
- Induced orbit tracking — `inducedOrbit` flag added to bubble data shape; mutual-induced orbits are now tracked
- `cleanupInducedOrbiters(planetId)` added — sweeps orphaned induced orbiters when support chain breaks
- `silentlyReleaseFromOrbit(b)` added — internal teardown with no UI ceremony for cleanup sweeps
- All three teardown paths (breakSingleLink, breakAllLinks, cleanupBubbleLinks) now call cleanupInducedOrbiters
- Contact dwell system updated — 18px buffer for moon targets, 180ms forgiveness window for brief contact breaks during orbit motion
- `inducedOrbit` field persisted through serialize/deserialize

---

# BUGS REMAINING

**Bug 12:** Portal state triggers too easily.
Auto-crystallization removed — now moot for triggering. Visual threshold for portal-icon
display should still require meaningful mass. Confirm with Jordan before touching.

**Bug 13:** Replace auto-portal with manual completion circle.
Inside zoomed bubble: tappable circle user taps to mark complete/crystallize.
Confirmed by Jordan — manual only, no auto-trigger. Deferred — design discussion required.

**Bug 14:** Settings sub-panel header redesign.
Back arrow LEFT of sp-header, section name centered, ✕ RIGHT.
Do NOT start without reading sp-header drag/collapse logic — it doubles as drag handle.
Low priority — Jordan said current state is functional enough to move past for now.

**Bug 2 (linking audit):** `breakAllLinks` is misnamed and missing `autoSave()`.
Breaks only most recently formed link, not all links. Name is a lie and a maintenance hazard.
Missing autoSave() at the end. Safe to fix in isolation — small change.

**Bug 4 (linking audit):** Orbit speed inheritance asymmetry between mutual-join-orbit
and planetary-pull-mutual-partner paths. Low priority visual inconsistency.

**Bug 5 (linking audit):** Link type conversion can cause geometric chaos when the dragged
bubble is already in a third bubble's induced orbit. Partially mitigated by cleanupInducedOrbiters
sweeps. Monitor during testing — may need a full-release-before-convert approach.

---

# NEXT SESSION

**Priority order:**

**1. Temporary session expiry logic**
`expiresAt` is stored (24hr from creation) but nothing checks it.
On drawer open, scan session list for expired Temporary sessions.
If expired: show subtle indicator ("expired") and offer to delete.
Do not auto-delete — always user-confirmed.

**2. Hardcore export modal at timer zero**
`endHardcoreSession()` currently freezes field and clears dock/vignette.
Needs: export modal fires, field stays frozen, editable session name,
export button triggers `exportSessionZip()`, safety confirmation before data delete.

**3. Linking audit — remaining bugs**
Bug 2 first (small, isolated). Bug 4 after. Bug 5 monitor before deciding whether to fix.
Read the linking audit section of const-master-lean.md before touching anything.

**4. File split — structural priority**
File is 8,846 lines. Context window pressure is real and growing.
Same pattern as The Bench split. Dedicated session only. Do before any integration work.

---

# DECISIONS LOG
*Append-only. One entry per decision. Never delete or edit existing entries.*
*Before touching anything significant, read this log first.*
*Format: [Month Year] Short description — reason. Outcome if attempted.*

---

[Mar 2026] No arrow functions / template literals / spread operators.
Parser constraint inherited from The Bench. Non-negotiable. Every file, every thread.

[Mar 2026] Single self-contained HTML file. No frameworks, no imports.

[Mar 2026] Two-pass physics loop — do not revert to single pass.
Pass 0: free bubbles. Pass 1: moons. Order matters for stable orbits.

[Mar 2026] addMass() is the single weight entry point — never set b.mass directly.
All mass changes route through this function to keep physics consistent.

[Mar 2026] Flash-free is a first-class requirement.
No DOM rebuilds during live interactions. In-place updates only during gestures.

[Apr 2026] Meaningful interaction definition locked.
Adding, editing, moving, linking, increasing gravity = meaningful (adds mass).
Viewing = vitality signal only (resets staleness, does not add mass).

[Apr 2026] Bubble cap: soft at 5. Sixth triggers prompt. Never blocks creation.
NOTE: This decision was superseded in May 2026 — see below.

[Apr 2026] Dissolution: south compass → surge → collapse → smoke → residue star.
Residue: hollow 5-point star, color-coded by richness. Long-hold to revive with mass+2 buff.

[Apr 2026] Standalone build first — integration session required before embedding in The Bench.
constellationId on leads[] is the only touch point. Data shape not designed. Do not wire.

[Apr 2026] Binary star system — attempted, broke things, reverted. Session required before retry.

[Apr 2026] Settings panel rearchitected as nav hub with sub-views.
showSpView(name) is the single entry point. Views: 'nav', 'visual', 'decay', 'special'.
closeSettings() resets to 'nav'. sp-header drag/collapse logic untouched.

[Apr 2026] Export system designed — five formats. Needs dedicated design session before any code.
Do not build any export code without that session.

[Apr 2026] Structure mode designed — minimum viable version only.
Two additions: orbital lane snapping + physics stability toggle. Nothing else yet.
Do not build intake wizard or category moons without usage experience first.

[Apr 2026] Staleness pauses on session exit. Serialize as-is. Do NOT recalculate from wall-clock.
Staleness measures active inattention, not elapsed time while app is closed.

[May 2026] Three-layer persistence locked: localStorage + IndexedDB + ZIP.
localStorage → session JSON. IndexedDB → binary assets (voice, sketch, renders).
ZIP → complete portable save file. Assets tab (future) → individual file browser.
Architecture compatible across HTML, Capacitor, and hosted tracks. Build once, works everywhere.

[May 2026] HTML vs native feature split — locked product decision.
HTML: single session, ZIP export/import, unmatched shareability.
Native (Capacitor): multi-session, full search, autosave to filesystem.
Split is intentional — ceiling of HTML is the upgrade path to native. Do not close the gap.

[May 2026] Binary assets require IndexedDB, not localStorage. localStorage cap ~5MB.
All binary assets keyed by stable assetId. Bubble JSON references assetId only.
On bubble delete → clean IndexedDB. On ZIP export → bundle assets alongside JSON.

[May 2026] Session export = save file (opaque). Asset export = individual files from Assets tab.
User never needs to open or re-zip a session ZIP. Two separate export modes.

[May 2026] node --check is the correct syntax validator.
new Function() and vm.Script give false positives on valid browser JS. Do not use them.

[May 2026] Bubble data shape locked through crystallization — see const-master-lean.md.
Key additions: type field, voiceNoteId, voiceTranscript, voiceDistilled, sketchImageId,
sketchLayers, lastDeletedThought. Full shape in const-master-lean.md.

[May 2026] Mutual link grounding rule added.
Bubble with 2+ mutual links skips orbit-join when new mutual link committed.
Drift physics: +1.8px per mutual-linked moon for perceived gravitational tension.

[May 2026] Session UI — no auto-open on session creation.
Field opens clean after session created. User navigates to drawer intentionally.

[May 2026] Thought editing — three-dot menu pattern locked.
⋯ expands inline to copy + delete. Outside tap collapses via document listener.
Double-tap text → inline edit mode. Enter/blur commits. Empty commit deletes thought.

[May 2026] Hardcore session lifecycle — export modal at zero not yet built.
endHardcoreSession() stubs to TODO. Export modal is next session priority.

[May 2026] Bubble cap system removed entirely. bubbleCap state field gone.
Old hard-coded soft cap of 5 replaced by opt-in Self-Awareness Loop in Special Features.
User sets their own threshold and message. No system-enforced cap. Decision: cap was too prescriptive.

[May 2026] Self-Awareness Loop added as first feature in Special Features (Settings Menu 4).
Off by default. User-defined threshold (any positive integer), custom message.
Fires once per session. Resets on session load. selfAwarenessOn/Threshold/Msg/Fired in state.
Other Special Features slots reserved for future additions.

[May 2026] Auto-session on first field interaction.
ensureSession() called at top of openSummonMenu(). Creates Untitled saved session if none exists.
Names increment (Untitled, Untitled 2, etc.) to avoid collision. Session appears in drawer immediately.
Motivation: user should be able to dive straight into the field without ceremony.

[May 2026] Session switching — save-before-switch pattern locked.
All three creation paths (si-begin, hc-begin) and loadSession() now call saveCurrentSession()
before clearing the field and assigning the new session ID. Sessions are fully isolated.

[May 2026] Session drawer — ✕ replaced with ⋯ three-dot menu.
Inline action tray: Rename (inline input), Export (fires exportSessionZip), Delete (confirmation overlay).
One tray open at a time. Tray closes on drawer background tap or drawer close.
Multi-select flagged as future session — dedicated design required before building.

[May 2026] Link type conversion added to commitLink.
If an existing link between two bubbles has a different type than the requested type,
breakSingleLink is called first, then the new link is created. Same-type remains a no-op.

[May 2026] Induced orbit tracking added. inducedOrbit flag on bubble data shape.
Set true when mutual link side-effect pulls a bubble into orbit. Cleared on any proper release.
cleanupInducedOrbiters(planetId) sweeps orphans after any teardown. silentlyReleaseFromOrbit(b) is internal helper.
Fixes: ghost moons orbiting planets after their support chain is broken.

[May 2026] Contact dwell system updated for moving targets.
Moon targets get 18px contact buffer vs 10px for static bubbles.
180ms forgiveness window added — brief contact breaks don't reset dwell timer.
Motivation: moon targets orbit continuously; 600ms unbroken contact was unreachable in practice.

[May 2026] Moon drag behavior locked — drag adjusts orbit radius only, not field position.
To re-link a moon, drag a free bubble onto the moon. Reverse direction always works.
Full re-linking from moon side deferred to draw mode gesture vocabulary session.
