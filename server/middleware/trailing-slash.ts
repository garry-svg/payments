export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname
  const search = url.search

  // Exclude:
  // - Homepage ('/')
  // - Internal Nuxt paths (starting with '/_')
  // - API routes (starting with '/api')
  // - Static files (containing a '.')
  if (pathname === '/' || pathname.startsWith('/_') || pathname.startsWith('/api') || pathname.includes('.')) {
    return
  }

  // Redirect to trailing slash if missing
  if (!pathname.endsWith('/')) {
    // Preserve query parameters
    return sendRedirect(event, `${pathname}/${search}`, 301)
  }
})
