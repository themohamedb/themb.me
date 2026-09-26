# themb.me

Personal website, built with Next.js and deployed on Vercel.

## Previewing changes before they go live

Only `main` is published to themb.me. Every other branch gets its own
private-looking preview deployment on Vercel, so you can check a change
before anyone else sees it.

1. Create a branch and push your changes:

   ```sh
   git checkout -b my-change
   git push -u origin my-change
   ```

2. Vercel builds it and gives you a preview link. You can find it:
   - in the Vercel dashboard → your project → **Deployments**, or
   - on the pull request, if you open one (Vercel comments the link).

   Each branch also has a stable link that always shows its latest push:
   `https://<project>-git-<branch>-<team>.vercel.app`.

3. Preview pages show a **"Preview · <branch> — not live"** badge at the top
   and are hidden from search engines, so they can't be confused with the
   real site.

4. Happy with it? Merge the branch into `main` and themb.me updates.

### Optional: one fixed preview address

To always use the same address (e.g. `preview.themb.me`), push your
work-in-progress to a branch named `preview`, then in Vercel go to
**Settings → Domains → Add** `preview.themb.me` and set its Git branch to
`preview`. To keep previews private, turn on
**Settings → Deployment Protection → Vercel Authentication**.

## Local development

```sh
npm install
npm run dev     # http://localhost:3000
npm run check   # typecheck + production build
```
