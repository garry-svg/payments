import { appendTrailingSlash } from 'ufo'

export default defineEventHandler((event) => {
    const path = getRequestPath(event)

    // 1. Only target actual page requests (ignore _nuxt, _content, and files with extensions)
    if (path.includes('.') || path.startsWith('/_')) {
        return
    }

    // 2. If it's not the root and doesn't have a trailing slash
    if (path !== '/' && !path.endsWith('/')) {
        const url = getRequestURL(event)

        // Use the 'ufo' utility to safely add the slash and keep query params
        const nextPath = appendTrailingSlash(path) + url.search

        // Perform a 301 redirect
        return sendRedirect(event, nextPath, 301)
    }
})