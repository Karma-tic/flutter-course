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
        flutter: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
          600: '#02569B', // Official Flutter Deep Blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          accent: '#0175C2',
          cyan: '#54C5F8',
        },
        obsidian: '#090b0e',
        surface: {
          DEFAULT: '#11151c',
          card: '#11151c',
          elevated: '#19202c',
          light: '#FFFFFF',
          dark: '#0F172A',
          subtleLight: '#F8FAFC',
          subtleDark: '#0B0F19',
        },
        border: {
          subtle: '#1e293b',
          strong: '#334155',
        },
        signal: {
          DEFAULT: '#f59e0b',
          hover: '#fbbf24',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        status: {
          live: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.2)',
        },
        karmatix: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      fontFamily: {
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
