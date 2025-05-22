const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".flowbite-react\\class-list.json"],
  theme: {
    extend: {
      colors: {
        darkblue: "#000235",
        btnblue: "#484A7D",
        transparent:"rgba(255, 255, 255, 0.13)",
        blackbest:"bg-[#0e0e10]"
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out',
        fadeInUp: 'fadeInUp 0.8s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [flowbiteReact],
};