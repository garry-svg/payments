import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        date: z.date(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional()
      })
    })
  }
})
