/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#fefdfb",
        primaryDark: "#2E2E2E",
        secondary: "#dd2b27",
        accent: "#f6bd76",
      },
      backgroundImage: {
        hero: "url('https://images.unsplash.com/photo-1615657711994-f0e35eb9e46d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        perks:
          "url('https://images.unsplash.com/photo-1571805529673-0f56b922b359?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
      fontFamily: {
        Kanit: ["Kanit", "sans-serif"],
      },
      fontSize: {
        "10xl": ["13rem", { lineHeight: "10rem", fontWeight: "800" }],
      },
    },
    screens: {
      sm: "320px", // Minimum width for mobile devices
      md: "768px", // Minimum width for tablets
      hd: "1280px", // Minimum width for HD screens (720p)
      fhd: "1920px", // Minimum width for Full HD screens (1080p)
      "2k": "2560px", // Minimum width for 2K screens
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"],
      placeholderColor: ["dark"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
});
