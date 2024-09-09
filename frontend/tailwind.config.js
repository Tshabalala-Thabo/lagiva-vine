/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#121212', // Set default black to #121212
        white: '#ffffff', // Explicitly set white
        primary: '#c5322c',
        'primary-foreground': '#a52a2a',
        muted: '#f3f4f6',
        'muted-foreground': '#4b5563',
        stale: '#f2f2f2', // Renamed from 'card' to 'stale'
      },
      backgroundColor: {
        'default': '#ffffff', // Set default background color to white
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        'frank-ruhl': ['"Frank Ruhl Libre"', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'html': { 
          color: theme('colors.black'),
          backgroundColor: theme('backgroundColor.default'),
        },
      })
    }
  ],
}