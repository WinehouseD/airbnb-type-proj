import tailwindCssAnimatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        star: 'hsl(var(--star))',
        background: 'hsl(var(--background), <alpha-value>)',
        foreground: 'hsl(var(--foreground), <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary), <alpha-value>)',
          darker: 'hsl(var(--primary-darker), <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground), <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary), <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground), <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted), <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground), <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent), <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground), <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover), <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground), <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card), <alpha-value>)',
          foreground: 'hsl(var(--card-foreground), <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindCssAnimatePlugin],
};
