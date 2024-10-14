/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#121212', // Set default black to #121212
        white: '#ffffff', // Explicitly set white
        primary: '#b40100',
        'primary-foreground': '#a52a2a',
        muted: '#f3f4f6',
        'muted-foreground': '#4b5563',
        stale: '#f8f8f8', // Renamed from 'card' to 'stale'
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
