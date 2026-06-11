import { useEffect, useState, useMemo } from 'react'

// An airport split-flap board. Each cell scrambles, then settles on its final
// character (staggered left-to-right) every time `trigger` changes.
function Cell({ final, index, trigger, pool }) {
  const [ch, setCh] = useState(final)

  useEffect(() => {
    if (final === ' ') {
      setCh(' ')
      return
    }
    let raf
    const start = performance.now()
    const settle = 360 + index * 55
    let lastSwap = 0
    const tick = (now) => {
      const t = now - start
      if (t >= settle) {
        setCh(final)
        return
      }
      if (now - lastSwap > 45) {
        setCh(pool[Math.floor(Math.random() * pool.length)])
        lastSwap = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, final, index])

  if (final === ' ') return <span className="w-2" />

  return (
    <span className="flap-cell">
      <span key={ch} className="flap-char">
        {ch}
      </span>
    </span>
  )
}

export default function SplitFlap({ text = '', trigger = 0, rtl = false, className = '' }) {
  const chars = useMemo(() => Array.from(text).slice(0, 46), [text])
  const pool = useMemo(() => {
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const unique = Array.from(new Set((text + base).replace(/\s/g, '').split('')))
    return unique.length ? unique : base.split('')
  }, [text])

  return (
    <div
      dir={rtl ? 'rtl' : 'ltr'}
      className={`flex flex-wrap justify-center gap-1 ${className}`}
    >
      {chars.map((c, i) => (
        <Cell key={`${trigger}-${i}`} final={c} index={i} trigger={trigger} pool={pool} />
      ))}
    </div>
  )
}
