<template>
  <div class="max-w-6xl mx-auto px-6 pt-8 pb-16 lg:pt-12 lg:pb-24 bg-white min-h-screen">
    <div v-if="filteredPosts?.length">
      <!-- Featured Hero Post (Latest) -->
      <NuxtLink 
        v-if="featuredPost" 
        :to="featuredPost.path"
        class="group block relative bg-white border border-slate-100 rounded-[2rem] p-8 md:p-12 hover:border-violet-200 hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.15)] transition-all duration-500 mb-12 overflow-hidden mx-auto max-w-6xl"
      >
        <div class="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div class="max-w-3xl">
            <div class="flex items-center gap-4 mb-6">
              <span class="px-4 py-1.5 bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest font-mono rounded-full">
                {{ featuredPost.categories?.[0] || 'Technical' }}
              </span>
              <span class="text-sm font-mono text-slate-400 uppercase tracking-widest">
                {{ new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </span>
            </div>
            
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 group-hover:text-violet-600 transition-colors leading-[1.15]">
              {{ featuredPost.title }}
            </h2>
            
            <p class="text-lg md:text-xl text-slate-500 leading-relaxed mb-8">
              {{ featuredPost.description || stripMarkdown(featuredPost.body?.children?.[0]?.children?.[0]?.value || '') }}
            </p>

            <div class="inline-flex items-center gap-2 text-sm font-bold text-violet-600 uppercase tracking-widest">
              Read Article <span class="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- Secondary Grid (Older Posts) -->
      <div v-if="regularPosts?.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink 
          v-for="post in regularPosts" 
          :key="post.path" 
          :to="post.path"
          class="group flex flex-col h-full p-8 bg-white border border-slate-100 rounded-2xl hover:border-violet-200 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.12)] transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="text-[10px] font-mono text-violet-600 font-bold uppercase tracking-widest">
              {{ post.categories?.[0] || 'Compliance' }}
            </span>
            <span class="w-1 h-1 rounded-full bg-slate-200"></span>
            <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </span>
          </div>
          
          <h3 class="text-2xl font-bold text-slate-900 mb-4 group-hover:text-violet-600 transition-colors leading-tight">
            {{ post.title }}
          </h3>
          
          <p class="text-slate-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
            {{ post.description || stripMarkdown(post.body?.children?.[0]?.children?.[0]?.value || '') }}
          </p>

          <div class="mt-auto text-sm font-bold text-violet-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            Read Article <span>→</span>
          </div>
        </NuxtLink>
      </div>
    </div>
    
    <div v-else class="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
      <p class="text-slate-400 italic">No entries found in the log yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Fetch all blog collection data ordered by date
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

// Filter logic handling Deep Paths and Drafts
const filteredPosts = computed(() => {
  if (!posts.value) return []
  return posts.value.filter(post => {
    const isDraft = post.path.includes('_drafts')
    const isOutputPost = post.path.startsWith('/blog/output/posts')
    return !isDraft && isOutputPost
  })
})

// Explicitly separate the featured post from the secondary grid
const featuredPost = computed(() => filteredPosts.value?.[0])
const regularPosts = computed(() => filteredPosts.value?.slice(1))

// Simple utility to provide a fallback description from body content
function stripMarkdown(text: string) {
  if (!text) return ''
  return text.substring(0, 180) + (text.length > 180 ? '...' : '')
}
</script>
