import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'fintech-blue': '#38bdf8', // sky-400
        'fintech-indigo': '#6366f1', // indigo-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: (theme: any) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate[400]'),
            '--tw-prose-headings': theme('colors.slate[100]'),
            '--tw-prose-links': theme('colors.indigo[400]'),
            '--tw-prose-bold': theme('colors.slate[200]'),
            '--tw-prose-code': theme('colors.slate[200]'),
            '--tw-prose-pre-code': theme('colors.slate[200]'),
            '--tw-prose-pre-bg': theme('colors.slate[900]'),
            '--tw-prose-quotes': theme('colors.slate[300]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
