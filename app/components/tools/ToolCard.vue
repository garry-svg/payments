<template>
  <div class="group bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(16,185,129,0.08)] transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
    <div class="px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20">
      <h3 class="text-xs font-black text-slate-400 dark:text-slate-500 flex items-center gap-2 uppercase tracking-[0.2em] font-sans">
        <slot name="title" />
      </h3>
    </div>
    <div class="p-8">
      <slot />
    </div>
  </div>
</template>
