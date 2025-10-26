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
        shape: {
          red: '#FF4757',
          blue: '#3742FA',
          green: '#2ED573',
          yellow: '#FFA502',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Arial Black', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
        'glow-sm': '0 0 10px rgba(55, 66, 250, 0.5)',
        'glow-md': '0 0 20px rgba(55, 66, 250, 0.5)',
        'glow-lg': '0 0 30px rgba(55, 66, 250, 0.5)',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  plugins: [],
};

export default config;