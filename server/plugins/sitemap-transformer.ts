export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    // Only target the sitemap XML route
    if (event.path === '/sitemap.xml' || event.path.startsWith('/sitemap.xml')) {
      if (typeof response.body === 'string') {
        // Regex: Find <loc> tags that don't end in / and add it.
        // It specifically targets davegarry.com links to avoid messing with schemas.
        response.body = response.body.replace(
          /<loc>(https:\/\/davegarry\.com\/[^<]+?)(?<!\/)<\/loc>/g, 
          '<loc>$1/</loc>'
        );
      }
    }
  });
});
