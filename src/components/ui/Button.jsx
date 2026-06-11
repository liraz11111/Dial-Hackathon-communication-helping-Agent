import { motion } from 'framer-motion'

const base =
  'no-tap-highlight inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors select-none disabled:opacity-40 disabled:cursor-not-allowed'

const variants = {
  primary:
    'bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-glow-accent hover:from-accent-300 hover:to-accent-500',
  brand:
    'bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow hover:from-brand-200 hover:to-brand-500',
  glass: 'glass text-white hover:bg-white/10',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
}

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-3 text-[15px]',
  lg: 'px-7 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  full = false,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled ? 1 : 0.97 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
