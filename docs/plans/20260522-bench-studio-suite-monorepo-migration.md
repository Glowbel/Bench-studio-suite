# Tech Spec: Bench Studio Suite — Monorepo Migration

| | |
|---|---|
| **Status** | Draft for review |
| **Date** | 2026-05-22 |
| **Owner** | tmr08c |
| **Reviewers** | bench-studio-suite app owner |
| **Supersedes** | n/a |

---

## 1. Summary

`bench-studio-suite` is four creative web apps (The Bench, Constellation, Decision Wizard, Spatial Calendar), each currently a single hand-written, ES5/parser-constrained `index.html` of 2.2k–9.5k lines, each on its own Cloudflare Pages site. The single-file format has been outgrown.

This spec describes migrating the repo to a **Preact + Vite monorepo** in which each app is authored as small modular components but still **builds to one self-contained HTML file** — preserving the "open it anywhere, email it to anyone" distribution. The approach was proven in a separate proof-of-concept repo (`wolbergs-world`); this spec adapts that proven structure to `bench-studio-suite` and to **Cloudflare Pages** hosting.

The migration is staged so that **the app owner's current production deploys are never disturbed**: new Preact builds publish to a parallel `/beta/<app>` location until the app owner validates and promotes them.

This document is self-contained. All referenced code from the POC repo is inlined (in-section for new files, in **Appendix A** for POC originals); no access to the POC repo is required to execute this plan.

---

## 2. Background & Problem

### 2.1 What exists today

`bench-studio-suite` holds four apps as sibling subdirectories on a single `main` branch, with no build step:

| App | File | ~Lines | State |
|---|---|---|---|
| The Bench | `bench/index.html` | 7,230 | Phase 4.5 in progress (**hot**) |
| Constellation | `constellation/index.html` | 9,450 | Phase 1.5/2 active (**hot**) |
| Decision Wizard | `wizard/index.html` | 2,173 | Built & stable |
| Spatial Calendar | `spatial/index.html` | 2,765 | Working & stable |

Supporting files: root `CLAUDE.md` (suite orientation + hard rules), per-app `CLAUDE.md` living docs, `vision.md`, `product-strategy.md`, per-app design specs (`bench/pricing-philosophy.md`, `bench/node-system.md`, `constellation/constellation-bubble-tools.md`, `wizard/wizard-suite-architecture.md`), and a `designs/` design-system workspace.

Each app is committed straight to `main` and deployed by its own Cloudflare Pages site. Each app is written under hard "parser constraints" — no arrow functions, no template literals, no spread, no `in`, single self-contained file — because there is no build step.

### 2.2 The problem

1. **Context-window pressure.** The primary developer ("Jordan") cannot read code, drives Claude Code from a phone, commits via the GitHub mobile app, and tests deployed builds by feel. A 7k–9k-line single file no longer fits one conversation alongside its docs; he cannot iterate on one feature without paying context cost for all the others.
2. **Cross-feature coupling.** State is centralized but mutations, globals, and coordination flags are scattered, so safe edits are hard.
3. **The repo's own docs already name the trigger:** "parser constraints go away only when hosted — plan for that migration." This spec *is* that migration.

### 2.3 Why a build pipeline solves it without losing the product

`vite-plugin-singlefile` inlines an entire Vite build into one `.html` file. So the suite can be **authored** as modular Preact components (each file small enough for one phone-driven conversation) while still **shipping** one self-contained HTML file per app. The product property — a file you can email, drop in cloud storage, install as a PWA, open with no server — is preserved as build output.

---

## 3. Goals / Non-goals

### Goals

- Convert `bench-studio-suite` into a Preact + Vite monorepo with one self-contained HTML build artifact per app.
- Preserve the phone-driven, commit-to-test workflow; make it *sustainable* by shrinking the editable unit from one 9k-line file to many ~150-line files.
- Adopt the `.claude/` automation and prototype workflow proven in the POC.
- Host on Cloudflare Pages, with per-branch previews.
- Migrate incrementally, in small reviewable PRs, **without disturbing current production deploys**.
- Keep `bench-studio-suite`'s mature per-app living-doc system.

### Non-goals

- **No automated tests.** The apps are interactive-feel-driven; verification is manual/behavioral. (Consistent with the POC.)
- **No new features** during extraction. An extraction is a refactor; behavior must match the current app.
- **No premature shared abstraction.** `src/shared/` is created late, from this repo's own code, only once duplication is proven.
- **No TypeScript.** JSDoc typedefs only, if needed.
- **No Capacitor / App Store wrapping** (a separate future track).
- **No GitHub Actions / GitHub Pages.** Cloudflare's native Git integration handles builds and deploys.

---

## 4. Core Principles

These shape every decision below.

1. **Never disturb the app owner's current deploys.** The four current single-file apps stay exactly where they are, on their existing Cloudflare sites, until the app owner explicitly promotes a replacement. New Preact builds publish to a separate **`/beta/<app>`** location so both versions are viewable side by side.
2. **No premature shared code.** Phase 1 creates no `src/shared/`. Shared utilities/components/tokens are extracted *later*, from this repo's own extracted apps, once real duplication is visible.
3. **No automated tests.** Splits are verified manually, side by side against the still-live current app.
4. **Small, reviewable, parallelizable PRs.** Phase 1 is four PRs; each app extraction is its own PR.
5. **Behavioral communication.** Every change is described in functional terms ("when you let go of the bubble it snaps to the nearest orbit"), never code terms — Jordan cannot read the diff.
6. **The single-file build output is sacred.** Each app must always still build to one self-contained HTML file.

---

## 5. Current State of bench-studio-suite (for readers without repo access)

### 5.1 Repo layout today

```
bench-studio-suite/
  CLAUDE.md                 suite orientation, registry, hard rules, tonal contract
  vision.md                 the "why" — Jordan's creative identity
  product-strategy.md       cross-app strategy, distribution, integration bridges
  bench/
    CLAUDE.md               The Bench living doc
    index.html              The Bench app (~7,230 lines, single file, ES5)
    pricing-philosophy.md   design spec
    node-system.md          design spec (unregistered)
  constellation/
    CLAUDE.md
    index.html              ~9,450 lines
    constellation-bubble-tools.md
  wizard/
    CLAUDE.md
    index.html              ~2,173 lines
    wizard-suite-architecture.md
  spatial/
    CLAUDE.md
    index.html              ~2,765 lines
  designs/                  design-system workspace (unregistered)
    SYSTEM.md               design-language reference
    tokens.css              CSS custom properties (canonical token source)
    index.html              design lab
    bench/                  ui kits, previews, screenshots, colors_and_type.css
```

### 5.2 The per-app living-doc system

Each `<app>/CLAUDE.md` is a single "living document" with fixed sections: `why-this-app-exists`, `the-arc` + `drift-watch`, `current-state`, `recent` (a thin papertrail of fixes), `architecture` (locked patterns in compressed notation), `phase-N` (active phase depth, **deleted on ship**), `triggers`, `scars` (past breaks + approaching warnings), `integration-flags`, `master-record`, `fetch-if-needed`. This system is **more mature than anything in the POC** and is kept (relocated) by this migration.

