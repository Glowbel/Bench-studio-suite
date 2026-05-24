---
name: extract
description: Drives Phase 2 of the monorepo migration — converting one of the four suite apps (The Bench, Constellation, Decision Wizard, Spatial Calendar) from single-file HTML into a Preact + Vite app under src/apps/<name>/. Invoke as `/extract <plan|approve|run|status> <app>`, or whenever the user asks to extract, split, port, convert, or migrate an app to Preact. Covers the plan-first gate, the zone-driven decomposition, the two-tier hard rules, anti-premature-extraction guards, per-app doc relocation, leaf-first behavioral verification, and the /beta/<app>/ publish convention.
user-invocable: true
---

# Extract Skill

Operational rules for Phase 2 of the monorepo migration: taking one app from a
single-file `index.html` to a modular Preact app under `src/apps/<name>/`,
published to `/beta/<app>/`.

The authority for this work is the migration spec at
`docs/plans/20260522-bench-studio-suite-monorepo-migration.md`. This skill
operationalizes spec §10 (PR 4), §11 (Phase 2), §7.1 (target tree), and §7.4
(the `/beta/<app>/` convention). When this skill and the spec disagree, the
spec wins — re-read it.

One app per PR. An app's PR may itself span several commits, extracting
features leaf-first. Extraction is a refactor: it adds no features and changes
no behavior.

---

## Commands

Invoke as `/extract <subcommand> <app>` — `<app>` is one of `bench`,
`constellation`, `wizard`, `spatial`. Dispatch on the first argument:

| Command | What it does | Gate |
|---|---|---|
| `/extract plan <app>`    | Research the app and write the extraction PLAN. | — |
| `/extract approve <app>` | Stamp the PLAN as approved. | PLAN must exist |
| `/extract run <app>`     | Extract the next slice of the PLAN. | PLAN must be `approved` |
| `/extract status <app>`  | Report PLAN state + progress. Read-only. | — |

The PLAN file — `docs/plans/extraction-<app>.md` — is the spine of all four
commands: `plan` writes it, `approve` flips its status, `run` reads its
checklist and ticks it, `status` reports it.

### `/extract plan <app>`

Produce the extraction PLAN. **No extraction code is written by this command.**

1. **Pause and surface the thinking-budget question.** Before doing anything
   else, tell the user: *"This command does the most consequential thinking
   in the whole extraction — reading the whole app, mapping zones to a
   proposed file tree, and naming the entanglements. It benefits from a
   raised thinking budget or plan mode. Want to bump it before I start, or
   proceed at the current level?"* Wait for an answer. The command cannot
   raise its own thinking budget or enter plan mode — those are
   session-level and user-controlled, which is exactly why this prompt is
   the user's chance to set them. Proceed only when the user says go.
2. Read the app's `index.html` zone registry (`BEGIN`/`END` markers) and its
   `CLAUDE.md` architecture section. Read spec §11.2 (the PLAN template).
3. Write `docs/plans/extraction-<app>.md` per §11.2 (full contents in §1 below).
   - The **Extraction Order** section is written as a **checkbox list** — one
     box per unit of work, scaffold first (see §6). `/extract run` consumes
     this checklist; `/extract status` counts it.
   - The first line of the Context section is `Status: draft — awaiting review`.
4. Stop. Hand the PLAN to the app owner for review. Do not scaffold, do not
   touch `apps.config.mjs`, do not write a component.

### `/extract approve <app>`

Record the app owner's approval. Precondition: `docs/plans/extraction-<app>.md`
exists.

1. Flip its Status line to:
   ```
   Status: approved — <reviewer name>, <date>
   ```
2. **Commit the change and open a PR for it.** Approval is auditable: the
   merged commit on `main` is what materially unblocks `/extract run`. A
   Status flip that only lives in a working copy doesn't count. Use a small
   commit message naming the app, push the branch, and open a draft PR
   titled something like `chore: approve extraction PLAN for <app>`.

That is all this command does. The approval is the app owner's judgment; this
command only records the gesture. Never self-approve a PLAN you wrote without
the app owner actually saying so.

