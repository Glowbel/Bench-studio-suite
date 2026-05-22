import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { legacyApps } from '../apps.config.mjs';

// Copies each current single-file app (<app>/index.html) verbatim into
// dist/<app>/index.html, so the monorepo site serves the canonical apps
// alongside the new Preact /beta/<app>/ builds.
//
// These are byte-for-byte copies — no build step, no transform. The current
// apps and their own Cloudflare sites are untouched (Principle 1); this only
// ADDS copies to the monorepo's dist/.
//
// The app list comes from apps.config.mjs (legacyApps). An app drops off
// when it is promoted (Phase 4) and its <app>/index.html is removed.
//
// Runnable standalone (npm run build:legacy) or as the final step of
// scripts/build.mjs.

let copied = 0;
for (const app of legacyApps) {
  const src = join(app, 'index.html');
  if (!existsSync(src)) {
    console.log('  ⚠ skipping ' + app + ' — ' + src + ' not found');
    continue;
  }
  const dest = join('dist', app, 'index.html');
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log('  ✓ ' + src + ' → ' + dest);
  copied++;
}

console.log('✓ copied ' + copied + ' legacy app(s)');
