/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c5322c',
        'primary-foreground': '#a52a2a',
        muted: '#f3f4f6',
        'muted-foreground': '#4b5563',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        'frank-ruhl': ['"Frank Ruhl Libre"', 'serif'], // Updated this line
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
  plugins: [],
}