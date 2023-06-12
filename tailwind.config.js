/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontFamily: {
      poppins: 'Poppins, sans-serif',
    },
    extend: {
      colors: {
        primary: '#2b3a8f',
        secondary: '#f89223',
        other: '#98DFD6',
        grey: '#ABB3C4',
        dark: '#121F3E',
        page: '#F8F8FA',
        success: '#2ED16C',
      },
    },
  },
  plugins: [],
}
