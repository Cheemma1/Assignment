/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      Rubik: ["Rubik", "sans-serif"],
      Inter: ["Inter", " sans-serif"],
    },
    colors: {
      base100: "#E2E6EB",
      base300: "#A3AEBD",
      white: "#ffffff",
      green: "#48A874",
      red: "#FF0000",
    },
    extend: {},
  },
  plugins: [],
};
