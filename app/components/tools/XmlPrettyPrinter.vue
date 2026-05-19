<script setup lang="ts">
const config = useRuntimeConfig();
const input = ref('');
const output = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

async function handleFormat() {
  if (!input.value.trim()) return;
  loading.value = true;
  error.value = null;
  try {
    const data = await $fetch<string>(`${config.public.apiBase}/api/v1/format/xml`, {
      method: 'POST',
      body: input.value,
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/xml'
      }
    });
    output.value = data;
  } catch (e: any) {
    error.value = e.data?.message || e.message || 'Formatting failed';
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function clearBuffer() {
  input.value = '';
  output.value = '';
  error.value = null;
}

function triggerFileUpload() {
  fileInput.value?.click();
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    input.value = e.target?.result as string;
    error.value = null;
  };
  reader.onerror = () => {
    error.value = 'Failed to read file';
  };
  reader.readAsText(file);

  // Reset input value to allow selecting the same file again
  target.value = '';
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Raw XML</label>
      <textarea
        v-model="input"
        placeholder="Paste raw XML string here or upload a file..."
        class="w-full h-40 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      ></textarea>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        accept=".xml,.txt"
        @change="handleFileUpload"
      />

      <button
        @click="clearBuffer"
        :disabled="!input && !output && !error"
        class="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        Clear Buffer
      </button>

      <button
        @click="triggerFileUpload"
        class="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        Upload File
      </button>

      <button
        @click="handleFormat"
        :disabled="loading || !input.trim()"
        class="flex-[2] py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
      >
        <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        {{ loading ? 'Formatting...' : 'Format XML' }}
      </button>
    </div>

    <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <div v-if="output">
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pretty XML</label>
      <textarea
        v-model="output"
        readonly
        class="w-full h-40 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm outline-none"
      ></textarea>
    </div>
  </div>
</template>
