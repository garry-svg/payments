<template>
  <div class="max-w-6xl mx-auto px-6 pt-8 pb-16 lg:pt-12 lg:pb-24 bg-white min-h-screen">
    <!-- 1. Loading State -->
    <div v-if="status === 'pending'" class="flex flex-col items-center justify-center py-24 space-y-4">
      <div class="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
      <p class="text-slate-500 font-mono text-sm">Loading engineering log...</p>
    </div>

    <!-- 2. Error State -->
    <div v-else-if="status === 'error'" class="text-center py-24 bg-rose-50 rounded-3xl border border-rose-200 p-8 max-w-xl mx-auto">
      <h3 class="text-lg font-bold text-rose-900 mb-2">Failed to load articles</h3>
      <p class="text-rose-600 text-sm mb-6">{{ error?.message || 'An unexpected error occurred while fetching log entries.' }}</p>
      <button 
        @click="() => refresh()" 
        class="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
      >
        Try Again
      </button>
    </div>

    <!-- 3. Successful Articles Listing -->
    <div v-else-if="filteredPosts?.length">
      <!-- Featured Hero Post (Latest) -->
      <NuxtLink 
        v-if="featuredPost" 
        :to="featuredPost.slugPath"
        class="group block relative bg-white border border-slate-100 rounded-[2rem] p-8 md:p-12 hover:border-violet-200 hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.15)] transition-all duration-500 mb-12 overflow-hidden mx-auto max-w-6xl"
      >
        <div class="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div class="max-w-3xl">
            <div class="flex items-center gap-4 mb-6">
              <span class="px-4 py-1.5 bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest font-mono rounded-full">
                {{ featuredPost.categories?.[0] || 'Technical' }}
              </span>
              <span v-if="featuredPost.date" class="text-sm font-mono text-slate-400 uppercase tracking-widest">
                {{ new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </span>
            </div>
            
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 group-hover:text-violet-600 transition-colors leading-[1.15]">
              {{ featuredPost.title }}
            </h2>
            
            <p class="text-lg md:text-xl text-slate-500 leading-relaxed mb-8">
              {{ featuredPost.description || stripMarkdown((featuredPost.body as any)?.children?.[0]?.children?.[0]?.value || '') }}
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
          :to="post.slugPath"
          class="group flex flex-col h-full p-8 bg-white border border-slate-100 rounded-2xl hover:border-violet-200 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.12)] transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="text-[10px] font-mono text-violet-600 font-bold uppercase tracking-widest">
              {{ post.categories?.[0] || 'Compliance' }}
            </span>
            <span class="w-1 h-1 rounded-full bg-slate-200"></span>
            <span v-if="post.date" class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </span>
          </div>
          
          <h3 class="text-2xl font-bold text-slate-900 mb-4 group-hover:text-violet-600 transition-colors leading-tight">
            {{ post.title }}
          </h3>
          
          <p class="text-slate-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
            {{ post.description || stripMarkdown((post.body as any)?.children?.[0]?.children?.[0]?.value || '') }}
          </p>

          <div class="mt-auto text-sm font-bold text-violet-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            Read Article <span>→</span>
          </div>
        </NuxtLink>
      </div>
    </div>
    
    <!-- 4. Genuinely Empty State -->
    <div v-else class="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
      <p class="text-slate-400 italic">No entries found in the log yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { extractSlug } from '~/utils/blog'

useSeoMeta({
  title: 'Engineering Log - Dave Garry',
  ogTitle: 'Engineering Log - Dave Garry',
  description: 'A collection of technical articles on financial messaging, ISO 20022, and software architecture.',
  ogDescription: 'A collection of technical articles on financial messaging, ISO 20022, and software architecture.',
  twitterCard: 'summary_large_image',
})

// Fetch all blog collection data ordered by date
const { data: posts, status, error, refresh } = await useAsyncData('blog-posts', () => 
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

// Filter logic handling Deep Paths and Drafts
const filteredPosts = computed(() => {
  if (!posts.value || !Array.isArray(posts.value)) return []
  return posts.value
    .filter(post => {
      if (!post || !post.path) return false
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.includes('/posts/') || post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => ({
      ...post,
      slugPath: `/${extractSlug(post.path)}/`
    }))
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
