import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        // Tracker fields — surfaced on the components index page.
        status: z
          .enum(['draft', 'in-review', 'approved', 'deprecated'])
          .default('draft')
          .optional(),
        owner: z.string().optional(),
        // Named to avoid clashing with Starlight's own built-in `lastUpdated` field.
        trackerUpdated: z.string().optional(), // ISO date, set by Decap CMS
      }),
    }),
  }),
};
