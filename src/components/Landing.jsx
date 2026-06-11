import { useState } from 'react'
import { motion } from 'framer-motion'
import TranslationBridge from './TranslationBridge.jsx'
import Button from './ui/Button.jsx'
import { Icon } from './ui/Icons.jsx'
import { useStore } from '../store.jsx'
import { t, isRTL } from '../lib/languages.js'

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
    <div className="app-bg min-h-screen w-full overflow-x-hidden" dir={rtl ? 'rtl' : 'ltr'}>
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow">
            <Icon name="phone" className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">{t('app.name')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
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
          <Button size="sm" variant="primary" onClick={() => actions.goScreen('onboarding')}>
            {t('landing.cta', lang)}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* hero: the Living Translation Bridge */}
        <TranslationBridge />

        {/* value prop + CTA */}
        <section className="py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-brand-200">
              <Icon name="globe" className="h-4 w-4" />
              {t('landing.kicker', lang)}
            </div>
            <h1 className="mx-auto max-w-3xl whitespace-pre-line text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
              <span className="text-gradient">{t('landing.title', lang)}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              {t('landing.sub', lang)}
            </p>
            <div className="mt-7 flex justify-center">
              <Button size="lg" variant="primary" onClick={() => actions.goScreen('onboarding')}>
                <Icon name="phone" className="h-5 w-5" />
                {t('landing.cta', lang)}
              </Button>
            </div>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.key}
                className="glass rounded-2xl p-5 text-left"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-brand-200">
                  <Icon name={f.icon} className="h-5 w-5" />
                </div>
                <div className="text-[15px] font-bold">{t(`landing.${f.key}.t`, lang)}</div>
                <div className="mt-1 text-sm leading-snug text-white/55">{t(`landing.${f.key}.d`, lang)}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
