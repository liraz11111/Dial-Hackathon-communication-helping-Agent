import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from './ui/Icons.jsx'
import { SCENARIOS_SHOWCASE, showcaseText } from '../lib/showcase.js'
import { t, isRTL } from '../lib/languages.js'

// An ambient, half-transparent, auto-cycling view of things you can ask your
// BridgeAgent. Display-only — there is intentionally no way to send from here.
export default function ScenarioShowcase({ lang = 'en', variant = 'hero', className = '' }) {
  const [i, setI] = useState(0)
  const rtl = isRTL(lang)
  const item = SCENARIOS_SHOWCASE[i]

  useEffect(() => {
    const id = setInterval(() => {
      setI((n) => (n + 1) % SCENARIOS_SHOWCASE.length)
    }, 3400)
    return () => clearInterval(id)
  }, [])

  const pad = variant === 'hero' ? 'px-6 py-7 sm:px-8 sm:py-8' : 'px-5 py-6'
  const phraseSize = variant === 'hero' ? 'text-xl sm:text-2xl' : 'text-lg'

  return (
    <div className={`relative mx-auto w-full max-w-xl ${className}`} dir={rtl ? 'rtl' : 'ltr'}>
      <div
        className={`glass-strong relative overflow-hidden rounded-3xl text-center shadow-glass ${pad}`}
        style={{ background: 'rgba(13, 12, 24, 0.42)' }}
      >
        {/* soft top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-200">
          <Icon name="sparkles" className="h-3.5 w-3.5" />
          {t('show.kicker', lang)}
        </div>

        <div className="relative grid min-h-[5.5rem] place-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-3xl drop-shadow">{item.emoji}</span>
              <p className={`max-w-md font-display font-semibold leading-snug text-white/90 ${phraseSize}`}>
                “{showcaseText(item, lang)}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* progress dots */}
        <div className="mt-5 flex items-center justify-center gap-1.5" dir="ltr">
          {SCENARIOS_SHOWCASE.map((s, n) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n === i ? 'w-5 bg-brand-400' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
