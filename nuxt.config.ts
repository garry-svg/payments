export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/sitemap'],

  site: {
    url: 'https://davegarry.com',
    name: 'Dave Garry - Financial Messaging & Technologies',
    trailingSlash: true
  },

  // ADDED: Sitemap configuration for lastmod
  sitemap: {
    trailingSlash: true,
    defaults: {
      // This provides a fallback date (the build date) if no file date is found
      lastmod: new Date().toISOString(),
    }
  },

  content: {
    // Ensures Nuxt Content plays nice with your trailing slash preference
    trailingSlash: true
  },

  router: {
    options: {
      trailingSlash: true,
      strict: false
    }
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: true,
      crawlLinks: true
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || ''
    }
  }
})
