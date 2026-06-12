// 3D Tilt for service cards
export function useCardTilt() {
  function onCardMove(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const cardX = e.clientX - rect.left
    const cardY = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((cardY - centerY) / centerY) * -10
    const rotateY = ((cardX - centerX) / centerX) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

    if (card.classList.contains('bg-primary')) {
      card.style.boxShadow = '0 20px 80px rgba(0,0,0,0.3)'
    } else {
      card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08)'
    }
  }

  function onCardLeave(e) {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    card.style.boxShadow = ''
  }

  function init() {
    document.querySelectorAll('.service-card').forEach((card) => {
      card.addEventListener('mousemove', onCardMove)
      card.addEventListener('mouseleave', onCardLeave)
    })
  }

  function destroy() {
    document.querySelectorAll('.service-card').forEach((card) => {
      card.removeEventListener('mousemove', onCardMove)
      card.removeEventListener('mouseleave', onCardLeave)
    })
  }

  if (import.meta.client) {
    onMounted(() => init())
    onUnmounted(() => destroy())
  }

  return { init, destroy }
}
