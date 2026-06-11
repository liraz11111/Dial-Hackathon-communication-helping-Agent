import { Icon } from './ui/Icons.jsx'
import Chat from './Chat.jsx'
import History from './History.jsx'
import Settings from './Settings.jsx'
import { useStore } from '../store.jsx'
import { t, isRTL, AGENT_LANGS, langMeta } from '../lib/languages.js'

const TABS = [
  { key: 'chats', icon: 'chat' },
  { key: 'history', icon: 'history' },
  { key: 'settings', icon: 'settings' },
]

function NavButton({ tab, active, onClick, lang, layout }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 transition ${
        layout === 'side'
          ? `w-full flex-col rounded-2xl py-3 ${active ? 'bg-white/10 text-brand-200' : 'text-white/55 hover:text-white'}`
          : `flex-1 flex-col py-2.5 ${active ? 'text-brand-300' : 'text-white/55'}`
      }`}
    >
      <Icon name={tab.icon} className="h-6 w-6" />
      <span className="text-[11px] font-semibold">{t(`nav.${tab.key}`, lang)}</span>
    </button>
  )
}

function AgentLangToggle({ agentLang, onChange }) {
  return (
    <div className="flex items-center gap-2" dir="ltr">
      <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-white/40 sm:block">Agent speaks</span>
      <div className="flex items-center gap-1 rounded-full glass p-1">
        {AGENT_LANGS.map((a) => (
          <button
            key={a}
            onClick={() => onChange(a)}
            title={langMeta(a).native}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition ${
              agentLang === a ? 'bg-brand-500/30 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            <span>{langMeta(a).flag}</span>
            {a.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AppShell() {
  const { user, tab, activeId, lang, agentLang, actions } = useStore()
  const rtl = isRTL(lang)
  const hideBottom = tab === 'chats' && activeId

  return (
    <div className="app-bg flex h-screen w-full flex-col overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow">
            <Icon name="phone" className="h-5 w-5" />
          </div>
          <span className="text-base font-extrabold tracking-tight">{t('app.name')}</span>
        </div>
        <AgentLangToggle agentLang={agentLang} onChange={actions.setAgentLang} />
      </header>

      <div className="flex min-h-0 flex-1">
        <nav className="hidden w-[84px] shrink-0 flex-col gap-1.5 border-e border-white/10 p-2 lg:flex">
          {TABS.map((tb) => (
            <NavButton key={tb.key} tab={tb} lang={lang} layout="side" active={tab === tb.key} onClick={() => actions.setTab(tb.key)} />
          ))}
        </nav>

        <main className="min-h-0 flex-1">
          {tab === 'chats' && <Chat />}
          {tab === 'history' && <History />}
          {tab === 'settings' && <Settings />}
        </main>
      </div>

      <nav className={`${hideBottom ? 'hidden' : 'flex'} shrink-0 border-t border-white/10 glass-strong lg:hidden`}>
        {TABS.map((tb) => (
          <NavButton key={tb.key} tab={tb} lang={lang} layout="bottom" active={tab === tb.key} onClick={() => actions.setTab(tb.key)} />
        ))}
      </nav>
    </div>
  )
}
