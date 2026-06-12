// Section-controlled scrolling — one section per wheel tick + depth transitions
import { ref, onMounted, onUnmounted } from 'vue'

let isScrolling = false
let totalSections = 0
export const currentSection = ref(0)

export function scrollTo(sectionId) {
  const scrollContainer = document.getElementById('scroll-container')
  const sections = document.querySelectorAll('.depth-section')
  if (!scrollContainer) return
  const index = Array.from(sections).findIndex(s => s.id === sectionId)
  if (index === -1 || index === currentSection.value) return
  currentSection.value = index
  isScrolling = true
  scrollContainer.scrollTo({
    top: currentSection.value * scrollContainer.clientHeight,
    behavior: 'smooth',
  })
  setTimeout(() => { isScrolling = false }, 1000)
}

export function useSectionScroll() {
  let scrollContainer = null
  let sections = []
  let touchStartY = 0

  function init() {
    scrollContainer = document.getElementById('scroll-container')
    sections = document.querySelectorAll('.depth-section')
    if (!scrollContainer || !sections.length) return

    totalSections = sections.length

    // Restore scroll position after locale switch
    const savedSection = sessionStorage.getItem('locale-switch-section')
    if (savedSection !== null) {
      sessionStorage.removeItem('locale-switch-section')
      const sectionIndex = parseInt(savedSection, 10)
      if (sectionIndex >= 0 && sectionIndex < totalSections) {
        currentSection.value = sectionIndex
        scrollContainer.scrollTop = sectionIndex * scrollContainer.clientHeight
      }
    } else {
      currentSection.value = Math.round(scrollContainer.scrollTop / scrollContainer.clientHeight)
    }

    // Force sync depth transitions
    onScroll()

    // Wheel capture
    scrollContainer.addEventListener('wheel', onWheel, { passive: false })
    // Keyboard
    document.addEventListener('keydown', onKeyDown)
    // Touch
    scrollContainer.addEventListener('touchstart', onTouchStart, { passive: true })
    scrollContainer.addEventListener('touchend', onTouchEnd, { passive: true })
    // Scroll listener for depth transitions
    scrollContainer.addEventListener('scroll', onScroll)
  }

  function destroy() {
    if (!scrollContainer) return
    scrollContainer.removeEventListener('wheel', onWheel)
    document.removeEventListener('keydown', onKeyDown)
    scrollContainer.removeEventListener('touchstart', onTouchStart)
    scrollContainer.removeEventListener('touchend', onTouchEnd)
    scrollContainer.removeEventListener('scroll', onScroll)
  }

  function onWheel(e) {
    e.preventDefault()
    if (isScrolling) return
    const direction = e.deltaY > 0 ? 1 : -1
    const nextSection = currentSection.value + direction
    if (nextSection < 0 || nextSection >= totalSections) return
    currentSection.value = nextSection
    isScrolling = true
    scrollContainer.scrollTo({
      top: currentSection.value * scrollContainer.clientHeight,
      behavior: 'smooth',
    })
    setTimeout(() => { isScrolling = false }, 1000)
  }

  function onKeyDown(e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    if (isScrolling) return
    const direction = e.key === 'ArrowDown' ? 1 : -1
    const nextSection = currentSection.value + direction
    if (nextSection < 0 || nextSection >= totalSections) return
    currentSection.value = nextSection
    isScrolling = true
    scrollContainer.scrollTo({
      top: currentSection.value * scrollContainer.clientHeight,
      behavior: 'smooth',
    })
    setTimeout(() => { isScrolling = false }, 1000)
  }

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY
  }

  function onTouchEnd(e) {
    if (isScrolling) return
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY - touchEndY
    if (Math.abs(diff) < 40) return
    const direction = diff > 0 ? 1 : -1
    const nextSection = currentSection.value + direction
    if (nextSection < 0 || nextSection >= totalSections) return
    currentSection.value = nextSection
    isScrolling = true
    scrollContainer.scrollTo({
      top: currentSection.value * scrollContainer.clientHeight,
      behavior: 'smooth',
    })
    setTimeout(() => { isScrolling = false }, 1000)
  }

  function onScroll() {
    const containerHeight = scrollContainer.clientHeight
    const scrollTop = scrollContainer.scrollTop

    const activeIndex = Math.round(scrollTop / containerHeight)
    if (!isScrolling && activeIndex !== currentSection.value && activeIndex >= 0 && activeIndex < totalSections) {
      currentSection.value = activeIndex
    }

    sections.forEach((section, index) => {
      const sectionTop = index * containerHeight
      const distance = scrollTop - sectionTop
      const percentage = distance / containerHeight

      if (Math.abs(percentage) < 1) {
        section.classList.add('active')
        section.classList.remove('exiting', 'entering')

        if (percentage > 0) {
          section.style.transform = `scale(${1 - percentage * 0.1}) translateY(${percentage * -50}px)`
          section.style.opacity = `${1 - percentage}`
          section.style.zIndex = 5
        } else if (percentage < 0) {
          section.style.transform = `scale(${1 + Math.abs(percentage) * 0.1})`
          section.style.opacity = `${1 - Math.abs(percentage)}`
          section.style.zIndex = 10
        } else {
          section.style.transform = `scale(1) translateY(0)`
          section.style.opacity = '1'
        }
      } else {
        section.classList.remove('active')
        if (percentage >= 1) section.classList.add('exiting')
        if (percentage <= -1) section.classList.add('entering')
      }
    })
  }

  if (import.meta.client) {
    onMounted(() => init())
    onUnmounted(() => destroy())
  }

  return { scrollTo, init, destroy, currentSection }
}
