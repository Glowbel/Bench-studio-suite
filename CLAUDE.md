# BENCH STUDIO SUITE — Session Entry
*Read first, every session. This is your compass.*
*Last updated: May 2026 — Notion-Termux pipeline live — Notion-Termux pipeline live*

---

## WHY THIS SYSTEM EXISTS

Jordan is a working jeweler. The infrastructure work isn't the destination — it's the path back to the bench. Every session is a transaction in a tight economy of creative time.

The system must be lean enough to not colonize creative time, faithful enough to never lose the thread of why the work matters.

For deeper grounding, read `vision.md` at repo root. Do this when a session feels like it's drifting from purpose, or when a decision touches the heart-vs-craft tension.

---

## REPO MODE — PER-APP STATUS

This repo is mid-migration: a Preact + Vite monorepo. Apps move from
single-file HTML to Preact one at a time. **Always check an app's mode
before working on it** — the hard rules and the verification gate differ
by mode (see HARD RULES and VERIFICATION GATE below).

| App              | Mode         | Current (canonical)       | Beta (Preact)        | Doc                         |
|------------------|--------------|---------------------------|----------------------|-----------------------------|
| Decision Wizard  | single-file  | wizard/index.html         | —                    | wizard/CLAUDE.md            |
| Spatial Calendar | single-file  | spatial/index.html        | —                    | spatial/CLAUDE.md           |
| The Bench        | single-file  | bench/index.html          | —                    | bench/CLAUDE.md             |
| Constellation    | single-file  | constellation/index.html  | —                    | constellation/CLAUDE.md     |

As an app is extracted: mode → `Preact-beta`, beta column → `/beta/<app>`,
code → `src/apps/<name>/`, doc → `src/apps/<name>/CLAUDE.md`. At promotion
(app-owner-gated): mode → `Preact` and the Preact build takes the canonical
`/<app>/` path. The full plan is `docs/plans/20260522-bench-studio-suite-monorepo-migration.md`.

---

## THE REGISTRY

*Where everything lives. Read this so the system runs itself.*

### The repo — a Preact + Vite monorepo

Everything lives on `main`. Phase-1 scaffolding (Vite, the app manifest,
build scripts, `.claude/` automation) is in place; the four apps are still
single-file in their subdirectories, untouched, until each is extracted.

```
bench-studio-suite/
  CLAUDE.md              this file — suite orientation + hard rules
  vision.md              the why | read for grounding
  product-strategy.md    release strategy + cross-app open questions

  index.html             landing page (Vite entry)
  <app>.html             per-app Vite entry — added one at a time, per extraction
  apps.config.mjs         the app manifest — single source of truth for built apps
  vite.config.js          Vite config — reads apps.config.mjs
  package.json            npm scripts + devDependencies

  .claude/
    settings.json             permissions + SessionStart hook
    hooks/session-start.sh    npm install on Claude Code web
    skills/                   skills that extend the capabilities of Claude Code
  scripts/                  build + tooling scripts (look here when you need one)

  src/
    CLAUDE.md               source-tree orientation — where extracted apps live
    apps/<name>/            extracted Preact apps (added at extraction time)
    shared/                 proven-shared code (Phase 3 only)

  docs/
    plans/                  tech specs and per-app extraction PLANs

  designs/               design-system workspace — Filigree × Bench design language
    SYSTEM.md                 authoritative design-language reference
    tokens.css                CSS custom properties — canonical token source
    index.html                design lab landing page
    bench/                    ui kits, component previews, screenshots, token CSS

  bench/
    CLAUDE.md                 The Bench living doc — current state, architecture, phase
    index.html                The Bench HTML app (single-file, until extraction)
    pricing-philosophy.md     pricing system design spec — read before building pricing feature
    node-system.md            node modal design spec — read before coding node modal work

  constellation/
    CLAUDE.md                 Constellation living doc
    index.html                Constellation HTML app (single-file, until extraction)
    constellation-bubble-tools.md  bubble interaction design spec — read before building bubble tools

  wizard/
    CLAUDE.md                 Decision Wizard living doc
    index.html                Decision Wizard HTML app (single-file, until extraction)
    wizard-suite-architecture.md   three-tool suite design spec — read before building any wizard tool

  spatial/
    CLAUDE.md                 Spatial Calendar living doc
    index.html                Spatial Calendar HTML app (single-file, until extraction)
```

