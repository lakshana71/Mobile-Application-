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
        brand: {
          primary: '#5B5CEB',
          secondary: '#4DA8FF',
          accent: '#00D2FF',
          bg: '#F7F9FC',
          card: '#FFFFFF',
          darkBg: '#0F172A',
          darkCard: '#1E293B',
          purpleGlow: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(91, 92, 235, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(91, 92, 235, 0.18)',
        'glow-primary': '0 0 25px rgba(91, 92, 235, 0.4)',
        'glow-accent': '0 0 25px rgba(0, 210, 255, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
