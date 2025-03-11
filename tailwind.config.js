/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: "#D3104C",
        customRedHover: "#A90D3D",
        background: "#F7EFE3",
        backgroundDarkMode: "#232323",
      },
    },
  },
  plugins: [],
}
