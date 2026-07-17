import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Pulse Docs',
      description: 'Pulse component documentation and tracker',
      customCss: ['./src/styles/nourish-theme.css'],
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
          autogenerate: { directory: 'foundations' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        {
          label: 'Visuals',
          autogenerate: { directory: 'visuals' },
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
