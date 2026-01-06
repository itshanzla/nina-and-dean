/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // White
        foreground: "#171717", // Very Dark Gray (Almost Black)
        "coffee-dark": "#3E2723", // Very Dark Brown
        "coffee-medium": "#4E342E", // Dark Brown
        "coffee-light": "#5D4037", // Medium Brown
        "cream-light": "#EFEBE9", // Very Light Grayish Orange
        "cream-medium": "#D7CCC8", // Light Grayish Red
        "gold-accent": "#D4A574", // Soft Gold/Light Orange
        "page-bg": "#E8DDD4", // Light Beige/Grayish Orange
        "neutral-bg": "#F5F5F5", // White Smoke
        // Semantic mappings for backwards compatibility
        primary: "#5D4037", // Mapped to coffee-light
        secondary: "#3E2723", // Mapped to coffee-dark
        accent: "#D4A574", // Mapped to gold-accent  
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
        belleza: ['Belleza', 'sans-serif'],
        epilogue: ['Epilogue', 'sans-serif'],
        ibm: ['IBM Plex Sans', 'sans-serif'],
        lora: ['Lora', 'serif'],
        noto: ['Noto Serif', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
