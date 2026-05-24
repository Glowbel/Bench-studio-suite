import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'prototypes';
const OUT = 'dist/prototypes/index.html';

// Node has no built-in HTML-escape (the closest stdlib helpers — querystring
// .escape, URL encoding, util.escape — all do URL/percent encoding, not HTML
// entity encoding). Keeping a tiny local helper rather than pulling in a
// runtime dependency for five characters.
const HTML_ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => HTML_ENTITIES[c]);

const slugs = readdirSync(SRC)
  .filter((name) => {
    // Skip dotfiles and underscore-prefixed dirs (e.g. _template) so the
    // starter template never shows up as a prototype itself.
    if (name.startsWith('.') || name.startsWith('_')) return false;
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
  .map(({ slug, title }) => `      <li><a href="./${escape(slug)}/"><span class="slug">${escape(slug)}</span><span class="title">${escape(title)}</span></a></li>`)
  .join('\n');

const body = items.length
  ? `<ul>\n${rows}\n</ul>`
  : `<p class="empty">No prototypes in this branch yet.</p>`;

const countLabel = `${items.length} ${items.length === 1 ? 'prototype' : 'prototypes'}`;

const out = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>prototypes — bench-studio-suite</title>
  <style>
    body { margin: 0; padding: 32px 20px; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; background: #111; color: #f4ece2; max-width: 640px; margin-inline: auto; }
    h1 { font-size: 22px; margin: 0 0 4px; }
    .sub { font-size: 13px; opacity: .6; margin: 0 0 28px; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { border-top: 1px solid rgba(255, 255, 255, .08); }
    a { display: flex; align-items: baseline; gap: 12px; padding: 16px 4px; color: inherit; text-decoration: none; }
    .slug { font-family: ui-monospace, Menlo, monospace; font-size: 14px; }
    .title { font-size: 13px; opacity: .55; }
    .empty { opacity: .5; font-size: 14px; padding: 24px 4px; }
  </style>
</head>
<body>
  <h1>prototypes</h1>
  <p class="sub">branch preview · ${countLabel}</p>
  ${body}
</body>
</html>
`;

writeFileSync(OUT, out);
console.log(`wrote ${OUT} (${countLabel})`);
