import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './ui/Button.jsx'
import { Icon } from './ui/Icons.jsx'
import { useStore } from '../store.jsx'
import { provisionNumber } from '../services/api.js'
import { downloadVCard, smsHref } from '../lib/vcard.js'
import { t, LANGUAGES, isRTL } from '../lib/languages.js'

export default function Onboarding() {
  const { actions } = useStore()
  const [step, setStep] = useState('form') // form | ready
  const [phone, setPhone] = useState('')
  const [language, setLanguage] = useState('es')
  const [number, setNumber] = useState('')
  const [busy, setBusy] = useState(false)
  const rtl = isRTL(language)

  const valid = phone.replace(/[^\d]/g, '').length >= 7

  const onContinue = async () => {
    if (!valid || busy) return
    setBusy(true)
    const n = await provisionNumber()
    setNumber(n)
    setBusy(false)
    setStep('ready')
  }

  const start = () => actions.signUp({ phone, language, number })

  return (
    <div className="app-bg grid min-h-screen w-full place-items-center px-5 py-10" dir={rtl ? 'rtl' : 'ltr'}>
      <button
        onClick={() => actions.goScreen('landing')}
        className="fixed left-4 top-4 grid h-10 w-10 place-items-center rounded-xl text-white/60 hover:bg-white/5 hover:text-white"
        dir="ltr"
      >
        <Icon name="back" className="h-5 w-5" />
      </button>

      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong w-full max-w-md rounded-3xl p-7 shadow-glass"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow">
                <Icon name="phone" className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold leading-tight">{t('onb.title', language)}</h1>
                <p className="text-sm text-white/55">{t('onb.sub', language)}</p>
              </div>
            </div>

            <label className="mb-1.5 block text-sm font-semibold text-white/80">{t('onb.phone', language)}</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              placeholder="+1 555 123 4567"
              dir="ltr"
              className="mb-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-lg outline-none transition focus:border-brand-400 focus:bg-white/10"
            />

            <label className="mb-2 block text-sm font-semibold text-white/80">{t('onb.lang', language)}</label>
            <div className="mb-6 grid max-h-44 grid-cols-2 gap-2 overflow-y-auto pr-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition ${
                    language === l.code
                      ? 'border-brand-400 bg-brand-500/15'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{l.native}</span>
                  </span>
                  {language === l.code && <Icon name="check" className="ms-auto h-4 w-4 text-brand-300" />}
                </button>
              ))}
            </div>

            <Button full size="lg" variant="primary" disabled={!valid || busy} onClick={onContinue}>
              {busy ? t('chat.connecting', language) : t('onb.continue', language)}
            </Button>

            <div className="my-4 flex items-center gap-3 text-xs text-white/35">
              <span className="h-px flex-1 bg-white/10" />
              {t('onb.or', language)}
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <Button full size="md" variant="glass" onClick={onContinue} disabled={busy}>
              <Icon name="google" className="h-5 w-5" />
              {t('onb.google', language)}
            </Button>

            <p className="mt-5 text-center text-xs leading-relaxed text-white/40">{t('onb.note', language)}</p>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong w-full max-w-md rounded-3xl p-7 text-center shadow-glass"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow"
            >
              <Icon name="check" className="h-8 w-8" />
            </motion.div>
            <h1 className="text-2xl font-extrabold">{t('setup.title', language)}</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">{t('setup.body', language)}</p>

            <div className="my-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/40">{t('app.name')}</div>
              <div className="mt-1 text-2xl font-extrabold tracking-tight text-brand-200" dir="ltr">
                {number}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="glass" onClick={() => downloadVCard('BridgeAgent', number)}>
                <Icon name="contact" className="h-5 w-5" />
                {t('setup.save', language)}
              </Button>
              <a
                href={smsHref(number, 'Hi BridgeAgent, I need help making a call.')}
                className="no-tap-highlight inline-flex items-center justify-center gap-2 rounded-2xl glass px-5 py-3 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                <Icon name="chat" className="h-5 w-5" />
                {t('setup.sms', language)}
              </a>
            </div>

            <Button full size="lg" variant="primary" className="mt-3" onClick={start}>
              <Icon name="sparkles" className="h-5 w-5" />
              {t('setup.start', language)}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
