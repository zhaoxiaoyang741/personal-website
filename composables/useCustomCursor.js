// Custom Cursor — Difference mode in hero, dot elsewhere, lerp follow
export function useCustomCursor() {
  let cursor = null
  let sections = []
  let nav = null
  let mouseX = -100
  let mouseY = -100
  let cursorX = -100
  let cursorY = -100
  let isHoveringLink = false
  let animationId = null

  function onMouseMove(e) {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  function onLinkEnter() {
    isHoveringLink = true
  }

  function onLinkLeave() {
    isHoveringLink = false
  }

  function updateCursor() {
    if (!cursor || !nav) return

    const ease = 0.15
    cursorX += (mouseX - cursorX) * ease
    cursorY += (mouseY - cursorY) * ease

    cursor.style.left = `${cursorX}px`
    cursor.style.top = `${cursorY}px`

    let currentActiveSection = null
    sections.forEach((s) => {
      if (s.classList.contains('active')) currentActiveSection = s
    })

    const navRect = nav.getBoundingClientRect()
    const isMouseOverNav = mouseY >= navRect.top && mouseY <= navRect.bottom

    if (
      currentActiveSection &&
      currentActiveSection.id === 'hero-section' &&
      !isMouseOverNav
    ) {
      cursor.className = 'cursor-hero'
      if (isHoveringLink) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.25)'
      } else {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    } else {
      cursor.className = 'cursor-default'
      if (isHoveringLink) {
        cursor.style.width = '24px'
        cursor.style.height = '24px'
        cursor.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
      } else {
        cursor.style.width = '12px'
        cursor.style.height = '12px'
        cursor.style.backgroundColor = 'rgba(0, 0, 0, 0.15)'
      }
    }

    animationId = requestAnimationFrame(updateCursor)
  }

  function init() {
    cursor = document.getElementById('custom-cursor')
    sections = document.querySelectorAll('.depth-section')
    nav = document.getElementById('main-nav')

    if (!cursor || !nav) return

    document.addEventListener('mousemove', onMouseMove)

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onLinkEnter)
      el.addEventListener('mouseleave', onLinkLeave)
    })

    animationId = requestAnimationFrame(updateCursor)
  }

  function destroy() {
    if (animationId) cancelAnimationFrame(animationId)
    document.removeEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button').forEach((el) => {
      el.removeEventListener('mouseenter', onLinkEnter)
      el.removeEventListener('mouseleave', onLinkLeave)
    })
  }

  if (import.meta.client) {
    onMounted(() => init())
    onUnmounted(() => destroy())
  }

  return { init, destroy }
}