Files added by later phases: `src/apps/<name>/` (extracted Preact apps),
`src/shared/` (Phase 3 — proven-shared code only), `prototypes/` (throwaway
HTML explorations), `legacy/` (pre-split single-file originals, archived at
promotion). If you find a file not accounted for here or in a later phase,
ask Jordan whether to absorb or retire it.

### When to read what — by session type

```
CODING SESSION ([app])   work in: [app]/ folder
  always read:  [app]/CLAUDE.md at session start
  read if:      [app]/ design spec when work touches its territory (see triggers below)
  do not read:  other [app]/CLAUDE.md unless integration is the topic

DESIGN SESSION ([app] or system-wide)
  always read:  [app]/CLAUDE.md (if app-specific)
  read if:      vision.md (for grounding)
                [app]/ design spec (if design enters that territory)
                product-strategy.md (if release/distribution touches it)

BRAINSTORM SESSION
  always read:  relevant [app]/CLAUDE.md
  read if:      vision.md (almost always — brainstorms drift toward purpose)

INTEGRATION SESSION (cross-app)
  always read:  both [app]/CLAUDE.md docs
  read if:      product-strategy.md
```

**Default rule:** Read when work asks for it. Don't pre-read defensively. Trust the retrieval.

### Design specs — when to pull

```
bench/pricing-philosophy.md
  read when:   designing or building any part of the pricing system
               (slider, intake sequence, commission tracks, labor rates)
  after ships: distill locked patterns → bench/CLAUDE.md ARCHITECTURE
               distill substantial design moments → MASTER RECORD
               delete this file

bench/node-system.md
  read when:   designing or building any node modal work in the Workshop
               (research / session / immersion / note node types, debrief)
  after ships: distill locked patterns → bench/CLAUDE.md ARCHITECTURE
               distill substantial design moments → MASTER RECORD
               delete this file

constellation/constellation-bubble-tools.md
  read when:   designing or building any bubble interaction
               (summoning, mass states, zoom, linking, sketch bubble)
  after ships: distill locked patterns → constellation/CLAUDE.md ARCHITECTURE
               distill substantial design moments → MASTER RECORD
               delete this file

wizard/wizard-suite-architecture.md
  read when:   designing or building any of the three Wizard tools
               (gateway routing, Zoom Out, Decision Wizard, Count the Cost)
  after ships: distill locked patterns → wizard/CLAUDE.md ARCHITECTURE
               distill substantial design moments → MASTER RECORD
               delete this file
```

### Persistent references — not transitional spec files

Unlike the design specs above, these are not distilled-and-deleted — they stand.

```
designs/   design-system workspace. Read when Jordan names a color,
           component, or pattern. Key: designs/SYSTEM.md (reference),
           designs/tokens.css (canonical tokens).
docs/plans/20260522-bench-studio-suite-monorepo-migration.md
           the monorepo migration spec. Read for any migration-phase task
           or when an app changes mode.
```

### Versioning

```
HTML ([app]/index.html, src/apps/<name>/)
  versioning: git handles it — git log is the history
  no filename versioning — git is the version record

CLAUDE.md files
  versioning: git handles it — edit in place, commit with clear message
  old _v2/_v3 filename pattern retired — git is the version record
  when to update: session close, when content has meaningfully changed
```

### Session lifecycle

