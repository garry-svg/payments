export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ],
  site: {
    url: 'https://davegarry.com',
    trailingSlash: true
  },
  content: {
    // This makes the Content module stop 404-ing when it sees a slash
    trailingSlash: true
  },
  router: {
    options: {
      // Tell the router that slashes are "correct"
      trailingSlash: true,
      // Tell the router NOT to be picky. This stops the "No match found" errors.
      strict: false
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/sitemap.xml', '/']
    }
  },
  sitemap: {
    // This ensures your sitemap.xml stays alive and correct
    trailingSlash: true
  }
})