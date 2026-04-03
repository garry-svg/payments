<template>
  <div class="relative group">
    <div v-if="filename" class="absolute top-0 right-0 px-3 py-1 text-xs font-mono text-slate-400 bg-slate-800 rounded-bl-lg rounded-tr-lg border-l border-b border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
      {{ filename }}
    </div>
    <button
      @click="copy"
      class="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all z-10"
      aria-label="Copy code"
    >
      <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as PropType<number[]>,
    default: () => []
  }
})

const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style>
pre {
  @apply rounded-xl border border-slate-200 dark:border-slate-800 !bg-slate-900 !m-0;
}
code {
  @apply font-mono text-sm leading-relaxed;
}
</style>
