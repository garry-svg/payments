import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://davegarry.com'
  
  // Fetch all blog posts
  const posts = await queryCollection(event, 'blog').all()
  
  const blogUrls = posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      const slug = extractSlug(post.path)
      // Ensure absolute URL with trailing slash
      return {
        loc: `${siteUrl}/${slug}/`,
        lastmod: post.date 
      }
    })

  // Explicitly include main static pages to ensure they have trailing slashes
  const staticUrls = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/blog/`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/utilities/`, lastmod: new Date().toISOString() }
  ]

  // Combine and return all URLs
  return [...staticUrls, ...blogUrls]
})
