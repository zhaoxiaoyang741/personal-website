<template>
  <div
    class="service-card p-12 flex flex-col min-h-[400px] rounded-xl"
    :class="variant === 'primary'
      ? 'bg-primary text-surface'
      : 'bg-surface-container-lowest border border-outline-variant/30'"
  >
    <span
      class="material-symbols-outlined mb-auto"
      :class="variant === 'primary' ? 'text-surface' : 'text-primary'"
      style="font-size: 32px;"
    >
      {{ icon }}
    </span>
    <h3 class="font-headline-sm mb-4" :class="variant === 'primary' ? '' : 'text-primary'">
      {{ title }}
    </h3>
    <p class="font-body-md" :class="variant === 'primary' ? 'opacity-80' : 'text-secondary'">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  variant: { type: String, default: 'default' },
})
</script>
