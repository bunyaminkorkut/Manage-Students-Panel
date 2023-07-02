/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '3.5xl': '32px',
    },
    extend: {
      colors: {
        primary: '#FEAF00',
        secondary: '#F8D442',
        solitude: '#6C6C6C',
        navy: '#CDCDCD',
        crap: '#F2EAE1',
        ocean: '#74C1ED',
        oceanLignht: '#F0F9FF',
        strowberry: '#FEF6FB',
        pee: '#FEFBEC',
        milk: '#F8F8F8',
        cream: "#E5E5E5",
        melikea: "#ACACAC",
        ash: "#9FA2B4",
      }
    },
  },
  plugins: [],
}
