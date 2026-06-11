import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from './ui/Icons.jsx'
import { useStore } from '../store.jsx'
import { t } from '../lib/languages.js'

const date = (ts) => new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' })

export default function History() {
  const { conversations, lang, actions } = useStore()
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return conversations
    return conversations.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        t(`cat.${c.category}`, lang).toLowerCase().includes(term) ||
        c.messages.some((m) => (m.text || '').toLowerCase().includes(term)),
    )
  }, [q, conversations, lang])

  const open = (id) => {
    actions.openConversation(id)
    actions.setTab('chats')
  }

  const summaryOf = (c) => {
    const s = [...c.messages].reverse().find((m) => m.kind === 'summary')
    return s?.text || c.messages[c.messages.length - 1]?.text || ''
  }

  return (
    <div className="mx-auto h-full w-full max-w-2xl overflow-y-auto px-4 py-6">
      <h1 className="mb-4 text-2xl font-extrabold">{t('hist.title', lang)}</h1>

      <div className="mb-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
        <Icon name="search" className="h-5 w-5 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('hist.search', lang)}
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-white/35"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl glass px-5 py-12 text-center text-sm text-white/45">{t('hist.empty', lang)}</div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => open(c.id)}
              className="glass flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left hover:bg-white/10"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-2xl">{c.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-bold">{c.title}</span>
                  <span className="shrink-0 text-xs text-white/40">{date(c.createdAt)}</span>
                </div>
                <div className="truncate text-[13px] text-white/55">{summaryOf(c)}</div>
              </div>
              <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/60">
                {t(`cat.${c.category}`, lang)}
              </span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
