/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c7b198',   // Màu chủ đạo
        secondary: '#ffed4a', // Màu phụ
        accent: '#e3342f',    // Màu nhấn
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}

