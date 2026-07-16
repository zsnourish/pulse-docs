# pulse-docs

Astro + Starlight docs site with a Decap CMS admin, replacing Pulse Supernova.
This repo is the single source of truth — no parallel copy in Notion or Supernova.

## What's in here

- `src/content/docs/components/` — one markdown file per component, frontmatter carries the tracker fields: `status`, `owner`, `trackerUpdated`.
- `src/content/docs/guides/` — general docs pages.
- `public/admin/` — Decap CMS (`config.yml` defines the tracker schema, the draft → review → publish workflow, and the DecapBridge auth backend).
- `src/styles/nourish-theme.css` — branding pass. **Placeholder colours/fonts** — swap in real Nourish tokens (see comment at top of file).
- `netlify.toml` — build config for Netlify.

## Finish the setup (needs your login — I can't do these parts)

### 1. Netlify: connect the repo and fix the base directory
- Project configuration → Build & deploy → Continuous deployment → Build settings → Edit settings.
- Make sure **Base directory** is blank — this repo has no monorepo subfolder, everything lives at repo root. This was the cause of the first failed deploy.
- Build command `npm run build`, publish directory `dist` should already be filled in from `netlify.toml`. Save, then trigger a new deploy.

### 2. DecapBridge: team login for `/admin` (replaces deprecated Netlify Identity + Git Gateway)
1. Go to https://decapbridge.com → sign up → **Create New Site**.
2. Connect your GitHub account when prompted, and point the new DecapBridge site at `zsnourish/pulse-docs`.
3. Generate a new token when asked — this is what lets DecapBridge open PRs on your behalf; it doesn't touch your own GitHub credentials day-to-day.
4. DecapBridge will show you a **site ID** (used to build an `identity_url` like `https://auth.decapbridge.com/sites/<site-id>`).
5. Send me that site ID (or the full `identity_url`) and I'll swap it into `public/admin/config.yml` (currently a placeholder: `REPLACE_WITH_DECAPBRIDGE_SITE_ID`) and push it. Or edit that one line yourself directly on GitHub — no rebuild needed beyond Netlify's normal redeploy.
6. Invite your team from the DecapBridge dashboard so they can log in at `yoursite.netlify.app/admin` by email — no GitHub account needed on their end.

### 3. Test the loop
Log in at `/admin`, draft a component page, save it, have someone else review/approve and publish. Confirm the site redeploys.

## Local dev (optional)

```
npm install
npm run dev
```
