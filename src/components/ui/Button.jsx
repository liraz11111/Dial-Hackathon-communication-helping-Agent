import { motion } from 'framer-motion'

const base =
  'focus-ring no-tap-highlight relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors select-none disabled:opacity-40 disabled:cursor-not-allowed'

const variants = {
  // Primary action — violet.
  primary:
    'bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-glow hover:from-brand-300 hover:to-brand-500',
  // Warm coral — used sparingly for emphasis.
  warm:
    'bg-gradient-to-b from-accent-400 to-accent-600 text-white shadow-glow-accent hover:from-accent-300 hover:to-accent-500',
  // Quiet, bordered glass.
  secondary: 'glass text-white hover:bg-white/10',
  // Text only.
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
  loading = false,
  disabled,
  ...props
}) {
  const isDisabled = disabled || loading
  return (
    <motion.button
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.97 }}
      disabled={isDisabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </motion.button>
  )
}
