/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
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
      colors: {
        black: '#181818',
        white: '#fffefe',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#b40100',
          foreground: '#a52a2a',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        danger: {
          DEFAULT: "#FF4D4D ",
          foreground: "hsl(var(--secondary-foreground))",
        },secondary: {
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
        'page-bg': '#f0f4ff',  // Light blue background similar to the image
        // Shades of blue for UI elements
        'primary-blue': '#4c6ef5',  // Primary blue shade (buttons, icons, etc.)
        'secondary-blue': '#a5b4fc', // Lighter blue for cards and stats boxes
        'accent-blue': '#3b82f6', // Accent color, slightly darker blue
        'navy-blue': '#1e3a8a', // Dark blue for active/selected menu items
        'deep-blue': '#1e3a8a',
      },
      backgroundColor: {
        'default': '#ffffff',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        'frank-ruhl': ['"Frank Ruhl Libre"', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'html': {
          color: theme('colors.black'),
          backgroundColor: theme('backgroundColor.default'),
        },
      });
    },
    function ({ addUtilities }) {
      const newUtilities = {
        '.overflow-y-scroll': {
          'overflow-y': 'scroll',
        },
        '.compensate-for-scrollbar': {
          'margin-right': 'calc(-1 * (100vw - 100%))',
        },
      };
      addUtilities(newUtilities);
    },
    require("tailwindcss-animate"),
  ],
};
