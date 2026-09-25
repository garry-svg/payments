<template>
  <code class="font-mono text-[0.875em] bg-[#F3EDFF] text-[#7C00FF] px-1.5 py-0.5 rounded border border-[#E8E3EF] font-medium break-words"><slot /></code>
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