```
SESSION START
  → Claude Code auto-reads this CLAUDE.md (root)
  → check REPO MODE — PER-APP STATUS for the app's mode before working
  → for app work: read the app's CLAUDE.md immediately
                  (single-file → [app]/CLAUDE.md | Preact → src/apps/<name>/CLAUDE.md)
  → note current state, recent, active phase, scars, triggers
  → ask Jordan today's goal

SESSION MID
  → no new files unless the task requires it
  → design outputs → commit as named spec files (alongside the app's doc)

SESSION CLOSE
  → if code changed: commit, push to main (see WORKING MODEL)
  → if architecture changed: update the app's CLAUDE.md ARCHITECTURE section
  → if recent entry needed: add one-liner to [recent.entries]
  → if trigger fired: update relevant section
  → no handoff file | no session log | no carry-forward narrative
```

---

## DESIGN SESSION → SPEC FILE

The previous workflow lost design session context in slim handoffs. This is the fix.

When a design session produces important context — a spec, a locked decision, a detailed feature design — **commit it to `[app]/` as a named spec file.** It stays there until the relevant coding session absorbs it.

```
design session output  →  [app]/[topic].md  →  git commit  →  permanently available
coding session start   →  read [app]/[topic].md when work touches that territory
after work ships       →  distill locked parts → [app]/CLAUDE.md  |  delete spec file
```

Spec files are transitional. They don't accumulate forever. When the work ships, they retire.
If a spec file is never touched by a coding session, it's a signal the design needs revisiting.

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
1. Claude Code auto-reads root `CLAUDE.md`
2. Check REPO MODE — PER-APP STATUS for the app's mode, then read its CLAUDE.md
   (single-file → `[app]/CLAUDE.md` | Preact → `src/apps/<name>/CLAUDE.md`)
3. Note current state, recent activity, active phase, scars, triggers
4. Ask Jordan today's goal — he arrives with intent, not residue
5. Once the goal names an app, state that app's current mode (single-file or
   Preact) back to Jordan and confirm it before writing code — modes change as
   the migration proceeds, and the hard-rule tier and verification gate depend
   on it. Don't assume; confirm.
6. If goal touches a trigger, scar, or recent zone, surface it before writing code
7. Begin

### Design session
1. Ask Jordan what we're designing
2. Read what's needed — `vision.md` for grounding, `designs/SYSTEM.md` when the
   design language is in play, the app's design spec if work enters that territory
3. Commit design outputs as named spec files alongside the app's doc
4. Begin

### Closing
At session close, scan `[recent.upgrade-triggers]` rules. Most sessions update:
1. App code → commit, push to main (see WORKING MODEL)
2. The app's `CLAUDE.md` → update `[recent.entries]` (almost always)

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

The repo is mid-migration, so the hard rules now come in **two tiers**.
Tier 1 holds for everything, always. Tier 2 holds only for an app still
in `single-file` mode — and lifts the moment that app becomes Preact.
**Check the REPO MODE — PER-APP STATUS table before deciding which tier
applies.**

### Tier 1 — Durable rules. ALL apps, ALL modes, always.

These are about correctness, not about the parser. They hold whether an
app is single-file HTML or a built Preact app.

- **No base64 images, ever.** External asset paths only. (See the scar
  below — embedded base64 broke context windows across threads in April
  2026 and required emergency surgical recovery.)
- No DOM rebuilds during live interactions (drag, slider, gesture, tick).
  In-place updates only — flash-free is a first-class requirement.
- No DOM queries in animation/physics hot paths — cache references.
- State lives in one object per app. Mutations route through one place,
  never scattered across closures.
- No orphaned code. Remove a feature's CSS, bindings, and state with it.
- New features call existing systems — they don't duplicate them.

### Tier 2 — Single-file parser constraints. ONLY apps in `single-file` mode.

A `single-file` app has no build step, so its source must parse as plain
ES5-safe browser JS:

- No arrow functions (`=>`) — use `function` keyword
- No template literals (backticks) — use string concatenation
- No spread operators (`...`) — use `Object.assign({}, obj)` / `arr.concat([item])`
- No CSS custom properties as inline `style=` values
- No `--` inside HTML string literals
- `<` comparisons in JS are FINE (rule corrected Jun 2026, Jordan-approved —
  shipped files use them throughout and every target parses them. The REAL
  traps inside an HTML script: never put the literal sequences `</script>`
  or `<!--` inside JS strings — those can end the script or open a comment
  mid-code)
