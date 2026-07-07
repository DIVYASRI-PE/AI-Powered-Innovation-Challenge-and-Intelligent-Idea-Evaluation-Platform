/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ── Brand palette ──────────────────────────────
        brand: {
          bg:        '#041C32',
          bg2:       '#06283D',
          bg3:       '#0B3B4A',
          primary:   '#00C896',
          secondary: '#14B8A6',
          accent:    '#38BDF8',
          highlight: '#A3E635',
          text:      '#FFFFFF',
          textSoft:  '#D6F4F4',
        },
      },
      backgroundImage: {
        'brand-btn': 'linear-gradient(135deg,#00C896,#38BDF8)',
        'brand-hero': 'linear-gradient(135deg,#041C32 0%,#06283D 50%,#0B3B4A 100%)',
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-in',
        'slide-up':  'slideUp 0.5s ease-out',
        'scale-in':  'scaleIn 0.3s ease-out',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'glow':      'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn:  { '0%':{ opacity:'0' },           '100%':{ opacity:'1' } },
        slideUp: { '0%':{ transform:'translateY(20px)', opacity:'0' }, '100%':{ transform:'translateY(0)', opacity:'1' } },
        scaleIn: { '0%':{ transform:'scale(0.95)', opacity:'0' }, '100%':{ transform:'scale(1)', opacity:'1' } },
        glow:    { '0%':{ boxShadow:'0 0 5px #00C896' }, '100%':{ boxShadow:'0 0 20px #38BDF8, 0 0 40px #00C89640' } },
      },
    },
  },
  plugins: [],
}
