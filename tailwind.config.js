/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#004F70",
        "light-white": "rgba(255,255,255,0.17)",
        "dark-black": "#111827",
      },
      keyframes: {
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'wiggleFull': {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        popupSlide : {
          '0%': {opacity: 0,  transform: 'translateX(-20px)' },
          '100%': {opacity: 1,  transform: 'translateX(0)' },
        }
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'wiggleFull': 'wiggleFull 1s ease-in-out infinite',
        'popupSlide': 'popupSlide 1s ease-in-out',
      }
    },
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("@tailwindcss/forms"),
    require("postcss-preset-env")({ stage: 0 }),
  ],
};
