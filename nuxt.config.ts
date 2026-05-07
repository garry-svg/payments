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
  // Ensure the content module is actually set to handle the slashes
  content: {
    documentDriven: true, // This can help Nuxt Content align with the router
    trailingSlash: true
  },
  router: {
    options: {
      trailingSlash: true,
      strict: true // Switch back to true now that we have autoSubfolderIndex
    }
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: true,
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  },
  sitemap: {
    trailingSlash: true,
  }
})