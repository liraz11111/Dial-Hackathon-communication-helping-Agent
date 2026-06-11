import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './ui/Icons.jsx'
import Button from './ui/Button.jsx'
import NewCallSheet from './NewCallSheet.jsx'
import { useStore } from '../store.jsx'
import { t, langMeta } from '../lib/languages.js'
import { CATEGORIES } from '../lib/scripts.js'

const time = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function StatusPill({ children, ringing }) {
  return (
    <div className="my-2 flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-white/70">
        {ringing && (
          <span className="relative grid h-3 w-3 place-items-center">
            <span className="pulse-ring relative h-2 w-2 rounded-full bg-brand-400" />
          </span>
        )}
        {children}
      </div>
    </div>
  )
}

function TypingBubble({ label }) {
  return (
    <div className="flex justify-start">
      <div className="glass max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/55">
          <Icon name="sparkles" className="h-3.5 w-3.5 text-brand-300" />
          {label}
          <span className="ms-1 inline-flex gap-0.5">
            <span className="dot h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="dot h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="dot h-1.5 w-1.5 rounded-full bg-white/60" />
          </span>
        </div>
      </div>
    </div>
  )
}

function Message({ m, lang }) {
  if (m.role === 'agent') {
    if (m.kind === 'calling')
      return <StatusPill ringing>📞 {t('chat.connecting', lang)} · {m.text}</StatusPill>
    if (m.kind === 'connected') return <StatusPill>🟢 {t('chat.live', lang)}</StatusPill>
    if (m.kind === 'summary')
      return (
        <div className="my-2 flex justify-center">
          <div className="flex max-w-[88%] items-start gap-2.5 rounded-2xl border border-brand-400/30 bg-brand-500/10 px-4 py-3">
            <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
            <span className="text-sm font-medium text-brand-50/90">{m.text}</span>
          </div>
        </div>
      )
    return null
  }

  if (m.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br from-accent-400 to-accent-600 px-4 py-2.5 text-white shadow-glow-accent">
          <p className="whitespace-pre-wrap text-[15px] leading-snug">{m.text}</p>
          <div className="mt-1 text-right text-[10px] text-white/70">{time(m.ts)}</div>
        </div>
      </div>
    )
  }

  // them — translated, with original underneath
  const om = langMeta(m.originalLang)
  return (
    <div className="flex justify-start">
      <div className="glass max-w-[82%] rounded-2xl rounded-bl-md px-4 py-3">
        <p className="whitespace-pre-wrap text-[15px] font-medium leading-snug text-white">{m.text}</p>
        {m.original && m.original !== m.text && (
          <p className="mt-1.5 border-t border-white/10 pt-1.5 text-[12px] italic leading-snug text-white/45" dir="ltr">
            <span className="not-italic">{om.flag} {t('chat.original', lang)}:</span> {m.original}
          </p>
        )}
        <div className="mt-1 text-[10px] text-white/40">{time(m.ts)}</div>
      </div>
    </div>
  )
}

function HomePane({ lang, onNewCall }) {
  const { actions } = useStore()
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow">
            <Icon name="sparkles" className="h-6 w-6" />
          </div>
          <div>
            <div className="text-base font-bold">{t('chat.home.hi', lang)}</div>
            <div className="text-sm text-white/60">{t('chat.home.body', lang)}</div>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <motion.button
            key={c.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => actions.startConversation({ category: c.key, place: c.defaultPlace })}
            className="glass flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center hover:bg-white/10"
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="text-xs font-semibold text-white/80">{t(`cat.${c.key}`, lang)}</span>
          </motion.button>
        ))}
      </div>

      <Button full size="lg" variant="primary" className="mt-5" onClick={onNewCall}>
        <Icon name="plus" className="h-5 w-5" />
        {t('chat.new', lang)}
      </Button>
    </div>
  )
}

