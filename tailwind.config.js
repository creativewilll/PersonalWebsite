/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pastel-gradient': `
          linear-gradient(125deg, #fff7e6 0%, #fef3c7 25%, #f5d0fe 75%, #e9d5ff 100%),
          radial-gradient(circle at top right, #f5d0fe 0%, transparent 50%),
          radial-gradient(circle at bottom left, #fef3c7 0%, transparent 50%),
          radial-gradient(circle at center, #e9d5ff 0%, transparent 35%),
          linear-gradient(45deg, #fff7e6 0%, transparent 40%),
          linear-gradient(225deg, #f5d0fe 0%, transparent 40%)
        `,
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '80ch',
            color: 'rgb(55, 65, 81)',
            h1: {
              color: 'rgb(88, 28, 135)',
            },
            h2: {
              color: 'rgb(107, 33, 168)',
            },
            h3: {
              color: 'rgb(126, 34, 206)',
            },
            a: {
              color: 'rgb(147, 51, 234)',
              '&:hover': {
                color: 'rgb(126, 34, 206)',
              },
            },
            code: {
              color: 'rgb(31, 41, 55)',
              backgroundColor: 'rgb(243, 244, 246)',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        'purple': {
          css: {
            '--tw-prose-headings': 'rgb(88, 28, 135)',
            '--tw-prose-links': 'rgb(147, 51, 234)',
            '--tw-prose-bold': 'rgb(76, 29, 149)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
