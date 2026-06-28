#!/usr/bin/env bash
# Rotate VERCEL_TOKEN: revoke old in Dashboard, create new, store in GitHub Actions.
# Never paste the token into Cursor chat or commit it.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "══════════════════════════════════════════════════════════════"
echo "  Vercel token rotation — themb"
echo "══════════════════════════════════════════════════════════════"
echo ""
echo "Step 1 — Vercel Dashboard (browser)"
echo "  → https://vercel.com/account/tokens"
echo "  → Revoke/delete the old token used for GitHub Actions"
echo "  → Create Token → name: themb-github-actions-$(date +%Y-%m)"
echo "  → Copy the new token once (shown only once)"
echo ""
echo "Step 2 — GitHub Actions secret (this terminal, hidden input)"
echo "  → Paste the new token when prompted below"
echo "  → Do NOT paste into Cursor chat"
echo ""

if ! gh auth status >/dev/null 2>&1; then
  echo "✗ GitHub CLI not logged in. Run: gh auth login --web"
  exit 1
fi

if command -v open >/dev/null 2>&1; then
  open "https://vercel.com/account/tokens" 2>/dev/null || true
fi

read -r -p "Press Enter after you have revoked the old token and copied the new one… "
echo ""
echo "Paste new VERCEL_TOKEN (hidden), then Enter:"
read -rs NEW_TOKEN
echo ""

if [[ -z "$NEW_TOKEN" ]]; then
  echo "✗ No token provided."
  exit 1
fi

gh secret set VERCEL_TOKEN --repo themohamedb/themb.me --body "$NEW_TOKEN"
unset NEW_TOKEN

echo ""
echo "✓ VERCEL_TOKEN updated in GitHub Actions."
echo ""
echo "Step 3 — Local CLI (optional, uses browser login — no token file)"
if vercel whoami >/dev/null 2>&1; then
  echo "  ✓ Already logged in: $(vercel whoami 2>/dev/null | tail -1)"
else
  echo "  Run: vercel login"
fi
echo ""
echo "Step 4 — Verify"
echo "  npm run deploy          # local CLI → production"
echo "  ./scripts/push-github.sh -m \"your message\"   # Git → Vercel auto-deploy"
echo ""
echo "✓ Rotation complete. Do not store VERCEL_TOKEN in .env.local."
