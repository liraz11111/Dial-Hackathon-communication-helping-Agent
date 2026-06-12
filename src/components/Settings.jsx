import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from './ui/Icons.jsx'
import Button from './ui/Button.jsx'
import LanguagePicker from './LanguagePicker.jsx'
import { useStore } from '../store.jsx'
import { downloadVCard } from '../lib/vcard.js'
import { t, AGENT_LANGS, langMeta } from '../lib/languages.js'

function Section({ title, note, children }) {
  return (
    <div className="mb-5">
      <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-white/40">{title}</div>
      {children}
      {note && <div className="mt-1.5 px-1 text-xs text-white/40">{note}</div>}
    </div>
  )
}

export default function Settings() {
  const { user, lang, agentLang, contacts, actions } = useStore()
  const navigate = useNavigate()

  const reset = () => {
    actions.reset()
    navigate('/')
  }

  return (
    <div className="mx-auto h-full w-full max-w-xl overflow-y-auto px-4 py-6">
      <h1 className="mb-5 text-2xl font-extrabold">{t('set.title', lang)}</h1>

      <Section title={t('set.number', lang)}>
        <div className="glass flex items-center gap-3 rounded-2xl p-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
            <Icon name="phone" className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold">{user?.name}</div>
            <div className="text-sm text-white/55" dir="ltr">{user?.number}</div>
          </div>
        </div>
      </Section>

      <Section title={t('set.lang', lang)}>
        <LanguagePicker value={lang} onChange={actions.setLanguage} />
      </Section>

      <Section title={t('set.agent', lang)} note={t('set.agentNote', lang)}>
        <div className="flex gap-2">
          {AGENT_LANGS.map((a) => (
            <button
              key={a}
              onClick={() => actions.setAgentLang(a)}
              className={`focus-ring flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 font-semibold transition ${
                agentLang === a ? 'border-brand-400 bg-brand-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{langMeta(a).flag}</span>
              {langMeta(a).native}
              {agentLang === a && <Icon name="check" className="h-4 w-4 text-brand-300" />}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t('set.contacts', lang)}>
        <div className="glass divide-y divide-white/5 rounded-2xl">
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
        <Button full variant="secondary" className="mb-3" onClick={() => downloadVCard('BridgeAgent', user?.number || '')}>
          <Icon name="contact" className="h-5 w-5" />
          {t('set.save', lang)}
        </Button>
      </motion.div>

      <Button full variant="ghost" onClick={reset}>
        {t('set.reset', lang)}
      </Button>
    </div>
  )
}
