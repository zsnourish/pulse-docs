/**
 * Custom Decap CMS editor components — Pulse-style "Do" / "Don't" callouts.
 * Loaded after the decap-cms.js CDN bundle, which exposes `CMS`, `createClass`
 * and `h` (React.createElement) as globals — no build step required.
 * https://decapcms.org/docs/custom-widgets/
 */

CMS.registerPreviewStyle('/admin/preview-style.css');

CMS.registerEditorComponent({
  id: 'do',
  label: '✓ Do',
  fields: [{ name: 'text', label: 'Do text', widget: 'string' }],
  pattern: /^<div class="ds-callout ds-do">\n<p><strong>✓ Do<\/strong> — (.*?)<\/p>\n<\/div>$/ms,
  fromBlock: function (match) {
    return { text: match[1] };
  },
  toBlock: function (obj) {
    return '<div class="ds-callout ds-do">\n<p><strong>✓ Do</strong> — ' + obj.text + '</p>\n</div>';
  },
  toPreview: function (obj) {
    return h(
      'div',
      {
        style: {
          background: '#edfcf4',
          borderLeft: '4px solid #4bb97e',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          margin: '0.5rem 0',
        },
      },
      h('strong', { style: { color: '#4bb97e' } }, '✓ Do — '),
      obj.text
    );
  },
});

CMS.registerEditorComponent({
  id: 'dont',
  label: "✗ Don't",
  fields: [{ name: 'text', label: "Don't text", widget: 'string' }],
  pattern: /^<div class="ds-callout ds-dont">\n<p><strong>✗ Don't<\/strong> — (.*?)<\/p>\n<\/div>$/ms,
  fromBlock: function (match) {
    return { text: match[1] };
  },
  toBlock: function (obj) {
    return '<div class="ds-callout ds-dont">\n<p><strong>✗ Don\'t</strong> — ' + obj.text + '</p>\n</div>';
  },
  toPreview: function (obj) {
    return h(
      'div',
      {
        style: {
          background: '#fee7e7',
          borderLeft: '4px solid #cc5252',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          margin: '0.5rem 0',
        },
      },
      h('strong', { style: { color: '#cc5252' } }, "✗ Don't — "),
      obj.text
    );
  },
});

/**
 * Terminology: everything is a "doc" (not "post"/"entry"). Handled in
 * locale-en.js, loaded as a separate <script> tag in index.html (it re-registers
 * the *complete* English locale, not just the changed keys — see the long
 * comment at the top of that file for why a partial override broke the
 * entire UI the first time around).
 */

/**
 * Auto-fill "Owner" with whoever's publishing, if it's still blank — so it's
 * a sensible default, not a required manual step. Still editable, since the
 * actual owner may end up being someone else.
 *
 * This has to be a `prePublish` hook, not `preSave`: Decap's own docs show
 * `preSave` handlers only receive `{ entry }` (no author info at all) — only
 * `prePublish`/`postPublish`/`preUnpublish`/`postUnpublish` receive
 * `{ author, entry }`. An earlier version of this file used `preSave`,
 * which is exactly why the auto-fill never fired.
 * https://decapcms.org/docs/registering-events/
 */
CMS.registerEventListener({
  name: 'prePublish',
  handler: ({ entry, author }) => {
    // Visible once in the browser console (F12) so if this ever silently
    // stops matching a field, the real shape of `author` is easy to check
    // rather than guessing again.
    console.log('[pulse-docs] prePublish author object:', author);

    const data = entry.get('data');
    if (data.get('owner')) return data;

    const name =
      (author && (author.name || author.login || author.useremail || author.email)) || '';
    return name ? data.set('owner', name) : data;
  },
});

/**
 * Hide a couple of toolbar items that add clutter without adding value here:
 *  - "Quick add" — redundant next to each collection's own "New doc" button.
 *  - "Sync scrolling" — only matters in split raw-markdown/preview view;
 *    since every doc is rich-text-only (see config.yml `modes`), there's no
 *    second markdown pane for it to sync against.
 * Best-effort: Decap has no config flag to remove either, so this looks
 * buttons up by their accessible name/title and hides them. If a future
 * Decap version changes that markup, this silently does nothing rather than
 * breaking anything.
 */
(function hideClutterButtons() {
  const hideIfMatches = ['quick add', 'sync scrolling', 'toggle scroll sync'];
  function tryHide() {
    document.querySelectorAll('button').forEach(function (btn) {
      const label = (btn.textContent || btn.getAttribute('aria-label') || btn.title || '')
        .trim()
        .toLowerCase();
      if (hideIfMatches.some((needle) => label.startsWith(needle) || label === needle)) {
        btn.style.display = 'none';
      }
    });
  }
  const observer = new MutationObserver(tryHide);
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
  tryHide();
})();

/**
 * Note on "Check for Preview" (near the Publish button): that's Decap's
 * built-in deploy-preview-link feature — it looks for a GitHub commit status
 * containing the word "deploy" (which Netlify posts automatically once its
 * GitHub integration is fully connected and successfully building). It does
 * nothing until Netlify is properly wired up and has deployed at least one
 * commit — not a bug, just waiting on that. To turn it off entirely instead,
 * set `show_preview_links: false` in config.yml.
 * https://decapcms.org/docs/deploy-preview-links/
 */
