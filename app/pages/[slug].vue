<template>
  <main class="max-w-4xl mx-auto px-6 py-16 lg:py-24 bg-white">
    <div v-if="post">
      <article>
        <!-- Header -->
        <header class="mb-12 border-b border-[#E8E3EF] pb-12">
          <div class="flex items-center gap-3 text-sm font-mono text-[#7C00FF] mb-6 uppercase tracking-widest">
            <NuxtLink to="/blog/" class="hover:text-[#6500DB] transition-colors">Engineering_Log</NuxtLink>
            <span class="text-[#DDD6E8]">/</span>
            <span class="text-[#8590AA]">{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</span>
          </div>
          
          <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-[#16032F] mb-8 leading-[1.1]">
            {{ post.title }}
          </h1>

          <div v-if="post && (post.categories || post.tags)" class="flex flex-wrap gap-2">
            <span 
              v-for="tag in [...((post as any)?.categories || []), ...((post as any)?.tags || []).filter((t: string) => !((post as any)?.categories || []).includes(t))]" 
              :key="tag" 
              class="px-2.5 py-0.5 rounded bg-[#F3EDFF] text-[#7C00FF] border border-[#E8E3EF] text-[10px] font-bold uppercase tracking-wider font-mono"
            >
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- Content -->
        <div class="prose prose-slate lg:prose-lg max-w-none 
          prose-headings:text-[#16032F] prose-headings:font-bold prose-headings:tracking-tight
          prose-p:text-[#505A75]
          prose-a:text-[#7C00FF] prose-a:no-underline hover:prose-a:underline hover:text-[#6500DB]
          prose-strong:text-[#16032F] prose-code:text-[#7C00FF] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#302E40] prose-pre:rounded-2xl
          prose-img:rounded-2xl prose-img:border prose-img:border-[#E8E3EF] prose-img:shadow-sm
          wp-content-fix">
          <ContentRenderer :value="post" />
        </div>
      </article>
    </div>
    <div v-else class="text-center py-24">
      <h1 class="text-2xl font-bold text-[#16032F] mb-4">Post Not Found</h1>
      <NuxtLink to="/blog/" class="text-[#7C00FF] font-bold hover:underline">Return to Log</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { extractSlug } from '~/utils/blog'

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
    const isOutputPost = p.path.includes('/posts/') || p.path.startsWith('/blog/output/posts')
    return !isDraft && isOutputPost && extractSlug(p.path) === cleanedSlug
  })
})

// If the post is found, set the SEO metadata
if (post.value) {
  const postData = post.value as any
  useSeoMeta({
    title: `${postData.title} - Dave Garry`,
    ogTitle: `${postData.title} - Dave Garry`,
    description: postData.description,
    ogDescription: postData.description,
    ogImage: postData.image ? `https://davegarry.com${postData.image.startsWith('/') ? '' : '/'}${postData.image}` : undefined,
    twitterCard: 'summary_large_image',
  })

  // Add JSON-LD Article Schema
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: postData.title,
          description: postData.description,
          image: postData.image ? `https://davegarry.com${postData.image.startsWith('/') ? '' : '/'}${postData.image}` : undefined,
          datePublished: postData.date,
          author: {
            '@type': 'Person',
            name: 'Dave Garry',
            url: 'https://davegarry.com'
          }
        })
      }
    ]
  })
}
</script>
