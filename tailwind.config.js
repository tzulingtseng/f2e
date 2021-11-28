module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      // => @media (min-width: 480px) { ... }

      md: '547px',
      // => @media (min-width: 547px) { ... }

      lg: '768px',
      // => @media (min-width: 768px) { ... }

      xl: '1024px',
      // => @media (min-width: 1024px) { ... }

      '2xl': '1680px',
      // => @media (min-width: 480px) { ... }
    },
    padding: {
      0: '0px',
      1.5: '6px',
      72: '4rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '3rem',
    },
    backgroundColor: (theme) => ({
      primary: '#2F798C',
      secondary: '#F5FDFF',
      white: '#ffffff',
      // 'secondary': '#ffed4a',
      // 'danger': '#e3342f',
    }),
    borderColor: (theme) => ({
      //  DEFAULT: theme('colors.gray.300', 'currentColor'),
      primary: '#2F798C',
    }),
    textColor: {
      primary: '#2F798C',
      secondary: '#646464',
      white: '#ffffff',
      danger: '#CB4539',
    },
    color: {
      primary: '#2F798C',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
