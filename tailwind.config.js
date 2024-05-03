import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#EBFDFF",
            primary: {
              DEFAULT: "#11334A"
            },
            secondary: {
              DEFAULT: "#02A0DA"
            },
            danger: {
              DEFAULT: "#D70000"
            },
            foreground: {
              DEFAULT: "#FFF"
            },
          }
        }
      }
    })
  ],
}

