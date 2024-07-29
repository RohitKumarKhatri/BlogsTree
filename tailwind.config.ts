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
      fontSize: {
        h1: ['2.25rem', { lineHeight: '3.25rem' }], // Example size, equivalent to 36px
        h2: ['1.875rem', { lineHeight: '2.75rem' }], // Example size, equivalent to 30px
        p: ['1rem', { lineHeight: '1.75rem' }], // Example size, equivalent to 16px
      },
      colors: {
        heading1: '#1a202c',
        heading2: '#2d3748',
        para: '#4a5568',
        light: {
          background: '#FDFEFE',
          text: '#212F3C',
          button: {
            background: '#F1F1F1',
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
