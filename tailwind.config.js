/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark"],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        white: "0px 1px 10px 0px rgba(255,255,255,1)", // custom properties can also be used.
      },
    },
  },
  plugins: [],
};
