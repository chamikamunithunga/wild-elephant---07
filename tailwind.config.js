/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jungle: {
          950: '#060A08',
          900: '#0B130E',
          850: '#0F1713',
          800: '#14201A',
          700: '#1E2C24',
          600: '#2A3C32',
        },
        emerald: {
          glow: '#10B981',
          neon: '#34D399',
          dark: '#064E3B',
        },
        amber: {
          alert: '#F59E0B',
        },
        crimson: {
          danger: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
