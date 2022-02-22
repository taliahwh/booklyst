const tailwindcss = require('tailwindcss');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@themesberg/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      height: {
        120: '28rem',
        128: '32rem',
      },
      borderWidth: {
        1: '1px',
      },
      backgroundColor: ['disabled'],
    },
  },
  extend: {
    lineClamp: ['hover'],
  },
  plugins: [
    require('@themesberg/flowbite/plugin'),
    require('@tailwindcss/line-clamp'),
  ],
};
