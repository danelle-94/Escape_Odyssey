/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#E8E5DF',
          900: '#F3F0EA',
          950: '#FAF9F5',
          card: '#FFFFFF',
          glass: 'rgba(255, 255, 255, 0.85)',
        },
        gold: {
          100: '#FAF5FF',
          200: '#DDD6FE',
          300: '#7C3AED',
          400: '#6D28D9',
          500: '#5B21B6',
          600: '#4C1D95',
          700: '#3B0764',
          gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F59E0B 100%)',
        },
        brand: {
          accent: '#7C3AED',
          deep: '#1E293B',
          royal: '#FFFFFF',
          light: '#FAF9F5',
        },
        pastel: {
          violet: '#8B5CF6',
          lavender: '#F5F3FF',
          rose: '#FFF1F2',
          pink: '#F472B6',
          mint: '#ECFDF5',
          teal: '#14B8A6',
          sky: '#F0F9FF',
          blue: '#38BDF8',
          cream: '#FAF9F5',
          amber: '#FEF3C7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'gold-glow': '0 8px 25px rgba(124, 58, 237, 0.2)',
        'gold-glow-lg': '0 12px 35px rgba(236, 72, 153, 0.22)',
        'navy-card': '0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'flight-path': 'flightPath 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.25))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.4))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flightPath: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}

