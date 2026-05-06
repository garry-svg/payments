import { extractSlug } from '../../app/utils/blog'

export default defineEventHandler(async (event) => {
  const base = 'https://davegarry.com'
  
  // Use queryCollection (Nuxt Content v3 equivalent)
  const posts = await queryCollection(event, 'blog').all()
  
  return posts
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => {
      const slug = extractSlug(post.path)
      
      const images = []
      if (post.image) {
        images.push({
          loc: post.image.startsWith('http') ? post.image : `${base}${post.image.startsWith('/') ? '' : '/'}${post.image}`,
          title: post.title
        })
      }

      // Return full absolute URL in the loc property
      return {
        loc: `https://davegarry.com/${slug}`,
        lastmod: post.date || new Date(),
        images
      }
    })
})
