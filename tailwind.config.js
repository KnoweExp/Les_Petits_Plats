/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js"
  ],
  theme: {
    extend: {
      textShadow: {
        'black': '0 20px 20px #000',
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
      },
      colors: {
        'container': '#EDEDED',
        'white-cards': '#FFF',
        'gray-950': '#7A7A7A',
        'yellow-950': '#FFD15B',
      },
    },
  },
}

