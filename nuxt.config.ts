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
    // Remove the trailing slash from the base URL here
    url: 'https://davegarry.com',
    name: 'Dave Garry - Financial Messaging & Technologies',
    trailingSlash: true // This is the master switch for the sitemap module
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://backend-latest-o6as.onrender.com'
    }
  },
  router: {
    options: {
      trailingSlash: true,
      strict: true // This forces Nuxt to treat /path and /path/ differently
    }
  },
  nitro: {
    // We only keep the specific routeRules that don't conflict with content
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
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
    // This helper ensures every link in the XML gets a slash automatically
    trailingSlash: true
  }
})