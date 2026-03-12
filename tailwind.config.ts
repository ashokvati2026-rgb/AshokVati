import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-950': '#1A241F',
        'forest-900': '#233029',
        'forest-800': '#2E4036',
        'forest-700': '#3D5446',
        'forest-600': '#4C6958',
        'forest-500': '#5D806B',
        'gold-300': '#E6D3A8',
        'gold-400': '#D4AF37',
        'gold-500': '#C5A059',
        'gold-600': '#AA843D',
        cream: '#F9F6F0',
        'cream-dark': '#E8EADD',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        ray: 'ray 8s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-16px) rotate(4deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        ray: {
          '0%': { opacity: '0.15', transform: 'scaleX(0.85)' },
          '100%': { opacity: '0.5', transform: 'scaleX(1.15)' },
        },
        glowPulse: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(200,200,200,0.28))',
          },
          '50%': { filter: 'drop-shadow(0 0 22px rgba(255,255,255,0.55))' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
