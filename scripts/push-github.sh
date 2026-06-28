#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GITHUB_REPO="https://github.com/themohamedb/themb.me.git"
BRANCH="main"
COMMIT_MESSAGE=""
FORCE_WITH_LEASE=0
DRY_RUN=0
SKIP_SETUP=0

usage() {
  cat <<EOF
Usage: ./scripts/push-github.sh [options]

Push the current branch to GitHub (themohamedb/themb.me).

Options:
  -m, --message TEXT   Commit all staged/unstaged changes with this message
  -b, --branch NAME    Branch to push (default: main)
  -f, --force-with-lease
                       Overwrite remote when histories diverge (safe force)
  -n, --dry-run        Show what would happen without pushing
  --skip-setup         Skip remote/auth checks
  -h, --help           Show this help

Examples:
  ./scripts/push-github.sh
  ./scripts/push-github.sh -m "Update hero section"
  ./scripts/push-github.sh -f
  npm run push:github -- -m "Ship notes page updates"
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -m|--message)
      COMMIT_MESSAGE="${2:?Missing value for $1}"
      shift 2
      ;;
    -b|--branch)
      BRANCH="${2:?Missing value for $1}"
      shift 2
      ;;
    -f|--force-with-lease)
      FORCE_WITH_LEASE=1
      shift
      ;;
    -n|--dry-run)
      DRY_RUN=1
      shift
      ;;
    --skip-setup)
      SKIP_SETUP=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      usage
      exit 1
      ;;
  esac
done

ensure_origin() {
  if git remote get-url origin >/dev/null 2>&1; then
    CURRENT="$(git remote get-url origin)"
    if [[ "$CURRENT" != "$GITHUB_REPO" && "$CURRENT" != "${GITHUB_REPO%.git}" ]]; then
      echo "→ Updating origin → $GITHUB_REPO"
      git remote set-url origin "$GITHUB_REPO"
    fi
  else
    echo "→ Adding origin → $GITHUB_REPO"
    git remote add origin "$GITHUB_REPO"
  fi
}

ensure_auth() {
  if gh auth status >/dev/null 2>&1; then
    return 0
  fi

  # Git may already be authenticated via osxkeychain even when gh is not.
  if git ls-remote origin HEAD >/dev/null 2>&1; then
    echo "→ GitHub CLI not logged in, but git credentials work — continuing."
    return 0
  fi

  echo "✗ Not logged into GitHub."
  echo ""
  echo "Easiest fix (opens your browser):"
  echo "  gh auth login --web"
  echo ""
  echo "Or with a personal access token (classic, scopes: repo):"
  echo "  gh auth login --with-token < token.txt"
  echo ""
  echo "Create a token at: https://github.com/settings/tokens/new"
  echo ""
  echo "Or run the setup script:"
  echo "  ./scripts/setup-github.sh"
  exit 1
}

if [[ "$SKIP_SETUP" -eq 0 ]]; then
  ensure_origin
  ensure_auth
fi

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "$BRANCH" ]]; then
  echo "✗ You are on '$CURRENT_BRANCH', but this script pushes '$BRANCH'."
  echo "  Switch branches: git checkout $BRANCH"
  exit 1
fi

if [[ -n "$COMMIT_MESSAGE" ]]; then
  if [[ -z "$(git status --porcelain)" ]]; then
    echo "→ Working tree clean; nothing to commit."
  else
    echo "→ Committing changes..."
    if [[ "$DRY_RUN" -eq 1 ]]; then
      git status --short
      echo "  Would commit with message: $COMMIT_MESSAGE"
    else
      git add -A
      git commit -m "$COMMIT_MESSAGE"
    fi
  fi
elif [[ -n "$(git status --porcelain)" ]]; then
  echo "✗ You have uncommitted changes."
  echo ""
  git status --short
  echo ""
  echo "Commit first, or pass a message:"
  echo "  ./scripts/push-github.sh -m \"Your commit message\""
  exit 1
fi

echo "→ Fetching origin/$BRANCH..."
if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "  Would run: git fetch origin $BRANCH"
else
  git fetch origin "$BRANCH" 2>/dev/null || true
fi

LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA=""
if git rev-parse "origin/$BRANCH" >/dev/null 2>&1; then
  REMOTE_SHA="$(git rev-parse "origin/$BRANCH")"
fi

PUSH_ARGS=(-u origin "$BRANCH")
if [[ "$FORCE_WITH_LEASE" -eq 1 ]]; then
  PUSH_ARGS=(--force-with-lease -u origin "$BRANCH")
elif [[ -n "$REMOTE_SHA" && "$LOCAL_SHA" != "$REMOTE_SHA" ]]; then
  if ! git merge-base --is-ancestor "$REMOTE_SHA" "$LOCAL_SHA" 2>/dev/null; then
    echo "✗ Local and remote histories have diverged."
    echo "  Local:  $LOCAL_SHA"
    echo "  Remote: $REMOTE_SHA"
    echo ""
    echo "If the remote only has an initial README and you want to replace it:"
    echo "  ./scripts/push-github.sh --force-with-lease"
    exit 1
  fi
fi

echo "→ Pushing $BRANCH to GitHub..."
if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "  Would run: git push ${PUSH_ARGS[*]}"
  echo "  Latest commit: $(git log -1 --oneline)"
  exit 0
fi

git push "${PUSH_ARGS[@]}"
echo ""
echo "✓ Pushed to $GITHUB_REPO ($BRANCH)"
echo "  $(git log -1 --oneline)"
