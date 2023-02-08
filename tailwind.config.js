/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.{html,js,ejs}",
    "./views/layouts/*.{html,js,ejs}",
  ],
  
  safelist: [
    'bg-yellow-400', 'text-yellow-900',
    'bg-green-700', 'text-green-200',
    'bg-green-500', 'text-green-900',
    'bg-sky-400', 'text-sky-900'
  ],

  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' }
        },
      },
      animation: {
        'waving-hand': 'wave 1.5s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide')
  ],
}
