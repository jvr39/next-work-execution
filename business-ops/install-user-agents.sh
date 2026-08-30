#!/usr/bin/env bash
# Install business-ops agents into your personal Cursor agents folder.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
DEST="${HOME}/.cursor/agents"
mkdir -p "$DEST"
cp -v "$ROOT/.cursor/agents/"*.md "$DEST/"
echo "Installed agents to $DEST"
ls -1 "$DEST"
