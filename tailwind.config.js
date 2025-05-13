/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#00C49F',
        'custom-red': '#FF5E5E',
      },
    },
  },
  plugins: [], 
}