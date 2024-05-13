/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        background: 'rgb(var(--background) / 1.0)',
        foreground: 'rgb(var(--foreground) / 1.0)',
        foregroundLight: 'rgb(var(--foreground) / 0.5)',
        accents_1: 'rgb(var(--accents_1) / 1.0)',
        accents_2: 'rgb(var(--accents_2) / 1.0)',
        accents_3: 'rgb(var(--accents_3) / 1.0)',
        accents_4: 'rgb(var(--accents_4) / 1.0)',
        accents_5: 'rgb(var(--accents_5) / 1.0)',
        accents_6: 'rgb(var(--accents_6) / 1.0)',
        accents_7: 'rgb(var(--accents_7) / 1.0)',
        accents_8: 'rgb(var(--accents_8) / 1.0)',
        accents_9: 'rgb(var(--accents_9) / 1.0)',
        border: 'rgb(var(--border) / 1.0)',
        error: 'rgb(var(--error) / 1.0)',
        success: 'rgb(var(--success) / 1.0)',
        link: 'rgb(var(--link) / 1.0)',
      },
      borderRadius: {
        primary: '5px',
        secondary: '4px',
        tertiary: '3px',
        full: '9999px',
      },
      padding: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
    },
  },
  plugins: [],
}
