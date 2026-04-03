<script setup lang="ts">
const config = useRuntimeConfig();
const input = ref('');
const output = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

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
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Raw XML</label>
      <textarea
        v-model="input"
        placeholder="<root><child>data</child></root>"
        class="w-full h-40 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      ></textarea>
    </div>

    <button
      @click="handleFormat"
      :disabled="loading || !input.trim()"
      class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
    >
      <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      {{ loading ? 'Formatting...' : 'Format XML' }}
    </button>

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
