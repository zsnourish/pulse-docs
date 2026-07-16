# pulse-docs

Astro + Starlight docs site with a Decap CMS admin, replacing Pulse Supernova.
This repo is the single source of truth — no parallel copy in Notion or Supernova.

## What's in here

- `src/content/docs/components/` — one markdown file per component, frontmatter carries the tracker fields: `status`, `owner`, `trackerUpdated`.
- `src/content/docs/guides/` — general docs pages.
- `src/content/docs/index.mdx` — GitBook-style card landing page (Starlight's `CardGrid`).
- `public/admin/` — Decap CMS. `config.yml` defines the tracker schema, the draft → review → publish workflow, and the DecapBridge auth backend. `widgets.js` registers the custom "Do" / "Don't" editor components (see below). Editor is locked to rich-text mode only (no raw markdown toggle) to keep it simple for non-technical authors.
- `src/styles/nourish-theme.css` — real Pulse brand tokens (Primary teal, Neutral greys, Semantic colours) pulled from the Pulse Supernova docs, plus the Do/Don't callout styling.
- `src/assets/pulse-logo.png` — Pulse logo, wired into the sidebar via `astro.config.mjs`.
- `netlify.toml` — build config for Netlify.

**Font note:** Pulse's heading font ("FS Me") is a licensed display face not available here — headings currently fall back to Inter Bold. Body text uses Inter, matching Pulse's actual type spec.

## Do's & Don'ts

Authors can insert a "✓ Do" or "✗ Don't" block directly from the CMS toolbar (a "+" button in the rich text editor) — same pattern as Supernova's usage guidance callouts. These render as coloured callouts both in the CMS preview and on the live site. To add one by hand in markdown, use:

```html
<div class="ds-callout ds-do">
<p><strong>✓ Do</strong> — your guidance text.</p>
</div>
```

(swap `ds-do` / `✓ Do` for `ds-dont` / `✗ Don't` for the negative case.)

## Finish the setup (needs your login — I can't do these parts)

### 1. Netlify: connect the repo and fix the base directory
- Project configuration → Build & deploy → Continuous deployment → Build settings → Edit settings.
- Make sure **Base directory** is blank — this repo has no monorepo subfolder, everything lives at repo root.
- Build command `npm run build`, publish directory `dist` should already be filled in from `netlify.toml`. Save, then trigger a new deploy.

### 2. DecapBridge: fix "Failed to persist entry" / API_ERROR
This means the GitHub token DecapBridge is using server-side doesn't have write access to the repo. In the DecapBridge dashboard → your site → reconnect/regenerate the GitHub authorization, and make sure it's granted **Contents: Read and write** on `zsnourish/pulse-docs` (same permission that had to be fixed on our own token earlier in this process).

### 3. DecapBridge: invite your team
DecapBridge dashboard → your site → **Manage collaborators** → enter each email → send invite. First click of the invite link sets up their login (Google, Microsoft, or password); after that they go straight to `/admin`.

### 4. Test the loop
Log in at `/admin`, draft a component page (try inserting a Do/Don't block), save it, have someone else review/approve and publish. Confirm the site redeploys.

## Local dev (optional)

```
npm install
npm run dev
```
