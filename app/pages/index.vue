<template>
  <div class="max-w-6xl mx-auto px-6 py-12 lg:py-16 space-y-20 bg-white">
    <!-- Hero Section -->
    <section class="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
      
      <!-- Left Column: Content -->
      <div class="md:col-span-3 space-y-6 order-2 md:order-1 flex flex-col items-start">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 text-slate-800 text-xs font-semibold font-mono tracking-wide">
          Dave Garry · Software Engineer & CTO
        </div>
        
        <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-sans">
          Payment messaging, software engineering and <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">practical AI.</span>
        </h1>
        
        <p class="text-lg text-slate-600 leading-relaxed max-w-xl font-sans">
          I’m Dave Garry, a CTO and former software-company founder with around 25 years of software engineering experience. I write practical guides, build tools and explore how AI agents can help engineers understand, test and debug payment systems.
        </p>

        <p class="text-sm text-slate-500 font-sans leading-relaxed max-w-xl">
          For developers and technical teams working with ISO 20022, payment integrations and engineering automation.
        </p>

        <div class="flex flex-wrap gap-4 pt-2">
          <NuxtLink to="/blog/" class="px-8 py-3.5 text-base bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300/50 hover:scale-[1.02] transition-all active:scale-[0.98]">
            Explore payment guides
          </NuxtLink>
          <NuxtLink to="/utilities/" class="px-8 py-3.5 text-base bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98]">
            Use developer tools
          </NuxtLink>
        </div>
      </div>

      <!-- Right Column: Professional Portrait -->
      <div class="md:col-span-2 flex justify-center md:justify-end order-1 md:order-2 w-full">
        <div class="inline-block bg-white border border-slate-100 rounded-2xl overflow-hidden leading-[0] shadow-sm">
          <img 
            src="/images/dave-garry.jpg" 
            alt="Dave Garry" 
            width="259"
            height="300"
            style="width: 259px; height: 300px;"
            class="native-crisp-image"
          />
        </div>
      </div>
    </section>

    <!-- Start Here Section -->
    <section class="space-y-8">
      <div class="flex items-end justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Start Here</h2>
          <p class="text-slate-500 text-sm mt-1">Recommended foundational guides on payment messaging flows and AI engineering.</p>
        </div>
        <NuxtLink to="/blog/" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono shrink-0">
          All Guides <span class="transition-transform group-hover:translate-x-1">→</span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Card 1: Direct Debit -->
        <NuxtLink 
          to="/pacs-003-message/"
          class="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 h-full"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 bg-slate-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-slate-100">
              Direct Debit
            </span>
            <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Guide</span>
          </div>

          <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
            Understand a direct debit message
          </h3>

          <p class="text-slate-500 text-sm leading-relaxed flex-grow mb-6">
            Explore the pacs.003 message, its role in a direct debit flow and its key XML fields.
          </p>

          <div class="mt-auto text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Guide <span>→</span>
          </div>
        </NuxtLink>

        <!-- Card 2: Payment Recalls -->
        <NuxtLink 
          to="/camt-056-message/"
          class="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 h-full"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 bg-slate-50 text-violet-600 text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-slate-100">
              Payment Recalls
            </span>
            <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Guide</span>
          </div>

          <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
            Understand payment recalls
          </h3>

          <p class="text-slate-500 text-sm leading-relaxed flex-grow mb-6">
            Learn how camt.056 cancellation requests relate to investigation responses and returned funds.
          </p>

          <div class="mt-auto text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Guide <span>→</span>
          </div>
        </NuxtLink>

        <!-- Card 3: AI for Payment Engineering -->
        <NuxtLink 
          to="/bridging-the-context-gap-ai-iso-20022-validation/"
          class="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 h-full"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 bg-slate-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-slate-100">
              Practical AI
            </span>
            <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Analysis</span>
          </div>

          <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
            Explore AI for payment engineering
          </h3>

          <p class="text-slate-500 text-sm leading-relaxed flex-grow mb-6">
            Read about using AI to explain ISO 20022 validation errors and the importance of grounding explanations in rules.
          </p>

          <div class="mt-auto text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Guide <span>→</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Developer Tools Section -->
    <section class="space-y-8">
      <div class="flex items-end justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Core Systems Toolkit</h2>
          <p class="text-slate-500 text-sm mt-1">Interactive developer utilities for formatting, syntax-checking, and diffing messaging payloads.</p>
        </div>
        <NuxtLink to="/utilities/" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono shrink-0">
          All Tools <span class="transition-transform group-hover:translate-x-1">→</span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- JSON Formatter -->
        <NuxtLink to="/utilities/?tool=json-fmt" class="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all">
          <div class="p-3 bg-slate-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">JSON Formatter</h3>
            <p class="text-sm text-slate-500 leading-relaxed">Format and validate JSON syntax with collapsible tags and string expansion.</p>
          </div>
        </NuxtLink>

        <!-- XML Formatter -->
        <NuxtLink to="/utilities/?tool=xml-fmt" class="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all">
          <div class="p-3 bg-slate-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">XML Formatter</h3>
            <p class="text-sm text-slate-500 leading-relaxed">Format and check XML syntax and well-formedness with element folding.</p>
          </div>
        </NuxtLink>

        <!-- Base64 Converter -->
        <NuxtLink to="/utilities/?tool=b64-enc" class="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all">
          <div class="p-3 bg-slate-50 text-sky-600 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">Base64 Converter</h3>
            <p class="text-sm text-slate-500 leading-relaxed">Encode UTF-8 text to standardized Base64 or decode Base64 strings.</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Engineering Log Archive Section -->
    <section class="space-y-8">
      <div class="flex items-end justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Recent Articles</h2>
          <p class="text-slate-500 text-sm mt-1">Deep dives into clearing, settlement, PACS, PAIN, and CAMT messaging standards.</p>
        </div>
        <NuxtLink to="/blog/" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono shrink-0">
          View Archive <span class="transition-transform group-hover:translate-x-1">→</span>
        </NuxtLink>
      </div>

      <div v-if="displayPosts?.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="post in displayPosts" 
          :key="post.path" 
          :to="post.slugPath"
          class="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 h-full"
        >
          <!-- Meta row: Date & Tag -->
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-slate-100">
              {{ post.categories?.[0] || 'Architecture' }}
            </span>
            <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </span>
          </div>

          <!-- Title most prominent -->
          <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
            {{ post.title }}
          </h3>

          <!-- Excerpt -->
          <p class="text-slate-500 text-sm line-clamp-3 leading-relaxed flex-grow mb-6">
            {{ post.description || stripMarkdown((post.body as any)?.children?.[0]?.children?.[0]?.value || '') }}
          </p>

          <!-- Action -->
          <div class="mt-auto text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Article <span>→</span>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="text-center text-slate-400 py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <p class="italic">No articles currently in the queue.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { extractSlug } from '~/utils/blog'

