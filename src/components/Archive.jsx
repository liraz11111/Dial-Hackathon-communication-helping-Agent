import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from './ui/Icons.jsx'
import { useStore } from '../store.jsx'
import { t } from '../lib/languages.js'

const date = (ts) => new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' })

// The Archive is the other half of the chats↔archive relationship: conversations
// you archive from Chats land here, searchable, and can be restored back.
export default function Archive() {
  const { conversations, lang, actions } = useStore()
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  // Restoring sends the conversation back to Chats — open it so the move is visible.
  const restore = (id) => {
    actions.unarchiveConversation(id)
    navigate(`/app/chats/${id}`)
  }

  const archived = useMemo(() => conversations.filter((c) => c.archived), [conversations])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return archived
    return archived.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        t(`cat.${c.category}`, lang).toLowerCase().includes(term) ||
        c.messages.some((m) => (m.text || '').toLowerCase().includes(term)),
    )
  }, [q, archived, lang])

  const summaryOf = (c) => {
    const s = [...c.messages].reverse().find((m) => m.kind === 'summary')
    return s?.text || c.messages[c.messages.length - 1]?.text || ''
  }

  return (
    <div className="mx-auto h-full w-full max-w-2xl overflow-y-auto px-4 py-6">
      <h1 className="mb-1 text-2xl font-extrabold">{t('arch.title', lang)}</h1>
      <p className="mb-4 text-sm text-white/45">{t('arch.sub', lang)}</p>

      <div className="mb-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
        <Icon name="search" className="h-5 w-5 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('arch.search', lang)}
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-white/35"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl glass px-5 py-12 text-center text-sm text-white/45">{t('arch.empty', lang)}</div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5"
            >
              <Link to={`/app/chats/${c.id}`} className="focus-ring flex min-w-0 flex-1 items-center gap-3 rounded-xl text-left">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-2xl">{c.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-bold">{c.title}</span>
                    <span className="shrink-0 text-xs text-white/40">{date(c.createdAt)}</span>
                  </div>
                  <div className="truncate text-[13px] text-white/55">{summaryOf(c)}</div>
                </div>
              </Link>
              <button
                onClick={() => restore(c.id)}
                className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-xl text-brand-300 transition hover:bg-white/10"
                aria-label={t('chat.restore', lang)}
                title={t('chat.restore', lang)}
              >
                <Icon name="restore" className="h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
