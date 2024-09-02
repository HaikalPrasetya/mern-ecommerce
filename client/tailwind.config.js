import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    dark: [
      "dark",
      {
        light: {
          ...daisyUIThemes["light"],
          primary: "rgb(242, 242, 242)",
        },
      },
    ],
  },
};
