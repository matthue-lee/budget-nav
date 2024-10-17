import {nextui} from "@nextui-org/react";



module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      colors: {
        primary: "#264653",
        secondary: "#2a9d8f",
        accent: "#e9c46a",
        third: "#f4a261",
        fourth: "#e76f51",
        lightText: "#cccccc",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};


