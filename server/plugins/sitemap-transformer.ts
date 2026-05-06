export default defineNitroPlugin((nitroApp) => {
  // @ts-ignore
  nitroApp.hooks.hook('sitemap:output', async (ctx) => {
    // Check if sitemap content is provided as a string
    if (typeof ctx.sitemap === 'string') {
      ctx.sitemap = ctx.sitemap.replace(
          /<loc>(https:\/\/davegarry\.com\/[^<]+?)(?<!\/)<\/loc>/g,
          '<loc>$1/</loc>'
      )
    }
    // Fallback if sitemap content is provided in the 'content' property
    else if (typeof ctx.content === 'string') {
      ctx.content = ctx.content.replace(
          /<loc>(https:\/\/davegarry\.com\/[^<]+?)(?<!\/)<\/loc>/g,
          '<loc>$1/</loc>'
      )
    }
  })
})