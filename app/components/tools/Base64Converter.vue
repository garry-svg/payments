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
    <div class="flex items-center justify-between p-1 bg-[#F8F4FF] border border-[#E8E3EF] rounded-xl">
      <button
        @click="mode = 'encode'"
        :class="[
          'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
          mode === 'encode' ? 'bg-white shadow-sm text-[#7C00FF] font-bold' : 'text-[#505A75] hover:text-[#16032F]'
        ]"
      >
        Encode
      </button>
      <button
        @click="mode = 'decode'"
        :class="[
          'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
          mode === 'decode' ? 'bg-white shadow-sm text-[#7C00FF] font-bold' : 'text-[#505A75] hover:text-[#16032F]'
        ]"
      >
        Decode
      </button>
    </div>

    <div>
      <label class="block text-sm font-medium text-[#16032F] mb-1">
        Input {{ mode === 'encode' ? 'Text' : 'Base64' }}
      </label>
      <textarea
        v-model="input"
        :placeholder="mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'"
        class="w-full h-40 p-3 bg-[#F8F4FF] border border-[#E8E3EF] rounded-xl font-mono text-sm focus:ring-2 focus:ring-[#7C00FF] outline-none text-[#16032F]"
      ></textarea>
    </div>

    <button
      @click="handleConvert"
      :disabled="loading || !input.trim()"
      class="w-full py-2.5 px-4 bg-[#7C00FF] hover:bg-[#6500DB] disabled:bg-[#A459FF]/50 text-white font-semibold rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
    >
      <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      {{ loading ? 'Converting...' : mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64' }}
    </button>

    <div v-if="error" class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm">
      {{ error }}
    </div>

    <div v-if="output">
      <label class="block text-sm font-medium text-[#16032F] mb-1">Result</label>
      <textarea
        v-model="output"
        readonly
        class="w-full h-40 p-3 bg-[#F8F4FF] border border-[#E8E3EF] rounded-xl font-mono text-sm outline-none text-[#16032F]"
      ></textarea>
    </div>
  </div>
</template>
