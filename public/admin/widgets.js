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
 * Terminology: everything is a "doc" (not "post"/"entry"), and the global
 * "New Post" button in the Workflow tab gets renamed too (per-collection
 * "New doc" buttons are handled by `label_singular: doc` in config.yml).
 * https://decapcms.org/docs/i18n/
 */
CMS.registerLocale('en', {
  app: {
    header: {
      content: 'Docs',
    },
  },
  workflow: {
    workflow: {
      newPost: 'New doc',
    },
  },
});

/**
 * Auto-fill "Owner" with whoever's logged in when a *new* doc is created —
 * so it's a sensible default, not a required manual step. Still editable,
 * since the actual owner may end up being someone else. Existing docs (and
 * their existing Owner value) are left untouched.
 */
CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry, author }) => {
    const data = entry.get('data');
    const isNewEntry = !entry.get('partial') && !data.get('owner');
    if (isNewEntry && !data.get('owner') && author) {
      const name = author.name || author.login || author.useremail || '';
      if (name) return data.set('owner', name);
    }
    return data;
  },
});

/**
 * Hide the global "Quick add" shortcut — redundant next to each collection's
 * own "New doc" button. Best-effort: Decap has no config flag to remove it,
 * so this looks the button up by its accessible name and hides it. If a
 * future Decap version changes that markup, this silently does nothing
 * rather than breaking anything.
 */
(function hideQuickAdd() {
  function tryHide() {
    document.querySelectorAll('button').forEach(function (btn) {
      if (btn.textContent && btn.textContent.trim().toLowerCase().startsWith('quick add')) {
        btn.style.display = 'none';
      }
    });
  }
  const observer = new MutationObserver(tryHide);
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
  tryHide();
})();
