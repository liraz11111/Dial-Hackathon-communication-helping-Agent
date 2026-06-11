import { motion } from 'framer-motion'
import { Icon } from './ui/Icons.jsx'
import Button from './ui/Button.jsx'
import { useStore } from '../store.jsx'
import { downloadVCard } from '../lib/vcard.js'
import { t, LANGUAGES } from '../lib/languages.js'

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-white/40">{title}</div>
      <div className="glass rounded-2xl p-2">{children}</div>
    </div>
  )
}

export default function Settings() {
  const { user, lang, contacts, actions } = useStore()

  return (
    <div className="mx-auto h-full w-full max-w-xl overflow-y-auto px-4 py-6">
      <h1 className="mb-5 text-2xl font-extrabold">{t('set.title', lang)}</h1>

      <Section title={t('set.number', lang)}>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow">
            <Icon name="phone" className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold">{user?.name}</div>
            <div className="text-sm text-white/55" dir="ltr">{user?.number}</div>
          </div>
        </div>
      </Section>

      <Section title={t('set.lang', lang)}>
        <div className="grid max-h-56 grid-cols-2 gap-1.5 overflow-y-auto p-1">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => actions.setLanguage(l.code)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                lang === l.code ? 'bg-brand-500/15 ring-1 ring-brand-400' : 'hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{l.flag}</span>
              <span className="truncate text-sm font-semibold">{l.native}</span>
              {lang === l.code && <Icon name="check" className="ms-auto h-4 w-4 text-brand-300" />}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t('set.contacts', lang)}>
        <div className="divide-y divide-white/5">
          {contacts.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-3 py-2.5">
              <Icon name="contact" className="h-5 w-5 text-white/50" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-white/45" dir="ltr">{c.number}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <motion.div whileTap={{ scale: 0.99 }}>
        <Button full variant="glass" className="mb-3" onClick={() => downloadVCard('BridgeAgent', user?.number || '')}>
          <Icon name="contact" className="h-5 w-5" />
          {t('set.save', lang)}
        </Button>
      </motion.div>

      <Button full variant="ghost" onClick={actions.reset}>
        {t('set.reset', lang)}
      </Button>
    </div>
  )
}
