<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <WorksSection />
    <FooterSection />
  </div>
</template>

<script setup>
// Composables must be called at top-level of setup() for nested onMounted to register
useCustomCursor()
useSectionScroll()
useCardTilt()
</script>
