/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        sesameGreen: '#5EBEA3',
        sesameGreen2: '#D8F2EC',
        sesameGray2: '#E7E7E7',
        sesameGray3: '#C0C0C0',
        sesameGray4: '#808080',
        sesameGray5: '#B5B5B5',
        sesameOrange: '#FF9984',
      },
    },
  },
  plugins: [],
}
