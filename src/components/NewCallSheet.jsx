import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './ui/Icons.jsx'
import Button from './ui/Button.jsx'
import { useStore } from '../store.jsx'
import { t } from '../lib/languages.js'
import { CATEGORIES } from '../lib/scripts.js'

export default function NewCallSheet({ open, onClose, onStarted, presetCategory = null }) {
  const { contacts, lang, actions } = useStore()
  const [category, setCategory] = useState('bank')
  const [number, setNumber] = useState('')
  const [contactId, setContactId] = useState('')
  const [request, setRequest] = useState('')

  // Each time the sheet opens, seed the category (preset or default) and clear
  // any leftover draft so it always opens fresh.
  useEffect(() => {
    if (!open) return
    setCategory(presetCategory || 'bank')
    setNumber('')
    setContactId('')
    setRequest('')
  }, [open, presetCategory])

  const start = () => {
    const cat = CATEGORIES.find((c) => c.key === category)
    const contact = contacts.find((c) => c.id === contactId)
    const newId = actions.startConversation({
      category,
      place: cat?.defaultPlace,
      number: contact?.number || number,
      contactName: contact?.name || '',
      request,
    })
    setNumber('')
    setContactId('')
    setRequest('')
    if (onStarted) onStarted(newId)
    else onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="glass-strong relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-6 shadow-glass sm:rounded-3xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-extrabold">{t('new.title', lang)}</h2>
              <button onClick={onClose} className="focus-ring grid h-9 w-9 place-items-center rounded-xl text-white/60 hover:bg-white/5">
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <label className="mb-2 block text-sm font-semibold text-white/80">{t('new.category', lang)}</label>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`focus-ring flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 transition ${
                    category === c.key ? 'border-brand-400 bg-brand-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{c.emoji}</span>
                  <span className="text-[11px] font-semibold text-white/80">{t(`cat.${c.key}`, lang)}</span>
                </button>
              ))}
            </div>

            <label className="mb-1.5 block text-sm font-semibold text-white/80">{t('new.number', lang)}</label>
            <input
              value={number}
              onChange={(e) => {
                setNumber(e.target.value)
                setContactId('')
              }}
              inputMode="tel"
              dir="ltr"
              placeholder="+1 800 555 0100"
              className="mb-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-brand-400 focus:bg-white/10"
            />

            {contacts.length > 0 && (
              <>
                <label className="mb-1.5 block text-sm font-semibold text-white/80">{t('new.contact', lang)}</label>
                <div className="mb-4 flex flex-wrap gap-2">
                  {contacts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setContactId(c.id === contactId ? '' : c.id)
                        setNumber('')
                      }}
                      className={`focus-ring flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                        contactId === c.id ? 'border-brand-400 bg-brand-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Icon name="contact" className="h-4 w-4 text-white/60" />
                      {c.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            <label className="mb-1.5 block text-sm font-semibold text-white/80">{t('new.request', lang)}</label>
            <textarea
              rows={2}
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="…"
              className="mb-5 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-brand-400 focus:bg-white/10"
            />

            <Button full size="lg" variant="primary" onClick={start}>
              <Icon name="phone" className="h-5 w-5" />
              {t('new.start', lang)}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
