/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is crucial
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'linkedin-blue': '#0A66C2',
        'linkedin-hover': '#004182',
      }
    },
  },
  plugins: [],
}