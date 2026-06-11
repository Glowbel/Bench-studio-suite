# CONSTELLATION — CORE AUDIT (full-file pass 1)
*Spec file (transitional). Produced 2026-06-11. Distill → CLAUDE.md + delete when fixes ship.*
*Scope: ALL zones — structure, stability, efficiency, smoothness, heavy long-term use.*
*Method: 3 parallel deep audits (physics/interaction, persistence/sessions, memory/resources)*
*+ syntax gate + Tier-2 compliance sweep. Line numbers = current file (registry rebuilt this pass).*

---

## VERDICT

The foundation is in better shape than the bug-feel suggests. The June smoothness
work (translate3d motion, star baking, serialized queue, gate fast-drain) is
holding — hot paths verified clean of DOM rebuilds, NaN paths, and orbit cycles.
The real exposure is **data safety in PERSISTENCE** (silent save failure, session
contamination) and a handful of **gesture-interrupt edge cases**. These are exactly
the "unusual bugs are signal" class: each has a precise root, none requires
architecture change.

```
[verified.sound] ✓
syntax: node --check clean (6,809-line script)
tier-2: 0 arrows | 0 backticks | 0 spread | 0 base64 | for-in ×1 guarded
orbit-cycles: ALL 3 orbitOf assignment sites guarded + load-time heal — claim holds
physics: NaN/div-zero guarded everywhere | two-pass order correct | null el refs guarded
flash-free: no DOM rebuilds in any live-interaction path
drag-end: mouseup/touchend/touchcancel symmetric at document level
listeners: modals/zoom/settings ALL registered once at boot — zero accumulation per open
teardown: bubble delete/dissolve/clearField full (links, rings, paths, stars) — except residue (S2)
save-coverage: 18 autosave sites, all mutations covered | no per-frame saves
save/load parity: every serialized field restored w/ defaults | payload bounded
session-delete: removes list entry + state key + IDB assets — all three layers
blob-lifecycle: transient bake SVG urls revoked on all 3 paths | export url revoked
bake-queue: STAR_TEX_PENDING cleared on every path | dedup correct | gate poll cleared
```

---

## FINDINGS — ranked

### S — data safety (fix first; silent-loss class)

```
S1  quota failure silent — saveCurrentSession 10295 + saveSessionList 10679 setItem UNCAUGHT
    quota hit → exception escapes, every later save fails, user works on for hours unaware
    note: localStorage shared per-origin w/ other suite apps on same domain (~5MB total)
    fix: try/catch both → persistent visible banner "not saving — export now" + 1-tap ZIP

S2  residue stars bleed across sessions — spawnResidueStar 7164 sets data-residue-id,
    clearField 10705 queries getElementById('residue-'+id) → never matches → residue DOM
    survives session switch; its hold-to-restore closure injects PREVIOUS session's
    bubble into the NEW session
    fix: starEl.id = 'residue-' + starId in spawnResidueStar (1 line)

S3  session-switch contamination — loadSession 10820 sets currentSessionId BEFORE
    deserializeSession, which early-returns on missing/corrupt state WITHOUT clearField
    → old session's bubbles re-saved under new session's id. reachable: new session
    "Begin" 11163 never writes an initial state blob → abandoned-empty session = trigger
    fix: clearField before early-returns + write empty state blob at creation

S4  corrupt session list = all sessions invisible — loadSessionList 10672 returns []
    on bad JSON; next saveSessionList overwrites → state blobs orphaned (data intact!)
    fix: on parse fail, back up raw + rebuild list by scanning constellation-state-* keys

S5  hardcore interval orphan — hcInterval 11447 is local, only self-clears at 0 (11464);
    delete/switch session never clears → ghost 1Hz timer; at 0 endHardcoreSession fires
    → state.fieldFrozen=true freezes whatever session is NOW loaded; 2nd hc session
    stacks a 2nd interval
    fix: global handle, clearInterval in start/loadSession/deleteSession/end +
    guard endHardcoreSession on session id match
```

### G — gesture/interaction edge cases

```
G1  mouse released off-bubble → ghost drag + ghost compass — mousedown 5838 attaches
    document mousemove + timers; only removal is el's OWN mouseup 5842. release after
    drifting <18px off the rim → compassTimer fires w/ no press; next mouse move >18px
    starts move-mode with no button held
    fix: one-shot document mouseup → cleanupPress | or onDocMove bails on e.buttons===0

G2  no per-bubble touchcancel — OS interrupt during 950ms hold → compass opens w/ no
    finger down; early-radar lingers (document touchcancel 7875 can't reach closure timers)
    fix: el touchcancel → cleanupPress + zIndex reset (mirror touchend)

G3  dissolution reentry — initiateDissolution 7120 unguarded; 2nd trigger during 850ms
    anim → removeChild throws → state splice + residue spawn skipped (half-deleted bubble)
    fix: early-return if already .dissolving + guard el.parentNode at 7143

G4  link-select glow never brightens — updateCompassSlide 6903 compares string gId ===
    number hoveredId, always false
    fix: parseInt(gId,10)

G5  MOVE_DELAY not enforced for mouse — onDocMove attached at mousedown not after 250ms
    timer → drag starts on first 18px regardless. behavior deviation, not instability
```

