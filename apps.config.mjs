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
