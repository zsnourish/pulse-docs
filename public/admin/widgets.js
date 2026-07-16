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
