/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./main.js",],
  theme: {
    extend: {
      fontFamily: {
        'anton': ['Anton','sans-serif'],
      }
    },
    /* colors: {
      'container': '#EDEDED',
      'white-cards': '#fff',
      gray: {
        '950' : '#7A7A7A',
        
      },
      yellow: {
        '950': '#FFD15B',
      },
    } */
  },
  plugins: [],
}

