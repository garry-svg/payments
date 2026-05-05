import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  // We use queryCollection to get all blog posts
  const posts = await queryCollection(event, 'blog').all()
  
  return posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      // Ensure the URL always ends with a trailing slash to match WordPress structure
      const slug = extractSlug(post.path)
      return {
        loc: `/${slug}/`,
        lastmod: post.date 
      }
    })
})
