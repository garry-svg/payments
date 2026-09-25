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
  <div class="antialiased text-[#16032F] bg-white min-h-screen font-sans selection:bg-[#F3EDFF] selection:text-[#7C00FF]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

:root {
  --color-bg: #ffffff;
  --color-bg-subtle: #fcfaff;
  --color-bg-lavender: #f8f4ff;

  --color-text: #16032f;
  --color-text-secondary: #505a75;
  --color-text-muted: #8590aa;

  --color-primary: #7c00ff;
  --color-primary-hover: #6500db;
  --color-primary-soft: #f3edff;

  --color-dark: #302e40;
  --color-dark-deep: #16032f;

  --color-border: #e8e3ef;
  --color-border-subtle: #ddd6e8;

  --color-header-bg: #302e40;
  --color-header-text: #c9c3d5;
  --color-header-text-hover: #ffffff;
  --color-header-border: rgba(255, 255, 255, 0.08);
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

/* Accessible focus visible outlines */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Minimal Scrollbar for Light Mode */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background-color: var(--color-bg-lavender);
}
::-webkit-scrollbar-thumb {
  background-color: var(--color-border-subtle);
  border-radius: 9999px;
  border: 2px solid var(--color-bg);
  background-clip: padding-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-muted);
}
</style>
