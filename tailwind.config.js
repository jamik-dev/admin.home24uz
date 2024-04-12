/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        xl: { max: "1200px" },
        lg: { max: "992px" },
        md: { max: "728px" },
        sm: { max: "576px" },
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dark: {
          DEFAULT: "#132337",
          "2": "#0F1824",
          "3": "#1C2E45"
        },
        light: {
          DEFAULT: "#C8D7E9",
          "2": "#92AFD3"
        },
        white: "#fff",
        black: {
          DEFAULT: "#020105",
          "2": "#27282A",
          "3": "#353437"
        },
        blue: {
          DEFAULT: "#3B82F6",
          "2": "#2563EB"
        },
        grey: {
          DEFAULT: "#64748b80"
        }
        
      },
      fontFamily: {
        public: ['Public sans', 'sans-serif'],
      }
    },
    
  },
  plugins: [],
}

