/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bonta: {
          lighter: '#E1EEFF', // Plus sombre
          light: '#D4E5FF',   // Plus sombre
          blue: '#4A90E2',
          dark: '#2C3E50',
          accent: '#3498db'
        },
        brakmar: {
          red: '#FF4040',
          dark: '#1A0F0F',
          light: '#FF6B6B',
          accent: '#8B0000'
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}