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
 * "Sync scrolling" is hidden — it only matters in split raw-markdown/preview
 * view, and since every doc is rich-text-only (see config.yml `modes`),
 * there's no second markdown pane for it to sync against. Best-effort:
 * Decap has no config flag to remove it, so this looks the button up by its
 * accessible name and hides it. If a future Decap version changes that
 * markup, this silently does nothing rather than breaking anything.
 *
 * "Quick add" is deliberately left alone (an earlier version of this file
 * tried to hide it too, unreliably — see git history). Each collection now
 * has a distinct `label_singular` ("Foundations doc" / "Components doc" /
 * "Visuals doc") specifically so Quick Add's dropdown is actually useful
 * instead of showing three identical "doc" entries with no way to tell them
 * apart, which is what it looked like before that fix.
 */
(function hideSyncScrolling() {
  function tryHide() {
    document.querySelectorAll('button').forEach(function (btn) {
      const label = (btn.textContent || btn.getAttribute('aria-label') || btn.title || '')
        .trim()
        .toLowerCase();
      if (label.startsWith('sync scrolling') || label.startsWith('toggle scroll sync')) {
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

/**
 * The Workflow board (Drafts / In Review / Ready columns) ships with
 * hardcoded pastel purple/yellow/lime-green column headers baked into
 * Decap's own bundle — there's no CSS variable or config option exposed for
 * them, so plain CSS can't reach them by itself. This finds those specific
 * headers by their known computed background colour (Decap's literal
 * hex values, confirmed against the published decap-cms@3.1 bundle) and
 * re-colours them to match Pulse's palette instead. If a future Decap
 * version changes those colours, the match simply stops firing — it won't
 * break anything, it'll just stop re-colouring.
 */
(function restyleWorkflowBoard() {
  // Decap's hardcoded column header colours -> Pulse equivalents.
  const colourMap = [
    { match: 'rgb(246, 216, 255)', bg: '#f3f4f5', text: '#36393f' }, // Draft (was purple-light)
    { match: 'rgb(255, 238, 156)', bg: '#faf2d2', text: '#7a6100' }, // In Review (was yellow)
    { match: 'rgb(202, 239, 111)', bg: '#edfcf4', text: '#4bb97e' }, // Ready (was lime-green)
  ];

  function tryRestyle() {
    document.querySelectorAll('h2').forEach(function (el) {
      const bg = getComputedStyle(el).backgroundColor;
      const found = colourMap.find((c) => c.match === bg);
      if (found) {
        el.style.setProperty('background-color', found.bg, 'important');
        el.style.setProperty('color', found.text, 'important');
        el.style.setProperty('border-radius', '0.5rem', 'important');
        el.style.setProperty('font-family', "'Inter', system-ui, sans-serif", 'important');
      }
    });
  }
  const observer = new MutationObserver(tryRestyle);
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
  tryRestyle();
})();

/**
 * "Embed" editor component — paste a Figma share link, a Storybook story
 * URL, or any other embeddable URL, and it renders as an iframe both in the
 * CMS preview and on the live site. Figma share links (figma.com/file/... or
 * /design/...) get auto-converted to Figma's actual embeddable URL format;
 * anything else (Storybook, etc.) is used as-is.
 *
 * Storybook specifically only works once you have a *hosted* Storybook
 * instance to point at (e.g. published via Chromatic, or your own static
 * build) — this makes embedding one possible, it doesn't create one.
 *
 * Known limitation: editing an existing embed shows the already-converted
 * Figma embed URL in the field, not the original pretty share link — still
 * fully editable, just a longer URL on the second look.
 */
function toEmbedSrc(url) {
  try {
    const u = new URL(url);
    if (u.hostname.indexOf('figma.com') !== -1 && !u.searchParams.has('embed_host')) {
      return 'https://www.figma.com/embed?embed_host=pulse-docs&url=' + encodeURIComponent(url);
    }
  } catch (e) {
    // Not a valid absolute URL — fall through and use it as typed.
  }
  return url;
}

CMS.registerEditorComponent({
  id: 'embed',
  label: 'Embed (Figma / Storybook / URL)',
  fields: [
    { name: 'url', label: 'Embed URL (Figma share link, Storybook story URL, or any embeddable URL)', widget: 'string' },
    { name: 'label', label: 'Caption (optional)', widget: 'string', required: false },
  ],
  // Matches either a real embed (iframe + caption) or the "not linked yet"
  // fallback block, so re-opening either form for editing still populates
  // the URL/Caption fields correctly instead of falling back to raw HTML.
  // Three alternatives: (1) the plain iframe form this component itself
  // still writes on save, (2) the click-to-load facade form used across the
  // site for pre-thumbnailed embeds (a Figma/Confluence screenshot behind a
  // "Click to load" button instead of an immediately-loading iframe -- see
  // /public/scripts/ds-embed.js), and (3) the "not linked yet" fallback.
  // Without alternative (2), this pattern silently failed to match any of
  // the facade'd embeds (i.e. most component/foundation pages), which left
  // Decap trying to deserialize that HTML some other way -- the likely
  // cause of a recurring "Minified React error #130" crash when opening
  // affected pages in the editor.
  pattern: /^<div class="ds-embed">\n<iframe src="(.*?)" loading="lazy" allowfullscreen><\/iframe>\n<p class="ds-embed-caption">(.*?)<\/p>\n<\/div>$|^<div class="ds-embed">\n<div class="ds-embed-facade" data-embed-src="(.*?)"[^>]*>\n<img[^>]*\/>\n<span[^>]*>.*?<\/span>\n<\/div>\n<p class="ds-embed-caption">(.*?)<\/p>\n<\/div>$|^<div class="ds-embed-missing">\n<p>(.*?)<\/p>\n<\/div>$/ms,
  fromBlock: function (match) {
    if (match[1] !== undefined) {
      return { url: match[1], label: match[2] };
    }
    if (match[3] !== undefined) {
      return { url: match[3], label: match[4] };
    }
    return { url: '', label: match[5] === 'Not linked yet' ? '' : match[5] };
  },
  toBlock: function (obj) {
    var url = (obj.url || '').trim();
    // No real URL yet — render the plain "not linked" fallback instead of an
    // iframe with a bogus src (an empty or placeholder-like string resolves
    // as a relative URL on whatever site renders this page, which loads that
    // site's own 404 page inside the iframe — a real bug this guards against,
    // not a hypothetical one).
    if (!url) {
      return (
        '<div class="ds-embed-missing">\n<p>' +
        (obj.label || 'Not linked yet') +
        '</p>\n</div>'
      );
    }
    return (
      '<div class="ds-embed">\n<iframe src="' +
      toEmbedSrc(url) +
      '" loading="lazy" allowfullscreen></iframe>\n<p class="ds-embed-caption">' +
      (obj.label || '') +
      '</p>\n</div>'
    );
  },
  toPreview: function (obj) {
    var url = (obj.url || '').trim();
    if (!url) {
      return h(
        'div',
        {
          style: {
            border: '1px dashed #b3b9c4',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            margin: '0.5rem 0',
            color: '#878e9d',
            fontSize: '0.85rem',
          },
        },
        obj.label || 'Not linked yet — paste a Figma or Storybook URL above.'
      );
    }
    return h(
      'div',
      { style: { border: '1px solid #e7e8eb', borderRadius: '0.5rem', padding: '0.5rem', margin: '0.5rem 0' } },
      h(
        'div',
        { style: { fontSize: '0.8rem', color: '#878e9d', marginBottom: '0.3rem' } },
        'Embed: ' + (obj.label || url)
      ),
      h('iframe', {
        src: toEmbedSrc(url),
        style: { width: '100%', height: '300px', border: 'none', borderRadius: '0.3rem' },
      })
    );
  },
});
