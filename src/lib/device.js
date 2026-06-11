// Best-effort "is this a phone?" check, used to branch the number-creation flow.
export function isMobile() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const byUA = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua)
  const byTouch =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches
  return byUA || byTouch
}
