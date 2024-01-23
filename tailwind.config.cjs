/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
      },
      colors: {
        'custom-purple': '#7c3aed', // reemplaza esto con tu código de color hexadecimal preferido
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
