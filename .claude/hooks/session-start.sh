#!/bin/bash
set -euo pipefail

# Only install on Claude Code web (remote) sessions. Local sessions manage
# their own dependencies.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Activate the npm version pinned in package.json (packageManager field) so the
# cloud environment matches local — avoids lockfile churn from npm version drift.
# Non-fatal: under `set -e` a failing `corepack enable` would abort this hook
# before the npm install below ever runs. Fall back to the ambient npm instead.
corepack enable 2>/dev/null || echo "session-start: corepack enable failed — using ambient npm"
npm install --no-audit --no-fund
