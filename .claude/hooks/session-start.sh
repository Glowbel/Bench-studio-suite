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
corepack enable
npm install --no-audit --no-fund
