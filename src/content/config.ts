import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        // Editorial status — deliberately manual, an assignment, not a fact
        // we can derive. "Who touched this / when" is handled automatically
        // instead, via git history (see EditLinkWithHistory.astro) — no
        // separate "Owner" field, which only ever showed blank while
        // drafting anyway.
        status: z
          .enum(['draft', 'in-review', 'approved', 'deprecated'])
          .default('draft')
          .optional(),
      }),
    }),
  }),
};
