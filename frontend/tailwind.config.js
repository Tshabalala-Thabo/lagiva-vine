/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        "2xl": "1400px",
      },
    },
    extend: {
      // Your existing custom colors merged with shadcn requirements
      colors: {
        black: '#121212',
        white: '#ffffff',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#b40100',
          foreground: '#a52a2a',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#4b5563',
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        stale: '#f8f8f8',
        // New color palette
        blue: {
          // Primary Blue: Use for primary buttons, active states, headers, key actions
          primary: '#1E3A8A',
          // Light Blue: Use for backgrounds, card backgrounds, hovered states
          light: '#DBEAFE',
          // Dark Blue: Use for headers, sidebars, and navigation backgrounds
          dark: '#1E40AF',
          // Accent Blue: Use for links, icons, or subtle accents for highlighting actions
          accent: '#3B82F6',
          // Muted Blue: Use for borders, dividers, disabled buttons
          muted: '#93C5FD',
          // Blue Gray: Use for text, labels, less important details
          gray: '#64748B',
          // Deep Blue Gray: Use for footer, text on light backgrounds, or secondary text
          deepGray: '#334155',
        },
      },
      // Your existing custom settings
      backgroundColor: {
        'default': '#ffffff',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        'frank-ruhl': ['"Frank Ruhl Libre"', 'serif'],
      },
      // Combined animations
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // Combined keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      // shadcn border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    // Your existing plugins
    function({ addBase, theme }) {
      addBase({
        'html': { 
          color: theme('colors.black'),
          backgroundColor: theme('backgroundColor.default'),
        },
      })
    },
    function({ addUtilities }) {
      const newUtilities = {
        '.overflow-y-scroll': {
          'overflow-y': 'scroll',
        },
        '.compensate-for-scrollbar': {
          'margin-right': 'calc(-1 * (100vw - 100%))',
        },
      }
      addUtilities(newUtilities)
    },
    // Required shadcn plugin
    require("tailwindcss-animate"),
  ],
}
