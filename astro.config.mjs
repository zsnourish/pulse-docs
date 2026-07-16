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
      sidebar: [
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/zsnourish/pulse-docs/edit/main/',
      },
    }),
  ],
});
