/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
       backgroundImage:{
        galaxy: "url('/backgroundGalaxy.png')",
        'nlw-gradient': "linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)",
        'game-gradient': " linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);"
      },
      colors: {
        gray900: '#121214'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
  
      },
    fontSize: {
      'text-3.5xl': '2rem'
    }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
