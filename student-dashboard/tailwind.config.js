/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind processes your files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Customize your primary color
      },
    },
  },
  plugins: [],
};


