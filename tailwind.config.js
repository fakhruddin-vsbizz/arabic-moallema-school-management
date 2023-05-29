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
    },
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("@tailwindcss/forms"),
    require("postcss-preset-env")({ stage: 0 }),
  ],
};
