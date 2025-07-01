/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.7',
            'h1, h2, h3, h4': {
              fontWeight: '700',
              lineHeight: '1.3',
            },
            'h1': {
              fontSize: '2.25rem',
              marginBottom: '1rem',
            },
            'h2': {
              fontSize: '1.875rem',
              marginBottom: '0.75rem',
            },
            'h3': {
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
            },
            'p': {
              marginBottom: '1rem',
            },
            'ul, ol': {
              marginBottom: '1rem',
            },
            'li': {
              marginBottom: '0.25rem',
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}