// Click-to-load facade for heavy embeds (Figma, Confluence, Storybook).
// Avoids loading the iframe (and Figma's own JS payload) until the user
// actually wants it, so pages don't sit "loading" for a slow embed no one
// asked to see yet.
(function () {
  function activate(facade) {
    var src = facade.getAttribute('data-embed-src');
    if (!src) return;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
  }

  function init() {
    document.querySelectorAll('.ds-embed-facade').forEach(function (facade) {
      facade.addEventListener('click', function () {
        activate(facade);
      });
      facade.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(facade);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Starlight is a view-transitions SPA -- re-run after client-side navigation.
  document.addEventListener('astro:page-load', init);
})();
