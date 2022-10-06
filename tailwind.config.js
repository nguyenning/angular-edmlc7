/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  content: ['./src/**/*.{html,ts}'],

  // debugging purposes only
  safelist: process.env.NODE_ENV === 'development' ? [{ pattern: /.*/ }] : [],

  theme: {
    extend: {},
  },
  plugins: [],
};
