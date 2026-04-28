import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        navy: '#061B35',
        primaryBlue: '#0F6BFF',
        lightBlue: '#EAF2FF',
        appBg: '#F7FAFC',
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
        appBorder: '#E2E8F0',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      boxShadow: {
        card: '0 1px 2px rgba(2, 6, 23, 0.06), 0 10px 24px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 30px rgba(15, 23, 42, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
