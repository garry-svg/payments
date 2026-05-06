export default defineEventHandler((event) => {
    const path = getRequestPath(event)

    // 1. Skip the homepage, files (containing a dot), and anything that already has a slash
    if (path !== '/' && !path.includes('.') && !path.endsWith('/')) {
        const query = getQuery(event)
        const queryString = Object.keys(query).length > 0
            ? '?' + new URLSearchParams(query as any).toString()
            : ''

        // 2. Perform a hard 301 redirect to the version with the slash
        return sendRedirect(event, path + '/' + queryString, 301)
    }
})