- No `in` operator → use `Object.prototype.hasOwnProperty.call()`
- No frameworks, no build tools, no imports
- Single self-contained `.html` file — third-party libraries vendor as
  sibling static files loaded by relative path (same philosophy as the image
  rule: external asset paths, never giant inline blobs; e.g.
  `constellation/jszip.min.js`, Jun 2026 — keeps the editable HTML lean and
  export/import working offline + in the wrapped app)

**Tier 2 LIFTS for an app the moment it becomes `Preact-beta`** — that app
now has a Vite build pipeline, so arrow functions, template literals, JSX,
and imports are all fine for it. Do **not** apply Tier 2 to a Preact app.
Tier 2 stays in force for every app still listed as `single-file`. When all
four apps are promoted, this tier is deleted.

### VERIFICATION GATE — before shipping

Every change is verified before it ships. The gate is per-mode:

- **single-file app:** `node --check <file>` — the correct validator for
  browser JS patterns. `new Function()` and `vm.Script` give false
  positives on valid browser JS; do not use them.
- **Preact app:** `npm run build` succeeds and `dist/beta/<app>/` behaves
  correctly. `node --check` **cannot** validate JSX — do not use it for a
  Preact app.

A broken build never ships.

### RUNNING LOCALLY

```
npm install
npm run dev        # Vite dev server — landing page + all apps
npm run build      # builds landing + every app in apps.config.mjs
npm run clean      # remove dist/
```

`npm run dev` serves the Preact-extracted apps and also serves the current
single-file apps as static pages at `/<app>/`. Claude Code web sessions run
`npm install` automatically via the `.claude/` SessionStart hook.

### REPO LAYOUT — quick map

```
index.html, <app>.html      Vite entries (per-app entry added at extraction)
apps.config.mjs             the app manifest — single source of truth
vite.config.js              Vite config — reads apps.config.mjs
src/apps/<name>/            extracted Preact apps (created at extraction)
src/shared/                 shared code (created in Phase 3 only)
prototypes/                 throwaway HTML explorations (added by PR 3)
scripts/                    build.mjs, build-legacy.mjs, cf-build.mjs
docs/                       suite docs + plans + extraction PLANs
designs/                    design-system workspace (registered)
<app>/                      current single-file apps (until promotion)
```

Full tree and per-phase additions are in THE REGISTRY above.

### WORKING MODEL — commit to main

```
commit  →  push to main  →  Cloudflare builds  →  test by feel
```

Work goes straight to `main`. Cloudflare Pages builds every push and the
live site reflects changes immediately. Jordan tests by feel on the live site.

Branch + PR workflow is NOT used for Claude Code sessions. If an automated
pipeline (e.g. the Claude-to-terminal bridge) creates branches or PRs, that
is the pipeline's own behavior — review and merge or close those manually.

### The working contract

Every session follows this method. No exceptions.

1. **Read before writing** — read CLAUDE.md completely, check the app's mode, grep the file for relevant functions before touching anything
2. **One thing at a time** — one bug, one feature, scoped, built, verified, delivered
3. **Diagnose before fixing** — state root cause before writing a line
4. **Diff before delivering** — state exactly what changed, how many lines, and why
5. **Verify before shipping** — run the per-mode VERIFICATION GATE. A broken file never ships.
6. **Ask before assuming** — ambiguous request? Pause and ask.
7. **Update CLAUDE.md before closing** — the next session depends on it

**Jordan cannot read code. He tests by feel and interaction.
If you ship broken or bloated code, he cannot catch it. That responsibility is entirely yours.**

---

## A NOTE ON EVOLUTION

This doc rarely changes. When it does, it's deliberate. If a new app or session type emerges, update this deliberately — it's the orientation map.

If you're unsure how to operate inside this system, re-read this. If still unsure, ask Jordan. Don't guess.
