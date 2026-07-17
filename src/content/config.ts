import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        // Editorial tracker fields — deliberately manual (status/owner are
        // assignments, not facts we can derive).
        status: z
          .enum(['draft', 'in-review', 'approved', 'deprecated'])
          .default('draft')
          .optional(),
        owner: z.string().optional(),

        // Auto-populated by the remarkGitAuthor plugin from git history —
        // never set this by hand. Starlight's own `lastUpdated` (config
        // option, also git-derived) covers the "when"; this covers "who".
        gitLastAuthor: z.string().optional(),
      }),
    }),
  }),
};
