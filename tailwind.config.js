/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: {
            DEFAULT: '#E87A93',
            light: '#F5B8C4',
            dark: '#D65672',
          },
          blue: {
            DEFAULT: '#6B9BD1',
            light: '#A3C4E8',
            dark: '#4A7AB8',
          },
        },
        accent: {
          gold: '#D4A853',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#FFF9FA',
          tertiary: '#F5F8FC',
        },
      },
      fontFamily: {
        display: ['"Zen Maru Gothic"', '"Noto Sans JP"', 'sans-serif'],
        body: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
