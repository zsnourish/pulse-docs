import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Pulse Docs',
      description: 'Pulse component documentation and tracker',
      customCss: ['./src/styles/nourish-theme.css', './src/styles/sidebar-icons.css'],
      head: [
        {
          tag: 'script',
          attrs: { src: '/scripts/ds-embed.js', defer: true },
        },
      ],
      logo: {
        src: './src/assets/pulse-logo.png',
        alt: 'Pulse Design System',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/zsnourish/pulse-docs',
      },
      // Auto-computed from git history — no manual "last updated" entry needed.
      lastUpdated: true,
      sidebar: [
        {
          label: 'Foundations',
          items: [
            { label: 'Colour', link: '/foundations/colour/' },
            { label: 'Typography', link: '/foundations/typography/' },
            { label: 'Iconography', link: '/foundations/iconography/' },
            { label: 'Logos & Brand', link: '/foundations/logos-and-brand/' },
            { label: 'Accessibility', link: '/foundations/accessibility-statement/' },
            { label: 'AI Ethos', link: '/foundations/ai-ethos/' },
          ],
        },
        {
          label: 'Voice',
          items: [
            {
              label: 'Content Design',
              items: [
                { label: 'Clinical Safety', link: '/voice/content-design/clinical-safety/' },
                { label: 'Content & Language', link: '/voice/content-design/content-and-language/' },
              ],
            },
            {
              label: 'Imagery',
              items: [
                { label: 'Principles (pending)', link: '/voice/imagery/principles-pending/' },
              ],
            },
            {
              label: 'Other',
              items: [
                { label: 'Dashboard Design', link: '/voice/other/dashboard-design/' },
              ],
            },
            // 'Misc' subcategory: holding off until we know what pages
            // belong in it -- see chat.
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        // Deliberately last: internal, "how this site itself works" pages
        // (coverage audit, review/publish process, backups, changelog) --
        // useful to keep discoverable, but not something a designer looking
        // for component or foundation guidance needs to see first.
        {
          label: 'System',
          items: [
            { label: 'Component Coverage', link: '/docs/component-coverage/' },
            { label: 'Reviewing & Publishing Docs', link: '/docs/reviewing-docs/' },
            { label: 'Backups & Version History', link: '/docs/backups-and-history/' },
            { label: 'Updates & Decisions', link: '/docs/updates-and-decisions/' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/zsnourish/pulse-docs/edit/main/',
      },
      // Light-only theme, no dark mode toggle — matches GitBook's default look.
      components: {
        ThemeProvider: './src/components/ForceLightThemeProvider.astro',
        ThemeSelect: './src/components/EmptyThemeSelect.astro',
        EditLink: './src/components/EditLinkWithHistory.astro',
      },
    }),
  ],
});
