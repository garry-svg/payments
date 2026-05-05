import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  // Use queryCollection (Nuxt Content v3/v4 equivalent of queryContent)
  const posts = await queryCollection(event, 'blog').all()
  
  // Return the mapped URLs with explicit trailing slash logic
  return posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      // Extract the slug and ensure it starts/ends with a slash
      const slug = extractSlug(post.path)
      let correctedPath = `/${slug}`
      
      if (!correctedPath.endsWith('/')) {
        correctedPath += '/'
      }
      
      return {
        loc: correctedPath,
        lastmod: post.date || new Date(),
        changefreq: 'monthly' as const,
        priority: 0.8
      }
    })
})
