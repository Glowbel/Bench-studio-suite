---
name: prototype
description: Workflow rules for HTML prototypes in `prototypes/<slug>/` — file layout, the self-contained HTML constraint, the iPhone-frame requirement, the shared starter template at `prototypes/_template/`, reading the Cloudflare Pages branch-preview URL from the PR bot comment, the plain-text URL rule, the commit+push expectation, and the path for promoting an approved prototype into a real app under `src/apps/<name>/`. Invoke as `/prototype <slug>` (or `/prototype` without args for general guidance), or whenever the user asks to create, edit, or promote a prototype, or works anywhere under `prototypes/`.
user-invocable: true
---

# Prototype Skill

Operational rules for working in `prototypes/`.

## What belongs in a prototype vs. an app

App   = built (Vite), real state, real persistence, in production.
Proto = single raw HTML file, mock data inline, NOT in production.

If it needs real state, real persistence, or real navigation, it is an
app change, not a prototype.

## Starting a new prototype

Copy the shared starter template:

```
cp -r prototypes/_template prototypes/<slug>
```

The template (`prototypes/_template/index.html`) sets up the 390x844 phone
frame, scrollable inner viewport, dark background, system font stack, and a
`<!-- prototype content -->` marker. Every prototype starts from it so they
all share the same baseline. The build-time index skips any directory whose
name starts with `_`, so the template never ships as a prototype itself.

## Hard rules

- Self-contained HTML only: a single file at `prototypes/<slug>/index.html`,
  inline `<style>` and `<script>`, no CDN, no external assets, no build step.
- Start from `prototypes/_template/index.html` (see above) — don't reinvent
  the phone frame or viewport per prototype.
- No imports from `src/`. Copy tokens/snippets inline; let them drift.
- iPhone frame: 390x844, scrollable inner viewport (the template provides this).
- Mock data inline. No fetches. Relative-to-today dates.
- Interactions illustrative, not real (tap a row -> toast "would open X").
- No build, no package.json, no framework under `prototypes/`.

## Deploy model: Cloudflare Pages branch previews (no CLI)

Cloudflare Pages is connected to the repo and builds every branch. The
build command is `node scripts/cf-build.mjs`, which includes prototypes/
on every non-`main` branch.

DO NOT hand-construct the preview URL. Cloudflare's branch-alias subdomain
is truncated and can collide, so a guessed URL may 404. Read the real URL
from Cloudflare's own comment on the PR:

1. After the branch is pushed, open the PR for it.
2. Find the comment from `cloudflare-workers-and-pages[bot]` (titled
   "Deploying ... with Cloudflare Pages"). It is posted/updated per deploy.
3. Take the **Branch Preview URL** from that comment — e.g.
   `https://scaffold-docs.bench-suite.pages.dev`.
4. The prototype is the Branch Preview URL + `/prototypes/<slug>/`. A
   generated index of all prototypes on the branch is the URL + `/prototypes/`.

If the bot comment hasn't appeared yet, the build is still running — wait
for it rather than guessing the URL.

Production (`main`) never ships prototypes/ — the live site has no
/prototypes/ path at all.

## After every edit

1. Save.
2. `git add`.
3. Commit with a behavioral message.
4. Push to the working branch.
5. Get the Branch Preview URL from the Cloudflare bot's PR comment (see
   Deploy model above), append `/prototypes/<slug>/`, and paste the result
   as PLAIN TEXT (no markdown — phone clients include markup in the click
   target).

## Promote

Translate the static HTML into Preact components in `src/apps/<name>/`.
Reuse existing features/components/tokens first. Leave the prototype
intact under `prototypes/<slug>/` as a frozen reference.
