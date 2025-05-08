/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      animation: {
        wave: 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '50%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        }
      }
    },
  plugins: [],
}
}
