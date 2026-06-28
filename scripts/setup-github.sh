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
elif git ls-remote origin HEAD >/dev/null 2>&1; then
  echo "  GitHub CLI is not logged in, but git can reach the remote."
  echo ""
  echo "  Push will work. To also enable gh commands, run:"
  echo "    gh auth login --web"
else
  echo "✗ Not logged into GitHub."
  echo ""
  echo "Easiest fix (opens your browser):"
  echo "  gh auth login --web"
  echo ""
  echo "Or with a personal access token (classic, scopes: repo):"
  echo "  gh auth login --with-token < token.txt"
  echo ""
  echo "Create a token at: https://github.com/settings/tokens/new"
  exit 1
fi

echo ""
echo "→ Verifying access to themohamedb/themb.me..."
if gh repo view themohamedb/themb.me --json visibility,url -q '"\(.visibility) \(.url)"' 2>/dev/null; then
  echo "✓ Repository is reachable."
elif git ls-remote origin HEAD >/dev/null 2>&1; then
  echo "✓ Repository is reachable via git."
else
  echo "✗ Could not access the repository. Check that it exists and you have push access."
  exit 1
fi

echo ""
echo "→ Configuring git author identity for GitHub attribution..."
GITHUB_LOGIN="$(gh api user -q .login 2>/dev/null || echo themohamedb)"
GITHUB_ID="$(gh api user -q .id 2>/dev/null || echo 178800164)"
GITHUB_NAME="$(gh api user -q .name 2>/dev/null || echo "Mohamed Bashir")"
GITHUB_EMAIL="${GITHUB_ID}+${GITHUB_LOGIN}@users.noreply.github.com"
git config user.name "$GITHUB_NAME"
git config user.email "$GITHUB_EMAIL"
echo "  Name:  $GITHUB_NAME"
echo "  Email: $GITHUB_EMAIL"
echo "  (Uses GitHub noreply email so commits always link to your profile.)"

echo ""
echo "→ Configuring branch tracking..."
git config push.autoSetupRemote true
git fetch origin main 2>/dev/null || true
if git rev-parse origin/main >/dev/null 2>&1; then
  git branch --set-upstream-to=origin/main main 2>/dev/null || true
  echo "✓ main tracks origin/main (git pull / git push work without extra flags)."
else
  echo "  Remote main not found yet — first push will set tracking automatically."
fi

echo ""
echo "If the repo sidebar shows \"Contributors 2\" with missing avatars, run:"
echo "  ./scripts/fix-github-contributors.sh --force"
echo ""
echo "GitHub is ready. Push your code with:"
echo "  ./scripts/push-github.sh"
echo "  npm run push:github"
