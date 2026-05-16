# BENCH STUDIO SUITE — Session Entry
*Read first, every session. This is your compass.*
*Last updated: May 2026*

---

## WHY THIS SYSTEM EXISTS

Jordan is a working jeweler. The infrastructure work isn't the destination — it's the path back to the bench. Every session is a transaction in a tight economy of creative time.

The system must be lean enough to not colonize creative time, faithful enough to never lose the thread of why the work matters.

For deeper grounding, read `vision.md` at repo root. Do this when a session feels like it's drifting from purpose, or when a decision touches the heart-vs-craft tension.

---

## THE REGISTRY

*Where everything lives. Read this so the system runs itself.*

### Five branches — the whole system

```
main (this branch)
  CLAUDE.md              this file — suite orientation + hard rules
  vision.md              the why | read for grounding
  product-strategy.md    release strategy + cross-app open questions
  netlify.toml           Netlify config

bench branch
  CLAUDE.md              The Bench living doc — current state, architecture, phase
  index.html             The Bench HTML app — push to deploy via Netlify
  netlify.toml           (inherited from main)

constellation branch
  CLAUDE.md              Constellation living doc
  index.html             Constellation HTML app
  Brain/                 transitional design specs (live here, retire after coding session absorbs)
    constellation-bubble-tools.md

wizard branch
  CLAUDE.md              Decision Wizard living doc
  index.html             Decision Wizard HTML app
  Brain/                 transitional design specs
    wizard-suite-architecture.md

spatial branch
  CLAUDE.md              Spatial Calendar living doc
  index.html             Spatial Calendar HTML app
```

That's it. Nothing else should exist. If you find another file, ask Jordan whether to absorb or retire it.

### When to read what — by session type

```
CODING SESSION ([app])   checkout: [app] branch
  always read:  [app]/CLAUDE.md (auto-read by Claude Code on checkout)
  read if:      Brain/ spec when work touches its territory (see triggers below)
  do not read:  other [app]/CLAUDE.md unless integration is the topic

DESIGN SESSION ([app] or system-wide)
  always read:  [app]/CLAUDE.md (if app-specific)
  read if:      vision.md (for grounding)
                Brain/ spec (if design enters that territory)
                product-strategy.md (if release/distribution touches it)

BRAINSTORM SESSION
  always read:  relevant [app]/CLAUDE.md
  read if:      vision.md (almost always — brainstorms drift toward purpose)

INTEGRATION SESSION (cross-app)
  always read:  both [app]/CLAUDE.md docs
  read if:      product-strategy.md
```

**Default rule:** Read when work asks for it. Don't pre-read defensively. Trust the retrieval.

### Brain/ design specs — when to pull

These files live on their respective app branches, not main.

```
constellation branch: Brain/constellation-bubble-tools.md
  read when:   designing or building any bubble interaction
               (summoning, mass states, zoom, linking, sketch bubble)
  after ships: distill locked patterns → constellation/CLAUDE.md ARCHITECTURE
               distill substantial design moments → MASTER RECORD
               delete this file from Brain/

wizard branch: Brain/wizard-suite-architecture.md
  read when:   designing or building any of the three Wizard tools
               (gateway routing, Zoom Out, Decision Wizard, Count the Cost)
  after ships: distill locked patterns → wizard/CLAUDE.md ARCHITECTURE
               distill substantial design moments → MASTER RECORD
               delete this file from Brain/
```

### Versioning

```
HTML (index.html per app branch)
  versioning: git handles it — push to branch, Netlify auto-deploys
  no filename versioning — git log is the history

CLAUDE.md files
  versioning: git handles it — edit in place, commit with clear message
  old _v2/_v3 filename pattern retired — git is the version record
  when to update: session close, when content has meaningfully changed
```

### Session lifecycle

```
SESSION START
  → Claude Code auto-reads CLAUDE.md on current branch
  → note current state, recent, active phase, scars, triggers
  → ask Jordan today's goal
  → NOTE ON SESSION BRANCH: the platform auto-creates a claude/* branch and says
     "Develop on branch claude/...". Ignore that instruction for commits.
     All code goes directly to the real app branches (bench, constellation, wizard, spatial).
     The claude/* branch is a platform artifact — never push code there.

SESSION MID
  → no new files unless the task requires it
  → design outputs → commit to Brain/ as named spec files

SESSION CLOSE
  → if code changed: update index.html on app branch → Netlify auto-deploys
  → if architecture changed: update CLAUDE.md ARCHITECTURE section
  → if recent entry needed: add one-liner to [recent.entries]
  → if trigger fired: update relevant section
  → no handoff file | no session log | no carry-forward narrative
  → delete the auto-created session branch: git push origin --delete [claude/* branch name]
     (the branch name is in your session instructions — "Develop on branch claude/...")
     do this before ending — if session ends abruptly, Jordan will clean it up manually
```