### 5.3 The in-file zone registry — important for extraction

Each app's `index.html` is internally segmented into numbered **zones** with `BEGIN`/`END` markers and an in-file registry/rebuilder (Wizard: "21 top-level zones"; Spatial: "23 top-level zones"; Bench: zone-marked). This existing structure is the natural decomposition scaffold for extraction — zones map directly to feature folders/components.

### 5.4 Hosting today

Four independent Cloudflare Pages sites, one per app subdirectory, push-to-`main` auto-deploy, no build step. (`product-strategy.md`'s "Track 3" section inaccurately describes this as Netlify; that section is stale and is corrected by this migration.)

---

## 6. The wolbergs-world POC (reference)

`wolbergs-world` is a separate repo that proved this exact migration on the Constellation app. It established and validated:

- A Preact + Vite monorepo with `src/apps/<name>/` per app and one `<app>.html` Vite entry per app.
- The single-file build via `vite-plugin-singlefile` — one Vite invocation per app (the plugin's inlining is incompatible with rollup multi-input).
- The `.claude/` automation: a `SessionStart` hook that installs deps on Claude Code web, and a prototype skill.
- A prototype workflow: throwaway self-contained HTML under `prototypes/<slug>/`, deployed to branch previews only.
- A `PLAN.md` discipline: a file-by-file extraction blueprint written *before* extracting.

What the POC did **not** prove, and which this spec corrects:

- It used **Netlify** for prototype branch previews and **attempted GitHub Pages** for production. The GitHub Pages setup never worked (platform restrictions); stale workflow artifacts remain in that repo. **Only Netlify previews were genuinely proven.** This migration uses Cloudflare for everything and adds no GitHub Actions.
- Its `src/shared/` was scaffolded speculatively. This migration defers shared code (Principle 2).

All POC files this spec reuses are inlined in **Appendix A**.

---

## 7. Target Architecture

### 7.1 End-state file tree

```
bench-studio-suite/
  index.html                landing page (Vite entry)
  bench.html                Vite entry per app  ┐
  constellation.html                            │ added one at a time,
  wizard.html                                   │ per extraction
  spatial.html                                  ┘
  apps.config.mjs           the app manifest — single source of truth
  package.json
  vite.config.js
  .env.example
  .gitignore
  _headers                  Cloudflare headers (noindex for /prototypes/*)
  CLAUDE.md                 rewritten: suite orientation + per-app status table
  vision.md
  product-strategy.md
  .claude/
    settings.json           permissions + SessionStart hook
    hooks/
      session-start.sh      npm install on Claude Code web
    skills/
      studio-prototype/
        SKILL.md
      app-extraction/
        SKILL.md
  scripts/
    build.mjs               dynamic build — discovers apps from the manifest
    cf-build.mjs            Cloudflare build entrypoint (branch-aware)
    build-prototypes-index.mjs
  src/
    apps/
      <name>/               per app, created at extraction time
        main.jsx            Vite entry point
        App.jsx
        pages/
        features/           one folder per feature (≈ one in-file zone)
        components/         app-specific primitives
        lib/                app-specific utilities
        state/              one root signals object + actions + selectors
        styles/
        CLAUDE.md           the app's living doc, relocated here
        <app>-*.md          the app's design specs, relocated here
    shared/                 created in Phase 3 only — proven-shared code
  prototypes/
    README.md
    CLAUDE.md
    <slug>/index.html       throwaway self-contained explorations
  docs/
    plans/
      20260522-bench-studio-suite-monorepo-migration.md   (this document)
    extraction-<app>.md     per-app extraction PLAN, written before each extraction
  designs/                  design-system workspace (now registered in CLAUDE.md)
  legacy/                   pre-split single-file HTML, archived at promotion time
```

### 7.2 Three states of the repo over time

**State A — after Phase 1 (scaffold).** Vite tooling exists; `apps.config.mjs` is empty; the four current apps are untouched in `bench/`, `constellation/`, `wizard/`, `spatial/` and still deployed by their existing sites. `npm run build` produces only the landing page.

**State B — mid-migration (e.g. Wizard extracted).** `src/apps/wizard/` exists; `wizard.html` is a Vite entry; `apps.config.mjs` lists `wizard`; `npm run build` produces the landing + `dist/beta/wizard/`. The other three apps are still single-file and untouched. The Wizard beta is viewable at `/beta/wizard`; the current Wizard is still live and canonical.

**State C — end state.** All four apps under `src/apps/`; `legacy/` holds the archived single-file originals; `src/shared/` holds proven-shared code; current single-file folders removed after promotion.

### 7.3 Build model

`vite-plugin-singlefile` cannot compose with rollup multi-input, so the build runs **one Vite invocation per app**, selected by the `VITE_APP` env var, each producing one self-contained HTML file. `scripts/build.mjs` discovers the app list from `apps.config.mjs` and invokes Vite once per app plus once for the landing page. The landing page builds to `dist/index.html`; each app builds to `dist/beta/<app>/index.html`.

---

## 8. Key Workflows / Flows

### 8.1 Jordan's phone dev loop (unchanged in spirit, sustainable in practice)

```
1. Jordan asks Claude (phone app) to change feature X.
2. Claude returns the full content of the touched file(s).
   — post-migration each feature file is ≈150 lines and fits one message;
     pre-migration the whole 9k-line app had to be in context.
3. Jordan commits via the GitHub mobile app / web UI (to a branch).
4. Cloudflare Pages builds the branch and publishes a preview URL.
5. Jordan opens the preview URL on his phone, tests by feel.
6. On approval, the branch merges to main; Cloudflare deploys.
```

### 8.2 Build & deploy flow (Cloudflare)

```
push to branch ──▶ Cloudflare Pages Git integration
                     │
                     └─▶ build command: node scripts/cf-build.mjs
                           │
                           ├─ node scripts/build.mjs
                           │    ├─ rm -rf dist
                           │    ├─ VITE_APP=landing  vite build  ─▶ dist/index.html
                           │    └─ for each app in apps.config.mjs:
                           │         VITE_APP=<app> vite build   ─▶ dist/beta/<app>/index.html
                           │
                           └─ if CF_PAGES_BRANCH !== 'main':
                                copy prototypes/ ─▶ dist/prototypes/
                                node scripts/build-prototypes-index.mjs
                     │
        branch == main ─▶ production deploy   (no prototypes)
        branch != main ─▶ preview deploy URL  (prototypes included)
```

### 8.3 Prototype flow

```
create/edit prototypes/<slug>/index.html  (single self-contained file)
   │
commit + push to a working branch
   │
Cloudflare preview build includes prototypes/
   │
open https://<branch>.<project>.pages.dev/prototypes/<slug>/  on phone
   │
on approval ─▶ "promote": port into src/apps/<name>/, leave prototype frozen
```

### 8.4 App-extraction flow (per app, Phase 2)

```
invoke the app-extraction skill
   │
read the app's index.html zone registry + its CLAUDE.md architecture section
   │
write docs/extraction-<app>.md  (the PLAN — see §11.2)
   │  ── review gate: app owner / reviewer approves the PLAN ──
   │
scaffold src/apps/<name>/ + <app>.html + manifest entry  (PR, behavior: empty)
   │
extract leaf-first, one feature (≈ one zone) per commit
   │  after each: npm run build, open dist/beta/<app>/, compare to the live current app
   │
relocate <app>/CLAUDE.md + design specs into src/apps/<name>/
   │
flip the app's row in root CLAUDE.md status table
   │
beta verified by app owner ─▶ Phase 4 promotion
```

---

## 9. Work Breakdown — Overview

| Phase | What | PRs | Parallelism |
|---|---|---|---|
| **1. Scaffold** | Monorepo tooling, docs, prototype + extraction workflows | PR 1–4 | PR 1 first; PR 2/3/4 parallel after |
| **2. Extraction** | Each app: single-file HTML → Preact, published to `/beta/<app>` | 1 PR per app (×4) | Sequential; order Wizard → Spatial → Bench → Constellation |
| **3. Shared code** | Extract proven-shared code into `src/shared/` | 1+ PR | After ≥2 apps extracted |
| **4. Promotion** | Beta → canonical, per app | 1 step per app | App-owner-gated |

Phase 1 is detailed to the file in §10. Phases 2–4 are specified at the process level in §11–§13; each app extraction produces its own granular PLAN document (`docs/extraction-<app>.md`) before code is written.

---

## 10. Phase 1 — Monorepo Scaffold (detailed)

Four PRs. **PR 1 lands first** (foundation). **PR 2, 3, 4 then proceed in parallel.** Each is a separate branch off `main`. No app is converted to Preact in Phase 1; current apps and their deploys are untouched.

> **Branch note.** Use one branch per PR (e.g. `claude/scaffold-vite`, `claude/scaffold-docs`, `claude/scaffold-prototypes`, `claude/scaffold-extraction-skill`) so the four are independently reviewable. Stacking all four on one branch is also possible but couples the reviews.

---

### PR 1 — Vite build pipeline + Claude Code web setup

**Goal.** Establish the build and make Claude Code web sessions able to iterate on the new project. No app behavior changes; current apps untouched.

**Task list.**

1. Add `package.json` (below).
2. Add `apps.config.mjs` — the empty app manifest (below).
3. Add `vite.config.js` (below).
4. Add `scripts/build.mjs` — the dynamic build (below).
5. Add `index.html` — the landing page (below).
6. Add `.gitignore` (below). _`.env.example` deferred — see Progress Log (§18); it is created by the extraction PR for the first Supabase-using app (The Bench)._
7. Add `.claude/settings.json` and `.claude/hooks/session-start.sh` (below). **Bundled into PR 1 deliberately:** without the SessionStart hook, Claude Code web sessions cannot `npm install` and so cannot iterate on the new Vite project.
8. Verify acceptance criteria locally.

**Acceptance criteria.**

- `npm install` succeeds.
- `npm run build` succeeds and produces `dist/index.html` (the landing page).
- `npm run dev` serves the landing page; the four current apps remain reachable at `/<app>/` in the dev server (Vite serves them as static multi-page files).
- A Claude Code web session triggers `npm install` automatically via the SessionStart hook.
- The four current Cloudflare sites are unaffected (PR 1 adds only new root-level files; it does not touch `bench/`, `constellation/`, `wizard/`, `spatial/`).

#### `package.json`

```json
{
  "name": "bench-studio-suite",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Jordan Wolberg's studio suite — The Bench, Constellation, Decision Wizard, Spatial Calendar. Each app builds to a single self-contained HTML file.",
  "scripts": {
    "dev": "vite",
    "clean": "rm -rf dist",
    "build": "node scripts/build.mjs",
    "build:cf": "node scripts/cf-build.mjs",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@preact/preset-vite": "^2.10.5",
    "vite": "^8.0.11",
    "vite-plugin-singlefile": "^2.3.3"
  }
}
```

> Preact runtime dependencies (`preact`, `@preact/signals`, and any per-app libraries such as `jszip` or `@supabase/supabase-js`) are **not** added in PR 1. They are added by the first extraction PR that needs them (Principle 2). `build:cf` is wired now but unused until Cloudflare is connected (PR 3 ships `cf-build.mjs`).

#### `apps.config.mjs`

```js
// The app manifest — the single source of truth for the suite's apps.
//
// Each entry: { name, entry }
//   name  — short id, also the dist/beta/<name>/ output folder
//   entry — the Vite HTML entry file at the repo root
//
// Apps are appended here ONE AT A TIME, by their extraction PR, as they
// move from single-file HTML to Preact. Until an app is listed here it is
// not built by the monorepo — its current single-file site is untouched.
//
// vite.config.js and scripts/build.mjs both read this file. Do not hardcode
// the app list anywhere else.

export const apps = [
  // { name: 'wizard',        entry: 'wizard.html' },
  // { name: 'spatial',       entry: 'spatial.html' },
  // { name: 'bench',         entry: 'bench.html' },
  // { name: 'constellation', entry: 'constellation.html' },
];
```

#### `vite.config.js`

```js
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve } from 'node:path';
import { apps } from './apps.config.mjs';

// One Vite invocation per app at build time. vite-plugin-singlefile inlines
// the whole build into one .html file; that inlining is incompatible with
// rollup multi-input, so each app (and the landing page) builds separately,
// selected by the VITE_APP env var. `vite serve` (dev) is a normal
// multi-page project — every .html at the repo root is served at its path.

const ENTRIES = {
  landing: 'index.html',
  ...Object.fromEntries(apps.map((a) => [a.name, a.entry])),
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Dev server: Preact for extracted apps; current single-file apps are
    // served as plain static HTML at /bench/, /wizard/, etc.
    return { plugins: [preact()] };
  }

  const appKey = process.env.VITE_APP;
  if (!appKey || !ENTRIES[appKey]) {
    throw new Error(
      'Set VITE_APP to one of: ' + Object.keys(ENTRIES).join(', ') + '. Got: ' + appKey
    );
  }

  // Landing page → dist/. Each app → dist/beta/<app>/ so it never collides
  // with, or shadows, the app owner's current production deploy.
  const outDir = appKey === 'landing' ? 'dist' : 'dist/beta/' + appKey;

  return {
    plugins: [preact(), viteSingleFile()],
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      assetsInlineLimit: 100_000_000,
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: { [appKey]: resolve(process.cwd(), ENTRIES[appKey]) },
      },
    },
  };
});
```

#### `scripts/build.mjs`

```js
import { execSync } from 'node:child_process';
import { rmSync, cpSync, existsSync } from 'node:fs';
import { apps } from '../apps.config.mjs';

// Dynamic suite build. Discovers the app list from apps.config.mjs — no
// hardcoded apps. Cleans dist/, builds the landing page, then builds every
// extracted app. Each invocation is one Vite build (see vite.config.js).

rmSync('dist', { recursive: true, force: true });

function build(appKey) {
  console.log('\n▶ building ' + appKey);
  execSync('vite build', {
    stdio: 'inherit',
    env: { ...process.env, VITE_APP: appKey },
  });
}

build('landing');
for (const app of apps) build(app.name);

// Cloudflare headers file ships at the root of the published dir.
if (existsSync('_headers')) cpSync('_headers', 'dist/_headers');

console.log('\n✓ built landing + ' + apps.length + ' app(s)');
```

#### `index.html` (landing page)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Bench Studio Suite</title>
    <style>
      body {
        background: #1c1d22; color: #d8dfdc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        margin: 0; min-height: 100vh;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 1.25rem;
      }
      h1 { font-weight: 500; font-size: 1.6rem; margin: 0; }
      ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
      a {
        color: #d8dfdc; text-decoration: none; font-size: 1.05rem;
        padding: 0.5rem 1rem; border: 1px solid rgba(61,72,88,0.6); border-radius: 8px;
        display: inline-block; min-width: 12rem; text-align: center;
      }
      a:hover { border-color: #4acc85; color: #4acc85; }
      .meta { color: #8a9692; font-size: 0.85rem; }
    </style>
  </head>
  <body>
    <h1>Bench Studio Suite</h1>
    <ul id="apps">
      <!-- Beta (Preact) builds are linked here as apps are extracted: -->
      <!-- <li><a href="./beta/wizard/">Decision Wizard (beta)</a></li> -->
    </ul>
    <p class="meta">Each app builds to a single self-contained HTML file.</p>
  </body>
</html>
```

> The landing page can later be made to read `apps.config.mjs` and render links dynamically; a static list kept in sync per extraction PR is acceptable to start.

#### `.gitignore`

```
node_modules/
dist/
.DS_Store
*.log
.env
.env.local
.env.*.local
.vite/
```

#### `.env.example`

```
# Supabase project URL — public, safe to ship in build output.
VITE_SUPABASE_URL=https://your-project-ref.supabase.co

# Supabase anon (public) key — public, safe to ship in build output.
# Relies on Row Level Security. Confirm RLS policies before real user data.
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> Only needed once an app that uses Supabase is extracted (The Bench). **Not shipped in PR 1** (see §18) — deferred to that extraction PR, per Principle 2 (no speculative scaffolding).

#### `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(npm install)",
      "Bash(npm run dev)",
      "Bash(npm run build)",
      "Bash(npm run build:cf)",
      "Bash(npm run clean)",
      "Bash(npm run preview)"
    ]
  },
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh" }
        ]
      }
    ]
  }
}
```

#### `.claude/hooks/session-start.sh`

```bash
#!/bin/bash
set -euo pipefail

