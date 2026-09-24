<template>
  <code class="font-mono text-[0.875em] bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded border border-slate-200/60 font-medium break-words"><slot /></code>
</template>

<style scoped>
code {
  display: inline;
}
code::before,
code::after {
  content: none !important;
}
</style>
