/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070B14',
        panel: '#0E1626',
        accent: '#2F6BFF',
        success: '#16C98D',
        borderline: 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, #2F6BFF, #8B5CF6)', // blue to violet
      }
    },
  },
  plugins: [],
}