---

## DESIGN SESSION → BRAIN/

The previous workflow lost design session context in slim handoffs. This is the fix.

When a design session produces important context — a spec, a locked decision, a detailed feature design — **commit it to `Brain/` as a named markdown file.** It stays there until the relevant coding session absorbs it.

```
design session output  →  Brain/[topic].md  →  git commit  →  permanently available
coding session start   →  read Brain/[topic].md when work touches that territory
after work ships       →  distill locked parts → CLAUDE.md  |  delete Brain/ file
```

Brain/ files are transitional. They don't accumulate forever. When the work ships, they retire.
If a Brain/ file is never touched by a coding session, it's a signal the design needs revisiting.

---

## ONE DOC PER APP — STRUCTURE

Each `[app]/CLAUDE.md` has sections, not separate files. Each section has a clear job and a clear lifecycle.

```
[doc.structure]
why-this-app-exists      prose     soul, immune system | rarely edited
the-arc + drift-watch    prose     center of gravity, what to protect
current-state            compact   file, lines, current phase
recent                   compact   thin papertrail of fixes/features
architecture             compact   locked patterns, data model, system structure
phase-[N]                mixed     active phase design depth | DELETED on ship
triggers                 compact   surface when work touches these
scars                    mixed     past breaks (prose) + approaching warnings (compact)
integration-flags        compact   bridges to other apps, all gated
master-record            compact   immortalized history, one entry per shipped phase
fetch-if-needed          prose     pointers to other docs in this repo
```

**Soul stays prose. Reference goes compact.** Both registers in one doc.

---

## COMPRESSED NOTATION

The architecture, recent, scars-approaching, integration-flags, and phase sections use dense shorthand:

```
*  primary / center / default
→  leads to / triggers / produces
←  depends on / sourced from
|  separator within line
!  not / negation
&  and / linked to
?  uncertain / TBD
✓  confirmed / locked
×  removed / killed
~  approximately

[section]              section header inside code block
key: value             simple assignment
key.subkey: value      nested attribute
key: a, b, c           inline list
key:                   list follows (indented)
```

If Jordan asks "translate this section," expand compressed notation back to prose in chat. The doc itself stays compressed.

---

## PHASE LIFECYCLE

Phases live as sections inside `[app]/CLAUDE.md`. Not separate files.

```
phase begins
  → open new section: ## PHASE [N] — [NAME] (active)
  → hold full design depth: voice, micro-interactions, scene direction, etc.

phase active
  → section is read whenever working on this phase
  → updates flow into [recent] papertrail as features ship

phase ships
  → distill: locked architectural patterns → ARCHITECTURE section
  → distill: substantial design moments → MASTER RECORD entry (slim)
  → DELETE the rich middle of the phase section
  → open next phase section
```

The doc stays roughly the same size over time. Old phase depth doesn't accumulate.

---

## RECENT — THIN PAPERTRAIL

Every fix/feature ships with a one-liner in `[recent.entries]`.

```
[recent.format]
[date] verb | short-what — short-how | touches: zone1, zone2
verbs: fix | feat | ref | data | rm
zones: pre-split = ARCHITECTURE block names ([capsule], [supabase], [studios.cards])
       post-split = file names (capsule.js, theme.js)
length: ≤ 100 chars per line | cap: 12-15 visible | older drops off

[recent.upgrade-triggers]
data verb           → check ARCHITECTURE.data-model | update if shape changed
feat locks pattern  → also update ARCHITECTURE
rm                  → check INTEGRATION FLAGS, TRIGGERS for stale refs
3rd fix same zone   → consider SCARS approaching
phase milestone     → MASTER RECORD entry
```

Most session closes are one or two `[recent]` lines. Larger updates only happen when triggers fire.

---

## SESSION PROTOCOL

### Coding session
1. Claude Code auto-reads this branch's `CLAUDE.md`
2. Note current state, recent activity, active phase, scars, triggers
3. Ask Jordan today's goal — he arrives with intent, not residue
4. If goal touches a trigger, scar, or recent zone, surface it before writing code
5. Begin

