/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep, neutral-violet inks for surfaces.
        ink: {
          950: '#07070C',
          900: '#0B0B12',
          800: '#16161F',
          700: '#20202C',
          600: '#2A2A38',
        },
        // Primary — indigo / violet.
        brand: {
          50: '#F1EFFF',
          200: '#C7BEFF',
          300: '#A99BFF',
          400: '#8E7BFF',
          500: '#7C6CFF',
          600: '#6A55F0',
          700: '#5A45D6',
        },
        // Secondary highlight — refined warm coral (used sparingly).
        accent: {
          200: '#FFD4C4',
          300: '#FFB89C',
          400: '#FF9F7A',
          500: '#FF8A5F',
          600: '#F06F44',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 60px -14px rgba(124,108,255,0.6)',
        'glow-accent': '0 0 48px -14px rgba(255,138,95,0.55)',
        glass: '0 8px 40px -12px rgba(0,0,0,0.55)',
        soft: '0 2px 12px -4px rgba(0,0,0,0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
}
