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
  router: {
    options: {
      // This allows Nuxt to match both /page and /page/ to the same file
      // which stops the "flicker" because Nuxt won't force-strip the slash
      trailingSlash: true,
      strict: false
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false, // Prevents the build from crashing
      routes: ['/sitemap.xml', '/']
    }
  },
  sitemap: {
    trailingSlash: true
  }
})