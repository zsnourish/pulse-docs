# pulse-docs

Astro + Starlight docs site with a Decap CMS admin, replacing Pulse Supernova.
This repo is the single source of truth — no parallel copy in Notion or Supernova.

## What's in here

- `src/content/docs/foundations/`, `components/`, `visuals/` — three categories, each its own folder. This is what drives the grouped left nav (🎨 Foundations / 🧩 Components / 🖼️ Visuals) on the live site and the three collections in `/admin`.
- Frontmatter tracker fields on component/foundation/visual pages: `status`, `owner`, `trackerUpdated`.
- `src/content/docs/index.mdx` — GitBook-style card landing page (Starlight's `CardGrid`).
- `src/pages/theme-studio.astro` — a standalone visual tool at `/theme-studio` for adjusting colours, font, corner roundness and spacing with a live preview. Doesn't write to GitHub — copy/download the CSS it generates and send it back, or paste it into `src/styles/nourish-theme.css` yourself.
- `public/admin/` — Decap CMS:
  - `config.yml` — the three category collections, draft → review → publish workflow, DecapBridge auth backend.
  - `widgets.js` — registers the "✓ Do" / "✗ Don't" editor components and the preview-pane stylesheet.
  - `preview-style.css` — styles Decap's live-preview pane to match the real site.
  - `admin-chrome.css` — font override for Decap's own outer UI (see note below).
- `src/styles/nourish-theme.css` — Pulse brand tokens, GitBook-style sidebar/search/heading polish, Do/Don't callout styling. Light theme only.
- `src/assets/pulse-logo.png` — Pulse logo, wired into the sidebar.
- `netlify.toml` — build config for Netlify.

**Font note:** Pulse's heading font ("FS Me") is licensed and not available here — headings fall back to Inter Bold.

## On matching GitBook exactly

The **front end** (the published site) is styled to closely track the GitBook reference you shared: grouped uppercase sidebar sections, rounded search bar with a ⌘K hint, large bold page titles, card-grid landing page, light theme throughout.

The **back end** (the authoring tool) is Decap CMS, not GitBook — it's a free, open-source, git-based editor, fundamentally simpler than GitBook's own product. Things like Change requests as a first-class review UI, Site structure, Members management, Analyze, Git Sync settings, or an "Extend" marketplace are GitBook-specific features backed by their own hosted infrastructure — there's no equivalent to build in Decap without effectively building a competing SaaS product. What Decap *does* give you, which is what actually mattered from your list: a category-based authoring flow (pick Foundations/Components/Visuals, same as picking a tag), a draft → review → publish loop via pull requests, and a preview pane styled to match the live site.

One Decap limitation worth knowing: a single collection can't dynamically route entries into different folders based on a field value (a known gap, not a choice) — that's why category is three collections rather than one form with a dropdown. In practice it's the same authoring step (pick which of the three you're writing), just presented as three menu items instead of one field.

## Do's & Don'ts

Insert a "✓ Do" or "✗ Don't" block from the CMS toolbar (a "+" button in the rich text editor). By hand in markdown:

```html
<div class="ds-callout ds-do">
<p><strong>✓ Do</strong> — your guidance text.</p>
</div>
```

(swap `ds-do` / `✓ Do` for `ds-dont` / `✗ Don't` for the negative case.)

## Finish the setup (needs your login — I can't do these parts)

### 1. Netlify: connect the repo and fix the base directory
- Project configuration → Build & deploy → Continuous deployment → Build settings → Edit settings.
- Base directory blank, build command `npm run build`, publish directory `dist`.

### 2. DecapBridge: GitHub token permissions
Needs both **Contents: Read and write** and **Pull requests: Read and write** on `zsnourish/pulse-docs` — editorial workflow opens real PRs, so both are required.

### 3. DecapBridge: invite your team
Dashboard → your site → **Manage collaborators** → enter each email → send invite.

### 4. Test the loop
Log in at `/admin`, draft a page in each category, try a Do/Don't block, publish, confirm it deploys.

## Local dev (optional)

```
npm install
npm run dev
```
