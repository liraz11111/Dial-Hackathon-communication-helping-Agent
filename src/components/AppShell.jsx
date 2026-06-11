import { Icon } from './ui/Icons.jsx'
import Chat from './Chat.jsx'
import History from './History.jsx'
import Settings from './Settings.jsx'
import { useStore } from '../store.jsx'
import { t, isRTL } from '../lib/languages.js'

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

export default function AppShell() {
  const { user, tab, activeId, lang, actions } = useStore()
  const rtl = isRTL(lang)
  const hideBottom = tab === 'chats' && activeId

  return (
    <div className="app-bg flex h-screen w-full flex-col overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
      {/* header */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow">
            <Icon name="phone" className="h-5 w-5" />
          </div>
          <span className="text-base font-extrabold tracking-tight">{t('app.name')}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-semibold text-white/70" dir="ltr">
          <span className="h-2 w-2 rounded-full bg-brand-400" />
          {user?.number}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* desktop side nav */}
        <nav className="hidden w-[84px] shrink-0 flex-col gap-1.5 border-e border-white/10 p-2 lg:flex">
          {TABS.map((tb) => (
            <NavButton
              key={tb.key}
              tab={tb}
              lang={lang}
              layout="side"
              active={tab === tb.key}
              onClick={() => actions.setTab(tb.key)}
            />
          ))}
        </nav>

        {/* content */}
        <main className="min-h-0 flex-1">
          {tab === 'chats' && <Chat />}
          {tab === 'history' && <History />}
          {tab === 'settings' && <Settings />}
        </main>
      </div>

      {/* mobile bottom nav */}
      <nav className={`${hideBottom ? 'hidden' : 'flex'} shrink-0 border-t border-white/10 glass-strong lg:hidden`}>
        {TABS.map((tb) => (
          <NavButton
            key={tb.key}
            tab={tb}
            lang={lang}
            layout="bottom"
            active={tab === tb.key}
            onClick={() => actions.setTab(tb.key)}
          />
        ))}
      </nav>
    </div>
  )
}
