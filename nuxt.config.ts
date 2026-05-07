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
    name: 'Dave Garry - Financial Messaging & Technologies',
    trailingSlash: true
  },
  // ADD THIS CONTENT BLOCK
  content: {
    // This tells Nuxt Content to ignore trailing slashes when matching files
    trailingSlash: true
  },
  router: {
    options: {
      trailingSlash: false,
      // Change strict to FALSE.
      // This stops the "No match found" warning because it allows
      // the router to resolve /path and /path/ to the same component.
      strict: false
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true, // You can turn this back on now
      failOnError: false,
      routes: ['/', '/blog', '/sitemap.xml']
    }
  },
  sitemap: {
    strictNuxtContentAds: true,
    trailingSlash: true,
    sources: ['/api/sitemap-urls'],
    exclude: ['/blog/output/posts/**', '/_content/**']
  }
})