<template>
  <div class="relative group my-6 max-w-full min-w-0 rounded-2xl border border-[#424055] bg-[#302E40] overflow-hidden shadow-sm">
    <div 
      v-if="filename" 
      class="absolute top-0 right-0 px-3 py-1 text-xs font-mono text-[#DDD6E8] bg-[#16032F] rounded-bl-lg border-l border-b border-[#424055] opacity-0 group-hover:opacity-100 transition-opacity z-10"
    >
      {{ filename }}
    </div>
    <button
      @click="copy"
      class="absolute top-3 right-3 p-1.5 rounded-md bg-[#16032F]/90 border border-[#424055] text-[#DDD6E8] hover:text-white hover:bg-[#7C00FF] opacity-0 group-hover:opacity-100 transition-all z-10 cursor-pointer shadow-sm"
      aria-label="Copy code"
    >
      <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </button>
    <pre ref="preRef" :class="$props.class" class="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-[#F8F4FF] max-w-full m-0 !bg-[#302E40]"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'

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
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const preRef = ref<HTMLPreElement | null>(null)
const copied = ref(false)

function copy() {
  const textToCopy = props.code || preRef.value?.textContent || ''
  if (!textToCopy) return
  navigator.clipboard.writeText(textToCopy)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style>
pre code .line {
  display: block;
}
</style>
