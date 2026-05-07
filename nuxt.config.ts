export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
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
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://backend-latest-o6as.onrender.com'
    }
  },
  router: {
    options: {
      trailingSlash: true,
      // Change strict to false to let the crawler find pages
      // regardless of whether they have a slash or not during build
      strict: false
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      // CRITICAL: This stops the build from failing when the crawler hits a 404
      failOnError: false,
      routes: ['/', '/blog', '/sitemap.xml']
    }
  },
  sitemap: {
    strictNuxtContentAds: true,
    sources: [
      '/api/sitemap-urls'
    ],
    exclude: [
      '/blog/output/posts/**',
      '/_content/**'
    ],
    trailingSlash: true
  }
})