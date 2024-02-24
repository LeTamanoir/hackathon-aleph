/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neue: ['"Neue Machina"'],
        space: ['"Space Grotesk"'],
      },
      colors: {
        dark: "#232120",
        darker: "#131313",
        "dark-light": "#434343",
        "dark-lighter": "#B9B9B9",
      },
    },
  },
  plugins: [],
};
