export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname

  // Specific permanent redirect for historical typo URL reported in Search Console
  if (
    pathname === '/what-and-high-and-low-value-payment-systems' ||
    pathname === '/what-and-high-and-low-value-payment-systems/'
  ) {
    return sendRedirect(event, '/what-are-high-and-low-value-payment-systems/', 301)
  }

  // Match legacy blog paths: /blog/output/posts/YYYY-MM-DD-slug
  // We optionally match the date prefix and capture the slug
  const legacyPattern = /^\/blog\/output\/posts\/(?:\d{4}-\d{2}-\d{2}-)?([^\/]+)\/?$/
  const match = pathname.match(legacyPattern)

  if (match) {
    const slug = match[1]
    // Redirect to the new clean slug URL with a trailing slash
    return sendRedirect(event, `/${slug}/`, 301)
  }
})
