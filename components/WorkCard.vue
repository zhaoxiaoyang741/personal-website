<template>
  <div class="reveal-item" :class="`delay-${delay}`">
    <div class="group">
      <div class="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-high mb-4">
        <img
          :alt="alt"
          class="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
          :src="imageUrl"
        />
      </div>
      <span class="font-label-caps text-[10px] text-secondary">{{ tag }}</span>
      <h4 class="font-headline-sm text-[18px] text-primary">{{ title }}</h4>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: { type: String, required: true },
  alt: { type: String, required: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  delay: { type: String, default: '200' },
})
</script>
