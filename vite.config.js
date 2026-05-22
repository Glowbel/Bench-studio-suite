import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve } from 'node:path';
import { apps } from './apps.config.mjs';

// One Vite invocation per app at build time. vite-plugin-singlefile inlines
// the whole build into one .html file; that inlining is incompatible with
// rollup multi-input, so each app (and the landing page) builds separately,
// selected by the VITE_APP env var. `vite serve` (dev) is a normal
// multi-page project — every .html at the repo root is served at its path.

const ENTRIES = {
  landing: 'index.html',
  ...Object.fromEntries(apps.map((a) => [a.name, a.entry])),
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Dev server: Preact for extracted apps; current single-file apps are
    // served as plain static HTML at /bench/, /wizard/, etc.
    return { plugins: [preact()] };
  }

  const appKey = process.env.VITE_APP;
  if (!appKey || !ENTRIES[appKey]) {
    throw new Error(
      'Set VITE_APP to one of: ' + Object.keys(ENTRIES).join(', ') + '. Got: ' + appKey
    );
  }

  // Landing page → dist/. Each app → dist/beta/<app>/ so it never collides
  // with, or shadows, the app owner's current production deploy.
  const outDir = appKey === 'landing' ? 'dist' : 'dist/beta/' + appKey;

  return {
    plugins: [preact(), viteSingleFile()],
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      assetsInlineLimit: 100_000_000,
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: { [appKey]: resolve(process.cwd(), ENTRIES[appKey]) },
      },
    },
  };
});