### `/extract run <app>`

Extract the next slice of the approved PLAN.

1. **Gate.** Read `docs/plans/extraction-<app>.md`. If it does not exist, or its
   Status line is not `approved`, **stop** — tell the user to run
   `/extract plan` / `/extract approve` first. This gate is absolute.
2. Read the Extraction Order checklist. Take the **next unchecked item(s)**, up
   to a sensible commit/PR boundary — do not run the whole PLAN in one go.
3. Extract leaf-first per §6. After each commit: `npm run build`, open
   `dist/beta/<app>/index.html`, compare behavior to the still-live current app.
4. Tick the completed checkbox(es) in the PLAN and commit that change with the
   work, so the PLAN always reflects true progress.
5. Stop at the boundary. Report what shipped and what remains. Repeated
   `/extract run` invocations carry the extraction to completion across
   commits/PRs — the PLAN checklist is the progress ledger between runs.

### `/extract status <app>`

Read-only. Report: whether `docs/plans/extraction-<app>.md` exists; its Status
(`draft` / `approved`); the Extraction Order progress (checked / total) and the
next unchecked item; the app's row in the root `CLAUDE.md` status table. Change
nothing.

---

## 1. Plan first, always — no exceptions

**No extraction code is written until `docs/plans/extraction-<app>.md` exists
and has been approved by the app owner / reviewer.** This is a hard gate. If
that file does not exist or has not been approved, the only valid next step is
to write it (or stop and ask). Do not scaffold `src/apps/<name>/`, do not add
the `<app>.html` entry, do not touch `apps.config.mjs`, do not write a single
component before the PLAN is approved.

`docs/plans/extraction-<app>.md` is the per-app extraction PLAN — it lives in
`docs/plans/` alongside the migration spec. Its template is **§11.2 of the
migration spec** — follow it exactly. The PLAN must contain:

- **Context** — what the app is, current line count, why it is being extracted
  now, and (hot apps only — The Bench, Constellation) the freeze cut-line
  commit SHA.
- **Source / Zone Map** — every in-file zone, with line ranges and a one-line
  description. Read from the app's own `index.html` `BEGIN`/`END` markers and
  in-file zone registry.
- **Functional Summary** — what the app does, screen by screen / overlay by
  overlay.
- **Proposed Component Breakdown** — the proposed `src/apps/<name>/` file tree,
  each file with a path, a ~line estimate, and a description. **Nothing over
  ~200 lines.** Group features into folders, roughly one folder per zone.
- **Entanglement & Hard-Rule Audit** — scattered globals, hot-path DOM queries,
  cross-feature coupling found in the source, and how each is resolved in the
  split.
- **Extraction Order (leaf-first)** — written as a **checkbox list**: the
  scaffold step first, then leaf components / pure utilities, then mid-level
  features, then state-heavy features, then composite shells and `App.jsx`
  wire-up last. `/extract run` works down this list and ticks it.
- **Verification Checklist** — the golden-path behaviors to compare against the
  still-live current app.
- **Out of Scope** — no new features, no shared-code extraction, no bridges
  wired.

The review gate is real and auditable. The PLAN file itself records its
approval: it carries a **status line** as the first line of its Context
section —

```
Status: draft — awaiting review
Status: approved — <reviewer name>, <date>
```

The PLAN starts as `draft`. No extraction code is written until that line
reads `approved` (set by `/extract approve`). A PLAN with no status line, or
one still marked `draft`, is a hard stop.

---

## 2. Zones are the first-pass decomposition scaffold

Each app's `index.html` is internally segmented into numbered **zones** with
`BEGIN`/`END` markers and an in-file registry/rebuilder (Wizard: ~21 zones;
Spatial: ~23 zones; Bench: zone-marked). Use this structure as the **default
first-pass split** when drafting the PLAN's component breakdown — it is the
starting point, not a straitjacket.

- Map **zones → feature folders / components** as the first pass. Each
  `features/<group>/` folder corresponds roughly to one in-file zone.
