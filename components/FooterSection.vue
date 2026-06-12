<template>
  <section class="depth-section bg-surface" id="footer-section">
    <div class="max-w-container-max mx-auto px-margin-lg w-full flex flex-col md:flex-row justify-between items-start gap-12 reveal-item">
      <div class="flex flex-col gap-6">
        <div class="font-headline-sm text-headline-sm text-primary">{{ $t('footer.brand') }}</div>
        <div class="font-body-md text-body-md text-secondary max-w-sm">
            {{ $t('footer.tagline') }}
          </div>
        <p class="font-label-caps text-[10px] tracking-widest text-outline">{{ $t('footer.icp') }}</p>
      </div>
      <div class="flex flex-wrap gap-x-20 gap-y-8">
        <div class="flex flex-col gap-4">
          <span class="font-label-caps text-label-caps text-primary">{{ $t('footer.connect') }}</span>
          <div class="flex flex-col gap-2">
            <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors" href="#">{{ $t('footer.social.twitter') }}</a>
            <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors" href="#">{{ $t('footer.social.arena') }}</a>
            <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors" href="#">{{ $t('footer.social.readcv') }}</a>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <span class="font-label-caps text-label-caps text-primary">{{ $t('footer.legal') }}</span>
          <p class="font-label-caps text-label-caps text-secondary max-w-[200px]">
            {{ $t('footer.copyright') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
