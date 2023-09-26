/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#97BF11',
        secondary: '#49a92780',
      },
    },
  },
  plugins: [],
  purge: {
    enabled: false,
  },
};
