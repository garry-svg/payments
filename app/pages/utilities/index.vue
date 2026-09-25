<template>
  <div class="max-w-[1600px] w-full mx-auto px-4 lg:px-8 py-6 min-h-[calc(100vh-80px)] bg-white flex flex-col">
    <div class="flex flex-col lg:flex-row gap-8 flex-grow">
      <!-- Sidebar / Menu -->
      <aside class="w-full lg:w-72 flex flex-col gap-2 flex-shrink-0 pt-2">
        <div class="mb-6 hidden lg:block px-4">
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">System_Utilities</h1>
        </div>

        <!-- Mobile Horizontal Tabs / Desktop Vertical Sidebar -->
        <div class="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar border-b lg:border-none border-[#E8E3EF] pb-2 lg:pb-0 gap-1 lg:gap-2">
          <button 
            v-for="tool in tools" 
            :key="tool.id"
            @click="selectTool(tool.id)"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap lg:whitespace-normal group cursor-pointer',
              activeToolId === tool.id 
                ? 'bg-[#F3EDFF] text-[#7C00FF] border border-[#DDD6E8]' 
                : 'text-[#505A75] hover:bg-[#F8F4FF] hover:text-[#16032F]'
            ]"
          >
            <span :class="['w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm transition-colors', activeToolId === tool.id ? 'bg-[#7C00FF] text-white' : 'bg-[#F8F4FF] text-[#8590AA] group-hover:bg-[#E8E3EF] group-hover:text-[#505A75]']">
              {{ tool.icon }}
            </span>
            <span class="font-bold text-sm tracking-tight">{{ tool.name }}</span>
          </button>
        </div>
      </aside>

      <!-- Workspace Area -->
      <main class="flex-grow flex flex-col h-[calc(100vh-140px)]">
        <div class="bg-white border border-[#E8E3EF] rounded-[2rem] shadow-xl shadow-purple-950/5 p-6 md:p-8 flex-grow flex flex-col h-full">
          
          <!-- Active Tool Content -->
          <div v-if="activeTool" class="flex flex-col h-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500" :class="{ 'overflow-y-auto pr-1': activeToolId === 'json-diff' || activeToolId === 'xml-diff' }">
            
            <header class="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div class="flex-grow">
                <h2 class="text-2xl font-bold text-[#16032F] tracking-tight mb-1">{{ activeTool.name }}</h2>
                <p class="text-[#505A75] max-w-xl leading-relaxed text-sm">{{ activeTool.description }}</p>
              </div>
              
              <!-- Action Button Row -->
              <div v-if="activeToolId !== 'json-diff' && activeToolId !== 'xml-fmt' && activeToolId !== 'json-fmt' && activeToolId !== 'xml-diff'" class="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                <input
                  type="file"
                  ref="fileInput"
                  class="hidden"
                  accept=".xml,.json,.txt"
                  @change="handleFileUpload"
                />
                <button 
                  @click="clearBuffer"
                  class="px-5 py-2 text-sm font-bold text-[#8590AA] hover:text-[#16032F] border border-[#E8E3EF] hover:border-[#DDD6E8] hover:bg-[#F8F4FF] rounded-xl transition-all cursor-pointer"
                >
                  Clear_Buffer
                </button>
                <button 
                  @click="triggerFileUpload"
                  class="px-5 py-2 text-sm font-bold text-[#8590AA] hover:text-[#16032F] border border-[#E8E3EF] hover:border-[#DDD6E8] hover:bg-[#F8F4FF] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Upload_File
                </button>
                <button 
                  @click="processToolAction"
                  :disabled="isLoading || !buffer.trim()"
                  class="px-6 py-2 bg-[#7C00FF] hover:bg-[#6500DB] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <span v-if="isLoading" class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ isLoading ? 'Processing...' : activeTool.actionLabel }}
                </button>
              </div>
            </header>

            <!-- Dedicated XML Formatter Component -->
            <div v-if="activeToolId === 'xml-fmt'" class="flex-grow flex flex-col min-h-0">
              <ToolsXmlPrettyPrinter />
            </div>

            <!-- Dedicated JSON Formatter Component -->
            <div v-else-if="activeToolId === 'json-fmt'" class="flex-grow flex flex-col min-h-0">
              <ToolsJsonPrettyPrinter />
            </div>

            <!-- Dedicated JSON Diff Component -->
            <div v-else-if="activeToolId === 'json-diff'" class="flex-grow">
              <ToolsJsonDiff />
            </div>

            <!-- Dedicated XML Diff Component -->
            <div v-else-if="activeToolId === 'xml-diff'" class="flex-grow">
              <ToolsXmlDiff />
            </div>

            <!-- Unified Dark Workspace for other tools (b64-enc, b64-dec) -->
            <div v-else class="flex-grow flex flex-col relative min-h-0 bg-[#120024] rounded-[1.5rem] overflow-hidden border border-[#302E40] shadow-inner shadow-black/30">
              <div class="absolute top-4 right-4 z-20 flex gap-2">
                <button 
                  v-if="buffer"
                  @click="copyResult"
                  class="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl cursor-pointer"
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
                class="absolute inset-0 w-full h-full bg-transparent text-[#F8F4FF] font-mono text-[15px] p-6 focus:outline-none transition-all resize-none custom-scrollbar leading-relaxed"
                spellcheck="false"
              ></textarea>

              <div v-if="currentError" class="absolute bottom-6 left-6 right-6 p-4 bg-rose-950/90 border border-rose-500/50 rounded-xl text-rose-200 text-xs font-bold flex items-center gap-3 backdrop-blur-sm animate-in fade-in zoom-in-95 z-30">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-rose-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {{ currentError }}
                <button @click="currentError = null" class="ml-auto text-rose-400 hover:text-white">✕</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

