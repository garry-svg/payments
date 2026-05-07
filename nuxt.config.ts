export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/sitemap'],
  site: {
    url: 'https://davegarry.com',
    trailingSlash: true
  },
  router: {
    options: {
      // We set this to true so the sitemap generates correctly
      trailingSlash: true,
      strict: false
    }
  },
  nitro: {
    prerender: {
      // This is the ONLY setting that matters for Render.
      // It forces Nuxt to build /page/index.html instead of /page.html.
      // This makes the slash "real" so it won't flicker.
      autoSubfolderIndex: true,
      crawlLinks: true
    }
  }
})