import { useEffect, useRef, useState } from 'react'
import { Icon } from './ui/Icons.jsx'
import { langMeta, searchLanguages } from '../lib/languages.js'

// A searchable language scroller: type to filter, scroll, tap to choose.
export default function LanguagePicker({ value, onChange, placeholder = 'Search language…' }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  const sel = langMeta(value)
  const results = searchLanguages(query)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const choose = (code) => {
    onChange(code)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-left transition hover:bg-white/10"
      >
        <span className="text-xl">{sel.flag}</span>
        <span className="flex-1">
          <span className="block text-[15px] font-semibold">{sel.native}</span>
          <span className="block text-xs text-white/45">{sel.name}</span>
        </span>
        <Icon name="search" className="h-4 w-4 text-white/40" />
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl glass-strong p-2 shadow-glass">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="mb-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
          <div className="max-h-56 overflow-y-auto pr-0.5">
            {results.length === 0 && <div className="px-3 py-4 text-center text-sm text-white/40">No matches</div>}
            {results.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => choose(l.code)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  l.code === value ? 'bg-brand-500/15' : 'hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{l.flag}</span>
                <span className="flex-1 truncate text-sm font-semibold">{l.native}</span>
                <span className="text-xs text-white/40">{l.name}</span>
                {l.code === value && <Icon name="check" className="h-4 w-4 text-brand-300" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
