---
name: app-extraction
description: Workflow rules for converting one of the four suite apps (The Bench, Constellation, Decision Wizard, Spatial Calendar) from its single-file HTML form into a Preact + Vite app under src/apps/<name>/. Invoke whenever the user asks to extract, split, port, convert, or migrate an app to Preact. Covers the plan-first discipline, the zone-driven decomposition, the two-tier hard rules, anti-premature-extraction guards, per-app doc relocation, leaf-first behavioral verification, and the /beta/<app>/ publish convention.
user-invocable: true
---

# App Extraction Skill

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
- **Extraction Order (leaf-first)** — leaf components / pure utilities first,
  then mid-level features, then state-heavy features, then composite shells and
  `App.jsx` wire-up last.
- **Verification Checklist** — the golden-path behaviors to compare against the
  still-live current app.
- **Out of Scope** — no new features, no shared-code extraction, no bridges
  wired.

The review gate is real and auditable. The PLAN file itself records its
approval: it carries a **status line** near the top —

```
Status: draft — awaiting review
Status: approved — <reviewer name>, <date>
```

The PLAN starts as `draft`. No extraction code is written until that line
reads `approved`. A PLAN with no status line, or one still marked `draft`, is
a hard stop. (The §11.2 template's Context section is where this line lives.)

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
  invented for tidiness.
- **Do not create `src/shared/` during a single-app extraction.** Shared code
  is **Phase 3**, and only after real duplication is proven across **at least
  two extracted apps**. Phase 2 creates no cross-app abstractions.
- **A utility that looks shared stays put.** If a helper seems like it will be
  reused by another app, leave it in `src/apps/<name>/lib/` and add a short
  inline note flagging it as a Phase 3 shared-code candidate. Do not hoist it
  early — speculative sharing creates coupling before the second call site
  even exists.
- Do not port speculatively from the `wolbergs-world` POC repo. The POC is a
  starting reference, not a drop-in (its Constellation scaffold was built from
  an older, ~8.3k-line version).

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

## Extraction flow at a glance

```
1. Invoke this skill.
2. Read the app's index.html zone registry + its CLAUDE.md architecture.
3. Draft docs/plans/extraction-<app>.md (the PLAN — spec §11.2): zone-map
   first-pass split, then a refinement pass. Status line starts as `draft`.
   ── REVIEW GATE: app owner approves; the PLAN's Status line flips to
      `approved`. No extraction code before that. ──
4. Scaffold PR: src/apps/<name>/ skeleton, <app>.html entry,
   { name, entry } in apps.config.mjs, runtime deps in package.json.
   Behavior: an empty /beta/<app>/ page. Add the app's status-table row.
5. Extraction commits, leaf-first, one feature (≈ one zone) per commit.
   After each: npm run build, open dist/beta/<app>/, compare to the live app.
6. Relocate <app>/CLAUDE.md + design specs into src/apps/<name>/;
   update zone vocabulary to file names.
7. Beta verified by the app owner ─▶ Phase 4 promotion (separate, gated).
```
