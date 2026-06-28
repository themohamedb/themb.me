#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DOMAIN="${1:-themb.me}"
VERCEL_A="76.76.21.21"
VERCEL_CNAME="cname.vercel-dns.com"
VERCEL_NS1="ns1.vercel-dns.com"
VERCEL_NS2="ns2.vercel-dns.com"

echo "Checking DNS for ${DOMAIN}..."
echo ""

CURRENT_A="$(dig @8.8.8.8 "${DOMAIN}" A +short | head -1 || true)"
CURRENT_NS="$(dig @8.8.8.8 "${DOMAIN}" NS +short | tr '\n' ' ' || true)"
SERVER_HEADER="$(curl -sI "https://${DOMAIN}" 2>/dev/null | awk 'tolower($0) ~ /^server:/ {print; exit}' || true)"

echo "  A record:      ${CURRENT_A:-<none>}"
echo "  Nameservers:   ${CURRENT_NS:-<none>}"
echo "  HTTP server:   ${SERVER_HEADER:-<unknown>}"
echo ""

if [[ "${SERVER_HEADER}" == *"Vercel"* ]]; then
  echo "✓ ${DOMAIN} is already serving your Vercel deployment."
  exit 0
fi

if [[ "${SERVER_HEADER}" == *"DPS"* ]] || [[ "${CURRENT_A}" == "216.198.79.1" ]]; then
  echo "✗ ${DOMAIN} is still pointed at GoDaddy Website Builder, not Vercel."
  echo ""
fi

cat <<EOF
Fix this in GoDaddy (the domain registrar):

1. Turn off GoDaddy Website Builder for ${DOMAIN}
   My Products → Websites → delete or unpublish the GoDaddy site on this domain.

2. Choose ONE of these DNS setups:

   Option A — recommended (Vercel manages DNS)
   • GoDaddy → ${DOMAIN} → Nameservers → Change to Custom
   • Set:
     - ${VERCEL_NS1}
     - ${VERCEL_NS2}
   • Save and wait up to 1 hour for propagation.

   Option B — keep GoDaddy nameservers
   • GoDaddy → ${DOMAIN} → DNS → Records
   • Delete any A record for @ pointing to GoDaddy (e.g. 216.198.79.1)
   • Delete domain forwarding if enabled
   • Add/update:
     - A    @    ${VERCEL_A}
     - CNAME www  ${VERCEL_CNAME}
   • Save and wait up to 1 hour for propagation.

3. Verify in Vercel
   https://vercel.com/mohamed-s-projects-3e49e0b6/themb/settings/domains

4. Re-run this script to confirm:
   ./scripts/point-domain-to-vercel.sh ${DOMAIN}

Your Vercel app is already deployed. Only DNS needs to change.
EOF
