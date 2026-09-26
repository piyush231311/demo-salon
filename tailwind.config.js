/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0B0A',
          deep: '#070505',
          soft: '#14100F',
        },
        espresso: {
          DEFAULT: '#1A1412',
          light: '#251E1B',
          card: '#1F1816',
          border: '#332924',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#DFCA9E',
          pale: '#F1E5CF',
          muted: '#9B7E4A',
          dark: '#6F562E',
        },
        ivory: {
          DEFAULT: '#F4EDE4',
          pure: '#FAF6F0',
          muted: '#D4C8BC',
          dim: '#B0A395',
        },
        blush: {
          DEFAULT: '#D9B8A8',
          light: '#EBCCC0',
          dark: '#B88F7F',
        },
        taupe: {
          DEFAULT: '#8A7B70',
          light: '#A6978C',
          dark: '#4C423B',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cormorant', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        luxury: '0.35em',
        kicker: '0.2em',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(201, 169, 110, 0.25)',
        'gold-glow-lg': '0 0 45px -5px rgba(201, 169, 110, 0.35)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
