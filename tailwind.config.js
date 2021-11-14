module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      // => @media (min-width: 480px) { ... }

      md: '547px',
      // => @media (min-width: 480px) { ... }

      lg: '768px',
      // => @media (min-width: 480px) { ... }

      xl: '1024px',
      // => @media (min-width: 480px) { ... }

      '2xl': '1680px',
      // => @media (min-width: 480px) { ... }
    },
    padding: {
      1.5: '6px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '48px',
    },
    backgroundColor: (theme) => ({
      primary: '#2F798C',
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
