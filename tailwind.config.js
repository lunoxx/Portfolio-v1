/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.{html,js,ejs}",
    "./views/layouts/*.{html,js,ejs}",
    "./views/partials/*.{html,js,ejs}"
  ],
  
  safelist: [
    'bg-yellow-400', 'text-yellow-900',
    'bg-green-700', 'text-green-200',
    'bg-green-600', 'text-green-100',
    'bg-sky-500', 'text-sky-50',
    'bg-blue-600', 'text-blue-100',
    'bg-orange-500', 'text-orange-100',
    'bg-teal-700', 'text-teal-100',
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
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ],
}