- **Then refine.** The logical zone boundaries are not always the boundaries
  the code wants — a zone may split cleanly into two components, or two zones
  may genuinely belong together. After the first-pass split is drafted, do a
  refinement pass: adjust boundaries where the actual code structure makes a
  different split clearer or more maintainable.
- **Keep it traceable.** Wherever the refined split deviates from the zone map,
  note the deviation (and why) in the PLAN, so a reviewer holding the zone map
  and the new tree side by side can still follow the correspondence.
- The zone registry plus the app's `CLAUDE.md` architecture section together
  form the golden-path checklist used for verification (§6).

---

## 3. Hard rules — two tiers

The root `CLAUDE.md` splits the suite's hard rules into two tiers. Both tiers
matter during an extraction; know which is which.

### Durable rules — always apply, in every app, single-file or Preact

- **No base64 images. Ever.** External file paths only. (This caused a critical
  context-window incident in April 2026.)
- **No DOM rebuilds during live interactions** (drag, slider, gesture, tick) —
  in-place updates only; flash-free is a first-class requirement.
- **No DOM queries in animation / physics hot paths** — cache references.
- **One root state object per app** — state lives in a single state object
  (one root signals object in `state/`), never scattered across closures.
- **No orphaned code** — if something is removed, clean its CSS, bindings, and
  state fields with it.
- **New features call existing systems** — they do not duplicate them. (During
  an extraction there are no new features anyway, but a port must not fork an
  existing system into a near-duplicate.)

### Parser constraints — LIFT for the app being extracted

The parser constraints (no arrow functions, no template literals, no spread, no
`in`, no `<` comparison in JS, single self-contained file, no frameworks/build)
exist **because the single-file app has no build step.** Once an app is a
Preact app with a Vite build, those constraints **no longer apply to it.** The
extracted app may freely use arrow functions, template literals, spread,
modules, JSX, and the Preact framework.

The parser constraints still apply to any app still in single-file mode, and to
prototypes under `prototypes/`. They lift per-app, at extraction, not all at
once.

---

## 4. Anti-premature-extraction

Extraction is a sustainability move, not an architecture rewrite. Resist
splitting further than the work justifies.

- **Do not split a feature finer than its zone justifies.** If a zone is one
  coherent feature, it is one feature folder — not five micro-components
  invented for tidiness. (The §2 refinement pass adjusts boundaries to fit the
  code; it is not licence to over-split.)
- **Do not create `src/shared/` during a single-app extraction.** Shared code
  is **Phase 3**, and only after real duplication is proven across **at least
  two extracted apps**. Phase 2 creates no cross-app abstractions.
- **A utility that looks shared stays put.** If a helper seems like it will be
  reused by another app, leave it in `src/apps/<name>/lib/` and add a short
  inline note flagging it as a Phase 3 shared-code candidate. Do not hoist it
  early — speculative sharing creates coupling before the second call site
  even exists.

---

## 5. Per-app doc handling

The suite's per-app living-doc system is kept, relocated — not flattened.

- The app's `CLAUDE.md` living doc **moves into `src/apps/<name>/CLAUDE.md`.**
- Its **zone vocabulary updates to file names.** The `architecture` and
  `recent` sections reference zones today (e.g. `[capsule]`, `[studios.cards]`);
  after extraction they reference files (e.g. `capsule.jsx`, `theme.js`), per
  the doc's own `[recent.format]` "post-split = file names" rule.
- The app's **design specs move alongside** it into `src/apps/<name>/`
  (`<app>-*.md`, `pricing-philosophy.md`, `node-system.md`,
  `constellation-bubble-tools.md`, `wizard-suite-architecture.md`, etc.).
- **Do not delete a live `phase-N` section as a side effect of extraction.**
  The `phase-N` section is deleted only when that phase *ships*, by the app's
  own lifecycle — never as a by-product of moving the doc. (This is also why a
  hot app must not interleave a phase-ship with its extraction.)

---

## 6. Output & verify — leaf-first, behavioral

