import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#061B35',
        primaryBlue: '#0F6BFF',
        lightBlue: '#EAF2FF',
        appBg: '#F7FAFC',
      },
    },
  },
  plugins: [],
} satisfies Config;
