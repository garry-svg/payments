export default defineEventHandler((event) => {
    const path = getRequestPath(event)

    // 1. Skip the homepage, internal Nuxt paths, and actual files (like .css, .js, .png)
    if (path === '/' || path.startsWith('/_') || path.includes('.')) {
        return
    }

    // 2. If it doesn't have a trailing slash, redirect
    if (!path.endsWith('/')) {
        const query = getQuery(event)
        const queryString = Object.keys(query).length > 0
            ? '?' + new URLSearchParams(query as any).toString()
            : ''

        return sendRedirect(event, path + '/' + queryString, 301)
    }
})