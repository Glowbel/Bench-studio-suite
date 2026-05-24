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
