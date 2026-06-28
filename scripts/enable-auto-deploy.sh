#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Enabling local post-push deploy hook..."
git config core.hooksPath .githooks
chmod +x .githooks/post-push

echo "→ Connecting Vercel to GitHub (if remote exists)..."
REMOTE="$(git remote get-url origin 2>/dev/null || true)"
if [[ -n "$REMOTE" ]]; then
  npx vercel git connect "$REMOTE" --yes || true
else
  echo "  No git remote yet. After pushing to GitHub, run:"
  echo "  npx vercel git connect https://github.com/themohamedb/themb.me.git --yes"
fi

echo ""
echo "Auto-deploy is configured."
echo ""
echo "Option A (recommended): Vercel Git integration"
echo "  Every git push deploys automatically once GitHub is connected."
echo ""
echo "Option B: GitHub Actions"
echo "  Add VERCEL_TOKEN to GitHub repo secrets:"
echo "  https://github.com/themohamedb/themb.me/settings/secrets/actions"
echo ""
echo "Option C: Local post-push hook"
echo "  Runs 'vercel deploy --prod' after each successful git push."
