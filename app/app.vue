<script setup lang="ts">
const route = useRoute()
const canonicalUrl = `https://davegarry.com${route.path.replace(/\/$/, '')}/`

useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ]
})
</script>

<template>
  <div class="antialiased text-slate-900 bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

body {
  @apply bg-white text-slate-900;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

/* Minimal Scrollbar for Light Mode */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  @apply bg-slate-50;
}
::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full border-2 border-solid border-white bg-clip-padding;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-300;
}
</style>
