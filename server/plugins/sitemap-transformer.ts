export default defineNitroPlugin((nitroApp) => {
  // @ts-ignore
  nitroApp.hooks.hook('sitemap:output', async (ctx) => {
    // console.error is used to ensure visibility in dev mode logs
    console.error('[Sitemap Transformer] Enforcing trailing slashes for davegarry.com');

    const transform = (content: string) => {
      // Matches <loc> tags for davegarry.com that don't end in a slash.
      // Uses a negative lookbehind to avoid double slashes.
      return content.replace(
        /<loc>(https:\/\/davegarry\.com[^<]*?)(?<!\/)<\/loc>/g,
        '<loc>$1/</loc>'
      );
    };

    if (typeof ctx.sitemap === 'string') {
      ctx.sitemap = transform(ctx.sitemap);
    } else if (typeof ctx.content === 'string') {
      ctx.content = transform(ctx.content);
    }
  });
});
