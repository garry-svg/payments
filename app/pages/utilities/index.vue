<template>
  <div class="max-w-[1600px] w-full mx-auto px-4 lg:px-8 py-6 min-h-[calc(100vh-80px)] bg-white flex flex-col">
    <div class="flex flex-col lg:flex-row gap-8 flex-grow">
      <!-- Sidebar / Menu -->
      <aside class="w-full lg:w-72 flex flex-col gap-2 flex-shrink-0 pt-2">
        <div class="mb-6 hidden lg:block px-4">
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
      <main class="flex-grow flex flex-col h-[calc(100vh-140px)]">
        <div class="bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-100/50 p-6 md:p-8 flex-grow flex flex-col h-full">
          
          <!-- Active Tool Content -->
          <div v-if="activeTool" class="flex flex-col h-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <header class="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 tracking-tight mb-1">{{ activeTool.name }}</h2>
                <p class="text-slate-500 max-w-xl leading-relaxed text-sm">{{ activeTool.description }}</p>
              </div>
              
              <!-- Action Button Row -->
              <div class="flex items-center gap-3 flex-shrink-0 pt-1">
                <button 
                  @click="clearBuffer"
                  class="px-5 py-2 text-sm font-bold text-slate-400 hover:text-slate-900 border border-slate-200 rounded-xl transition-all"
                >
                  Clear_Buffer
                </button>
                <button 
                  @click="processToolAction"
                  :disabled="isLoading || !buffer.trim()"
                  class="px-6 py-2 bg-indigo-950 text-white text-sm font-bold rounded-xl transition-all hover:bg-indigo-900 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg shadow-indigo-100 flex items-center gap-2"
                >
                  <span v-if="isLoading" class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ isLoading ? 'Processing...' : activeTool.actionLabel }}
                </button>
              </div>
            </header>

            <!-- Unified Dark Workspace -->
            <div class="flex-grow flex flex-col relative min-h-0 bg-slate-950 rounded-[1.5rem] overflow-hidden border border-slate-900 shadow-inner shadow-black/20">
              <div class="absolute top-4 right-4 z-20 flex gap-2">
                <button 
                  v-if="buffer"
                  @click="copyResult"
                  class="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl"
                >
                  <template v-if="isCopied">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied
                  </template>
                  <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy_Result
                  </template>
                </button>
              </div>

              <textarea
                v-model="buffer"
                :placeholder="activeTool.placeholder"
                class="absolute inset-0 w-full h-full bg-transparent text-indigo-100 font-mono text-[15px] p-6 focus:outline-none transition-all resize-none custom-scrollbar leading-relaxed"
                spellcheck="false"
              ></textarea>

              <div v-if="currentError" class="absolute bottom-6 left-6 right-6 p-4 bg-red-950/90 border border-red-500/50 rounded-xl text-red-200 text-xs font-bold flex items-center gap-3 backdrop-blur-sm animate-in fade-in zoom-in-95 z-30">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {{ currentError }}
                <button @click="currentError = null" class="ml-auto text-red-400 hover:text-white">✕</button>
              </div>
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

const buffer = ref('')
const currentError = ref<string | null>(null)
const isLoading = ref(false)
const isCopied = ref(false)

// Reset errors when switching tools but keep buffer optionally? 
// User requested resetting unified workspace to empty string on Clear_Buffer.
// Usually switching tools might preserve buffer if they are related, but here they are different.
watch(activeToolId, () => {
  currentError.value = null
})

function clearBuffer() {
  buffer.value = ''
  currentError.value = null
}

async function copyResult() {
  if (!buffer.value) return
  await navigator.clipboard.writeText(buffer.value)
  isCopied.value = true
  setTimeout(() => { isCopied.value = false }, 2000)
}

// Unified Action Handler
async function processToolAction() {
  if (!buffer.value.trim()) return
  
  isLoading.value = true
  currentError.value = null
  
  try {
    if (activeToolId.value === 'xml-fmt') {
      const data = await $fetch<string>(`${apiBase}/api/v1/format/xml`, {
        method: 'POST',
        body: buffer.value,
        headers: { 
          'Content-Type': 'application/xml',
          'Accept': 'application/xml'
        }
      })
      buffer.value = data
    } 
    else if (activeToolId.value === 'json-fmt') {
      const data = await $fetch<any>(`${apiBase}/api/v1/format/json`, {
        method: 'POST',
        body: buffer.value,
        headers: { 'Content-Type': 'application/json' }
      })
      buffer.value = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
    }
    else if (activeToolId.value === 'b64-enc' || activeToolId.value === 'b64-dec') {
      const mode = activeToolId.value === 'b64-enc' ? 'encode' : 'decode'
      const params = new URLSearchParams()
      params.append('string', buffer.value)
      params.append('mode', mode)
      
      const data = await $fetch<string>(`${apiBase}/api/v1/convert/base64`, {
        method: 'POST',
        body: params,
        headers: { 'Accept': 'text/plain' }
      })
      buffer.value = data
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
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #020617;
  border-radius: 0 1.5rem 1.5rem 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
  border: 2px solid #020617;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
</style>
