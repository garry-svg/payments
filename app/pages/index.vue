<template>
  <div class="max-w-6xl mx-auto px-6 py-12 lg:py-16 space-y-20 bg-white">
    <!-- Compressed Hero Grid -->
    <section class="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
      
      <!-- Left Column: Content -->
      <div class="md:col-span-3 space-y-6 order-2 md:order-1 flex flex-col items-start">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 text-slate-900 text-[10px] font-bold uppercase tracking-widest font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse"></span>
          System_Engineer
        </div>
        
        <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-sans">
          Financial Messaging and <br />
          <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Technologies</span>.
        </h1>
        
        <p class="text-lg text-slate-600 leading-relaxed max-w-xl font-sans">
          I work for a fintech company and I blog about financial messaging, architecture and technologies that I work with during my daily job. I hope readers find them useful!
        </p>

        <div class="flex flex-wrap gap-4 pt-4">
          <NuxtLink to="/utilities" class="px-10 py-4 text-base bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300/50 hover:scale-[1.02] transition-all active:scale-[0.98]">
            Explore Utilities
          </NuxtLink>
          <NuxtLink to="/blog" class="px-8 py-4 text-base bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98]">
            Read Blog
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

    <!-- Featured Utilities Section (New) -->
    <section class="space-y-8">
      <div class="flex items-end justify-between border-b border-slate-100 pb-4">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Core Systems Toolkit</h2>
        <NuxtLink to="/utilities" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono">
          All Tools <span class="transition-transform group-hover:translate-x-1">→</span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- JSON Formatter -->
        <NuxtLink to="/utilities" class="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all">
          <div class="p-3 bg-slate-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">JSON Formatter</h3>
            <p class="text-sm text-slate-500 leading-relaxed">Validate, format, and structure complex JSON payloads instantly.</p>
          </div>
        </NuxtLink>

        <!-- XML Formatter -->
        <NuxtLink to="/utilities" class="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all">
          <div class="p-3 bg-slate-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">XML Formatter</h3>
            <p class="text-sm text-slate-500 leading-relaxed">Beautify SOAP messages and legacy XML architectures.</p>
          </div>
        </NuxtLink>

        <!-- Base 64 Encoder -->
        <NuxtLink to="/utilities" class="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all">
          <div class="p-3 bg-slate-50 text-sky-600 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1 flex items-center gap-2">Base 64 Encoder <span class="px-1.5 py-0.5 bg-sky-100 text-sky-700 text-[8px] uppercase tracking-widest rounded-md font-mono">Soon</span></h3>
            <p class="text-sm text-slate-500 leading-relaxed">Easily encode and decode Base64 strings for configuration files.</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Prominent Engineering Log Section -->
    <section class="space-y-8">
      <div class="flex items-end justify-between border-b border-slate-100 pb-4">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Engineering Log</h2>
        <NuxtLink to="/blog" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1 group font-mono">
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
            <span class="px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest font-mono rounded">
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
            {{ post.description || stripMarkdown(post.body?.children?.[0]?.children?.[0]?.value || '') }}
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

    <!-- Technical Status Bar -->
    <section class="bg-slate-900 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-around gap-8 shadow-xl mt-12 overflow-hidden relative">
      <!-- Subtle background accent -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      
      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div>
          <div class="text-2xl font-bold text-white tracking-tight">41+ Countries</div>
          <div class="text-[10px] uppercase tracking-widest font-mono text-slate-400 mt-0.5">SEPA Supported</div>
        </div>
      </div>
      
      <div class="w-px h-12 bg-slate-800 hidden md:block relative z-10"></div>
      
      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-violet-400 border border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <div>
          <div class="text-2xl font-bold text-white tracking-tight">ISO 20022</div>
          <div class="text-[10px] uppercase tracking-widest font-mono text-slate-400 mt-0.5">Fully Compliant</div>
        </div>
      </div>

      <div class="w-px h-12 bg-slate-800 hidden md:block relative z-10"></div>

      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 border border-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        </div>
        <div>
          <div class="text-2xl font-bold text-white tracking-tight">99.99%</div>
          <div class="text-[10px] uppercase tracking-widest font-mono text-slate-400 mt-0.5">Uptime SLA</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { data: posts } = await useAsyncData('recent-posts', () => 
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const displayPosts = computed(() => {
  if (!posts.value) return []
  return posts.value.map(post => ({
    ...post,
    slugPath: `/${extractSlug(post.path)}/`
  }))
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
