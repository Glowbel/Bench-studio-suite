// The app manifest — the single source of truth for the suite's apps.
//
// Each entry: { name, entry }
//   name  — short id, also the dist/beta/<name>/ output folder
//   entry — the Vite HTML entry file at the repo root
//
// Apps are appended here ONE AT A TIME, by their extraction PR, as they
// move from single-file HTML to Preact. Until an app is listed here it is
// not built by the monorepo — its current single-file site is untouched.
//
// vite.config.js and scripts/build.mjs both read this file. Do not hardcode
// the app list anywhere else.

export const apps = [
  // { name: 'wizard',        entry: 'wizard.html' },
  // { name: 'spatial',       entry: 'spatial.html' },
  // { name: 'bench',         entry: 'bench.html' },
  // { name: 'constellation', entry: 'constellation.html' },
];

// The current single-file apps — still canonical. Each is copied verbatim
// (byte-for-byte) into dist/<app>/ by scripts/build-legacy.mjs, so the
// monorepo site can serve them alongside the new Preact /beta/<app>/ builds.
//
// These are NOT disturbed — copying is additive; the apps' own Cloudflare
// sites stay live and untouched (Principle 1).
//
// Drop an app from this list when it is promoted (Phase 4) and its
// <app>/index.html is removed from the repo.

export const legacyApps = ['bench', 'constellation', 'wizard', 'spatial'];
