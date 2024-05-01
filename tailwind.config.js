module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', // adjust the path according to your source files
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
