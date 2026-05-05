import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://davegarry.com'
  
  // Use queryCollection (Nuxt Content v3/v4 equivalent)
  const posts = await queryCollection(event, 'blog').all()
  
  const blogUrls = posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      const slug = extractSlug(post.path)
      // Manually construct the loc string to ensure it ends with a slash
      let correctedPath = `/${slug}`
      if (!correctedPath.endsWith('/')) {
        correctedPath += '/'
      }
      
      return {
        loc: `${siteUrl}${correctedPath}`,
        lastmod: post.date || new Date(),
        changefreq: 'monthly' as const,
        priority: 0.8
      }
    })

  // Explicitly include main pages with trailing slashes
  const mainPages = [
    { loc: `${siteUrl}/`, lastmod: new Date(), changefreq: 'daily' as const, priority: 1.0 },
    { loc: `${siteUrl}/blog/`, lastmod: new Date(), changefreq: 'weekly' as const, priority: 0.9 },
    { loc: `${siteUrl}/utilities/`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.7 }
  ]

  return [...mainPages, ...blogUrls]
})
