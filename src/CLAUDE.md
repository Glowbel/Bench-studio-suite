# src/ — extracted Preact apps

This directory holds apps after they have been extracted from their
single-file `index.html` into modular Preact + Vite. **Extracted code lives
here, not at the repo root.**

```
src/
  apps/<name>/   one folder per extracted app (bench, constellation, wizard,
                 spatial). Each is authored as small modular files but builds
                 to one self-contained dist/beta/<name>/index.html.
  shared/        proven-shared code, extracted only after duplication is
                 visible across ≥2 apps (Phase 3 — see migration spec §12).
                 Do not create speculatively.
```

Each `src/apps/<name>/` carries its own `CLAUDE.md` living doc (relocated
from the app's original folder at extraction time) — read that for the app's
state, recent activity, and active phase.

Until an app is extracted, its single-file form at `<name>/index.html` is
canonical and lives at the repo root. See the root `CLAUDE.md` for the
per-app status table and the full migration plan at
`docs/plans/20260522-bench-studio-suite-monorepo-migration.md`.
