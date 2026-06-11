/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#070b18',
          800: '#0b1020',
          700: '#111935',
          600: '#1a2347',
        },
        brand: {
          // calming teal/indigo
          50: '#eafaf7',
          200: '#9fe6d8',
          400: '#3fc8b0',
          500: '#23b89c',
          600: '#179b84',
        },
        accent: {
          // warm coral
          300: '#ffb3a0',
          400: '#ff8f73',
          500: '#ff7a5c',
          600: '#f0603f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(35,184,156,0.55)',
        'glow-accent': '0 0 50px -12px rgba(255,122,92,0.55)',
        glass: '0 8px 40px -12px rgba(0,0,0,0.5)',
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
