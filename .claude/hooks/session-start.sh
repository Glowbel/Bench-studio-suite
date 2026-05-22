#!/bin/bash
set -euo pipefail

# Only install on Claude Code web (remote) sessions. Local sessions manage
# their own dependencies.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
npm install --no-audit --no-fund
