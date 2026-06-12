<template>
  <section class="depth-section bg-surface-container-low" id="services">
    <div class="max-w-container-max mx-auto px-margin-lg w-full">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 reveal-item">
        <div class="max-w-xl">
          <span class="font-label-caps text-label-caps text-secondary block mb-4 uppercase tracking-[0.2em]">{{ $t('services.label') }}</span>
          <h2 class="font-headline-md text-headline-md text-primary">{{ $t('services.title') }}</h2>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter reveal-item delay-200">
        <ServiceCard
          v-for="card in services"
          :key="card.titleKey"
          :icon="card.icon"
          :title="$t(card.titleKey)"
          :description="$t(card.descKey)"
          :variant="card.variant"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: 'code',
    titleKey: 'services.strategy.title',
    descKey: 'services.strategy.description',
    variant: 'default',
  },
  {
    icon: 'engineering',
    titleKey: 'services.design.title',
    descKey: 'services.design.description',
    variant: 'primary',
  },
  {
    icon: 'self_improvement',
    titleKey: 'services.engineering.title',
    descKey: 'services.engineering.description',
    variant: 'default',
  },
]
</script>
