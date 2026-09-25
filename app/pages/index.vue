<template>
  <div class="relative bg-white overflow-hidden">
    <!-- Subtle Lavender Atmospheric Gradient -->
    <div 
      class="absolute top-0 left-0 right-0 h-[650px] pointer-events-none"
      style="background: radial-gradient(circle at 55% 25%, rgba(124, 0, 255, 0.045), transparent 50%);"
    ></div>

    <div class="relative max-w-6xl mx-auto px-6 py-12 lg:py-16 space-y-20">
      <!-- Hero Section -->
      <section class="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
        
        <!-- Left Column: Content -->
        <div class="md:col-span-3 space-y-6 order-2 md:order-1 flex flex-col items-start">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F3EDFF] text-[#16032F] border border-[#E8E3EF] text-xs font-semibold font-mono tracking-wide shadow-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-[#7C00FF]"></span>
            Dave Garry · Software Engineer & CTO
          </div>
          
          <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16032F] leading-[1.15] font-sans">
            Payment messaging, software engineering and <span class="bg-gradient-to-r from-[#7C00FF] to-[#A459FF] bg-clip-text text-transparent">practical AI.</span>
          </h1>
          
          <p class="text-lg text-[#505A75] leading-relaxed max-w-xl font-sans">
            I’m Dave Garry, a CTO and former software-company founder with around 25 years of software engineering experience. I write practical guides, build tools and explore how AI agents can help engineers understand, test and debug payment systems.
          </p>

          <p class="text-sm text-[#66708A] font-sans leading-relaxed max-w-xl">
            For developers and technical teams working with ISO 20022, payment integrations and engineering automation.
          </p>

          <div class="flex flex-wrap gap-4 pt-2">
            <NuxtLink 
              to="/blog/" 
              class="px-8 py-3.5 text-base bg-[#7C00FF] hover:bg-[#6500DB] text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 hover:scale-[1.02] transition-all active:scale-[0.98] cursor-pointer"
            >
              Explore payment guides
            </NuxtLink>
            <NuxtLink 
              to="/utilities/" 
              class="px-8 py-3.5 text-base bg-white hover:bg-[#F8F4FF] border border-[#E8E3EF] hover:border-[#DDD6E8] text-[#16032F] font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              Use developer tools
            </NuxtLink>
          </div>
        </div>

        <!-- Right Column: Professional Portrait -->
        <div class="md:col-span-2 flex justify-center md:justify-end order-1 md:order-2 w-full">
          <div class="inline-block bg-white border border-[#E8E3EF] rounded-2xl overflow-hidden leading-[0] shadow-sm">
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
        <div class="flex items-end justify-between border-b border-[#E8E3EF] pb-4">
          <div>
            <h2 class="text-2xl font-bold text-[#16032F] tracking-tight">Start Here</h2>
            <p class="text-[#66708A] text-sm mt-1">Recommended foundational guides on payment messaging flows and AI engineering.</p>
          </div>
          <NuxtLink to="/blog/" class="text-xs font-bold text-[#7C00FF] hover:text-[#6500DB] transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono shrink-0">
            All Guides <span class="transition-transform group-hover:translate-x-1">→</span>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1: Direct Debit -->
          <NuxtLink 
            to="/pacs-003-message/"
            class="group flex flex-col p-6 bg-white border border-[#E8E3EF] rounded-2xl hover:border-[#7C00FF]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 h-full"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 bg-[#F3EDFF] text-[#7C00FF] text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-[#E8E3EF]">
                Direct Debit
              </span>
              <span class="text-[10px] font-mono text-[#8590AA] uppercase tracking-widest">Guide</span>
            </div>

            <h3 class="text-xl font-bold text-[#16032F] mb-3 group-hover:text-[#7C00FF] transition-colors leading-tight">
              Understand a direct debit message
            </h3>

            <p class="text-[#505A75] text-sm leading-relaxed flex-grow mb-6">
              Explore the pacs.003 message, its role in a direct debit flow and its key XML fields.
            </p>

            <div class="mt-auto text-xs font-bold text-[#7C00FF] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Guide <span>→</span>
            </div>
          </NuxtLink>

          <!-- Card 2: Payment Recalls -->
          <NuxtLink 
            to="/camt-056-message/"
            class="group flex flex-col p-6 bg-white border border-[#E8E3EF] rounded-2xl hover:border-[#7C00FF]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 h-full"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 bg-[#F3EDFF] text-[#7C00FF] text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-[#E8E3EF]">
                Payment Recalls
              </span>
              <span class="text-[10px] font-mono text-[#8590AA] uppercase tracking-widest">Guide</span>
            </div>

            <h3 class="text-xl font-bold text-[#16032F] mb-3 group-hover:text-[#7C00FF] transition-colors leading-tight">
              Understand payment recalls
            </h3>

            <p class="text-[#505A75] text-sm leading-relaxed flex-grow mb-6">
              Learn how camt.056 cancellation requests relate to investigation responses and returned funds.
            </p>

            <div class="mt-auto text-xs font-bold text-[#7C00FF] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Guide <span>→</span>
            </div>
          </NuxtLink>

          <!-- Card 3: AI for Payment Engineering -->
          <NuxtLink 
            to="/bridging-the-context-gap-ai-iso-20022-validation/"
            class="group flex flex-col p-6 bg-white border border-[#E8E3EF] rounded-2xl hover:border-[#7C00FF]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 h-full"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 bg-[#F3EDFF] text-[#7C00FF] text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-[#E8E3EF]">
                Practical AI
              </span>
              <span class="text-[10px] font-mono text-[#8590AA] uppercase tracking-widest">Analysis</span>
            </div>

            <h3 class="text-xl font-bold text-[#16032F] mb-3 group-hover:text-[#7C00FF] transition-colors leading-tight">
              Explore AI for payment engineering
            </h3>

            <p class="text-[#505A75] text-sm leading-relaxed flex-grow mb-6">
              Read about using AI to explain ISO 20022 validation errors and the importance of grounding explanations in rules.
            </p>

            <div class="mt-auto text-xs font-bold text-[#7C00FF] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Guide <span>→</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Developer Tools Section -->
      <section class="space-y-8">
        <div class="flex items-end justify-between border-b border-[#E8E3EF] pb-4">
          <div>
            <h2 class="text-2xl font-bold text-[#16032F] tracking-tight">Core Systems Toolkit</h2>
            <p class="text-[#66708A] text-sm mt-1">Interactive developer utilities for formatting, syntax-checking, and diffing messaging payloads.</p>
          </div>
          <NuxtLink to="/utilities/" class="text-xs font-bold text-[#7C00FF] hover:text-[#6500DB] transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono shrink-0">
            All Tools <span class="transition-transform group-hover:translate-x-1">→</span>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- JSON Formatter -->
          <NuxtLink to="/utilities/?tool=json-fmt" class="group flex items-start gap-4 p-6 bg-white border border-[#E8E3EF] rounded-2xl hover:border-[#7C00FF]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all">
            <div class="p-3 bg-[#F8F4FF] text-[#7C00FF] rounded-xl group-hover:bg-[#7C00FF] group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <div>
              <h3 class="font-bold text-[#16032F] mb-1">JSON Formatter</h3>
              <p class="text-sm text-[#505A75] leading-relaxed">Format and validate JSON syntax with collapsible tags and string expansion.</p>
            </div>
          </NuxtLink>

          <!-- XML Formatter -->
          <NuxtLink to="/utilities/?tool=xml-fmt" class="group flex items-start gap-4 p-6 bg-white border border-[#E8E3EF] rounded-2xl hover:border-[#7C00FF]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all">
            <div class="p-3 bg-[#F8F4FF] text-[#7C00FF] rounded-xl group-hover:bg-[#7C00FF] group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div>
              <h3 class="font-bold text-[#16032F] mb-1">XML Formatter</h3>
              <p class="text-sm text-[#505A75] leading-relaxed">Format and check XML syntax and well-formedness with element folding.</p>
            </div>
          </NuxtLink>

          <!-- Base64 Converter -->
          <NuxtLink to="/utilities/?tool=b64-enc" class="group flex items-start gap-4 p-6 bg-white border border-[#E8E3EF] rounded-2xl hover:border-[#7C00FF]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all">
            <div class="p-3 bg-[#F8F4FF] text-[#7C00FF] rounded-xl group-hover:bg-[#7C00FF] group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div>
            <div>
              <h3 class="font-bold text-[#16032F] mb-1">Base64 Converter</h3>
              <p class="text-sm text-[#505A75] leading-relaxed">Encode UTF-8 text to standardized Base64 or decode Base64 strings.</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- More Payment Guides Section -->
      <section class="space-y-8">
        <div class="flex items-end justify-between border-b border-[#E8E3EF] pb-4">
          <div>
            <h2 class="text-2xl font-bold text-[#16032F] tracking-tight">More payment guides</h2>
            <p class="text-[#66708A] text-sm mt-1">Deep dives into clearing, settlement, PACS, PAIN, and CAMT messaging standards.</p>
          </div>
          <NuxtLink to="/blog/" class="text-xs font-bold text-[#7C00FF] hover:text-[#6500DB] transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono shrink-0">
            View Archive <span class="transition-transform group-hover:translate-x-1">→</span>
          </NuxtLink>
        </div>

        <div v-if="displayPosts?.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="post in displayPosts" 
            :key="post.path" 
            :to="post.slugPath"
            class="group flex flex-col p-6 bg-white border border-[#E8E3EF] rounded-2xl hover:border-[#7C00FF]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 h-full"
          >
            <!-- Meta row: Date & Tag -->
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 bg-[#F3EDFF] text-[#7C00FF] text-[10px] font-bold uppercase tracking-widest font-mono rounded border border-[#E8E3EF]">
                {{ post.categories?.[0] || 'Architecture' }}
              </span>
              <span class="text-[10px] font-mono text-[#8590AA] uppercase tracking-widest">
                {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </span>
            </div>

            <!-- Title most prominent -->
            <h3 class="text-xl font-bold text-[#16032F] mb-3 group-hover:text-[#7C00FF] transition-colors leading-tight">
              {{ post.title }}
            </h3>

            <!-- Excerpt -->
            <p class="text-[#505A75] text-sm line-clamp-3 leading-relaxed flex-grow mb-6">
              {{ post.description || stripMarkdown((post.body as any)?.children?.[0]?.children?.[0]?.value || '') }}
            </p>

            <!-- Action -->
            <div class="mt-auto text-xs font-bold text-[#7C00FF] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Article <span>→</span>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center text-[#8590AA] py-16 bg-[#F8F4FF] rounded-2xl border border-dashed border-[#DDD6E8]">
          <p class="italic">No articles currently in the queue.</p>
        </div>
      </section>

      <!-- Contact Invitation Section -->
      <section class="border-t border-[#E8E3EF] pt-16">
        <div class="p-8 md:p-12 bg-[#F8F4FF] border border-[#E8E3EF] rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm">
          <div class="max-w-2xl space-y-3">
            <h2 class="text-2xl font-bold text-[#16032F] tracking-tight">Working on payment messaging or AI agents?</h2>
            <p class="text-[#505A75] text-sm md:text-base leading-relaxed">
              I’m interested in the practical problems engineers encounter when building, testing and debugging payment systems. Connect with me to compare approaches, share feedback or discuss ideas.
            </p>
          </div>
          <div class="flex-shrink-0">
            <a 
              href="https://www.linkedin.com/in/dgarry/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3.5 bg-[#7C00FF] hover:bg-[#6500DB] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-600/20 hover:shadow-purple-600/30"
            >
              Connect with me on LinkedIn
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
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
