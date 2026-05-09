/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#6C63FF',
        orange: '#FF8A34',
        black: '#1A1A2E',
        yellow: '#FFD93D',
        pink: '#FF6FB5',
        background: '#F7F7FB'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
