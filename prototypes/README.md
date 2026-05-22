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
  CLAUDE.md          short pointer at the studio-prototype skill
  <slug>/index.html  the prototype (single self-contained file)
```

## Hard rules

- Self-contained HTML only: a single file at `prototypes/<slug>/index.html`,
  inline `<style>` and `<script>`, no CDN, no external assets, no build step.
- Don't import from `src/`. Copy tokens/snippets inline; let them drift.
- iPhone frame: wrap in a 390x844 phone frame with a scrollable inner viewport.
- Mock data inline. No fetches. Use relative-to-today dates.
- Interactions illustrative, not real (tap a row -> toast "would open X").
- No build, no package.json, no framework under `prototypes/`.

## Iteration loop

```
edit prototypes/<slug>/index.html
  -> git add + commit (behavioral message)
  -> git push to the working branch
  -> open the Cloudflare branch preview URL on the phone
```

## Deploy model: Cloudflare Pages branch previews

Cloudflare Pages is connected to the repo and builds every branch with
`node scripts/cf-build.mjs`. That command publishes `prototypes/` on every
non-`main` branch, so each prototype is reachable at:

```
https://<branch-alias>.<project>.pages.dev/prototypes/<slug>/
```

A generated index of all prototypes on the branch lives at `/prototypes/`
(no slug).

**Branch-name limit.** Cloudflare truncates the branch-alias subdomain label
to 28 characters. Branch names longer than that produce a truncated or
colliding alias and the preview URL may 404. Keep working-branch names short,
or rename a long branch before pushing.

Production (`main`) never ships `prototypes/` — the live site has no
`/prototypes/` path at all. A `_headers` rule additionally marks
`/prototypes/*` `noindex, nofollow` as a belt-and-suspenders measure.

## Promotion

When a prototype is approved, port it into a real app under
`src/apps/<name>/` — translate the static HTML into Preact components,
reusing existing features/components/tokens first. Leave the prototype
intact under `prototypes/<slug>/` as a frozen reference.
