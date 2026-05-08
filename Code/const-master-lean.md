# CONSTELLATION — Blueprint (Lean)
*Architecture, data model, locked decisions, hard flags.*
*Load alongside hard-rules.md and const-handoff.md for any Constellation coding session.*
*Last updated: May 2026*

---

## WHAT IT IS

Divergent creative companion. A spatial field where ideas exist before they've
earned formalization. Ideas accumulate mass through interaction and crystallize.

**The mineral metaphor is the philosophical core. Honor it precisely.**
Ideas are elemental. Interaction is pressure. Crystallization is the phase transition
from thought to committed work. The stone is unreplicable, earned, beautiful.

**Two modes:**
- **Creative** — entropy, drift, dissolution. The universe tends toward entropy.
- **Structure** — organization, orbital lanes, gravitational bias toward clarity.
  Decay still runs — in structure mode it means: *this hasn't found its place yet.*

**Standalone build first.** Integration session required before embedding in The Bench.

---

## STATE OBJECT

```javascript
var state = {
  bubbles: [], links: [], residueStars: [], unlinkedNodes: [],
  nextId: 1,
  activeCompassId: null, zoomTargetId: null, previewTargetId: null,
  pendingSummonX: 0, pendingSummonY: 0,
  dragging: null, dragOffsetX: 0, dragOffsetY: 0,
  fieldFrozen: false,
  decayInterval: 6000,
  selfAwarenessOn: false, selfAwarenessThreshold: 10,
  selfAwarenessMsg: '', selfAwarenessFired: false,
  currentSessionId: null, currentSessionType: null
};
```

Note: `bubbleCap` has been removed. Bubble cap is now an opt-in user setting
via Special Features → Self-Awareness Loop, not a hard system constraint.

---

## BUBBLE DATA SHAPE (locked through crystallization)

```javascript
{
  id: Number, label: String,
  x: Number, y: Number, homeX: Number, homeY: Number,
  mass: Number,               // use addMass() always — NEVER set directly
  type: 'text' | 'voice' | 'sketch',
  thoughts: [],
  staleness: Number, crystallized: Boolean, viewed: Boolean,
  orbitOf: id | null, orbitRadius: Number | null,
  orbitAngle: Number | null, orbitSpeed: Number | null,
  orbitScale: Number | null,  // 0.75 for moons
  orbitAnchor: Boolean, isPlanet: Boolean,
  inducedOrbit: Boolean,      // true if orbit is a side effect of mutual link chain — not a direct planetary link
  voiceNoteId: null,          // IndexedDB asset ID
  voiceTranscript: null, voiceDistilled: null,
  sketchImageId: null,        // IndexedDB asset ID
  sketchLayers: null,
  lastDeletedThought: null,   // single-level undo for text
  el: DOMElement,             // cached at renderBubble
  mutualRingEl: DOMElement | null,
  orbitalPathEl: DOMElement | null,
  driftPhaseX, driftPhaseY, driftSpeedX, driftSpeedY
}
```

---

## PHYSICS LOOP

```javascript
// Two-pass — do NOT revert to single pass
for (var pass = 0; pass < 2; pass++) {
  // pass 0: free bubbles first
  // pass 1: moons second
}
```

---

## KEY FUNCTIONS

