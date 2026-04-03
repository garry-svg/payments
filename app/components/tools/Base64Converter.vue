<script setup lang="ts">
const config = useRuntimeConfig();
const input = ref('');
const output = ref('');
const mode = ref<'encode' | 'decode'>('encode');
const loading = ref(false);
const error = ref<string | null>(null);

async function handleConvert() {
  if (!input.value.trim()) return;
  loading.value = true;
  error.value = null;
  try {
    const data = await $fetch<{ result: string }>(`${config.public.apiBase}/api/convert/base64`, {
      method: 'POST',
      body: {
        data: input.value,
        mode: mode.value
      }
    });
    output.value = data.result;
  } catch (e: any) {
    error.value = e.data?.message || e.message || 'Conversion failed';
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
      <button
        @click="mode = 'encode'"
        :class="[
          'flex-1 py-2 text-sm font-medium rounded-md transition-all',
          mode === 'encode' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        ]"
      >
        Encode
      </button>
      <button
        @click="mode = 'decode'"
        :class="[
          'flex-1 py-2 text-sm font-medium rounded-md transition-all',
          mode === 'decode' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        ]"
      >
        Decode
      </button>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Input {{ mode === 'encode' ? 'Text' : 'Base64' }}
      </label>
      <textarea
        v-model="input"
        :placeholder="mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'"
        class="w-full h-40 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      ></textarea>
    </div>

    <button
      @click="handleConvert"
      :disabled="loading || !input.trim()"
      class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
    >
      <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      {{ loading ? 'Converting...' : mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64' }}
    </button>

    <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <div v-if="output">
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Result</label>
      <textarea
        v-model="output"
        readonly
        class="w-full h-40 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-sm outline-none"
      ></textarea>
    </div>
  </div>
</template>