function Thread({ conv, lang }) {
  const { actions } = useStore()
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [conv.messages, conv.relaying])

  const send = () => {
    if (!draft.trim()) return
    actions.userReply(conv.id, draft.trim())
    setDraft('')
  }

  const canType = conv.status === 'live' && conv.awaitingUser && !conv.relaying

  return (
    <div className="flex h-full flex-col">
      {/* thread header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <button onClick={() => actions.closeConversation()} className="grid h-9 w-9 place-items-center rounded-xl text-white/60 hover:bg-white/5 lg:hidden">
          <Icon name="back" className="h-5 w-5 flip-x" />
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-xl">{conv.emoji}</div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-bold">{conv.title}</div>
          <div className="text-xs text-white/50">
            {conv.status === 'connecting' && t('chat.connecting', lang)}
            {conv.status === 'live' && <span className="text-brand-300">● {t('chat.live', lang)}</span>}
            {conv.status === 'ended' && t('chat.ended', lang)}
          </div>
        </div>
        {conv.number && <div className="hidden text-xs text-white/40 sm:block" dir="ltr">{conv.number}</div>}
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
        {conv.messages.map((m) => (
          <Message key={m.id} m={m} lang={lang} />
        ))}
        {conv.relaying && <TypingBubble label={t('chat.translating', lang)} />}
      </div>

      {/* composer / status */}
      <div className="border-t border-white/10 p-3">
        {conv.status === 'ended' ? (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-white/50">
            <Icon name="check" className="h-4 w-4 text-brand-300" />
            {t('chat.ended', lang)}
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <textarea
              rows={1}
              value={draft}
              disabled={!canType}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              placeholder={canType ? t('chat.reply', lang) : t('chat.translating', lang)}
              className="max-h-28 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] outline-none transition focus:border-brand-400 focus:bg-white/10 disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={!canType || !draft.trim()}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow transition disabled:opacity-40"
            >
              <Icon name="send" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ConvListItem({ conv, active, onClick, lang }) {
  const last = conv.messages[conv.messages.length - 1]
  const preview =
    last?.role === 'them' ? last.text : last?.role === 'user' ? `${t('chat.you', lang)}: ${last.text}` : t('chat.connecting', lang)
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
        active ? 'bg-white/10' : 'hover:bg-white/5'
      }`}
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-xl">{conv.emoji}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-bold">{conv.title}</span>
          <span className="shrink-0 text-[10px] text-white/40">{time(conv.createdAt)}</span>
        </div>
        <div className="truncate text-xs text-white/50">{preview}</div>
      </div>
      {conv.status === 'live' && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-400" />}
    </button>
  )
}

export default function Chat() {
  const { conversations, activeId, lang, actions } = useStore()
  const [sheet, setSheet] = useState(false)
  const active = conversations.find((c) => c.id === activeId)

  return (
    <div className="flex h-full">
      {/* left list (desktop always; mobile when no active) */}
      <aside className={`w-full flex-col border-white/10 lg:flex lg:w-[340px] lg:border-r ${active ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-3">
          <Button full variant="primary" onClick={() => setSheet(true)}>
            <Icon name="plus" className="h-5 w-5" />
            {t('chat.new', lang)}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-3">
          {conversations.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-white/40">{t('chat.empty', lang)}</div>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/35">
                {t('chat.recent', lang)}
              </div>
              {conversations.map((c) => (
                <ConvListItem
                  key={c.id}
                  conv={c}
                  active={c.id === activeId}
                  lang={lang}
                  onClick={() => actions.openConversation(c.id)}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* main */}
      <section className={`flex-1 flex-col ${active ? 'flex' : 'hidden lg:flex'}`}>
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Thread conv={active} lang={lang} />
            </motion.div>
          ) : (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
              <HomePane lang={lang} onNewCall={() => setSheet(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <NewCallSheet open={sheet} onClose={() => setSheet(false)} />
    </div>
  )
}
