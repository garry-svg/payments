<script setup lang="ts">
const config = useRuntimeConfig();
const input = ref('');
const output = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const copied = ref(false);

async function handleFormat() {
  if (!input.value.trim()) return;
  loading.value = true;
  error.value = null;
  try {
    const data = await $fetch<any>(`${config.public.apiBase}/api/format/json`, {
      method: 'POST',
      body: input.value,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    output.value = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  } catch (e: any) {
    error.value = e.data?.message || e.message || 'Formatting failed';
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function copyToClipboard() {
  if (!output.value) return;
  navigator.clipboard.writeText(output.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

const highlightedOutput = computed(() => {
  if (!output.value) return '';
  
  // Escape HTML
  let html = output.value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight hidden/invalid characters
  return html
    .replace(/\r/g, '<span class="text-red-500 bg-red-100 dark:bg-red-900/30 px-0.5 rounded font-bold" title="Carriage Return">\\r</span>')
    .replace(/\t/g, '<span class="text-red-500 bg-red-100 dark:bg-red-900/30 px-0.5 rounded font-bold" title="Tab">\\t</span>')
    .replace(/\u00A0/g, '<span class="text-red-500 bg-red-100 dark:bg-red-900/30 px-0.5 rounded font-bold" title="Non-breaking Space">\\u00A0</span>')
    .replace(/\n/g, '<span class="text-red-500/50 px-0.5" title="Line Feed">↵</span>\n');
});
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Raw JSON</label>
      <textarea
        v-model="input"
        placeholder='{"key": "value"}'
        class="w-full h-40 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      ></textarea>
    </div>

    <button
      @click="handleFormat"
      :disabled="loading || !input.trim()"
      class="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
    >
      <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      {{ loading ? 'Formatting...' : 'Format JSON' }}
    </button>

    <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <div v-if="output" class="space-y-2">
      <div class="flex items-center justify-between">
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Pretty JSON</label>
        <button 
          @click="copyToClipboard"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <div 
        class="w-full h-80 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm overflow-auto whitespace-pre-wrap break-all"
        v-html="highlightedOutput"
      ></div>
    </div>
  </div>
</template>
