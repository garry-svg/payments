<template>
  <div class="max-w-6xl mx-auto px-6 py-24 lg:py-32 space-y-40 bg-white">
    <!-- Hero Side-by-Side Grid -->
    <section class="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20 items-center">
      
      <!-- Left Column: Content -->
      <div class="md:col-span-3 space-y-8 order-2 md:order-1 flex flex-col items-start">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 text-slate-900 text-[10px] font-bold uppercase tracking-widest font-mono">
          <span class="w-1 h-1 rounded-full bg-slate-900"></span>
          System_Engineer
        </div>
        
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] font-sans">
          Financial Messaging and <br />
          <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Technologies</span>.
        </h1>
        
        <p class="text-xl text-slate-600 leading-relaxed max-w-xl font-sans">
          I work for a fintech company and I blog about financial messaging, architecture and technologies that I work with during my daily job. I hope readers find them useful!
        </p>

        <div class="flex flex-wrap gap-4 pt-4">
          <NuxtLink to="/utilities" class="px-8 py-3.5 bg-indigo-950 text-white font-bold rounded-xl transition-all hover:bg-indigo-900 hover:shadow-lg active:scale-[0.98]">
            Explore Utilities
          </NuxtLink>
          <NuxtLink to="/blog" class="px-8 py-3.5 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98]">
            Read Blog
          </NuxtLink>
        </div>
      </div>

      <!-- Right Column: Professional Portrait -->
      <div class="md:col-span-2 flex justify-center md:justify-end order-1 md:order-2 w-full">
        <div class="inline-block bg-white border border-slate-100 rounded-2xl overflow-hidden leading-[0]">
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

    <!-- Latest Analysis Section -->
    <section class="space-y-12">
      <div class="flex items-end justify-between border-b border-slate-100 pb-8">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Latest Analysis</h2>
        <NuxtLink to="/blog" class="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest flex items-center gap-2 group font-mono">
          View All <span class="transition-transform group-hover:translate-x-1">→</span>
        </NuxtLink>
      </div>

      <div v-if="posts?.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="post in posts" 
          :key="post.path" 
          :to="post.path"
          class="group block p-8 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-xl transition-all duration-500"
        >
          <div class="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
            {{ post.title }}
          </h3>
          <p class="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {{ post.description }}
          </p>
        </NuxtLink>
      </div>
      <div v-else class="text-center text-slate-400 py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
        <p class="italic">No articles currently in the queue.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('recent-posts', () => 
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(3)
    .all()
)
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
