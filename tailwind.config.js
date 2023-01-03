/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      sm: '480px', //mobile
      md: '768px', //tablets
      lg: '976px', //pc
      xl: '1440px' //large pc
    },
    extend: {
      colors: {
        lightGray: '#f3f5f7',
        darkPurple: '#41224a'
      },
    },

  },
  plugins: [],
}
