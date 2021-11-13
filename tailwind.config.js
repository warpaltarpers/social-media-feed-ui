module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        'tiny': '.675rem',
      },
      colors: {
        periwinkle: {
          DEFAULT: '#D9E1EB',
          dark: '#989ea5'
        },
      },
    }
  },
  variants: {
    extend: {
      textDecoration: ['focus-visible'],
    },
  },
  plugins: [],
}
