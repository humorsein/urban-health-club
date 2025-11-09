/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode via class strategy (used by next-themes)
  darkMode: "class",

  // Define where Tailwind should look for class names
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          light: "#60a5fa", // Tailwind blue-400
          DEFAULT: "#3b82f6", // Tailwind blue-500
          dark: "#2563eb", // Tailwind blue-600
        },
        background: {
          light: "#f9fafb", // Tailwind gray-50
          dark: "#111827", // Tailwind gray-900
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0,0,0,0.05)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"), // Better forms styling
    require("@tailwindcss/typography"), // Prose for content-rich pages
  ],
};