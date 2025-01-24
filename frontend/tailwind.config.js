/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: {
          light: "#F8F1E7",
          DEFAULT: "#F8F1E7",
          dark: "#383838",
        },
        fontColor: {
          prim: "#A288FF", //purple
          DEFAULT: "#A288FF",
          sec: "#626262", //grey
          tert: "#383838", //darkgrey
          quad: "#F8F1E7", //beige, from bgcolor
        },
        accent: "#22C55E",
        muted: "#6B7280",
      },

      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
