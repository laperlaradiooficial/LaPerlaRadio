/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'urban-black': '#050505',
        'urban-gold': '#fbbf24',
        'urban-red': '#ef4444',
        'urban-dark': '#18181b',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'equalizer': 'equalizer 1s ease-in-out infinite',
        'flag-flap': 'flap 2.5s ease-in-out infinite',
        'flag-shine': 'shine 2s linear infinite',
      },
      keyframes: {
        equalizer: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
        flap: {
          '0%, 100%': { transform: 'perspective(400px) rotateY(0deg) skewY(0deg)' },
          '25%': { transform: 'perspective(400px) rotateY(15deg) skewY(2deg)' },
          '50%': { transform: 'perspective(400px) rotateY(0deg) skewY(0deg)' },
          '75%': { transform: 'perspective(400px) rotateY(-15deg) skewY(-2deg)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-15deg)' },
          '100%': { transform: 'translateX(150%) skewX(-15deg)' },
        },
      },
    },
  },
  plugins: [],
};