| Function | Purpose |
|----------|---------|
| `addMass(bubbleId, amount)` | Single weight entry — never set b.mass directly |
| `bubbleRadius(b)` | Base 22 + mass×7, applies orbitScale |
| `updateBubbleVisualMass(b)` | Repaints bubble after mass change |
| `commitLink(sourceId, targetId, type)` | Creates link, wires orbital/mutual state. Converts existing link if type differs — calls breakSingleLink first |
| `breakSingleLink(bubbleId, otherBubbleId)` | Breaks one specific link, full teardown, calls cleanupInducedOrbiters |
| `breakAllLinks(bubbleId)` | Breaks most recently formed link on a bubble (surgical, not all links) |
| `cleanupBubbleLinks(bubbleId)` | Removes all DOM artifacts for a bubble's links. Called on dissolution |
| `cleanupInducedOrbiters(planetId)` | Sweeps all induced orbiters of a planet whose mutual chain is now broken — releases orphans silently |
| `silentlyReleaseFromOrbit(b)` | Internal teardown for induced-orbit cleanup. No UI flash |
| `releaseFromOrbit(b)` | User-initiated orbit break (drag to release zone). Clears inducedOrbit flag |
| `separateOverlaps(dropped)` | Post-drop collision resolution |
| `ensureSession()` | Called on first field interaction — silently creates an Untitled saved session if none exists |
| `openCompass(bubbleId, bx, by)` | Centers on bubble, computes arc, freezes field |
| `closeCompass(fireDir)` | Fires action, resumes field |
| `freezeField()` / `resumeField()` | Toggle physics + CSS pause |
| `initiateDissolution(bubbleId)` | Dissolution animation + residue star |
| `reviveStar(residue, starEl)` | Revives residue star as fresh bubble |
| `drawTethers()` | Redraws all link lines each frame |
| `clearField()` | Removes all DOM + resets all state arrays |
| `serializeSession()` | Strips DOM refs, writes pure JSON to localStorage |
| `deserializeSession(id)` | Three-pass: planets → moons → link visuals |
| `respawnLinkVisuals(link)` | Restores orbital paths + mutual rings WITHOUT mass effects |
| `autoSave()` | No-op if no currentSessionId, else saves session |
| `exportSessionZip(sessionId)` | Bundles JSON + IndexedDB assets as .zip download |
| `importSessionZip(file)` | Restores full session including binary assets |

---

## THREE-LAYER PERSISTENCE

- **localStorage** — session metadata + bubble/link JSON. Small, fast, always available.
- **IndexedDB** — binary assets: voice recordings, sketch photos, crystallization renders.
  All binary assets keyed by stable `assetId`. Bubble JSON references assetId only.
  On bubble delete → clean IndexedDB assets. On ZIP export → bundle alongside JSON.
- **ZIP export/import** — complete portable save file. Session export = save file (opaque).
  Asset export = individual files from Assets tab (future). User never needs to re-zip.

**Syntax validation:** Always use `node --check /tmp/test.js`. Not `new Function()` or `vm.Script` — they give false positives.

---

## SESSION TYPES

| Type | Visual | Behavior |
|------|--------|----------|
| Saved | White/silver, no border | Persists indefinitely |
| Temporary | White, slow pulsing orange border | Expires 24hr after creation |
| Hardcore | Red text, countdown badge | Destructs at timer zero |

**Staleness pauses on session exit.** Serialize staleness values as-is. Do NOT recalculate from wall-clock time.
Staleness measures active inattention, not elapsed time while app is closed.

**Autosave hooks:** createBubble, addMass, commitLink, breakSingleLink, dissolution, drag release, thought add/edit/delete.

**Session switching:** All three session creation paths (Saved, Temporary, Hardcore) now call `saveCurrentSession()` + `clearField()` before assigning the new session ID. Sessions are real and isolated from each other.

**Auto-session:** If no session exists when the user first interacts with the field (long-hold to summon), `ensureSession()` silently creates a Saved session named "Untitled" (or "Untitled 2" etc. if names collide). The session appears in the drawer immediately.

---

## SETTINGS PANEL — MENU STRUCTURE

| Slot | Name | Status |
|------|------|--------|
| 1 | Visual | Active — link line styles, brightness |
| 2 | Decay | Active — staleness rate |
| 3 | Menu 3 | Placeholder (dim) |
| 4 | Special Features | Active — Self-Awareness Loop |

**Special Features sub-menu** (sp-view-special):
- **Self-Awareness Loop** — opt-in, off by default. User sets a threshold (any number, no cap) and a custom message. Fires once per session when live bubble count hits threshold. Resets on session load.

---

## LOCKED DESIGN DECISIONS

**Bubble interaction model:**
- Tap (<320ms) → zoom/preview
- Hold 250ms → radar pulse
- Hold 250ms + drag (>18px) → move mode
- Hold 950ms no move → compass opens, field freezes

**Compass directions:**
- North → gravity submenu (increase/decrease mass)
- South → dissolve
- West → link (break/create)
- East → move node
- Diagonals reserved

