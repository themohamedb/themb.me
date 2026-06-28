#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Enabling post-push status hook..."
git config core.hooksPath .githooks
chmod +x .githooks/post-push

echo "→ Connecting Vercel to GitHub..."
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
echo "How it works:"
echo "  1. Commit your changes"
echo "  2. Push to main: ./scripts/push-github.sh -m \"Your message\""
echo "  3. Vercel starts building immediately — no manual deploy command needed"
echo ""
echo "Track builds: https://vercel.com/mohamed-s-projects-3e49e0b6/themb/deployments"
echo "Live site:    https://themb.me"
echo ""
echo "For instant local preview while editing, run: npm run dev"
