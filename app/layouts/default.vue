<template>
  <div class="flex flex-col min-h-screen">
    <!-- Dark Charcoal-Purple Header -->
    <header class="sticky top-0 z-50 bg-[#302E40]/95 backdrop-blur-md border-b border-white/[0.08]">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8500FF] rounded-lg">
          <div class="w-9 h-9 sm:w-10 sm:h-10 bg-[#8500FF] rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(133,0,255,0.4)]">
            <span class="text-white font-bold text-sm italic tracking-tighter">DG</span>
          </div>
          <span class="font-bold tracking-tight text-white group-hover:text-[#F8F4FF] transition-colors text-base sm:text-lg">davegarry.com</span>
        </NuxtLink>

        <div class="flex items-center gap-4 sm:gap-12">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-sm font-medium text-[#C9C3D5] hover:text-white transition-colors relative group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8500FF] rounded-md px-1"
            active-class="!text-[#A900FF] font-semibold"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8500FF] transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <!-- Refined Charcoal-Purple Footer -->
    <footer class="bg-[#302E40] border-t border-[#424055] mt-24 text-white">
      <div class="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-10">
        <div class="flex flex-col items-center md:items-start gap-4">
          <div class="text-white font-bold flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-[#7C00FF]"></div>
            davegarry.com
          </div>
          <p class="text-[#C3BCD0] text-sm max-w-xs text-center md:text-left">
            Financial Messaging and Technologies. Architecture and systems powering modern fintech.
          </p>
        </div>
        
        <div class="flex gap-8">
          <a 
            v-for="social in socials" 
            :key="social.name" 
            :href="social.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-[#C3BCD0] hover:text-[#A459FF] transition-colors text-sm font-medium"
          >
            {{ social.name }}
          </a>
        </div>

        <div class="text-[#8590AA] text-xs font-mono">
          &copy; {{ new Date().getFullYear() }} Dave Garry
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navLinks = [
  { name: 'Index', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Utilities', path: '/utilities' }
]

const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dgarry/' }
]
</script>
