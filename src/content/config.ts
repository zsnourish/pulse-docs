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
      }),
    }),
  }),
};
