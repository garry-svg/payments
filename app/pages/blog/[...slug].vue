<script setup lang="ts">
const route = useRoute()
const slug = extractSlug(route.path)

// Redirect to the new cleaned slug URL
await navigateTo(`/${slug}/`, { redirectCode: 301 })
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-slate-500 font-mono animate-pulse">Redirecting...</p>
  </div>
</template>
