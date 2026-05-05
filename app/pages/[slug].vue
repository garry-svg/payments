<template>
  <main class="max-w-4xl mx-auto px-6 py-16 lg:py-24 bg-white">
    <div v-if="post">
      <article>
        <!-- Header -->
        <header class="mb-12 border-b border-slate-100 pb-12">
          <div class="flex items-center gap-3 text-sm font-mono text-indigo-600 mb-6 uppercase tracking-widest">
            <NuxtLink to="/blog" class="hover:text-indigo-800 transition-colors">Engineering_Log</NuxtLink>
            <span class="text-slate-300">/</span>
            <span class="text-slate-500">{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</span>
          </div>
          
          <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            {{ post.title }}
          </h1>

          <div v-if="post.categories || post.tags" class="flex flex-wrap gap-2">
            <span v-for="tag in [...(post.categories || []), ...(post.tags || []).filter(t => !(post.categories || []).includes(t))]" :key="tag" 
              class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider font-mono">
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- Content -->
        <div class="prose prose-slate lg:prose-lg max-w-none 
          prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900 prose-code:text-indigo-600 prose-pre:bg-slate-900 prose-pre:rounded-2xl
          prose-img:rounded-2xl prose-img:border prose-img:border-slate-100 prose-img:shadow-sm
          wp-content-fix">
          <ContentRenderer :value="post" />
        </div>
      </article>
    </div>
    <div v-else class="text-center py-24">
      <h1 class="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h1>
      <NuxtLink to="/blog" class="text-indigo-600 font-bold hover:underline">Return to Log</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const cleanedSlug = extractSlug(slug)

// If the slug in the URL is not the cleaned slug (e.g. it has a date prefix), redirect
if (slug !== cleanedSlug) {
  await navigateTo(`/${cleanedSlug}/`, { redirectCode: 301 })
}

const { data: post } = await useAsyncData(`post-${cleanedSlug}`, async () => {
  // Query all posts in the blog collection
  const posts = await queryCollection('blog').all()
  
  // Find the post where the extracted slug matches the route param
  return posts.find(p => {
    const isDraft = p.path.includes('_drafts')
    const isOutputPost = p.path.startsWith('/blog/output/posts')
    return !isDraft && isOutputPost && extractSlug(p.path) === cleanedSlug
  })
})

// If the post is found, set the SEO metadata
if (post.value) {
  useContentHead(post.value)
  
  useSeoMeta({
    title: `${post.value.title} - Dave Garry`,
    ogTitle: `${post.value.title} - Dave Garry`,
    description: post.value.description,
    ogDescription: post.value.description,
    ogImage: post.value.image ? `https://davegarry.com${post.value.image.startsWith('/') ? '' : '/'}${post.value.image}` : undefined,
    twitterCard: 'summary_large_image',
  })
}
</script>

<style>
.wp-content-fix img {
  @apply max-w-full h-auto mx-auto my-12 block;
}
.wp-content-fix figure {
  @apply my-12;
}
.wp-content-fix figcaption {
  @apply text-center text-sm text-slate-500 mt-4 font-sans italic;
}
</style>
