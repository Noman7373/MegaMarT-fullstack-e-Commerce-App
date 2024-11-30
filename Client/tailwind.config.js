/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "350px", // Custom breakpoint for extra small devices
        sm: "640px", // Small devices (default)
        md: "768px", // Medium devices (default)
        lg: "1024px", // Large devices (default)
        xl: "1280px", // Extra large devices (default)
        "2xl": "1536px", // 2X large devices (default)
        "custom-lg": "1440px", // Custom large breakpoint
      },
      colors: {
        "primary-200": "#ffbg00",
        "primary-100 ": "#ffc929",
        "secondary-200": "00b050",
        "secondary-100": "#0b1a78",
      },
    },
  },
  plugins: [],
};
