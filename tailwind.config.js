/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'blue-lol': '#005b74',
        'yellow-lol': '#e79235',
        'dark-blue-lol': '#022337',
        'light-blue-lol': '#04809c',
        'mono-darkblue-lol': '#055483',
        'mono-yellow-lol': '#41290f',
        'green-lol': '#43ab1b',
      },
      fontFamily: {
        volkorn: ['Vollkorn', 'serif'],
      },
    },
  },
  plugins: [],
};
