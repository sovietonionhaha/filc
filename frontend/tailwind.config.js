/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    }
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar'),],
  daisyui: {
    themes: ["light"]
  }
}

