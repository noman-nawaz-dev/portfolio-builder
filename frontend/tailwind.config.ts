/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Color Palette
        primary: {
          50: 'rgb(var(--color-primary-50))',
          100: 'rgb(var(--color-primary-100))',
          200: 'rgb(var(--color-primary-200))',
          300: 'rgb(var(--color-primary-300))',
          400: 'rgb(var(--color-primary-400))',
          500: 'rgb(var(--color-primary-500))',
          600: 'rgb(var(--color-primary-600))',
          700: 'rgb(var(--color-primary-700))',
          800: 'rgb(var(--color-primary-800))',
          900: 'rgb(var(--color-primary-900))',
        },
        secondary: {
          50: 'rgb(var(--color-secondary-50))',
          100: 'rgb(var(--color-secondary-100))',
          200: 'rgb(var(--color-secondary-200))',
          300: 'rgb(var(--color-secondary-300))',
          400: 'rgb(var(--color-secondary-400))',
          500: 'rgb(var(--color-secondary-500))',
          600: 'rgb(var(--color-secondary-600))',
          700: 'rgb(var(--color-secondary-700))',
          800: 'rgb(var(--color-secondary-800))',
          900: 'rgb(var(--color-secondary-900))',
        },
        accent: {
          50: 'rgb(var(--color-accent-50))',
          100: 'rgb(var(--color-accent-100))',
          200: 'rgb(var(--color-accent-200))',
          300: 'rgb(var(--color-accent-300))',
          400: 'rgb(var(--color-accent-400))',
          500: 'rgb(var(--color-accent-500))',
          600: 'rgb(var(--color-accent-600))',
          700: 'rgb(var(--color-accent-700))',
          800: 'rgb(var(--color-accent-800))',
          900: 'rgb(var(--color-accent-900))',
        },
        neutral: {
          50: 'rgb(var(--color-neutral-50))',
          100: 'rgb(var(--color-neutral-100))',
          200: 'rgb(var(--color-neutral-200))',
          300: 'rgb(var(--color-neutral-300))',
          400: 'rgb(var(--color-neutral-400))',
          500: 'rgb(var(--color-neutral-500))',
          600: 'rgb(var(--color-neutral-600))',
          700: 'rgb(var(--color-neutral-700))',
          800: 'rgb(var(--color-neutral-800))',
          900: 'rgb(var(--color-neutral-900))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
        'primary': 'var(--shadow-primary)',
        'secondary': 'var(--shadow-secondary)',
        'accent': 'var(--shadow-accent)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, rgb(15 118 110), rgb(5 150 105))',
        'gradient-secondary': 'linear-gradient(to right, rgb(245 158 11), rgb(251 191 36))',
        'gradient-accent': 'linear-gradient(to right, rgb(244 63 94), rgb(251 113 133))',
        'gradient-premium': 'linear-gradient(to bottom right, rgb(13 148 136), rgb(5 150 105), rgb(245 158 11))',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        glow: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'base': 'var(--transition-base)',
        'slow': 'var(--transition-slow)',
        'smooth': 'var(--transition-smooth)',
      },
    },
  },
  plugins: [],
}
