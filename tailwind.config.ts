import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic design tokens matching requested palette
        brand: {
          dark: '#16032F',            // Very dark navy / purple-black
          black: '#120024',           // Deepest purple-black
          charcoal: '#302E40',        // Dark charcoal-purple UI elements
          primary: '#7C00FF',         // Strong electric purple brand accent
          hover: '#6500DB',           // Electric purple hover
          light: '#8500FF',           // Lighter purple accent
          soft: '#F3EDFF',            // Soft lavender badge/tag background
          lavender: '#F8F4FF',        // Subtle lavender background
          subtle: '#FCFAFF',          // Extremely faint off-white background
          secondary: '#505A75',       // Neutral/slate secondary text
          text: '#66708A',            // Mid slate text
          muted: '#8590AA',           // Neutral muted text
          border: '#E8E3EF',          // Soft lavender-grey borders
          'border-subtle': '#DDD6E8', // Slightly deeper lavender border
          'header-bg': '#302E40',     // Dark charcoal-purple header background
          'header-text': '#C9C3D5',   // Muted lavender header link text
          'header-text-active': '#C4A1FF', // Light lavender active header link text
          'header-border': 'rgba(255, 255, 255, 0.08)', // Subtle header bottom border
        },
        // Tuned slate scale to blend seamlessly with the navy/lavender palette
        slate: {
          50: '#F8F4FF',
          100: '#E8E3EF',
          200: '#DDD6E8',
          300: '#C3BCD0',
          400: '#8590AA',
          500: '#66708A',
          600: '#505A75',
          700: '#424055',
          800: '#302E40',
          900: '#16032F',
          950: '#120024',
        },
        // Tuned indigo & violet scales to reflect the electric purple brand
        indigo: {
          50: '#FCFAFF',
          100: '#F3EDFF',
          200: '#E0CBFF',
          300: '#C394FF',
          400: '#A459FF',
          500: '#8500FF',
          600: '#7C00FF',
          700: '#6500DB',
          800: '#4E00A8',
          900: '#302E40',
          950: '#16032F',
        },
        violet: {
          50: '#FCFAFF',
          100: '#F3EDFF',
          200: '#E0CBFF',
          300: '#C394FF',
          400: '#A459FF',
          500: '#8500FF',
          600: '#7C00FF',
          700: '#6500DB',
          800: '#4E00A8',
          900: '#302E40',
          950: '#16032F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#505A75',
            '--tw-prose-headings': '#16032F',
            '--tw-prose-lead': '#505A75',
            '--tw-prose-links': '#7C00FF',
            '--tw-prose-bold': '#16032F',
            '--tw-prose-counters': '#8590AA',
            '--tw-prose-bullets': '#7C00FF',
            '--tw-prose-hr': '#E8E3EF',
            '--tw-prose-quotes': '#16032F',
            '--tw-prose-quote-borders': '#7C00FF',
            '--tw-prose-captions': '#8590AA',
            '--tw-prose-code': '#7C00FF',
            '--tw-prose-pre-code': '#F8F4FF',
            '--tw-prose-pre-bg': '#302E40',
            '--tw-prose-th-borders': '#E8E3EF',
            '--tw-prose-td-borders': '#E8E3EF',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
