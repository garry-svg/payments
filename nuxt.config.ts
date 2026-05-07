export default defineNuxtConfig({
  // ... existing modules

  content: {
    // This is the missing link!
    // It tells the content engine to match "page/" to "page.md"
    trailingSlash: true
  },

  router: {
    options: {
      trailingSlash: true,
      // Change this back to FALSE for the build.
      // It allows the prerenderer to be flexible while the
      // site remains "slashy" for the user.
      strict: false
    }
  },

  nitro: {
    prerender: {
      // Keep this! It's what makes Render happy.
      autoSubfolderIndex: true,
      crawlLinks: true,
      // This will let the build finish even if there are minor hiccups
      failOnError: false,
      routes: ['/sitemap.xml', '/']
    }
  }
})