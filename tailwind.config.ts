import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080808',
        vault: '#0e0e0e',
        panel: '#111111',
        line: '#1c1c1c',
        gold: '#FFB800',
        goldDim: 'rgba(255,184,0,0.10)',
        goldline: 'rgba(255,184,0,0.30)',
        goldFocus: 'rgba(255,184,0,0.20)',
        textHi: '#f2f2f0',
        textMid: '#777777',
        textLow: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        control: '8px',
        card: '12px',
        modal: '16px',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease',
      },
    },
  },
} satisfies Config;