The first item on the PLAN's Extraction Order checklist is always the
**scaffold**, and the scaffold is a **relocation, not an empty page.** Copy
the app's current `<app>/index.html` into `src/apps/<name>/` (e.g. as
`src/apps/<name>/index.html`, or rename to `index.jsx` if the Vite entry
expects a module) so that `/beta/<app>/` immediately serves a working copy
of the live app. Then wire the Vite plumbing around it: create the
`<app>.html` entry, add `{ name, entry }` to `apps.config.mjs`, add runtime
deps to `package.json`, and add the app's row to the root `CLAUDE.md` status
table (mode `Preact-beta`).

This trades an empty starting point for a working one — the very first
`/beta/<app>/` build is the same app, just living under `src/apps/<name>/`
with a build step around it. Every later checklist item then refactors that
relocated file into smaller components, leaf-first. The behavior baseline is
established immediately, so each subsequent commit can be compared against
the previous build, not just against the still-live original.

- Extract **leaf-first**: leaf components and pure utilities first, then
  mid-level features, then state-heavy features, then the composite shell and
  `App.jsx`.
- **One feature group (≈ one zone) per commit.** Small, reviewable steps.
- **After every commit:** run `npm run build`, open
  `dist/beta/<app>/index.html`, and **compare behavior to the still-live
  current single-file app.** The current app is the behavioral reference — any
  divergence is a bug in the extraction.
- The verification gate for a Preact app is `npm run build` succeeding, not
  `node --check` (`node --check` cannot validate JSX). The post-build sanity
  check: the built `dist/beta/<app>/index.html` opens via `file://` with no
  server (confirms it is genuinely self-contained).
- **Describe every change in behavioral terms** — what the user sees and feels
  ("when you let go of the bubble it snaps to the nearest orbit"), never in
  code terms. The app owner tests by feel and cannot read the diff.

---

## 7. Publish to `/beta/<app>/` — and only there

Every extracted Preact app builds to `dist/beta/<app>/` and is served at
`/beta/<app>/`.

- **`/beta/<app>/` is the suite's standing work-in-progress marker.** The
  `beta` path segment *is* the signal: it says this app is mid-extraction and
  **not yet canonical.** (See spec §7.4.)
- **An extracted app is never published to any other path.** Do not write it
  to `/<app>/`. Do not point a build, a config entry, or a landing-page link
  at the bare `/<app>/` path for an extracted app.
- **An extraction never overwrites the app owner's canonical deploy.** The
  current single-file app keeps the bare `/<app>/` path and stays live and
  canonical throughout the entire extraction. This is Principle 1 of the
  migration: the app owner's current deploys are never disturbed.
- **Promotion is a separate step.** Moving `/beta/<app>/` → canonical
  `/<app>/` is **Phase 4**, app-owner-gated. It happens only after the app
  owner validates the beta against the current app. It is never done as part
  of an extraction PR.

---

## Command flow at a glance

```
/extract plan <app>
   read index.html zone registry + CLAUDE.md architecture + spec §11.2
   write docs/plans/extraction-<app>.md  — Extraction Order as a checklist,
                                           Status: draft
        │  ── REVIEW GATE: app owner reviews the PLAN ──
        ▼
/extract approve <app>
   flip the PLAN's Status line → approved — <reviewer>, <date>
        │
        ▼
/extract run <app>          (repeat until the checklist is fully ticked)
   gate: Status must be approved
   take the next unchecked checklist item(s), up to a PR boundary
   item 1 = scaffold — relocate index.html into src/apps/<name>/ so
            /beta/<app>/ serves a working copy on first build
   later items = refactor that relocated file into components, leaf-first
   after each commit: npm run build, open dist/beta/<app>/, compare to live
   tick the checkbox(es) in the PLAN, commit
        │
        ▼
relocate <app>/CLAUDE.md + design specs into src/apps/<name>/;
update zone vocabulary to file names
        │
        ▼
beta verified by the app owner ─▶ Phase 4 promotion (separate, gated)

/extract status <app>  — at any point: PLAN state + checklist progress
```
