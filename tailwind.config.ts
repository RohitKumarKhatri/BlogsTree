import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        logo: ['Edu AU VIC WA NT Hand', 'cursive'],
      },
      colors: {
        light: {
          background: '#FDFEFE',
          text: '#212F3C',
          button: {
            background: '#f0f0f0',
            text: '#000000',
          },
          input: {
            background: '#F4F6F7 ',
            text: '#000000',
          },
        },
        dark: {
          background: '#212F3C',
          text: '#ffffff',
          button: {
            background: '#2d3748',
            text: '#ffffff',
          },
          input: {
            background: '#2d3748',
            text: '#ffffff',
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
