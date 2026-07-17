# pulse-docs

Astro + Starlight docs site with a Decap CMS admin, replacing Pulse Supernova.
This repo is the single source of truth — no parallel copy in Notion or Supernova.

## What's in here

- `src/content/docs/foundations/`, `components/`, `visuals/` — three categories, each its own folder. This drives both the grouped left nav (🎨 Foundations / 🧩 Components / 🖼️ Visuals) and the three collections in `/admin`.
- Frontmatter on doc pages: `status` (manual — editorial state) only. There's no manual "owner" or "last updated" field — who touched a doc and when is read automatically from git history, see below.
- Starlight's built-in `lastUpdated: true` (date) plus a direct git lookup in `EditLinkWithHistory.astro` (author) — every page automatically shows who last touched it and when, read straight from git commit history. Nothing to type in, nothing that can go stale.
- `src/components/EditLinkWithHistory.astro` — adds a **View history** link (GitHub's native commit history for that file) next to "Edit this page".
- `src/content/docs/foundations/backups-and-history.md` — explains how GitHub already gives you version history and backup, and why there's no separate "trash bin" feature (and why that's fine).
- `src/content/docs/index.mdx` — GitBook-style card landing page.
- `src/pages/theme-studio.astro` — a standalone visual tool at `/theme-studio` for adjusting colours, font, corner roundness and spacing with a live preview. Doesn't write to GitHub — copy/download the CSS it generates and send it back, or paste it into `src/styles/nourish-theme.css` yourself.
- `public/admin/` — Decap CMS:
  - `config.yml` — the three category collections (`label_singular: doc`, so buttons read "New doc"), draft → review → publish workflow, DecapBridge auth backend.
  - `widgets.js` — "✓ Do" / "✗ Don't" and "Embed" (Figma/Storybook/any iframe URL) editor components, a Workflow-board colour fix (Decap hardcodes clashing pastel column colours with no CSS hook — this remaps them to Pulse tones), preview-pane stylesheet, English locale override (renames Decap's "Contents"/"New Post" chrome to "Docs"/"New doc"), and hides the redundant "Sync scrolling" button.
  - Each collection also has a default Body template (`config.yml`) so a new doc starts with sensible section headings instead of a blank page.
  - `preview-style.css` — styles Decap's live-preview pane to match the real site.
  - `admin-chrome.css` — font override for Decap's own outer UI (see note below).
- `src/styles/nourish-theme.css` — Pulse brand tokens, GitBook-style sidebar/search/heading polish, Do/Don't callout styling, and a fix for oversized Previous/Next footer cards. Light theme only.
- `src/assets/pulse-logo.png` — Pulse logo, wired into the sidebar.
- `netlify.toml` — build config for Netlify.

**Font note:** Pulse's heading font ("FS Me") is licensed and not available here — headings fall back to Inter Bold.

## On matching GitBook exactly

The **front end** is styled to closely track the GitBook reference you shared: grouped uppercase sidebar sections, rounded search bar with a ⌘K hint, large bold page titles, card-grid landing page, light theme throughout.

The **back end** is Decap CMS, not GitBook — free, open-source, git-based, fundamentally simpler. Change requests as a first-class review UI, Site structure, Members management, Analyze, Git Sync settings, an "Extend" marketplace — those are GitBook-specific, backed by their own hosted product, and there's no equivalent to build in Decap without effectively building a competing SaaS. What Decap does give you, matching what actually mattered from the ask: category-based authoring (pick Foundations/Components/Visuals, same as picking a tag), automatic "who/when" metadata from git (no manual entry), a draft → review → publish loop via pull requests, and a preview pane styled to match the live site.

One Decap limitation worth knowing: a single collection can't dynamically route entries into different folders based on a field value (a known gap, not a choice) — that's why category is three collections rather than one form with a dropdown. In practice it's the same authoring step, just three menu items instead of one field.

## Trash bin / version history / backups

Decap has no native trash bin. Because everything is git-backed, this doesn't actually lose anything — every deleted file is recoverable from git history indefinitely, which is a stronger guarantee than a typical auto-expiring trash bin. Full explanation, plus how to actually restore something and how to lock down `main` against accidental history loss, is written up in `src/content/docs/foundations/backups-and-history.md` (published at `/foundations/backups-and-history/`).

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
Needs both **Contents: Read and write** and **Pull requests: Read and write** on `zsnourish/pulse-docs`.

### 3. DecapBridge: invite your team
Dashboard → your site → **Manage collaborators** → enter each email → send invite.

### 4. Test the loop
Log in at `/admin`, draft a doc in each category, try a Do/Don't block, publish, confirm it deploys, and confirm the "last updated by" line appears once the commit lands.

## Local dev (optional)

```
npm install
npm run dev
```

## Component Build Tracker

`/components/tracker/` — cross-platform build status (Figma designed / Vue built / React built, each with a "By" and "Updated") for every component × variant × platform combination. Backed by `src/data/component-tracker.json`, edited in `/admin` as a proper list of rows (Component Build Tracker collection) rather than hand-editing an HTML table. "By" fields are free text — name whoever actually built something whether or not they have CMS access.

To add more rows (new components, variants, or platforms): `/admin` → Component Build Tracker → add a row to the list, or edit `src/data/component-tracker.json` directly.
