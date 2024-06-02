import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,js}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily["sans"]],
      },
    },
  },
  plugins: [],
};
