<template>
  <section class="depth-section bg-surface-container-lowest" id="works">
    <div class="max-w-container-max mx-auto px-margin-lg w-full">
      <div class="mb-12 flex justify-between items-baseline reveal-item">
        <h2 class="font-display-lg text-display-lg-mobile md:text-headline-md italic font-normal serif">
          {{ $t('works.title') }}
        </h2>
        <a class="font-label-caps text-label-caps text-primary border-b border-primary hover:opacity-50" href="#">
          {{ $t('works.viewArchive') }}
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <WorkCard
          v-for="(work, index) in works"
          :key="work.titleKey"
          :image-url="work.imageUrl"
          :alt="$t(work.altKey)"
          :tag="$t(work.tagKey)"
          :title="$t(work.titleKey)"
          :delay="work.delay"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import homeStockImg from '~/assets/img/HomeStock.png'
import heritagePlatformImg from '~/assets/img/HeritagePlatform.png'
import minimalCommerceImg from '~/assets/img/MinimalCommerce.png'

const works = [
  {
    imageUrl: homeStockImg,
    altKey: 'works.items[0].alt',
    tagKey: 'works.items[0].tag',
    titleKey: 'works.items[0].title',
    delay: '200',
  },
  {
    imageUrl: heritagePlatformImg,
    altKey: 'works.items[1].alt',
    tagKey: 'works.items[1].tag',
    titleKey: 'works.items[1].title',
    delay: '300',
  },
  {
    imageUrl: minimalCommerceImg,
    altKey: 'works.items[2].alt',
    tagKey: 'works.items[2].tag',
    titleKey: 'works.items[2].title',
    delay: '400',
  },
]
</script>
