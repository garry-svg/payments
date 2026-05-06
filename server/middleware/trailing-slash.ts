export default defineEventHandler((event) => {
    const path = getRequestPath(event)

    // 1. Filter out everything except actual page paths
    // Skip: Homepage, Nuxt internal (_), and static files (.)
    if (path === '/' || path.startsWith('/_') || path.includes('.')) {
        return
    }

    // 2. If it's missing the slash, redirect using the full URL to keep the host intact
    if (!path.endsWith('/')) {
        const url = getRequestURL(event)
        const newPath = path + '/' + url.search

        // Using a full URL redirect often fixes 404 issues on Render/Cloudflare
        return sendRedirect(event, newPath, 301)
    }
})