/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'primary-turkiz': '#00ADB5',
        'primary-gray': '#828282',

        
      },
      backgroundImage: {
        'hero-pattern': "url('/startoz/public/assets/heroback.svg)",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [
  ],
}