<template>
  <section class="depth-section bg-surface" id="footer-section">
    <div class="max-w-container-max mx-auto px-margin-lg w-full flex flex-col md:flex-row justify-between items-start gap-12 reveal-item">
      <div class="flex flex-col gap-6">
        <div class="font-headline-sm text-headline-sm text-primary">{{ $t('footer.brand') }}</div>
        <div class="font-body-md text-body-md text-secondary max-w-sm">
            {{ $t('footer.tagline') }}
          </div>
        <p class="font-body-md text-body-md text-secondary">
          <a href="mailto:contact@zhaoxiaoyang.com" class="hover:text-primary transition-colors">contact@zhaoxiaoyang.com</a>
        </p>
      </div>
      <div class="flex flex-wrap gap-x-20 gap-y-8">
        <div class="flex flex-col gap-4">
          <span class="font-label-caps text-label-caps text-primary">{{ $t('footer.connect') }}</span>
          <div class="flex flex-col gap-2">
            <a class="font-body-md text-body-md text-secondary hover:text-primary transition-colors" href="https://github.com/zhaoxiaoyang741" target="_blank" rel="noopener noreferrer">{{ $t('footer.social.github') }}</a>
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
