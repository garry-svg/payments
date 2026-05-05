// https://nuxt.com/docs/api/configuration/nuxt-config
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
 //     apiBase: process.env.API_BASE || 'http://localhost:8080'
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
  sitemap: {
    strictNuxtContentAds: true,
    excludeAppSources: true,
    disableContentIdx: true,
    trailingSlash: true,
    autoLastmod: false,
    strictNuxtContentAds: true,
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
  }
})