# pulse-docs

Astro + Starlight docs site with a Decap CMS admin, replacing Pulse Supernova.
This repo is the single source of truth — no parallel copy in Notion or Supernova.

## What's in here

- `src/content/docs/components/` — one markdown file per component, frontmatter carries the tracker fields: `status`, `owner`, `trackerUpdated`.
- `src/content/docs/guides/` — general docs pages.
- `public/admin/` — Decap CMS (`config.yml` defines the tracker schema and the draft → review → publish workflow).
- `src/styles/nourish-theme.css` — branding pass. **Placeholder colours/fonts** — swap in real Nourish tokens (see comment at top of file).
- `netlify.toml` — build config for Netlify.

## Finish the setup on Netlify (I can't do this part — needs your login)

1. **Connect the repo**: Netlify → Add new site → Import an existing project → GitHub → select `zsnourish/pulse-docs`. Build command and publish directory are already set via `netlify.toml`, so just confirm and deploy.
2. **Turn on team login**: Site settings → Identity → Enable, then Services → Git Gateway → Enable. This lets your team log in at `yoursite.netlify.app/admin` with email/password — they never touch GitHub directly.
3. **Invite your team**: Identity tab → Invite users, one email each.
4. **Test the loop**: log in at `/admin`, draft a component page, save it, have someone else review/approve and publish. Confirm it deploys.

## Local dev (optional)

```
npm install
npm run dev
```
