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
