/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mova: {
          canvas: '#FFFFFF',
          maroon: '#8B1E3F',
          'maroon-hover': '#731833',
          'maroon-light': '#F6E9ED',
          rose: '#C9A0A0',
          'rose-light': '#F9F4F4',
          nearblack: '#2B2024',
          muted: '#66555B',
          gold: '#D4AF37',
          'gold-light': '#F5E8BA',
          'gold-subtle': '#FFFDF5',
          ivory: '#F5E6D3',
          'ivory-card': '#FDFBF7',
          'ivory-border': '#EAD8C0',
          border: 'rgba(43, 32, 36, 0.09)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        crayon: ['Kalam', 'Caveat', 'Patrick Hand', 'cursive'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'bento': '28px',
        'card': '20px',
        'drawer': '32px',
        'control': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'bento': '0 4px 20px -2px rgba(43, 32, 36, 0.05), 0 2px 6px -1px rgba(43, 32, 36, 0.02)',
        'bento-hover': '0 12px 32px -4px rgba(43, 32, 36, 0.09), 0 4px 12px -2px rgba(43, 32, 36, 0.04)',
        'drawer': '0 -20px 48px -8px rgba(43, 32, 36, 0.16)',
        'node-active': '0 0 0 4px rgba(212, 175, 55, 0.25)',
        'stamp': '0 4px 14px rgba(139, 30, 63, 0.25)',
      },
      transitionTimingFunction: {
        'emil-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'emil-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'emil-drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
      }
    },
  },
  plugins: [],
}
