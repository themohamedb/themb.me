#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GITHUB_REPO="https://github.com/themohamedb/themb.me.git"

echo "→ Configuring GitHub remote..."
if git remote get-url origin >/dev/null 2>&1; then
  CURRENT="$(git remote get-url origin)"
  if [[ "$CURRENT" != "$GITHUB_REPO" && "$CURRENT" != "${GITHUB_REPO%.git}" ]]; then
    echo "  Updating origin: $CURRENT → $GITHUB_REPO"
    git remote set-url origin "$GITHUB_REPO"
  else
    echo "  origin already set to $GITHUB_REPO"
  fi
else
  git remote add origin "$GITHUB_REPO"
  echo "  Added origin → $GITHUB_REPO"
fi

echo ""
echo "→ Checking GitHub authentication..."
if gh auth status >/dev/null 2>&1; then
  gh auth status
  echo ""
  echo "✓ GitHub CLI is authenticated."
else
  echo "✗ Not logged into GitHub."
  echo ""
  echo "Run this once, then re-run ./scripts/setup-github.sh:"
  echo "  gh auth login"
  echo ""
  echo "Choose: GitHub.com → HTTPS → Login with a web browser"
  exit 1
fi

echo ""
echo "→ Verifying access to themohamedb/themb.me..."
if gh repo view themohamedb/themb.me --json visibility,url -q '"\(.visibility) \(.url)"' 2>/dev/null; then
  echo "✓ Repository is reachable."
else
  echo "✗ Could not access the repository. Check that it exists and you have push access."
  exit 1
fi

echo ""
echo "GitHub is ready. Push your code with:"
echo "  ./scripts/push-github.sh"
echo "  npm run push:github"
