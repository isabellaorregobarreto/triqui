module.exports = {
  purge: [],
  theme: {
    extend: {
    	fontFamily: {
			'sans': ['Indie Flower', 'Helvetica', 'Arial', 'sans-serif'],
			'serif':['Modak','Bangers','serif']
    	},
    	fontSize: {
			'7xl': '6rem',
		}
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