### M — memory / long-term (hours-long iPad sessions)

```
M1  STAR_TEX no eviction (known watch — now quantified): bound 528 blob urls max
    (8 mov × 8 pal × 4 layers × 2 sizes + corona); 1024-combo ≈ 17MB decoded; dial
    palette-browsing fans out 384s fast; zero revokeObjectURL on cache entries; growth
    is BOUNDED but permanent until reload. no overwrite-orphan path exists (verified)
    fix: LRU on 1024 tier (~6-8 combos) + revoke + clear zone3 data-fp on evict

M2  failed bake cached forever — STAR_TEX[key]=null on failure (6060/6076/6081),
    getStarTexture 6129 returns it permanently → transient iOS toBlob-null = gas-less
    star for the whole session
    fix: store retry-count/timestamp, allow 1-2 retries

M3  bake queue no watchdog — img decode that never fires onload OR onerror (seen on
    iOS under memory pressure) → _bakeActive stuck true → no bake ever again
    fix: ~10s setTimeout watchdog in _startStarBake → mark failed, revoke, finish()

M4  TEMP zoom diag still in (8214-8277 + call sites 8343/8670) — tracked, awaiting
    Jordan's iPad confirm round; runs 2.6s rAF probe + STAR_TEX walk on EVERY zoom
    open AND close. remove on confirm.

M5  zone3 retains last combo's 4×1024 imgs + will-change permanently — acceptable
    (display:none drops GPU layers); only act if Safari profiling shows it pinned
```

### P — performance at scale

```
P1  physics per-frame O(bubbles × links × bubbles) — mutual-moon wobble 5524-5537
    scans all links + getBubbleById linear scan per mutual link per bubble per frame;
    fine ~30 bubbles, degrades quadratic+ as sessions grow
    fix: id→bubble map + mutualMoonCount cached, recomputed on link change only

P2  autosave full-serialize on every interaction — ~300 bubbles ≈ 200-400KB stringify
    ×2 (state + list) per click; no debounce
    fix: 250ms trailing debounce + skip list rewrite unless meta changed

P3  drag-move queries getElementById per event (7769-7772, 7807-7810 free-bubble
    branch) despite b.el/b.mutualRingEl cached (moon branch does it right);
    updateZoneSensing 7427 querySelector per move while zones bloomed
    fix: use cached refs | cache zone els in showLinkZone/clearLinkZones
```

### R — resilience / parity gaps

```
R1  no boot resume — reload → first tap silently creates "Untitled N"; prior work
    safe but off-screen; feels like the canvas forgot everything; Untitleds accumulate
    fix: persist last-session id, auto-load on boot
R2  no session save on pagehide — only visual settings persist (9914); add
    saveCurrentSession to same handler
R3  zip import: no runLoadGate (10630-10639, confirmed) | no currentSessionType |
    doesn't save outgoing session first | JSZip from CDN → offline = silent no-op |
    no .catch on loadAsync chain → bad file = silent failure | bundle.state unvalidated
R4  expiresAt written (8982, 11172/11181) read NOWHERE — 24h promise in modal copy is
    false. when fixed: flag/prompt-to-export, NEVER silent-delete
R5  multi-tab: no storage listener — pure last-writer-wins clobbering
R6  IDB error path never calls callback → import pending-counter stalls silently;
    latent until voice/sketch ship (asset fields currently never assigned)
R7  decay-interval setters never autosave — persists only via next other interaction
R8  b.label raw into innerHTML 5743 ('<' in a label breaks render); openLinkSelect
    uses textContent correctly — match it
R9  moon restored w/ orbitOf but null orbitRadius parks at planet center — cheap heal
    in load pass 2.5
```

### T — Tier-2 rules vs reality (adjudicate with Jordan, don't "fix")

```
shipped file violates 3 written rules yet works everywhere it runs:
  '<' comparisons ×161 (rule says !(a >= b))
  for-in ×1 (zip import, hasOwnProperty-guarded)
  CSS custom props inline in HTML strings (--o-base, --lo — starfield + gas layers)
→ either the rules guard a transport pipeline that no longer carries this file,
  or the wording overshoots. rewrite of 161 sites is NOT recommended; reword the
  rule (likely: '<' only dangerous inside HTML-string contexts, not JS operators)
```

---

## RECOMMENDED ORDER

```
1. S1-S5 data-safety batch     — small surgical fixes, worst-case-loss class
2. G1-G4 gesture batch          — each 1-5 lines, user-visible ghosts
3. M2+M3 bake resilience        — cheap insurance before beta
4. R1+R2 resume + pagehide save — biggest perceived-reliability win for beta
5. P3 cached refs               — mechanical, finishes the June smoothness work
6. R3 import hardening + M1 LRU eviction — before beta export testing
7. P1/P2 scale work             — when sessions actually grow past ~50 bubbles
8. R4 expiry + R5 multi-tab     — design decisions needed (flag vs delete; warn vs lock)
```

Each numbered batch is independently shippable and testable by feel.
