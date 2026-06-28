#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ROTATE=false
if [[ "${1:-}" == "--rotate" ]]; then
  ROTATE=true
fi

echo "→ GitHub Actions deploy requires a Vercel Access Token (VERCEL_TOKEN)."
echo ""
echo "Create or rotate tokens only in the Vercel Dashboard — never in chat or .env.local:"
echo "  https://vercel.com/account/tokens"
echo ""
echo "Rotation steps:"
echo "  1. Revoke the old token in Vercel Dashboard (Tokens → delete/revoke)."
echo "  2. Create a new token (name it e.g. themb-github-actions-YYYY-MM)."
echo "  3. Copy it once when shown — it will not be displayed again."
echo ""

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not logged in. Run:"
  echo "  gh auth login --web"
  exit 1
fi

if gh secret list --repo themohamedb/themb.me 2>/dev/null | rg -q '^VERCEL_TOKEN'; then
  if [[ "$ROTATE" == false ]]; then
    echo "✓ VERCEL_TOKEN is already configured in GitHub Actions secrets."
    echo "  To replace it after rotating in Vercel Dashboard, run:"
    echo "  ./scripts/setup-github-actions-deploy.sh --rotate"
    exit 0
  fi
  echo "→ Replacing existing VERCEL_TOKEN in GitHub Actions secrets."
else
  echo "→ VERCEL_TOKEN is not set yet. You will be prompted to paste the new token."
fi

echo ""
echo "Paste your new Vercel token (input is hidden), then press Enter:"
read -rs VERCEL_TOKEN
echo ""

if [[ -z "$VERCEL_TOKEN" ]]; then
  echo "✗ No token provided."
  exit 1
fi

gh secret set VERCEL_TOKEN --repo themohamedb/themb.me --body "$VERCEL_TOKEN"
echo ""
echo "✓ VERCEL_TOKEN saved in GitHub Actions secrets."
echo "  Do not store this token in .env.local or commit it."
echo ""
echo "Verify deploy:"
echo "  gh workflow run \"Deploy to Vercel\" --ref main"
echo "  ./scripts/push-github.sh"
