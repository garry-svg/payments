<template>
  <div class="max-w-6xl mx-auto px-6 py-16 space-y-16">
    <header class="border-b border-white/5 pb-8 mb-12">
      <h1 class="text-4xl font-bold tracking-tight text-slate-100 mb-4">System Utilities</h1>
      <p class="text-slate-400 max-w-2xl text-lg">
        Professional-grade tools for formatting, encoding, and debugging payment payloads. Designed for high-contrast visibility and speed.
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- XML Pretty Print -->
      <div :class="['glass rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500', { 'animate-pulse border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.2)]': xmlLoading }]">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </span>
            XML Formatter
          </h2>
        </div>
        
        <div class="space-y-2">
          <textarea
            v-model="xmlInput"
            rows="6"
            placeholder="Paste raw XML here..."
            class="w-full bg-black/20 border border-white/10 rounded-xl p-4 font-mono text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
          ></textarea>
          <div v-if="xmlError" class="text-red-400 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {{ xmlError }}
          </div>
        </div>

        <button
          @click="formatXml"
          :disabled="xmlLoading || !xmlInput.trim()"
          class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all w-full flex justify-center"
        >
          {{ xmlLoading ? 'Processing...' : 'Format XML' }}
        </button>

        <div v-if="xmlOutput" class="relative group mt-4">
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="copyToClipboard(xmlOutput, 'xml')" class="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Copy to Clipboard">
              <svg v-if="copied === 'xml'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
          <pre class="bg-black/50 border border-white/5 p-4 rounded-xl overflow-x-auto text-slate-300 font-mono text-sm h-64 overflow-y-auto custom-scrollbar">{{ xmlOutput }}</pre>
        </div>
      </div>

      <!-- JSON Pretty Print -->
      <div :class="['glass rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500', { 'animate-pulse border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.2)]': jsonLoading }]">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </span>
            JSON Formatter
          </h2>
        </div>
        
        <div class="space-y-2">
          <textarea
            v-model="jsonInput"
            rows="6"
            placeholder='{"paste": "raw JSON here"}'
            class="w-full bg-black/20 border border-white/10 rounded-xl p-4 font-mono text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
          ></textarea>
          <div v-if="jsonError" class="text-red-400 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {{ jsonError }}
          </div>
        </div>

        <button
          @click="formatJson"
          :disabled="jsonLoading || !jsonInput.trim()"
          class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all w-full flex justify-center"
        >
          {{ jsonLoading ? 'Processing...' : 'Format JSON' }}
        </button>

        <div v-if="jsonOutput" class="relative group mt-4">
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button @click="copyToClipboard(jsonOutput, 'json')" class="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Copy to Clipboard">
              <svg v-if="copied === 'json'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
          <pre class="bg-black/50 border border-white/5 p-4 rounded-xl overflow-x-auto text-slate-300 font-mono text-sm h-64 overflow-y-auto custom-scrollbar">{{ jsonOutput }}</pre>
        </div>
      </div>

      <!-- Base64 Converter -->
      <div :class="['glass rounded-3xl p-8 flex flex-col gap-6 lg:col-span-2 transition-all duration-500', { 'animate-pulse border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.2)]': b64Loading }]">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3L21 7L17 11"></path><path d="M3 13L7 17L3 21"></path><path d="M21 7H7.5A5.5 5.5 0 0 0 2 12.5V12.5"></path><path d="M3 17H16.5A5.5 5.5 0 0 0 22 11.5V11.5"></path></svg>
            </span>
            Base64 Converter
          </h2>
          
          <div class="flex bg-black/30 rounded-lg p-1 border border-white/5">
            <button 
              @click="b64Mode = 'encode'" 
              :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-all', b64Mode === 'encode' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200']"
            >
              Encode
            </button>
            <button 
              @click="b64Mode = 'decode'" 
              :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-all', b64Mode === 'decode' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200']"
            >
              Decode
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-2">
            <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest ml-1">
              Input {{ b64Mode === 'encode' ? 'Text' : 'Base64' }}
            </label>
            <textarea
              v-model="b64Input"
              rows="8"
              :placeholder="b64Mode === 'encode' ? 'Enter raw text to encode...' : 'Enter base64 string to decode...'"
              class="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 font-mono text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
            ></textarea>
            <div v-if="b64Error" class="text-red-400 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {{ b64Error }}
            </div>
            
            <button
              @click="convertBase64"
              :disabled="b64Loading || !b64Input.trim()"
              class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all w-full flex justify-center mt-4"
            >
              {{ b64Loading ? 'Processing...' : (b64Mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64') }}
            </button>
          </div>

          <div class="space-y-2 flex flex-col">
            <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest ml-1">Result</label>
            <div class="relative group flex-grow">
              <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button @click="copyToClipboard(b64Output, 'b64')" class="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Copy to Clipboard">
                  <svg v-if="copied === 'b64'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
              <pre class="w-full h-full min-h-[12rem] bg-black/50 border border-white/5 rounded-xl p-4 overflow-auto text-slate-300 font-mono text-sm custom-scrollbar whitespace-pre-wrap break-all">{{ b64Output || 'Output will appear here...' }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const copied = ref<string | null>(null)

function copyToClipboard(text: string, id: string) {
  if (!text) return
  navigator.clipboard.writeText(text)
  copied.value = id
  setTimeout(() => { copied.value = null }, 2000)
}

// XML Tool
const xmlInput = ref('')
const xmlOutput = ref('')
const xmlLoading = ref(false)
const xmlError = ref<string | null>(null)

async function formatXml() {
  if (!xmlInput.value.trim()) return
  xmlLoading.value = true
  xmlError.value = null
  try {
    const data = await $fetch<string>(`${apiBase}/api/format/xml`, {
      method: 'POST',
      body: xmlInput.value,
      headers: { 'Content-Type': 'application/xml' }
    })
    xmlOutput.value = data
  } catch (err: any) {
    xmlError.value = err.data?.message || err.message || 'Failed to format XML. Please check the syntax.'
  } finally {
    xmlLoading.value = false
  }
}

// JSON Tool
const jsonInput = ref('')
const jsonOutput = ref('')
const jsonLoading = ref(false)
const jsonError = ref<string | null>(null)

async function formatJson() {
  if (!jsonInput.value.trim()) return
  jsonLoading.value = true
  jsonError.value = null
  try {
    const data = await $fetch<any>(`${apiBase}/api/format/json`, {
      method: 'POST',
      body: jsonInput.value,
      headers: { 'Content-Type': 'application/json' }
    })
    jsonOutput.value = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  } catch (err: any) {
    jsonError.value = err.data?.message || err.message || 'Failed to format JSON. Please check the syntax.'
  } finally {
    jsonLoading.value = false
  }
}

// Base64 Tool
const b64Input = ref('')
const b64Output = ref('')
const b64Mode = ref<'encode' | 'decode'>('encode')
const b64Loading = ref(false)
const b64Error = ref<string | null>(null)

async function convertBase64() {
  if (!b64Input.value.trim()) return
  b64Loading.value = true
  b64Error.value = null
  try {
    const data = await $fetch<{ result: string }>(`${apiBase}/api/convert/base64`, {
      method: 'POST',
      body: { data: b64Input.value, mode: b64Mode.value }
    })
    b64Output.value = data.result
  } catch (err: any) {
    b64Error.value = err.data?.message || err.message || `Failed to ${b64Mode.value}.`
  } finally {
    b64Loading.value = false
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-black/20 rounded-xl;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-700/50 rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-600/50;
}
</style>