useSeoMeta({
  title: 'System Utilities - Financial Messaging Tools - Dave Garry',
  ogTitle: 'System Utilities - Financial Messaging Tools - Dave Garry',
  description: 'Free online tools for financial messaging engineers: XML Formatter, JSON Formatter, and Base64 converters.',
  ogDescription: 'Free online tools for financial messaging engineers: XML Formatter, JSON Formatter, and Base64 converters.',
  twitterCard: 'summary_large_image',
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const route = useRoute()

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
  },
  { 
    id: 'json-diff', 
    name: 'JSON Diff', 
    icon: '!=', 
    actionLabel: 'Compare JSON',
    placeholder: '',
    description: 'Compare two JSON documents and highlight their differences.'
  },
  { 
    id: 'xml-diff', 
    name: 'XML Diff', 
    icon: '<!>', 
    actionLabel: 'Compare XML',
    placeholder: '',
    description: 'Compare two XML documents and highlight structural differences with syntax-aware folding.'
  }
]

// State Management
const activeToolId = ref('xml-fmt')
const fileInput = ref<HTMLInputElement | null>(null)

// Support deep-linking via query parameter ?tool=... both on initial load and navigation
watch(
  () => route.query.tool,
  (toolQuery) => {
    if (toolQuery && typeof toolQuery === 'string' && tools.some(t => t.id === toolQuery)) {
      activeToolId.value = toolQuery
    }
  },
  { immediate: true }
)

function selectTool(id: string) {
  activeToolId.value = id
  navigateTo({ path: '/utilities/', query: { tool: id } }, { replace: true })
}

const activeTool = computed(() => tools.find(t => t.id === activeToolId.value))

const buffer = ref('')
const currentError = ref<string | null>(null)
const isLoading = ref(false)
const isCopied = ref(false)

// Reset errors when switching tools but keep buffer optionally? 
watch(activeToolId, () => {
  currentError.value = null
})

function clearBuffer() {
  buffer.value = ''
  currentError.value = null
}

function triggerFileUpload() {
  fileInput.value?.click()
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    buffer.value = e.target?.result as string
    currentError.value = null
  }
  reader.onerror = () => {
    currentError.value = 'Failed to read file'
  }
  reader.readAsText(file)

  // Reset input value to allow selecting the same file again
  target.value = ''
}

async function copyResult() {
  if (!buffer.value) return
  await navigator.clipboard.writeText(buffer.value)
  isCopied.value = true
  setTimeout(() => { isCopied.value = false }, 2000)
}

// Unified Action Handler for Base64 Tools (Client-Side UTF-8 Safe)
async function processToolAction() {
  if (!buffer.value.trim()) return
  
  isLoading.value = true
  currentError.value = null
  
  try {
    if (activeToolId.value === 'b64-enc' || activeToolId.value === 'b64-dec') {
      const mode = activeToolId.value === 'b64-enc' ? 'encode' : 'decode'
      if (mode === 'encode') {
        try {
          buffer.value = btoa(unescape(encodeURIComponent(buffer.value)))
        } catch (e: any) {
          currentError.value = 'Failed to encode text to Base64: ' + (e.message || String(e))
        }
      } else {
        try {
          buffer.value = decodeURIComponent(escape(atob(buffer.value.trim())))
        } catch (e: any) {
          currentError.value = 'Invalid Base64 string: ' + (e.message || String(e))
        }
      }
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
  background: #120024;
  border-radius: 0 1.5rem 1.5rem 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #302E40;
  border-radius: 10px;
  border: 2px solid #120024;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #424055;
}
</style>
