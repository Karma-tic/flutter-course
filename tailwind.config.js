/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Karmatix warm neutrals + Flutter brand blues
        neutral: {
          50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8',
          500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110',
        },
        slate: {
          50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8',
          500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110',
        },
        gray: {
          50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8',
          500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110',
        },
        zinc: {
          50: '#faf8f5', 100: '#f4f1ec', 200: '#e4dfd7', 300: '#cdc6bc', 400: '#b9b2a8',
          500: '#8f887f', 600: '#6b655e', 700: '#3a3733', 800: '#2b2926', 900: '#1c1b19', 950: '#121110',
        },
        sky: {
          50: '#e8f7ff', 100: '#cdeeff', 200: '#9fdfff', 300: '#5fcbfd', 400: '#13b9fd',
          500: '#0a9fe0', 600: '#0175c2', 700: '#02569b', 800: '#06467a', 900: '#0a3a63', 950: '#06223d',
        },
        cyan: {
          50: '#e8f7ff', 100: '#cdeeff', 200: '#9fdfff', 300: '#5fcbfd', 400: '#13b9fd',
          500: '#0a9fe0', 600: '#0175c2', 700: '#02569b', 800: '#06467a', 900: '#0a3a63', 950: '#06223d',
        },
        blue: {
          50: '#e8f7ff', 100: '#cdeeff', 200: '#9fdfff', 300: '#5fcbfd', 400: '#13b9fd',
          500: '#0a9fe0', 600: '#0175c2', 700: '#02569b', 800: '#06467a', 900: '#0a3a63', 950: '#06223d',
        },
        indigo: {
          50: '#e8f7ff', 100: '#cdeeff', 200: '#9fdfff', 300: '#5fcbfd', 400: '#13b9fd',
          500: '#0a9fe0', 600: '#0175c2', 700: '#02569b', 800: '#06467a', 900: '#0a3a63', 950: '#06223d',
        },
        ink: '#121110',
        // Accent follows the Flutter brand (Flutter blue #02569B, light blue #13B9FD, Dart blue #0175C2)
        ember: { DEFAULT: '#13b9fd', soft: '#5fcbfd', ink: '#04122b', deep: '#0175c2' },
        star: '#ff6433',
        flutter: { 50: '#e8f7ff', 100: '#cdeeff', 200: '#9fdfff', 300: '#5fcbfd', 400: '#13b9fd', 500: '#0a9fe0', 600: '#0175c2', 700: '#02569b', 800: '#06467a', 900: '#0a3a63', accent: '#13b9fd', cyan: '#5fcbfd' },
        obsidian: '#121110',
        surface: { DEFAULT: '#171614', card: '#171614', elevated: '#1c1b19', light: '#171614', dark: '#121110', subtleLight: '#1c1b19', subtleDark: '#121110' },
        border: { subtle: '#2b2926', strong: '#3a3733' },
        signal: {
          DEFAULT: '#f59e0b',
          hover: '#fbbf24',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        status: {
          live: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.2)',
        },
        karmatix: { 50: '#e8f7ff', 100: '#cdeeff', 200: '#9fdfff', 300: '#5fcbfd', 400: '#13b9fd', 500: '#0a9fe0', 600: '#0175c2', 700: '#02569b', 800: '#06467a', 900: '#0a3a63' },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        panel: '8px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