# Only install on Claude Code web (remote) sessions. Local sessions manage
# their own dependencies.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
npm install --no-audit --no-fund
```

> Commit with the executable bit set (`git update-index --chmod=+x .claude/hooks/session-start.sh`).

---

### PR 2 — Root `CLAUDE.md` rewrite + doc registry (docs-only)

**Goal.** Make the suite's orientation doc correct for a mixed monorepo where some apps are Preact and some are still single-file. This is a **blocker for Phase 2**: the current root `CLAUDE.md` states parser constraints apply "all apps, all threads, **forever**" — false the moment one app is Preact.

This PR touches **no code** and is independently reviewable.

**Task list.**

1. Rewrite root `CLAUDE.md` per the template in **Appendix B**. Key changes:
   - Add a **per-app status table** (app | mode | current URL | beta URL | doc location).
   - Split hard rules into two tiers (durable vs. legacy-only — see Appendix B).
   - State the per-mode verification gate: single-file app → `node --check`; Preact app → `npm run build`.
   - Document the new repo layout, `npm` commands, the branch + Cloudflare-preview + PR workflow.
2. **Register the currently-unregistered files** the existing registry forbids but that exist: `designs/` (a real design-system workspace) and `bench/node-system.md` (live design depth for Bench's hot phase). The current `CLAUDE.md` says "If you find another file, ask Jordan whether to absorb or retire it" — this PR resolves that by absorbing them into the registry.
3. Create `docs/` and `docs/plans/`; place this spec at `docs/plans/20260522-bench-studio-suite-monorepo-migration.md`.
4. Correct `product-strategy.md`'s "Track 3" section — it currently describes per-app **Netlify** sites; rewrite it for Cloudflare Pages + the monorepo.

**Acceptance criteria.**

- Root `CLAUDE.md` contains a per-app status table with all four apps in `single-file` mode.
- Hard rules are split into a durable tier and a single-file-only tier.
- `designs/` and `bench/node-system.md` appear in the registry.
- `product-strategy.md` no longer claims Netlify.
- No file outside `CLAUDE.md`, `product-strategy.md`, and `docs/` is modified.

---

### PR 3 — Prototype workflow + Cloudflare repo-side config

**Goal.** Port the proven prototype workflow, adapted to Cloudflare; add the repo-side Cloudflare build configuration. Depends on PR 1's build.

**Task list.**

1. Add `scripts/build-prototypes-index.mjs` — ported verbatim from the POC (**Appendix A.6**); it generates `dist/prototypes/index.html` listing every prototype on the branch.
2. Add `scripts/cf-build.mjs` (below) — the Cloudflare build entrypoint.
3. Add `_headers` (below) — Cloudflare headers file; `noindex` for `/prototypes/*`.
4. Add `prototypes/README.md` and `prototypes/CLAUDE.md` (adapt the POC versions in **Appendix A.4/A.5** — replace all Netlify specifics with the Cloudflare equivalents below).
5. Add one sample `prototypes/hello/index.html` (any minimal self-contained HTML in an iPhone frame).
6. Add `.claude/skills/studio-prototype/SKILL.md` — adapt the POC skill (**Appendix A.3**), rewriting the deploy section for Cloudflare (below).

**Cloudflare specifics that differ from the POC's Netlify model.**

- **No per-context build command.** Netlify ran a different command for preview vs. production. Cloudflare Pages runs one command for every deploy; branch detection must happen *inside* the build script — hence `cf-build.mjs` keying off `CF_PAGES_BRANCH`.
- **Preview URL pattern:** `https://<branch-alias>.<project>.pages.dev/prototypes/<slug>/`.
- **Branch-name limit:** Cloudflare truncates the branch-alias subdomain label to **28 characters**. Auto-generated branch names (e.g. `claude/notally-special-session-4WOhd`) exceed this and can collide or 404. The skill must instruct: keep working-branch names short, or rename before pushing.
- **noindex:** Netlify's `[[headers]]` block becomes a `_headers` file in `dist/`.

#### `scripts/cf-build.mjs`

```js
import { execSync } from 'node:child_process';
import { cpSync, existsSync } from 'node:fs';

// Cloudflare Pages build entrypoint.
//
// Cloudflare Pages has no per-context build command — one command runs for
// every deploy — so branch detection happens here. CF_PAGES_BRANCH is set by
// Cloudflare at build time.
//
//   always:           build the suite (landing + every extracted app)
//   preview branches: ALSO publish prototypes/ under dist/prototypes/
//   production (main): prototypes excluded entirely
//
// Set the Cloudflare Pages "build command" to: node scripts/cf-build.mjs
// Set the "build output directory" to: dist

const PRODUCTION_BRANCH = 'main';
const branch = process.env.CF_PAGES_BRANCH || '';

execSync('node scripts/build.mjs', { stdio: 'inherit' });

if (branch && branch !== PRODUCTION_BRANCH) {
  console.log('\n▶ preview branch (' + branch + ') — including prototypes/');
  cpSync('prototypes', 'dist/prototypes', { recursive: true });
  execSync('node scripts/build-prototypes-index.mjs', { stdio: 'inherit' });
} else {
  console.log('\n▶ production build — prototypes excluded');
}
```

#### `_headers`

```
# Cloudflare Pages headers. Belt-and-suspenders: production never ships
# prototypes/ at all, but if a preview is ever crawled, keep it unindexed.
/prototypes/*
  X-Robots-Tag: noindex, nofollow
```

#### Cloudflare deploy section for `.claude/skills/studio-prototype/SKILL.md`

Replace the POC skill's "Deploy model" section with:

```
## Deploy model: Cloudflare Pages branch previews (no CLI)

Cloudflare Pages is connected to the repo and builds every branch. The
build command is `node scripts/cf-build.mjs`, which includes prototypes/
on every non-`main` branch.

Preview URL, stable for the lifetime of the branch:

    https://<branch-alias>.<project>.pages.dev/prototypes/<slug>/

A generated index of all prototypes on the branch lives at
`/prototypes/` (no slug).

BRANCH NAME LIMIT. Cloudflare truncates the branch-alias subdomain label
to 28 characters. Branch names longer than that produce a truncated or
colliding alias and the preview URL may 404. Keep working-branch names
short; rename a long branch before pushing:

    git branch -m <shorter-name>
    git push origin -u <shorter-name>
    git push origin --delete <old-name>

Production (`main`) never ships prototypes/ — the live site has no
/prototypes/ path at all.
```

**Acceptance criteria.**

- `CF_PAGES_BRANCH=feature/x node scripts/cf-build.mjs` produces `dist/` **with** `dist/prototypes/` and a generated index.
- `CF_PAGES_BRANCH=main node scripts/cf-build.mjs` produces `dist/` **without** `dist/prototypes/`.
- `dist/_headers` is present and carries the `noindex` rule.
- The `studio-prototype` skill is invocable and its deploy section describes Cloudflare, not Netlify.

---

### PR 4 — App-extraction skill

**Goal.** Codify the Phase 2 per-app extraction workflow as a reusable skill, so every extraction is consistent: plan-first, hard-rule-aware, zone-driven, and protected against premature extraction. Standalone PR; can be authored in parallel.

**Task list.**

1. Add `.claude/skills/app-extraction/SKILL.md` with the content specified below.

**`SKILL.md` — required content.**

- **Frontmatter:** `name: app-extraction`, a `description` that triggers when the user asks to extract / split / port / migrate one of the four apps to Preact, `user-invocable: true`.
- **Plan first, always.** No extraction code is written until `docs/extraction-<app>.md` exists and is approved. That PLAN must contain: a source/zone map (every in-file zone with line ranges); a component breakdown (proposed `src/apps/<name>/` file tree with ~line estimates, nothing over ~200 lines); an entanglement & hard-rule audit (scattered globals, hot-path DOM queries, coupling); a leaf-first extraction order; and a verification checklist. The PLAN template is §11.2 of the migration spec.
- **Use the in-file zone registry as the decomposition scaffold.** Each app's `index.html` carries numbered zones with `BEGIN`/`END` markers and an in-file registry. Map zones → feature folders/components; do not invent a structure the zones don't support.
- **Hard rules.** Durable rules apply always (no base64 images; no DOM rebuilds during live interaction; no DOM queries in animation/physics hot paths; one root state object per app; no orphaned code; new features call existing systems). Parser constraints (no arrow functions, etc.) **lift** for the app being extracted — it is now a Preact app with a build step.
- **Anti-premature-extraction.** Do not split a feature finer than its zone justifies. Do **not** create `src/shared/` or cross-app abstractions during a single-app extraction — shared code is Phase 3, after duplication is proven across ≥2 apps. If a utility looks shared, leave it in `src/apps/<name>/lib/` and note it for Phase 3.
- **Per-app doc handling.** The app's `CLAUDE.md` living doc moves into `src/apps/<name>/CLAUDE.md`; its `zones` vocabulary (architecture/recent sections) updates from zone names to file names; design specs (`<app>-*.md`, `node-system.md`, etc.) move alongside. The `phase-N` section is handled per the app's own lifecycle — do not delete a live phase section as a side effect of extraction.
- **Output & verify.** Each app extracts leaf-first, one feature per commit. After every commit: `npm run build`, open `dist/beta/<app>/index.html`, and compare behavior to the still-live current app. Behavior must match — the current single-file app is the reference. Describe every change in behavioral terms.
- **Publish to `/beta/<app>`.** Never overwrite the app owner's current canonical deploy. Promotion is a separate, app-owner-gated step (Phase 4).

**Acceptance criteria.**

- `.claude/skills/app-extraction/SKILL.md` exists, is invocable, and covers all bullets above.
- The skill explicitly forbids writing extraction code before an approved `docs/extraction-<app>.md`.

---

## 11. Phase 2 — Per-app Extraction

One app per PR (each app may itself span several commits/sub-PRs as features are extracted leaf-first). Driven by the `app-extraction` skill and a per-app PLAN.

### 11.1 Order and rationale

| # | App | ~Lines | Why this position |
|---|---|---|---|
| 1 | **Decision Wizard** | 2,173 | Smallest; stable; **localStorage only — no Supabase, no IndexedDB**. Proves the whole pipeline end-to-end with zero backend entanglement and needs no shared code. |
| 2 | **Spatial Calendar** | 2,765 | Stable; canvas/SVG/DOM layered but self-contained. |
| 3 | **The Bench** | 7,230 | Large; uses Supabase; mid-phase 4.5 (**hot**). |
| 4 | **Constellation** | 9,450 | Largest; mid-phase 1.5/2 (**hot**); a partial extraction already exists in the POC repo and can seed this work. |

**Hot-app rule.** Before extracting The Bench or Constellation, declare a **freeze cut-line commit** in that app. Further single-file bug-fixes pause, or are mirrored into the Preact tree, until the extraction lands. Do **not** interleave an app's phase-ship with its extraction — the per-app `CLAUDE.md` `phase-N` section is deleted on ship, which would collide with the extraction's doc relocation.

**Constellation note.** The POC repo's `src/apps/constellation/` scaffold and its `PLAN.md` were built from an earlier Constellation version (~8.3k lines) than the current one (~9.5k lines). Constellation's extraction PLAN must reconcile that divergence; the POC is a starting point, not a drop-in.

### 11.2 The per-app extraction PLAN template (`docs/extraction-<app>.md`)

```
# <App> Extraction: single-file HTML → Preact + Vite

## Context
What the app is, current line count, why it's being extracted now,
freeze cut-line commit SHA (hot apps only).

## Source / Zone Map
Every in-file zone, with line ranges and a one-line description.
| Zone | Lines | Description |

## Functional Summary
What the app does, screen by screen / overlay by overlay.

## Proposed Component Breakdown — src/apps/<name>/
For each proposed file: path, ~line estimate, description.
Nothing over ~200 lines. Group features into folders ≈ one per zone.
  pages/        top-level screens
  features/     one folder per feature group
  components/   app-specific primitives
  lib/          app-specific pure utilities
  state/        index.js (root signals), actions.js, selectors.js

## Entanglement & Hard-Rule Audit
Scattered globals, hot-path DOM queries, cross-feature coupling found in
the source, and how each is resolved in the split.

## Extraction Order (leaf-first)
1. Leaf components / pure utilities
2. Mid-level features
3. State-heavy features
4. Composite shells, then App.jsx wire-up

## Verification Checklist
Golden-path behaviors to compare against the live current app.

## Out of Scope
No new features. No shared-code extraction. No bridges wired.
```

### 11.3 Per-app extraction steps

1. **Invoke the `app-extraction` skill.** Write `docs/extraction-<app>.md`. **Review gate:** the app owner / reviewer approves the PLAN before any extraction code.
2. **Scaffold PR (behavior: empty app).** Create `src/apps/<name>/` skeleton, `<app>.html` entry, add `{ name, entry }` to `apps.config.mjs`, add the app's runtime deps (`preact`, `@preact/signals`, etc.) to `package.json`. `npm run build` now also produces `dist/beta/<app>/` (an empty page). Add the app's row to the root `CLAUDE.md` status table (mode `Preact-beta`).
3. **Extraction commits (leaf-first).** Extract one feature group (≈ one zone) per commit. After each: `npm run build`; open `dist/beta/<app>/index.html`; compare to the live current app.
4. **Doc relocation.** Move `<app>/CLAUDE.md` and design specs into `src/apps/<name>/`; update its zone vocabulary to file names.
5. **Beta complete.** The `/beta/<app>` build matches the current app on every golden path. Hand to the app owner for validation → Phase 4.

---

## 12. Phase 3 — Shared Code Extraction

**Trigger:** at least two apps extracted, real duplication visible.

Once two Preact apps exist, genuine duplication is observable (e.g. a Supabase + localStorage adapter, modal/dialog primitives, gesture helpers, design tokens). Only then:

1. Create `src/shared/` (`lib/`, `components/`, `styles/`).
2. Move the proven-duplicated code **from this repo's own extracted apps** into `src/shared/`; update imports.
3. Fold `designs/tokens.css` in as `src/shared/styles/tokens.css` (the canonical token source per `designs/SYSTEM.md`).

Do not port speculatively from the POC repo. Each shared module must be justified by ≥2 existing call sites in this repo.

---

## 13. Phase 4 — Promotion (beta → canonical)

Per app, **app-owner-gated**:

1. App owner validates `/beta/<app>` against the current app.
2. The canonical Cloudflare deploy for that app is switched to the Preact build (mechanics depend on the deferred Cloudflare topology — see §14).
3. Archive the pre-split single-file file to `legacy/<app>-vNN.html` (frozen behavioral reference).
4. Remove the now-obsolete `<app>/index.html`; `<app>/CLAUDE.md` and specs already moved in Phase 2.
5. Flip the app's status-table row from `Preact-beta` to `Preact` (canonical).

When all four apps are promoted, delete the single-file-only hard-rule tier from root `CLAUDE.md`.

---

## 14. Cloudflare Design

Cloudflare Pages does production and per-branch previews with one mechanism, so it replaces the POC's GitHub Pages + Netlify split and needs **no GitHub Actions** — its Git integration builds directly from the repo.

**Decided and built repo-side now (PR 1 + PR 3, topology-agnostic):**

- `scripts/build.mjs` — dynamic suite build.
- `scripts/cf-build.mjs` — Cloudflare entrypoint; `CF_PAGES_BRANCH`-gated prototypes.
- `_headers` — `noindex` for `/prototypes/*`.
- Build output: landing → `dist/index.html`; each app → `dist/beta/<app>/index.html`.

**Deferred — to coordinate with the app owner:**

- **Project topology & URL scheme.** Likely one Cloudflare Pages project for the monorepo; current apps either stay on their existing per-app sites until promotion, or are folded in. URL scheme for the beta builds (`/beta/<app>` paths vs. subdomains) is the app owner's call. None of this blocks Phase 1.
- **Cloudflare dashboard wiring** (a manual, one-time step by the repo owner): connect the repo; set build command `node scripts/cf-build.mjs`; set output directory `dist`; set Supabase env vars.
- **Supabase env vars** must be set in **both** Cloudflare's Production and Preview scopes (Cloudflare scopes them separately — miss Preview and preview builds get `undefined` and Supabase silently no-ops). Decide whether preview builds use the real Supabase project or a separate one. Relevant only once The Bench is extracted.

---

## 15. Verification Strategy

There are no automated tests. Verification is mechanical for scaffold PRs and behavioral for extractions.

**Phase 1 scaffold PRs** — mechanical, per the acceptance criteria in §10. Summary: `npm install` / `npm run build` / `npm run dev` succeed; `cf-build.mjs` includes/excludes prototypes correctly by branch; the SessionStart hook installs deps on Claude Code web; current apps and deploys are untouched.

**Phase 2 extractions** — behavioral, side by side:

- The `/beta/<app>` build and the still-live current app are opened **side by side** (this is the entire reason beta deploys to a separate path).
- The app's **zone registry** + its `CLAUDE.md` **architecture section** become a golden-path checklist.
- Jordan tests by feel; the current single-file app is the behavioral reference. Any divergence is a bug in the extraction.
- Post-build sanity: `dist/beta/<app>/index.html` opens via `file://` with no server (confirms the single-file build is genuinely self-contained); built file size is within a sane range of the original.

---

## 16. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Migration disturbs the app owner's live apps | New builds publish only to `/beta/<app>`; current sites untouched until app-owner-gated promotion (Principle 1). |
| Root `CLAUDE.md` says "parser constraints forever" — false once one app is Preact | PR 2 rewrites it with a per-app status table and a two-tier hard-rule split, **before** any extraction. |
| Hot apps (Bench, Constellation) get bug-fixed in single-file while being extracted | Declare a freeze cut-line commit; pause/mirror fixes; never interleave a phase-ship with an extraction. |
| Premature shared abstraction creates coupling | `src/shared/` is Phase 3 only; each shared module needs ≥2 proven call sites. |
| Single `dist/` partial build leaves stale files | `scripts/build.mjs` always `rm -rf dist` first; Cloudflare build command is always the umbrella `cf-build.mjs`, never an individual app build. |
| Supabase env vars missing on preview deploys | §14: set vars in both Cloudflare Production and Preview scopes; decide preview Supabase target. |
| Long auto-generated branch names break Cloudflare preview URLs | The `studio-prototype` skill documents the 28-char limit and the rename procedure. |
| Unregistered files (`designs/`, `bench/node-system.md`) get silently dropped | PR 2 explicitly registers them. |
| `node --check` can't validate JSX | Root `CLAUDE.md` states the per-mode gate: single-file → `node --check`; Preact → `npm run build`. |

---

## 17. Open Items

To confirm with the app owner before / during execution:

1. **Cloudflare topology & URL scheme** for the `/beta/<app>` site (one project vs. several; paths vs. subdomains).
2. **Promotion mechanics** — how/when each validated beta replaces the current canonical deploy.
3. **Supabase for preview deploys** — real project or a separate preview project.
4. **Branch workflow** — adopting branch + preview + PR in place of "straight to `main`."
5. **Bench / Constellation freeze windows** — when each hot app can pause single-file work for extraction.
6. **Skill names** — `studio-prototype` and `app-extraction` are proposed; confirm or rename.

---

## Appendix A — wolbergs-world POC reference files

Inlined so this spec is executable without POC repo access. These are the **POC originals**; the new `bench-studio-suite` files in §10 are adaptations of them.

### A.1 POC `vite.config.js` (original — uses a hardcoded `APPS` map)

```js
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const APPS = {
  index: 'index.html',
  constellation: 'constellation.html',
  // bench: 'bench.html',
  // wizard: 'wizard.html',
  // 'spatial-calendar': 'spatial-calendar.html',
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return { plugins: [preact()] };
  }
  const appKey = process.env.VITE_APP;
  if (!appKey || !APPS[appKey]) {
    throw new Error('Set VITE_APP to one of: ' + Object.keys(APPS).join(', ') + '. Got: ' + appKey);
  }
  return {
    plugins: [preact(), viteSingleFile()],
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      assetsInlineLimit: 100_000_000,
      outDir: 'dist',
      emptyOutDir: false,
      rollupOptions: { input: { [appKey]: resolve(__dirname, APPS[appKey]) } },
    },
  };
});
```

> The §10 `vite.config.js` improves on this by reading `apps.config.mjs` (no hardcoded list) and writing each app to its own `dist/beta/<app>/` dir.

### A.2 POC `package.json` (original — hand-chained build script)

```json
{
  "name": "wolbergs-world",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "clean": "rm -rf dist",
    "build": "npm run clean && npm run build:landing && npm run build:constellation && npm run build:legacy",
    "build:landing": "VITE_APP=index vite build",
    "build:constellation": "VITE_APP=constellation vite build",
    "build:legacy": "cp legacy/constellation-v1-39.html dist/legacy-constellation.html",
    "build:prototypes": "mkdir -p dist/prototypes && cp -R prototypes/. dist/prototypes/ && node scripts/build-prototypes-index.mjs",
    "preview": "vite preview"
  },
  "dependencies": {
    "@preact/signals": "^2.9.0",
    "@supabase/supabase-js": "^2.105.3",
    "jszip": "^3.10.1",
    "preact": "^10.29.1"
  },
  "devDependencies": {
    "@preact/preset-vite": "^2.10.5",
    "vite": "^8.0.11",
    "vite-plugin-singlefile": "^2.3.3"
  }
}
```

> The §10 `package.json` replaces the hand-chained `build` with `node scripts/build.mjs` (dynamic) and omits runtime deps until the first extraction needs them.

### A.3 POC prototype skill `SKILL.md` (original — Netlify-based; adapt per PR 3)

```
---
name: wolbergs-prototype
description: Workflow rules for HTML prototypes in `prototypes/<slug>/` — file layout, the self-contained HTML constraint, the Netlify branch-preview URL pattern, the plain-text URL rule, the commit+push expectation, and the path for promoting an approved prototype into a real app under `src/apps/<name>/`.
user-invocable: true
---

# Prototype Skill

Operational rules for working in `prototypes/`.

## What belongs in a prototype vs. an app
App  = built (Vite), real state, real persistence, in production.
Proto = single raw HTML file, mock data inline, NOT in production.
If it needs real state, real persistence, or real navigation, it is an
app change, not a prototype.

## Hard rules
- Self-contained HTML only: single file at prototypes/<slug>/index.html,
  inline <style> and <script>, no CDN, no external assets, no build step.
- No imports from src/. Copy tokens/snippets inline; let them drift.
- iPhone frame: wrap in a 390x844 phone frame with a scrollable inner
  viewport.
- Mock data inline. No fetches. Relative-to-today dates.
- Interactions illustrative, not real (tap a row -> toast "would open X").
- No build, no package.json, no framework under prototypes/.

## Deploy model
[Netlify branch-preview details — REPLACED by the Cloudflare section in
PR 3, §10 of the migration spec.]

## After every edit
1. Save. 2. git add. 3. Commit with a behavioral message. 4. Push to the
working branch. 5. Paste the preview URL as PLAIN TEXT (no markdown — phone
clients include markup in the click target).

## Promote
Translate the static HTML into Preact components in src/apps/<name>/.
Reuse existing features/components/tokens first. Leave the prototype
intact under prototypes/<slug>/ as a frozen reference.
```

### A.4 POC `prototypes/README.md` (abridged — adapt per PR 3)

```
# prototypes/

Fast HTML-prototype iteration before touching app code.

Jordan develops from the Claude phone app and can't run npm/vite locally.
A prototype is a single self-contained HTML file deployed via branch
previews so a visual idea is viewable on a phone in under a minute.

File layout:
  prototypes/
    README.md
    CLAUDE.md          short pointer at the skill
    <slug>/index.html  the prototype (single self-contained file)

Hard rules: self-contained HTML only; don't import from src/; iPhone
frame; mock data inline; interactions illustrative; no build/framework.

Iteration loop: edit -> commit -> push -> open the branch preview URL.

Promotion: when approved, port into src/apps/<name>/; leave the prototype
intact as a frozen reference.

[The Netlify-specific deploy + one-time-setup sections are replaced by the
Cloudflare equivalents — see PR 3.]
```

### A.5 POC `prototypes/CLAUDE.md` (original)

```
# prototypes/ — local context

You're in the prototypes folder. Invoke the prototype skill — it has the
operational rules (hard rules, URL pattern, iteration loop, promotion path).

For background, rationale, and one-time host setup, read README.md in this
folder.
```

### A.6 POC `scripts/build-prototypes-index.mjs` (port verbatim)

```js
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'prototypes';
const OUT = 'dist/prototypes/index.html';

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);

const slugs = readdirSync(SRC)
  .filter((name) => {
    const dir = join(SRC, name);
    return statSync(dir).isDirectory() && existsSync(join(dir, 'index.html'));
  })
  .sort();

const items = slugs.map((slug) => {
  const html = readFileSync(join(SRC, slug, 'index.html'), 'utf8');
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return { slug, title: m ? m[1].trim() : slug };
});

const rows = items
  .map((i) =>
    '      <li><a href="./' + escape(i.slug) + '/"><span class="slug">' +
    escape(i.slug) + '</span><span class="title">' + escape(i.title) +
    '</span></a></li>')
  .join('\n');

const out = '<!doctype html>\n<html lang="en"><head>' +
  '<meta charset="utf-8" />' +
  '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
  '<meta name="robots" content="noindex, nofollow" />' +
  '<title>prototypes — bench-studio-suite</title>' +
  '<style>body{margin:0;padding:32px 20px;font-family:-apple-system,' +
  'BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;background:#111;' +
  'color:#f4ece2;max-width:640px;margin-inline:auto}h1{font-size:22px;' +
  'margin:0 0 4px}.sub{font-size:13px;opacity:.6;margin:0 0 28px}ul{list-' +
  'style:none;padding:0;margin:0}li{border-top:1px solid rgba(255,255,255,' +
  '.08)}a{display:flex;align-items:baseline;gap:12px;padding:16px 4px;' +
  'color:inherit;text-decoration:none}.slug{font-family:ui-monospace,' +
  'Menlo,monospace;font-size:14px}.title{font-size:13px;opacity:.55}' +
  '.empty{opacity:.5;font-size:14px;padding:24px 4px}</style></head><body>' +
  '<h1>prototypes</h1><p class="sub">branch preview · ' + items.length +
  (items.length === 1 ? ' prototype' : ' prototypes') + '</p>' +
  (items.length ? '<ul>\n' + rows + '\n</ul>' :
    '<p class="empty">No prototypes in this branch yet.</p>') +
  '</body></html>\n';

writeFileSync(OUT, out);
console.log('wrote ' + OUT + ' (' + items.length + ' prototype(s))');
```

> The POC original uses template literals; rewritten here with string
> concatenation only as a convenience — either form is fine, `scripts/` is
> a build script, not parser-constrained app code.

### A.7 POC `.github/workflows/build.yml` — NOT ported

The POC repo carries a GitHub Actions workflow that builds and (attempted to) deploy to GitHub Pages plus attach Release artifacts. **It is intentionally not ported.** Cloudflare's Git integration builds and deploys directly; this migration adds no GitHub Actions. If downloadable single-file Release artifacts are wanted later, that is a separate, future decision.

---

## Appendix B — Root `CLAUDE.md` rewrite template (for PR 2)

The rewritten root `CLAUDE.md` should keep the existing suite philosophy, the four-apps arc, the tonal contract, and the session-protocol sections, and replace the architecture/hard-rules portions with the following.

```
## REPO MODE — PER-APP STATUS

This repo is mid-migration: a Preact + Vite monorepo. Apps move from
single-file HTML to Preact one at a time. Always check an app's mode
before working on it.

| App           | Mode         | Current (canonical)     | Beta (Preact)        | Doc                         |
|---------------|--------------|-------------------------|----------------------|-----------------------------|
| Decision Wizard| single-file | wizard/index.html       | —                    | wizard/CLAUDE.md            |
| Spatial Calendar| single-file| spatial/index.html      | —                    | spatial/CLAUDE.md           |
| The Bench     | single-file  | bench/index.html        | —                    | bench/CLAUDE.md             |
| Constellation | single-file  | constellation/index.html| —                    | constellation/CLAUDE.md     |

(As an app is extracted: mode -> Preact-beta, beta column -> /beta/<app>,
 code -> src/apps/<name>/, doc -> src/apps/<name>/CLAUDE.md.)

## HARD RULES

### Tier 1 — Durable rules. ALL apps, ALL modes, always.
- No base64 images, ever. External asset paths only.
- No DOM rebuilds during live interactions (drag, slider, gesture, tick).
- No DOM queries in animation/physics hot paths. Cache references.
- State lives in one object per app. Mutations route through one place.
- No orphaned code. Remove a feature's CSS, bindings, and state with it.
- New features call existing systems; they don't duplicate them.

### Tier 2 — Single-file parser constraints. ONLY apps in `single-file` mode.
- No arrow functions, template literals, spread, or `in`.
- Single self-contained .html file, no build step, no imports.
- These constraints LIFT for an app the moment it becomes Preact-beta —
  it then has a build pipeline. Do not apply Tier 2 to a Preact app.

## VERIFICATION GATE (before shipping)
- single-file app: `node --check` the file.
- Preact app:      `npm run build` succeeds and dist/beta/<app>/ behaves.
  (`node --check` cannot validate JSX — do not use it for Preact apps.)

## RUNNING LOCALLY
  npm install
  npm run dev        # Vite dev server — landing + all apps
  npm run build      # builds landing + every app in apps.config.mjs

## REPO LAYOUT
  index.html, <app>.html      Vite entries
  apps.config.mjs             the app manifest
  src/apps/<name>/            extracted Preact apps
  src/shared/                 shared code (created in Phase 3 only)
  prototypes/                 throwaway HTML explorations
  scripts/                    build.mjs, cf-build.mjs, build-prototypes-index.mjs
  docs/                       suite docs + extraction PLANs
  designs/                    design-system workspace (registered)
  <app>/                      current single-file apps (until promotion)

## WORKING MODEL
Branch -> commit -> Cloudflare preview URL -> test by feel -> PR -> main.
(Replaces the former "everything straight to main" rule.)
```

---

## 18. Progress Log

Execution progress against the §9 work breakdown. Updated as PRs land.

### PR 1 — Vite build pipeline + Claude Code web setup — ✅ done

- **Issue:** [#2](https://github.com/Glowbel/Bench-studio-suite/issues/2) · **Branch:** `scaffold-vite-pipeline`
- **Files added:** `package.json`, `apps.config.mjs`, `vite.config.js`, `scripts/build.mjs`, `index.html` (landing), `.gitignore`, `.claude/settings.json`, `.claude/hooks/session-start.sh` (executable bit set).
- **Verified locally:** `npm install` succeeds (95 packages); `npm run build` → `dist/index.html` (1.39 kB), 0 apps as expected; `npm run dev` serves the landing page and the four current apps remain reachable at `/bench/`, `/wizard/`, etc. No files under `bench/`, `constellation/`, `wizard/`, `spatial/` modified.
- **Divergence from §10:** `.env.example` was **not** added. The spec included it "so the convention is established," but that contradicts Principle 2 (no speculative scaffolding) and the spec's own note that it is "only needed once an app that uses Supabase is extracted." Decision (app owner, 2026-05-22): defer it to the first Supabase-using extraction PR (The Bench, issue #9), created in context there.

### PR 2, 3, 4 — Phase 1 scaffold remainder — ⬜ not started

### Phases 2–4 — ⬜ not started

---

*End of spec.*
