import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  const base = 'https://davegarry.com'
  
  // Use queryCollection (Nuxt Content v3 equivalent)
  const posts = await queryCollection(event, 'blog').all()
  
  const blogUrls = posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      const slug = extractSlug(post.path)
      
      // Manual concatenation to force the slash to persist in the XML
      // Clean path to avoid double slashes and explicitly append /
      return `${base}/${slug}`.replace(/\/$/, '') + '/'
    })

  // Explicitly include static pages as raw strings with forced slashes
  const staticUrls = [
    `${base}/`,
    `${base}/blog/`,
    `${base}/utilities/`
  ]

  // Returning a simple array of strings (NOT objects) to bypass module normalization
  return [...staticUrls, ...blogUrls]
})
