// Thin wrappers around the browser's Web Speech APIs.
// Mic-in: SpeechRecognition. Voice-out: speechSynthesis. Both degrade gracefully.
import { VOICE_LANG } from './phrases.js'

const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

export const micSupported = !!SR
export const voiceSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

export function listen(lang, { onResult, onEnd, onError } = {}) {
  if (!SR) {
    onError?.('unsupported')
    return null
  }
  const rec = new SR()
  rec.lang = VOICE_LANG[lang] || 'en-US'
  rec.interimResults = true
  rec.maxAlternatives = 1
  rec.continuous = false

  let finalText = ''
  rec.onresult = (e) => {
    let interim = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i]
      if (r.isFinal) finalText += r[0].transcript
      else interim += r[0].transcript
    }
    onResult?.(finalText || interim, !!finalText)
  }
  rec.onerror = (e) => onError?.(e.error || 'error')
  rec.onend = () => onEnd?.(finalText)

  try {
    rec.start()
  } catch {
    /* already started */
  }
  return rec
}

let voicesCache = []
if (voiceSupported) {
  const load = () => {
    voicesCache = window.speechSynthesis.getVoices()
  }
  load()
  window.speechSynthesis.onvoiceschanged = load
}

export function speak(text, lang) {
  if (!voiceSupported || !text) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const tag = VOICE_LANG[lang] || 'en-US'
  u.lang = tag
  const base = tag.split('-')[0]
  const match =
    voicesCache.find((v) => v.lang === tag) || voicesCache.find((v) => v.lang?.startsWith(base))
  if (match) u.voice = match
  u.rate = 0.98
  u.pitch = 1
  synth.speak(u)
}
