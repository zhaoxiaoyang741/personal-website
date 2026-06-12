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
const works = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGTqsyUBqyXXzplQEH8UfXDRfjeDGEg82jmyckD9PvnCcDGwHCOtJVwrjL-20XWopCGQoNeLFiM0vuolAyeGDjBlpa1ikZlMGk7Fe9qLKHgi4rRYPaAuqsTv5dhhJz750gnowecPFc4XKgMN4RgmIwtkjskQGnuQblcRP41Z3IrXamwIDwEBQQnCuJoynKvj04l5aaQKfzHpRYLSVPOsNr5PJH2zmwyMwYbWqvrS4BMr7PRwmwSYCqjCJqbyI2sh3G2Unr2BXleLg1',
    altKey: 'works.items[0].alt',
    tagKey: 'works.items[0].tag',
    titleKey: 'works.items[0].title',
    delay: '200',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3EobmJYpPowlnj4PwHpJLH6wqQM5tIbGTu7KwGFWVgN5njOVvwIDW0oEwDpu7YJCuoCbzlzyDRAUf_k7nEcE09ROyteW6txe1CGWD_M8ApQhLvGmizcset4mNQnSHZdvWei9BiA2zOMTcD4ez1YGIHoO6Kg4-EGOdDDawHqRCC6PjrWd9jCTRO2jit_553sbprGA4g27b528wSW-UM8NF5czZPnmqFLm2itIMZeiyZ-E2zAb_m2kGe-G1_re66NNwriPLd6XqYGJb',
    altKey: 'works.items[1].alt',
    tagKey: 'works.items[1].tag',
    titleKey: 'works.items[1].title',
    delay: '300',
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxJnxD6Z8PXAzft2rnNrGsLFCYGYvly98T6o9fY_ZaAJYOED2luqidxcOUvt0aLnxt10iC8W4jvcgmEJ50CXNO-XSSKvJai_YF0ghGYjg4s7V-6guH-lI5CEcp6382oHAxv9PesNRDVabtDGj1O0xnexwfzyXIgE1IC-pgWjLl01U_ceMi7PORKNvA8iGKIijmufxlDZNB-etM1XitKJggCtvFgO1snZdrHVaY3KxE2E1tw6zTNgfbyOAKe-lDh01Q8j_Te3YZg4QN',
    altKey: 'works.items[2].alt',
    tagKey: 'works.items[2].tag',
    titleKey: 'works.items[2].title',
    delay: '400',
  },
]
</script>
