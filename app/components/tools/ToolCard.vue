<template>
  <div class="group bg-white border border-[#E8E3EF] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(124,0,255,0.08)] hover:border-[#7C00FF]/40 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
    <div class="px-8 py-5 border-b border-[#E8E3EF] bg-[#F8F4FF]/50">
      <h3 class="text-xs font-black text-[#8590AA] flex items-center gap-2 uppercase tracking-[0.2em] font-sans">
        <slot name="title" />
      </h3>
    </div>
    <div class="p-8">
      <slot />
    </div>
  </div>
</template>
