/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './*.php',
    './admin/**/*.php',
    './js/**/*.js',
    './lang/**/*.json',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
};
