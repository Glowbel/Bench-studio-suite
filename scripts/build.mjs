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
