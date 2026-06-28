# Security Audit — Vercel Token Cleanup

**Date:** 2026-06-28  
**Project:** themb (https://themb.me)  
**Scope:** Remove exposed local Vercel credential, verify Git hygiene, confirm deploy readiness.

---

## What was removed

| Item | Action |
|------|--------|
| `.env.local` | **Deleted** — contained only `VERCEL_OIDC_TOKEN` (no other local variables) |
| `VERCEL_OIDC_TOKEN` | Removed from disk with the file |

No secret values were committed as part of this cleanup.

---

## `.env.local` Git status

| Check | Result |
|-------|--------|
| `git ls-files .env.local` | **Not tracked** (empty output) |
| `git check-ignore .env.local` | **Ignored** via `.gitignore` rule `.env.local` |
| Git history for `.env.local` | **Never committed** |

---

## `.gitignore` hardening

The following patterns are now explicitly listed:

- `.env`
- `.env.*`
- `.env.local`
- `.vercel`
- `.next`
- `/node_modules` (existing)

`!.env.example` remains allowed so placeholder names can be committed without values.

---

## Secrets scan (Git history & working tree)

Scanned for variable names and secret patterns. **No secret values are recorded in this report.**

| Variable / pattern | Found in Git history? | Tracked now? | Notes |
|--------------------|----------------------|--------------|-------|
| `VERCEL_OIDC_TOKEN` | **No** | N/A (file deleted) | Was local-only |
| `VERCEL_TOKEN` | Name only in `.github/workflows/deploy.yml` (deleted locally, never contained a value in Git) | No | References GitHub Actions secret by name |
| `INSTANTDB_ADMIN_TOKEN` | Name only in `.env.example` (empty placeholder) | No | Template only |
| `NEXT_PUBLIC_INSTANTDB_APP_ID` | Name only in `.env.example` (empty placeholder) | No | Template only |
| `DATABASE_URL` | No | No | — |
| `WEBHOOK_SECRET` | No | No | — |
| Private keys (`BEGIN PRIVATE KEY`) | No | No | — |
| Tracked `.env*` / `.pem` / credential files | No | No | — |

**Conclusion:** No secret **values** were found in Git history. Variable **names** appear only in templates, scripts, or deleted workflow files.

---

## Token rotation required?

### `VERCEL_OIDC_TOKEN` (what was in `.env.local`)

This is a **short-lived OIDC token** written by the Vercel CLI (typically via `vercel env pull` or OIDC auth). It is **not** a long-lived Access Token from the Vercel Dashboard.

| Question | Answer |
|----------|--------|
| Must you revoke it in Vercel Dashboard? | **No** — OIDC tokens are not managed under Account → Tokens |
| Does it expire on its own? | **Yes** — typically within hours |
| Was it ever in Git? | **No** |
| Recommended action | Delete local copy (**done**) and avoid storing it again |

Because the file was open locally, treat the old OIDC token as compromised until it expires. No dashboard action is required for OIDC specifically.

### Long-lived Vercel Access Token (`VERCEL_TOKEN`)

This project does **not** store `VERCEL_TOKEN` locally. GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) was deleted locally; if you previously stored `VERCEL_TOKEN` in **GitHub repository secrets**, review that separately:

1. [Vercel Dashboard → Account Settings → Tokens](https://vercel.com/account/tokens)
2. Revoke any token you no longer need or suspect was exposed
3. Create a new token **only if** GitHub Actions CLI deploy is still required
4. Store the new token in GitHub (**Settings → Secrets → Actions → `VERCEL_TOKEN`**) — never in `.env.local` or this chat

For local deploys, prefer **`vercel login`** over a long-lived token in env files.

---

## Vercel project environment variables

`vercel env ls` reports **no environment variables** configured for `mohamed-s-projects-3e49e0b6/themb`.

If InstantDB is needed in production, add variables via interactive CLI (do not echo values):

```bash
vercel env add NEXT_PUBLIC_INSTANTDB_APP_ID production
vercel env add INSTANTDB_ADMIN_TOKEN production
# Repeat for preview / development if needed
```

Then pull locally (file remains gitignored):

```bash
vercel env pull .env.local
```

Safer alternative — run builds without writing secrets to disk:

```bash
vercel env run -e production -- npm run build
vercel env run -e preview -- npm run build
```

---

## Manual steps for you (Vercel Dashboard)

### A. Short-lived OIDC token (`VERCEL_OIDC_TOKEN`)

No action required — local copy removed; token expires automatically. Do **not** put a new one in `.env.local`.

### B. Long-lived Access Token (`VERCEL_TOKEN`) — **rotate this**

Used by GitHub Actions (`VERCEL_TOKEN` secret exists on `themohamedb/themb.me`).

1. **Revoke the old token**
   - Open [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Find the token used for GitHub Actions / themb deploys
   - Click **Delete** or **Revoke**

2. **Create a new token**
   - Click **Create Token**
   - Name: e.g. `themb-github-actions-2026-06`
   - Scope: full account access, or at least deploy access to project `themb`
   - Copy the token **once** when shown (it will not appear again)
   - **Do not paste it into Cursor chat**

3. **Store in GitHub Actions (in your terminal, not chat)**
   ```bash
   ./scripts/setup-github-actions-deploy.sh --rotate
   ```
   Input is hidden. Alternatively:
   ```bash
   gh secret set VERCEL_TOKEN --repo themohamedb/themb.me
   ```
   (`gh` prompts securely — do not use `echo` or shell history.)

4. **Local CLI authentication (separate from GitHub token)**
   ```bash
   vercel login
   ```
   Prefer this over storing any long-lived token locally.

4. **Production deploy (when ready):**
   ```bash
   npm run deploy
   ```
   Or push to `main` for Git-based production deploy.

---

## Verification results

| Check | Result |
|-------|--------|
| `git status` | `.env.local` not listed; `.gitignore` modified (not staged) |
| `git ls-files .env.local` | Empty — not tracked |
| `git check-ignore .env.local` | Ignored |
| `npm run build` | **Passed** |
| `npm run lint` | **Passed** |

---

## Is the website safe to deploy?

**Yes.** The repository contains no tracked secret files or committed token values. The exposed local OIDC token has been removed. Build succeeds without `.env.local`.

Before enabling InstantDB in production, configure `NEXT_PUBLIC_INSTANTDB_APP_ID` and `INSTANTDB_ADMIN_TOKEN` in Vercel project settings (not in Git).

---

## Safer local workflow (reference)

| Task | Preferred approach |
|------|-------------------|
| Authenticate CLI | `vercel login` |
| Run build with prod secrets | `vercel env run -e production -- npm run build` |
| Sync env locally | `vercel env pull .env.local` (keep file gitignored) |
| Deploy to production | `npm run deploy` or Git push to `main` |

**Never:** commit `.env.local`, paste tokens into chat, or use `echo`/`export` with secrets in shell history.
