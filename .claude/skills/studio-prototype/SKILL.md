---
name: studio-prototype
description: Workflow rules for HTML prototypes in `prototypes/<slug>/` — file layout, the self-contained HTML constraint, the iPhone-frame requirement, the Cloudflare Pages branch-preview URL pattern, the 28-char branch-name limit, the plain-text URL rule, the commit+push expectation, and the path for promoting an approved prototype into a real app under `src/apps/<name>/`. Use when creating, editing, or promoting a prototype, or when working anywhere under `prototypes/`.
user-invocable: true
---

# Prototype Skill

Operational rules for working in `prototypes/`.

## What belongs in a prototype vs. an app

App   = built (Vite), real state, real persistence, in production.
Proto = single raw HTML file, mock data inline, NOT in production.

If it needs real state, real persistence, or real navigation, it is an
app change, not a prototype.

## Hard rules

- Self-contained HTML only: a single file at `prototypes/<slug>/index.html`,
  inline `<style>` and `<script>`, no CDN, no external assets, no build step.
- No imports from `src/`. Copy tokens/snippets inline; let them drift.
- iPhone frame: wrap in a 390x844 phone frame with a scrollable inner
  viewport.
- Mock data inline. No fetches. Relative-to-today dates.
- Interactions illustrative, not real (tap a row -> toast "would open X").
- No build, no package.json, no framework under `prototypes/`.

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

## After every edit

1. Save.
2. `git add`.
3. Commit with a behavioral message.
4. Push to the working branch.
5. Paste the preview URL as PLAIN TEXT (no markdown — phone clients
   include markup in the click target).

## Promote

Translate the static HTML into Preact components in `src/apps/<name>/`.
Reuse existing features/components/tokens first. Leave the prototype
intact under `prototypes/<slug>/` as a frozen reference.
