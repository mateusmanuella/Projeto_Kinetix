/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#277dd3",
        mint: "#df1ec5",
        coral: "#f26a4f",
        sky: "#2e2827"
      }
    }
  },
  plugins: []
};