**Linking zones:**
- Zone 1 (planetary, 1 bubble-radius out): target = planet, dragged = moon
- Zone 2 (mutual, 2 bubble-radii out): peer tether, neither gains mass
- Contact dwell: 600ms before zones appear
- Moving targets (moons): larger contact buffer (18px vs 10px) + 180ms forgiveness window on brief contact breaks so orbiting bubbles are reliably detectable as link targets

**Link type conversion:** Dragging a free bubble onto an already-linked bubble with a *different* link type will convert the link. `commitLink` calls `breakSingleLink` first, then creates the new type. Same-type drags remain no-ops.

**Moon drag behavior:** Dragging a moon adjusts its orbit radius only — it does not move the bubble across the field. To re-link a moon, drag a free bubble onto the moon instead. This is intentional. Full re-linking via draw gestures is a future design session item.

**Induced orbits:** When a mutual link pulls a bubble into another bubble's orbit as a side effect, that bubble is marked `inducedOrbit: true`. When any link in the support chain breaks, `cleanupInducedOrbiters` sweeps all induced orbiters of the affected planet and releases any that are no longer supported. Planets un-anchor if they lose all moons through this sweep.

**Session drawer — three-dot menu:** Each session row has a ⋯ button. Tap opens an inline action tray: Rename (inline input, Enter/blur commits), Export (fires exportSessionZip), Delete (routes through confirmation overlay). Only one tray open at a time. Hardcore active sessions show timer badge instead of menu.

**Meaningful interaction:** Adding, editing, moving, linking, increasing gravity.
Viewing resets staleness only — does not add mass.

**Bubble cap removed.** Previously hard-coded at 5. Now an opt-in user feature in Special Features → Self-Awareness Loop. No system-enforced cap exists.

**Mutual link grounding:** Bubble with 2+ mutual links skips orbit-join when new mutual link committed.

**HTML vs Native split — locked product decision:**
- HTML version: single session at a time, ZIP export/import, unmatched shareability
- Native app (Capacitor): multi-session, full search, autosave to filesystem, Assets tab
- This split is intentional. Do not try to close the gap in HTML. The ceiling is the upgrade path.

---

## LINKING AUDIT — KNOWN REMAINING BUGS

These were identified in the May 2026 session but not yet fixed:

**Bug 2 — `breakAllLinks` is misnamed and missing `autoSave()`.**
Function is named `breakAllLinks` but actually breaks only the most recently formed link.
Also missing the `autoSave()` call at the end that `breakSingleLink` has.
Low risk, maintenance hazard. Fix in next linking session.

**Bug 4 — Orbit speed inheritance asymmetry.**
Mutual-join-orbit and planetary-pull-mutual-partner paths use different speed inheritance logic.
Causes slight drift inconsistency between the two paths. Low priority visual issue.

**Bug 5 — Link conversion with induced-orbit side effects.**
Converting a link type (via the new commitLink conversion path) can create geometric chaos
if the dragged bubble is already in a third bubble's induced orbit. Partially mitigated by
the cleanupInducedOrbiters sweeps added this session, but not fully clean. Monitor in testing.

---

## HARD FLAGS — STOP AND ASK BEFORE BUILDING

- **Visual mass states** (Flicker/Glow/Pulse/Radiance/Corona) — design session + visual references required
- **Crystallization full UX** — design session required
- **Bridge to The Bench** — integration session required. `constellationId` on `leads[]` is the only touch point. Data shape not designed.
- **Binary star system** — was attempted, broke things, reverted. Session only.
- **Draw mode gesture vocabulary** — design session required
- **Sketch bubble** — Phase 2. Line tracing needs own scoped spec first.
- **Structure mode** — minimum viable version designed (orbital lane snapping + physics stability toggle). Do not deviate without session.
- **Export system** — five formats designed but needs dedicated design session before building any export code.
- **Creative → Structure bridge** — most powerful feature. Do not design or build without dedicated session.
- **Bridge tab in Dashboard** — placeholder only. Do not build without integration session.

---

## STRUCTURE MODE — MINIMUM VIABLE (designed, not built)

Two additions only. Nothing else changes yet.

1. **Orbital lane snapping** — planets around a sun get discrete lanes. One per lane. Priority = distance. Draggable to reorder.
2. **Physics stability toggle** — dials down drift. Same physics system, different parameters. Field feels like a map.

Do not build intake wizard, category moons, or creative→structure bridge without usage experience first.
