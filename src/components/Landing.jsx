import { useState } from 'react'
import { motion } from 'framer-motion'
import PhoneScene from './PhoneScene.jsx'
import Button from './ui/Button.jsx'
import { Icon } from './ui/Icons.jsx'
import { useStore } from '../store.jsx'
import { t, isRTL } from '../lib/languages.js'

const GREETINGS = [
  { text: 'Hola', flag: '🇪🇸', x: '4%', y: '12%', d: 0 },
  { text: 'مرحبا', flag: '🇸🇦', x: '70%', y: '6%', d: 0.6 },
  { text: 'Привет', flag: '🇷🇺', x: '78%', y: '58%', d: 1.1 },
  { text: 'שלום', flag: '🇮🇱', x: '2%', y: '62%', d: 1.5 },
  { text: 'Bonjour', flag: '🇫🇷', x: '60%', y: '84%', d: 0.9 },
  { text: '你好', flag: '🇨🇳', x: '12%', y: '88%', d: 1.8 },
]

const LANDING_LANGS = ['en', 'es', 'he']

export default function Landing() {
  const { actions } = useStore()
  const [lang, setLang] = useState('en')
  const rtl = isRTL(lang)

  const features = [
    { key: 'f1', icon: 'chat' },
    { key: 'f2', icon: 'phone' },
    { key: 'f3', icon: 'sparkles' },
  ]

  return (
    <div className="app-bg min-h-screen w-full overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
      {/* top bar */}
      <header className="relative z-20 flex items-center justify-between px-5 sm:px-8 py-5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow">
            <Icon name="phone" className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">{t('app.name')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {LANDING_LANGS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-lg px-2.5 py-1.5 text-sm font-semibold transition ${
                lang === l ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 sm:px-8 pb-16 lg:grid-cols-2 lg:gap-4 lg:pb-0 lg:min-h-[calc(100vh-84px)]">
        {/* phone first on mobile, second on desktop */}
        <div className="relative order-1 h-[340px] sm:h-[440px] lg:order-2 lg:h-[600px]">
          <PhoneScene />
          {GREETINGS.map((g) => (
            <motion.div
              key={g.text}
              className="glass absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-white/90 shadow-glass"
              style={{ left: g.x, top: g.y }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, y: [0, -9, 0] }}
              transition={{
                opacity: { delay: 0.4 + g.d * 0.2, duration: 0.6 },
                scale: { delay: 0.4 + g.d * 0.2, duration: 0.6 },
                y: { duration: 4 + g.d, repeat: Infinity, ease: 'easeInOut', delay: g.d },
              }}
            >
              <span>{g.flag}</span>
              <span>{g.text}</span>
            </motion.div>
          ))}
        </div>

        {/* copy */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-brand-200">
              <Icon name="globe" className="h-4 w-4" />
              {t('landing.kicker', lang)}
            </div>
            <h1 className="whitespace-pre-line text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              <span className="text-gradient">{t('landing.title', lang)}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              {t('landing.sub', lang)}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button size="lg" variant="primary" onClick={() => actions.goScreen('onboarding')}>
                <Icon name="phone" className="h-5 w-5" />
                {t('landing.cta', lang)}
              </Button>
            </div>

            {/* features */}
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.key}
                  className="glass rounded-2xl p-4"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                >
                  <div className="mb-2 grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-brand-200">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-bold">{t(`landing.${f.key}.t`, lang)}</div>
                  <div className="mt-1 text-[13px] leading-snug text-white/55">
                    {t(`landing.${f.key}.d`, lang)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