useSeoMeta({
  title: 'Dave Garry | Payment Messaging, Software Engineering & AI',
  ogTitle: 'Dave Garry | Payment Messaging, Software Engineering & AI',
  description: 'Practical ISO 20022 guides, developer tools and AI agent experiments from Dave Garry, software engineer, CTO and former founder.',
  ogDescription: 'Practical ISO 20022 guides, developer tools and AI agent experiments from Dave Garry, software engineer, CTO and former founder.',
  ogImage: 'https://davegarry.com/images/dave-garry.jpg',
  twitterCard: 'summary_large_image',
})

const { data: posts } = await useAsyncData('recent-posts', () => 
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

const startHereSlugs = [
  'pacs-003-message',
  'camt-056-message',
  'bridging-the-context-gap-ai-iso-20022-validation'
]

const displayPosts = computed(() => {
  if (!posts.value) return []
  return posts.value
    .filter(post => {
      const isDraft = post.path.includes('_drafts')
      const isOutputPost = post.path.includes('/posts/') || post.path.startsWith('/blog/output/posts')
      return !isDraft && isOutputPost
    })
    .map(post => ({
      ...post,
      slug: extractSlug(post.path),
      slugPath: `/${extractSlug(post.path)}/`
    }))
    .filter(post => !startHereSlugs.includes(post.slug))
    .slice(0, 3)
})

// Utility to fall back if description is missing
function stripMarkdown(text: string) {
  if (!text) return ''
  return text.substring(0, 120) + (text.length > 120 ? '...' : '')
}
</script>

<style scoped>
.native-crisp-image {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>
