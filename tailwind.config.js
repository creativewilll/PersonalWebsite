/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
