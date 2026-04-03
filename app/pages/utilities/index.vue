<template>
  <div class="max-w-7xl mx-auto px-6 py-12 lg:py-20 min-h-screen bg-white">
    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Sidebar / Menu -->
      <aside class="w-full lg:w-64 flex flex-col gap-2">
        <div class="mb-8 hidden lg:block px-4">
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">System_Utilities</h1>
          <p class="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest">v4.1.0_PRO</p>
        </div>

        <!-- Mobile Horizontal Tabs / Desktop Vertical Sidebar -->
        <div class="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar border-b lg:border-none border-slate-100 pb-2 lg:pb-0 gap-1 lg:gap-2">
          <button 
            v-for="tool in tools" 
            :key="tool.id"
            @click="activeToolId = tool.id"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap lg:whitespace-normal group',
              activeToolId === tool.id 
                ? 'bg-violet-50 text-indigo-600 border border-indigo-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            ]"
          >
            <span :class="['w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm transition-colors', activeToolId === tool.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600']">
              {{ tool.icon }}
            </span>
            <span class="font-bold text-sm tracking-tight">{{ tool.name }}</span>
          </button>
        </div>
      </aside>

      <!-- Workspace Area -->
      <main class="flex-grow">
        <div class="bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-100/50 p-8 md:p-12 min-h-[600px] flex flex-col">
          
          <!-- Active Tool Content -->
          <div v-if="activeTool" class="flex flex-col h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <header class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-50 pb-8">
              <div>
                <h2 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">{{ activeTool.name }}</h2>
                <p class="text-slate-500 max-w-xl leading-relaxed">{{ activeTool.description }}</p>
              </div>
              <div class="flex gap-3">
                <button 
                  @click="clearCurrentTool"
                  class="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-900 border border-slate-200 rounded-xl transition-all"
                >
                  Clear_Buffer
                </button>
                <button 
                  @click="processToolAction"
                  :disabled="isLoading || !activeInput.trim()"
                  class="px-8 py-2.5 bg-indigo-950 text-white font-bold rounded-xl transition-all hover:bg-indigo-900 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg shadow-indigo-100"
                >
                  {{ isLoading ? 'Processing...' : activeTool.actionLabel }}
                </button>
              </div>
            </header>

            <!-- Input Section -->
            <div class="flex flex-col gap-3">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Input_Data</label>
              <div class="relative group">
                <textarea
                  v-model="activeInput"
                  rows="10"
                  :placeholder="activeTool.placeholder"
                  class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all resize-y custom-scrollbar"
                ></textarea>
              </div>
              <div v-if="currentError" class="text-red-500 text-xs font-bold flex items-center gap-2 mt-1 ml-1 bg-red-50 p-3 rounded-lg border border-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {{ currentError }}
              </div>
            </div>

            <!-- Output Section -->
            <div v-if="activeOutput" class="flex flex-col gap-3">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Processed_Result</label>
              <div class="relative group">
                <div class="absolute top-4 right-4 z-10">
                  <button 
                    @click="copyOutput"
                    class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                  >
                    <template v-if="isCopied">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Copied_Ok
                    </template>
                    <template v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      Copy_Result
                    </template>
                  </button>
                </div>
                <pre class="w-full h-80 bg-slate-900 border border-slate-900 rounded-2xl p-6 overflow-auto text-indigo-100 font-mono text-sm leading-relaxed custom-scrollbar whitespace-pre-wrap break-all shadow-inner shadow-black/20">{{ activeOutput }}</pre>
              </div>
            </div>

            <!-- Empty Output Placeholder -->
            <div v-else class="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-slate-50 rounded-2xl min-h-[200px] text-slate-300">
              <div class="font-mono text-[10px] uppercase tracking-[0.2em]">Ready_To_Process...</div>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Tool Definitions
const tools = [
  { 
    id: 'xml-fmt', 
    name: 'XML Formatter', 
    icon: '< >', 
    actionLabel: 'Format XML',
    placeholder: 'Paste raw XML string here...',
    description: 'Beautifies and validates XML structures. Ideal for debugging SOAP messages or complex payload definitions.'
  },
  { 
    id: 'json-fmt', 
    name: 'JSON Formatter', 
    icon: '{ }', 
    actionLabel: 'Format JSON',
    placeholder: 'Paste raw JSON string here...',
    description: 'Pretty prints minified JSON data with high-contrast formatting for structural analysis.'
  },
  { 
    id: 'b64-enc', 
    name: 'Base64 Encoder', 
    icon: '↔', 
    actionLabel: 'Encode Text',
    placeholder: 'Enter UTF-8 text to encode to base64...',
    description: 'Safe conversion of plain text data into standardized Base64 strings for transmission.'
  },
  { 
    id: 'b64-dec', 
    name: 'Base64 Decoder', 
    icon: '→ ←', 
    actionLabel: 'Decode string',
    placeholder: 'Enter base64 encoded string...',
    description: 'Translates Base64 encoded strings back into human-readable UTF-8 text.'
  }
]

// State Management
const activeToolId = ref('xml-fmt')
const activeTool = computed(() => tools.find(t => t.id === activeToolId.value))

const activeInput = ref('')
const activeOutput = ref('')
const currentError = ref<string | null>(null)
const isLoading = ref(false)
const isCopied = ref(false)

// Reset state when switching tools
watch(activeToolId, () => {
  activeInput.value = ''
  activeOutput.value = ''
  currentError.value = null
})

function clearCurrentTool() {
  activeInput.value = ''
  activeOutput.value = ''
  currentError.value = null
}

async function copyOutput() {
  if (!activeOutput.value) return
  await navigator.clipboard.writeText(activeOutput.value)
  isCopied.value = true
  setTimeout(() => { isCopied.value = false }, 2000)
}

// Unified Action Handler
async function processToolAction() {
  if (!activeInput.value.trim()) return
  
  isLoading.value = true
  currentError.value = null
  
  try {
    if (activeToolId.value === 'xml-fmt') {
      const data = await $fetch<string>(`${apiBase}/api/format/xml`, {
        method: 'POST',
        body: activeInput.value,
        headers: { 'Content-Type': 'application/xml' }
      })
      activeOutput.value = data
    } 
    else if (activeToolId.value === 'json-fmt') {
      const data = await $fetch<any>(`${apiBase}/api/format/json`, {
        method: 'POST',
        body: activeInput.value,
        headers: { 'Content-Type': 'application/json' }
      })
      activeOutput.value = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
    }
    else if (activeToolId.value === 'b64-enc' || activeToolId.value === 'b64-dec') {
      const mode = activeToolId.value === 'b64-enc' ? 'encode' : 'decode'
      const data = await $fetch<{ result: string }>(`${apiBase}/api/convert/base64`, {
        method: 'POST',
        body: { data: activeInput.value, mode }
      })
      activeOutput.value = data.result
    }
  } catch (err: any) {
    currentError.value = err.data?.message || err.message || 'Processing failed. Please check your input format.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-slate-50;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-300;
}

pre.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-slate-900;
}
pre.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-700 rounded-full;
}
</style>
