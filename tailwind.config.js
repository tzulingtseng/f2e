module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {    
    screens: {
    'sm': '480px',
    // => @media (min-width: 480px) { ... }

    'md': '547px',
    // => @media (min-width: 480px) { ... }

    'lg': '768px',
    // => @media (min-width: 480px) { ... }

    'xl': '1024px',
    // => @media (min-width: 480px) { ... }

    '2xl': '1680px',
    // => @media (min-width: 480px) { ... }
  },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
