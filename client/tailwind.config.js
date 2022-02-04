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
  plugins: [require('@themesberg/flowbite/plugin')],
};
