<template>
  <section class="depth-section active" id="hero-section">
    <div class="px-margin-lg text-center max-w-4xl">
      <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6 reveal-item delay-100">
        {{ $t('hero.title') }}
      </h1>
      <p class="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto reveal-item delay-300">
        {{ $t('hero.subtitle') }}
      </p>
      <div class="mt-20 flex justify-center reveal-item delay-500">
        <span class="material-symbols-outlined text-outline animate-bounce">expand_more</span>
      </div>
    </div>
    <!-- Decoration -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] pointer-events-none">
      <div class="w-full h-full border-[1px] border-primary rounded-full scale-125"></div>
    </div>
  </section>
</template>
