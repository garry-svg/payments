import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  // We use queryCollection to get all blog posts
  // In Nuxt Content v3, we can use queryCollection(event, 'collectionName')
  const posts = await queryCollection(event, 'blog').all()
  
  return posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      return {
        loc: `/${extractSlug(post.path)}/`,
        lastmod: post.date 
      }
    })
})
