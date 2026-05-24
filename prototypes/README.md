# prototypes/

Fast HTML-prototype iteration before touching app code.

Jordan develops from the Claude phone app and can't run npm/vite locally.
A prototype is a single self-contained HTML file deployed via Cloudflare
Pages branch previews so a visual idea is viewable on a phone in under a
minute.

## File layout

```
prototypes/
  README.md
  CLAUDE.md            short pointer at the prototype skill
  _template/index.html the shared starter (phone frame, viewport, fonts);
                       directories prefixed with `_` are skipped by the
                       build-time index, so the template never ships as a
                       prototype itself.
  <slug>/index.html    a prototype (single self-contained file)
```

## Usage — the `prototype` skill

The workflow is owned by the **`prototype`** skill
(`.claude/skills/prototype/SKILL.md`). Invoke it on the phone or from a
session:

```
/prototype <slug>     create or work on prototypes/<slug>/index.html
/prototype            general guidance (when you don't have a slug yet)
```

The skill loads the rules below, copies the starter template into the new
slug, opens it for editing, and at the end gives you the commit + push
instructions plus where to read the preview URL.

## Hard rules

- Self-contained HTML only: a single file at `prototypes/<slug>/index.html`,
  inline `<style>` and `<script>`, no CDN, no external assets, no build step.
- **Start from the template:** `cp -r prototypes/_template prototypes/<slug>`
  so every prototype shares the same phone frame, viewport, and fonts.
- Don't import from `src/`. Copy tokens/snippets inline; let them drift.
- iPhone frame: 390x844 with a scrollable inner viewport (the template
  provides this).
- Mock data inline. No fetches. Use relative-to-today dates.
- Interactions illustrative, not real (tap a row -> toast "would open X").
- No build, no package.json, no framework under `prototypes/`.

## Iteration loop

```
edit prototypes/<slug>/index.html
  -> git add + commit (behavioral message)
  -> git push to the working branch
  -> get the branch preview URL from the Cloudflare PR comment
  -> open <branch-preview-url>/prototypes/<slug>/ on the phone
```

## Deploy model: Cloudflare Pages branch previews

Cloudflare Pages is connected to the repo and builds every branch with
`node scripts/cf-build.mjs`. That command publishes `prototypes/` on every
non-`main` branch.

Don't hand-construct the preview URL — Cloudflare's branch-alias subdomain
is truncated and can collide, so a guessed URL may 404. Instead, after
pushing, open the PR and read the **Branch Preview URL** from the
`cloudflare-workers-and-pages[bot]` comment. The prototype is that URL +
`/prototypes/<slug>/`; the generated index of all prototypes on the branch
is that URL + `/prototypes/`.

Production (`main`) never ships `prototypes/` — the live site has no
`/prototypes/` path at all. A `_headers` rule additionally marks
`/prototypes/*` `noindex, nofollow` as a belt-and-suspenders measure.

## Promotion

When a prototype is approved, port it into a real app under
`src/apps/<name>/` — translate the static HTML into Preact components,
reusing existing features/components/tokens first. Leave the prototype
intact under `prototypes/<slug>/` as a frozen reference.
