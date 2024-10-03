// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './shared-components/**/*.{js,jsx,ts,tsx}',
    './**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f0f0',
        'muted-foreground': '#6b7280',
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#60a5fa',
          foreground: '#ffffff',
        },
        ring: '#93c5fd',
        input: '#d1d5db',
      },
    },
  },
  plugins: [],
};
