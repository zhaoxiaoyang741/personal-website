<template>
  <nav
    id="main-nav"
    class="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-margin-lg py-6 backdrop-blur-xl border-b border-outline-variant/30 bg-surface/80"
  >
    <div class="font-display-lg text-[24px] md:text-[32px] tracking-tighter text-primary">
      {{ $t('nav.brand') }}
    </div>
    <div class="hidden md:flex gap-10 items-center">
      <a
        v-for="(link, index) in navLinks"
        :key="link.id"
        :href="'#' + link.id"
        class="font-label-caps text-label-caps"
        :class="activeIndex === index
          ? 'text-primary border-b border-primary pb-1 transition-all duration-300'
          : 'text-secondary hover:text-primary transition-colors duration-300'"
        @click.prevent="handleClick(link.id)"
      >
        {{ $t(link.key) }}
      </a>
      <!-- Language Switcher -->
      <div class="flex items-center gap-1 ml-4 pl-4 border-l border-outline-variant/30">
        <button
          v-for="locale in locales"
          :key="locale.code"
          class="font-label-caps text-label-caps px-2 py-1 rounded transition-colors duration-200"
          :class="locale.code === currentLocale
            ? 'text-primary bg-primary/10'
            : 'text-secondary hover:text-primary'"
          @click="switchLocale(locale.code)"
        >
          {{ locale.code === 'zh-CN' ? '中' : 'EN' }}
        </button>
      </div>
    </div>
    <button class="md:hidden">
      <span class="material-symbols-outlined text-primary">menu</span>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { scrollTo, currentSection } from '~/composables/useSectionScroll'

const { locale, locales, setLocale } = useI18n()

const currentLocale = computed(() => locale.value)

const navLinks = [
  { id: 'hero-section', key: 'nav.essays' },
  { id: 'services', key: 'nav.archive' },
  { id: 'works', key: 'nav.works' },
  { id: 'footer-section', key: 'nav.about' },
]

const activeIndex = computed(() => currentSection.value)

function handleClick(id) {
  scrollTo(id)
}

async function switchLocale(code) {
  if (setLocale) {
    await setLocale(code)
  } else {
    locale.value = code
  }
}
</script>
