import tailwindcss from 'tailwindcss'

export default {
  theme: {
    colors: {
      // Base palette
      'bg-primary': '#0B0B0F',
      'bg-surface': '#16161D',
      'ink': '#F5F3EF',
      'ink-muted': '#A6A4B0',

      // Accent colors
      'accent-1': '#FF3B5C',   // hot coral-red
      'accent-2': '#7C5CFF',   // violet
      'accent-3': '#FFC94A',   // warm yellow
      'accent-4': '#3CD6C4',   // teal

      // Semantic colors
      'white': '#FFFFFF',
      'black': '#000000',
      'transparent': 'transparent',

      // Utilities
      'current': 'currentColor',
    },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Clash Display"', 'sans-serif'],
        body: ['"Inter"', '"General Sans"', 'sans-serif'],
      },
      borderRadius: {
        'lg': '32px',
        'md': '20px',
        'sm': '12px',
      },
      spacing: {
        'section': '6rem',
        'section-sm': '3rem',
      },
      fontSize: {
        // Display
        'h1': 'clamp(3rem, 9vw, 7.5rem)',
        'h2': 'clamp(2rem, 6vw, 4.5rem)',
        'h3': 'clamp(1.5rem, 4vw, 2.5rem)',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'headline': '-0.03em',
      },
      lineHeight: {
        'headline': '0.95',
        'tight': '1.2',
      },
      animation: {
        'cursor-lag': 'none', // GSAP handles cursor motion
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
        '600': '600ms',
        '900': '900ms',
      },
    },
  },
  plugins: [],
}
