import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://davegarry.com'
  
  // Using queryCollection (Nuxt Content v3 equivalent of queryContent)
  const posts = await queryCollection(event, 'blog').all()
  
  const blogUrls = posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      const slug = extractSlug(post.path)
      const path = `/${slug}/`
      
      // Ensure the path always ends with a trailing slash as requested
      const locPath = path.endsWith('/') ? path : `${path}/`
      
      return {
        loc: `${siteUrl}${locPath}`,
        lastmod: post.date 
      }
    })

  // Manually ensure root and main static pages have trailing slashes
  const staticUrls = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/blog/`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/utilities/`, lastmod: new Date().toISOString() }
  ]

  // Combine and return to ensure every URL in the sitemap respects the trailingSlash: true setting
  return [...staticUrls, ...blogUrls]
})
