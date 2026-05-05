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
      // Manually construction: Ensure it ends with /
      let correctedPath = `/${slug}`
      if (!correctedPath.endsWith('/')) {
        correctedPath += '/'
      }
      
      return {
        loc: `${siteUrl}${correctedPath}`,
        lastmod: post.date || new Date(),
        // Crucially, add _sitemap: 'default' to force the sitemap module 
        // to stop normalizing the URL and accept the explicit string.
        _sitemap: 'default'
      }
    })

  // Explicitly include main pages with trailing slashes and the _sitemap flag
  const staticPages = [
    { loc: `${siteUrl}/`, lastmod: new Date(), _sitemap: 'default' },
    { loc: `${siteUrl}/blog/`, lastmod: new Date(), _sitemap: 'default' },
    { loc: `${siteUrl}/utilities/`, lastmod: new Date(), _sitemap: 'default' }
  ]

  return [...staticPages, ...blogUrls]
})
