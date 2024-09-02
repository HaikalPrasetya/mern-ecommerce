/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
