/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",],
  theme: {
    fontFamily:{
      sans: ["Inter","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Helvetica Neue","Arial","Noto Sans","sans-serif",
      "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"],
      serif: ["ui-serif","Georgia"],
    },
    extend: {},
  },
  plugins: [],
}
