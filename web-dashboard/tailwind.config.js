/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        irrigation: {
          blue: '#0284c7',
          'blue-dark': '#0369a1',
          'blue-deep': '#1e40af',
          green: '#16a34a',
          'green-dark': '#15803d',
          emerald: '#059669',
          light: '#f0fdf4',
        }
      },
      animation: {
        'fadeIn':       'fadeIn 0.35s ease-out forwards',
        'spin-slow':    'spin-slow 8s linear infinite',
        'countUp':      'countUp 0.5s ease-out 0.1s both',
        'slideInLeft':  'slideInLeft 0.3s ease-out forwards',
        'map-ping':     'map-ping 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        countUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'map-ping': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%':      { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'agri': '0 4px 24px -4px rgba(13, 92, 58, 0.12)',
      }
    },
  },
  plugins: [],
}
