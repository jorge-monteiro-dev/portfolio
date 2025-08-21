// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7040C9', // Violet profond
        secondary: '#CACBFF', // Lavande clair
        light: '#FFFFFF',
        dark: '#000000',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Koulen', 'cursive'],
      },
      backgroundImage: {
        'gradient-title': 'linear-gradient(90deg, #7040C9, #CACBFF)',
      },
      textColor: {
        gradient: 'transparent',
      },
    },
  },
  plugins: [],
}

export default config
