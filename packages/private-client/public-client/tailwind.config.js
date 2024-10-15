/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths based on your project structure
    './public/index.html', // Include your HTML files if needed
    '../shared-components/**/*.{js,jsx,ts,tsx}',
    '../public-client/src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};