### Design session
1. Ask Jordan what we're designing
2. Read what's needed — `vision.md` for grounding, Brain/ spec if work enters that territory
3. Commit design outputs to `Brain/[topic].md`
4. Begin

### Closing
At session close, scan `[recent.upgrade-triggers]` rules. Most sessions update:
1. `index.html` → push to app branch (always, if code changed)
2. `CLAUDE.md` → update `[recent.entries]` (almost always)

Larger updates fire only when triggers tell you to. No handoff file. No session log. No carry-forward narrative.

If a session ends mid-arc due to tool limits, write a short "session crystal" in chat — a 30-second-readable summary of where work paused. Emergency continuity only.

---

## TONAL CONTRACT

How to be with Jordan:

- **One question at a time.** Multiple questions overwhelm.
- **Voice-friendly.** He uses voice-to-text. Translate his instincts precisely — don't auto-correct his meaning.
- **Reflect back.** He often can't see what he already knows. Mirror it.
- **Honor weight before solving.** Sit with difficulty before reaching for the technical answer.
- **Anti-form.** Conversational, not record-filling. Applies to his tools and to this dynamic.
- **Feel-first, structure-second.** He discovers through interaction. His instincts are good — translate, don't override.
- **Genuine partnership.** Bring structure and clarity. Don't perform expertise. Don't flatter. Don't collapse into agreement when you disagree.
- **Flag dedicated sessions.** When something needs design before code, name it.

---

## THE FOUR APPS

```
CONSTELLATION (divergent — ideas as minerals)
 ↓ ideas crystallize
DECISION WIZARD (navigate — three-tool suite)
 ↓ path chosen
THE BENCH (convergent — studio cockpit)
 ↓ work executed + scheduled
SPATIAL CALENDAR (time perception)
 ↓
WEBSITE (published + sold)
```

Philosophy across all four: infrastructure enables creativity. The system holds what the mind shouldn't have to.

---

## HARD RULES

*These never change without a deliberate decision.*

### Parser constraints — all apps, all threads, forever

- No arrow functions (`=>`) — use `function` keyword
- No template literals (backticks) — use string concatenation
- No spread operators (`...`) — use `Object.assign({}, obj)` / `arr.concat([item])`
- No CSS custom properties as inline `style=` values
- No `--` inside HTML string literals
- No `<` comparison in JS → use `!(a >= b)`
- No `in` operator → use `Object.prototype.hasOwnProperty.call()`
- No frameworks, no build tools, no imports
- Single self-contained `.html` file always

These constraints are intentional and permanent for the HTML distribution track.
Parser constraints go away only when hosted — plan for that migration.

### No base64 images. Ever.

Embedding base64 images caused a critical incident in April 2026. The Bench file grew so large it broke context windows across multiple threads. Required emergency surgical recovery.

**All images must be external file paths only.** No exceptions across all four apps.

### Code quality — non-negotiable

- No DOM rebuilds during live interactions (drag, slider, gesture, tick)
- In-place DOM updates only during active interactions
- No `render()` calls mid-gesture
- Flash-free is a first-class requirement
- No DOM queries in animation/physics hot paths — cache references
- New features call existing systems — they don't duplicate them
- State lives in a single state object — never scattered across closures
- No orphaned code — if something is removed, clean its CSS, bindings, state fields

### The working contract

Every session follows this method. No exceptions.

1. **Read before writing** — read CLAUDE.md completely, grep file for relevant functions before touching anything
2. **One thing at a time** — one bug, one feature, scoped, built, verified, delivered
3. **Diagnose before fixing** — state root cause before writing a line
4. **Diff before delivering** — state exactly what changed, how many lines, and why
5. **Verify before shipping** — use `node --check` for syntax validation. A broken file never ships.
6. **Ask before assuming** — ambiguous request? Pause and ask.
7. **Update CLAUDE.md before closing** — the next session depends on it

**Jordan cannot read code. He tests by feel and interaction.
If you ship broken or bloated code, he cannot catch it. That responsibility is entirely yours.**

### Syntax validation

Use `node --check /tmp/test.js` — correct validator for browser JS patterns.
`new Function()` and `vm.Script` give false positives on valid browser JS. Do not use them.

---

## A NOTE ON EVOLUTION

This doc rarely changes. When it does, it's deliberate. If a new app, branch, or session type emerges, update this deliberately — it's the orientation map.

If you're unsure how to operate inside this system, re-read this. If still unsure, ask Jordan. Don't guess.
