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
    url: 'https://davegarry.com/',
    name: 'Dave Garry - Financial Messaging & Technologies'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://backend-latest-o6as.onrender.com'
    }
  },
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['json', 'xml', 'javascript', 'typescript', 'bash', 'yaml', 'markdown']
    }
  },
  router: {
    options: {
      trailingSlash: true
    }
  },
  nitro: {
    routeRules: {
      '/': { prerender: true },
      '/_nuxt/**': { redirect: false },
      '/**/*.**': { redirect: false },
      '/api/**': { redirect: false },
      '/_content/**': { redirect: false },
      '/**': { redirect: { to: '/**/', statusCode: 301 } }
    }
  },
  sitemap: {
    strictNuxtContentPaths: true,
    excludeAppSources: true,
    disableContentIdx: true,
    // Keep this 0 in dev if you're making changes,
    // but you can remove it or set it higher for production.
    cacheMaxAgeSeconds: 0,
    autoLastmod: false,
    defaults: {
      trailingSlash: true
    },
    sources: [
      '/api/sitemap-urls'
    ],
    exclude: [
      '/blog/output/posts/**',
      '/_content/**'
    ]
    // Removed hooks: sitemap:resolved because your Nitro plugin handles it now!
  }
})