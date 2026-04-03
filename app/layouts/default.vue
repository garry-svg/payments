<template>
  <div class="flex flex-col min-h-screen">
    <!-- Clean Light Header -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <nav class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(79,70,229,0.25)]">
            <span class="text-white font-bold text-sm italic tracking-tighter">DG</span>
          </div>
          <span class="font-bold tracking-tight text-slate-900">davegarry.com</span>
        </NuxtLink>

        <div class="flex items-center gap-12">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors relative group py-2"
            active-class="text-indigo-600"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-slate-50 border-t border-slate-100 mt-24">
      <div class="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-10">
        <div class="flex flex-col items-center md:items-start gap-4">
          <div class="text-slate-900 font-bold flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-indigo-600"></div>
            davegarry.com
          </div>
          <p class="text-slate-500 text-sm max-w-xs text-center md:text-left">
            Infrastructure for the Modern Era. Financial messaging, architecture, and technology.
          </p>
        </div>
        
        <div class="flex gap-8">
          <a v-for="social in socials" :key="social.name" :href="social.url" class="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">
            {{ social.name }}
          </a>
        </div>

        <div class="text-slate-400 text-xs font-mono">
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
  { name: 'Twitter', url: '#' },
  { name: 'GitHub', url: '#' },
  { name: 'LinkedIn', url: '#' }
]
</script>
