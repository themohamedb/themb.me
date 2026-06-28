#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GITHUB_LOGIN="themohamedb"
GITHUB_ID="178800164"
GITHUB_NAME="Mohamed Bashir"
GITHUB_EMAIL="${GITHUB_ID}+${GITHUB_LOGIN}@users.noreply.github.com"
BRANCH="main"
DRY_RUN=0
FORCE=0

usage() {
  cat <<EOF
Usage: ./scripts/fix-github-contributors.sh [options]

Fix GitHub contributor attribution for themb.me.

Options:
  -n, --dry-run   Show what would change without rewriting or pushing
  -f, --force     Rewrite history and force-push to origin/$BRANCH
  -h, --help      Show this help

What this does:
  1. Sets local git author name/email to your linked GitHub noreply address
  2. Rewrites existing commits so GitHub attributes them to your account
  3. Prints steps to remove Cursor Agent from repo access (fixes "2 contributors")
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -n|--dry-run) DRY_RUN=1; shift ;;
    -f|--force) FORCE=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *)
      echo "Unknown option: $1"
      usage
      exit 1
      ;;
  esac
done

echo "→ Target git identity:"
echo "  Name:  $GITHUB_NAME"
echo "  Email: $GITHUB_EMAIL"
echo ""

echo "→ Current git config:"
echo "  Name:  $(git config user.name || echo '(unset)')"
echo "  Email: $(git config user.email || echo '(unset)')"
echo ""

if [[ "$DRY_RUN" -eq 0 ]]; then
  git config user.name "$GITHUB_NAME"
  git config user.email "$GITHUB_EMAIL"
  echo "✓ Updated local git identity for this repository."
  echo ""
fi

MISMATCHED="$(git log "$BRANCH" --format='%ae' | rg -v "^${GITHUB_EMAIL//./\\.}\$" || true)"
if [[ -z "$MISMATCHED" ]]; then
  echo "→ All commits on $BRANCH already use the GitHub noreply email."
else
  echo "→ Commits need rewriting to use the GitHub noreply email."
  git log "$BRANCH" --format='%h %an <%ae>' | rg -v "$GITHUB_EMAIL" || true
  echo ""

  if [[ "$FORCE" -eq 0 && "$DRY_RUN" -eq 0 ]]; then
    echo "Run with --force to rewrite history and push:"
    echo "  ./scripts/fix-github-contributors.sh --force"
    exit 0
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "Dry run: would rewrite $BRANCH and force-push to origin."
    exit 0
  fi

  echo "→ Rewriting commit history on $BRANCH..."
  git filter-branch -f --env-filter "
    export GIT_AUTHOR_NAME=\"$GITHUB_NAME\"
    export GIT_AUTHOR_EMAIL=\"$GITHUB_EMAIL\"
    export GIT_COMMITTER_NAME=\"$GITHUB_NAME\"
    export GIT_COMMITTER_EMAIL=\"$GITHUB_EMAIL\"
  " "$BRANCH"

  echo "→ Force-pushing rewritten history..."
  git push --force-with-lease origin "$BRANCH"
  echo "✓ History updated on GitHub."
  echo ""
fi

cat <<EOF
→ One more step is required in GitHub settings.

GitHub currently lists 2 mentionable users on this repo:
  • $GITHUB_LOGIN
  • cursoragent

Only $GITHUB_LOGIN has commits. The extra Cursor Agent account is what makes
the sidebar show "Contributors 2" with broken avatars.

Remove Cursor's access to this repository:
  1. Open https://github.com/settings/installations
  2. Click "Configure" on Cursor
  3. Remove access to "themb.me"
  4. Refresh the repo page

Also confirm your email is verified:
  https://github.com/settings/emails

After that, the sidebar should show only you with your name and avatar.
EOF
