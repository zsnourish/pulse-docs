# pulse-docs

Astro + Starlight docs site with a Decap CMS admin, replacing Pulse Supernova.
This repo is the single source of truth — no parallel copy in Notion or Supernova.

## What's in here

- `src/content/docs/components/` — one markdown file per component, frontmatter carries the tracker fields: `status`, `owner`, `trackerUpdated`.
- `src/content/docs/guides/` — general docs pages.
- `src/content/docs/index.mdx` — GitBook-style card landing page (Starlight's `CardGrid`).
- `src/pages/theme-studio.astro` — a standalone visual tool at `/theme-studio` for adjusting colours, font, corner roundness and spacing with a live preview. Doesn't write to GitHub (no auth wired in, by design) — copy or download the generated CSS and send it back, or paste it straight into `src/styles/nourish-theme.css` yourself.
- `public/admin/` — Decap CMS:
  - `config.yml` — tracker schema, draft → review → publish workflow, DecapBridge auth backend.
  - `widgets.js` — registers the custom "✓ Do" / "✗ Don't" editor components (insertable from the rich-text toolbar) and the preview-pane stylesheet.
  - `preview-style.css` — styles Decap's live-preview pane so drafts look like the real site (fonts, colours, Do/Don't callouts).
  - `admin-chrome.css` — light-touch font override for Decap's own outer UI. **Note:** Decap doesn't expose a theming API for its own interface (toolbar, buttons) — its internal CSS classes are auto-generated and change between versions, so deep reskinning of the CMS chrome itself isn't reliable. The preview pane (what you actually see while drafting) is fully styled; the outer editor shell is left mostly as-is beyond font/background.
- `src/styles/nourish-theme.css` — real Pulse brand tokens (Primary teal, Neutral greys, Semantic colours) pulled from the Pulse Supernova docs, GitBook-style card/sidebar polish, and Do/Don't callout styling. Light theme only — dark mode toggle removed (see `src/components/ForceLightThemeProvider.astro` / `EmptyThemeSelect.astro`).
- `src/assets/pulse-logo.png` — Pulse logo, wired into the sidebar via `astro.config.mjs`.
- `netlify.toml` — build config for Netlify.

**Font note:** Pulse's heading font ("FS Me") is a licensed display face not available here — headings currently fall back to Inter Bold. Body text uses Inter, matching Pulse's actual type spec. Swap fonts anytime via `/theme-studio` or by hand.

## Do's & Don'ts

Authors can insert a "✓ Do" or "✗ Don't" block directly from the CMS toolbar (a "+" button in the rich text editor) — same pattern as Supernova's usage guidance callouts. To add one by hand in markdown:

```html
<div class="ds-callout ds-do">
<p><strong>✓ Do</strong> — your guidance text.</p>
</div>
```

(swap `ds-do` / `✓ Do` for `ds-dont` / `✗ Don't` for the negative case.)

## Finish the setup (needs your login — I can't do these parts)

### 1. Netlify: connect the repo and fix the base directory
- Project configuration → Build & deploy → Continuous deployment → Build settings → Edit settings.
- Make sure **Base directory** is blank.
- Build command `npm run build`, publish directory `dist`. Save, then trigger a new deploy.

### 2. DecapBridge: fix "Failed to persist entry" / API_ERROR
This means the GitHub token DecapBridge uses server-side doesn't have write access to the repo. In the DecapBridge dashboard → your site → reconnect/regenerate the GitHub authorization, granted **Contents: Read and write** on `zsnourish/pulse-docs`. If it still fails after reconnecting, check the browser console (F12 → Console/Network tab) for the full error response and share it — the generic "API_ERROR" banner hides the actual cause.

### 3. DecapBridge: invite your team
DecapBridge dashboard → your site → **Manage collaborators** → enter each email → send invite.

### 4. Test the loop
Log in at `/admin`, draft a component page (try inserting a Do/Don't block), save it, have someone else review/approve and publish. Confirm the site redeploys.

## Local dev (optional)

```
npm install
npm run dev
```
