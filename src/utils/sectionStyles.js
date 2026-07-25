/**
 * Section Background Color Utilities
 * Alternates section backgrounds to create visual distinction
 * Used to apply the "distinct rooms" aesthetic from the spec
 */

export const SECTION_BG_COLORS = {
  primary: 'bg-bg-primary',    // #0B0B0F
  surface: 'bg-bg-surface',    // #16161D
  accent1Tint: 'bg-accent-1/10',   // Red tint
  accent2Tint: 'bg-accent-2/10',   // Violet tint
  accent3Tint: 'bg-accent-3/10',   // Yellow tint
  accent4Tint: 'bg-accent-4/10',   // Teal tint
};

/**
 * Get alternating background color for sections
 * @param {number} index - Section index (0, 1, 2, 3...)
 * @returns {string} - Tailwind class name
 */
export const getSectionBg = (index) => {
  const colors = [
    SECTION_BG_COLORS.primary,
    SECTION_BG_COLORS.surface,
    SECTION_BG_COLORS.accent2Tint,  // Violet
    SECTION_BG_COLORS.accent1Tint,  // Red
    SECTION_BG_COLORS.accent3Tint,  // Yellow
    SECTION_BG_COLORS.accent4Tint,  // Teal
  ];
  return colors[index % colors.length];
};

/**
 * Get accent color for section (for accents, highlights, etc.)
 * @param {number} index - Section index
 * @returns {string} - CSS variable name
 */
export const getSectionAccent = (index) => {
  const accents = ['--accent-1', '--accent-2', '--accent-3', '--accent-4'];
  return accents[index % accents.length];
};

/**
 * Get accent color value for section
 * @param {number} index - Section index
 * @returns {string} - Hex color value
 */
export const getSectionAccentValue = (index) => {
  const values = ['#FF3B5C', '#7C5CFF', '#FFC94A', '#3CD6C4'];
  return values[index % values.length];
};

/**
 * Get section styling props
 * @param {number} index - Section index
 * @returns {object} - { bg, accentColor, accentValue }
 */
export const getSectionStyle = (index) => ({
  bg: getSectionBg(index),
  accentColor: getSectionAccent(index),
  accentValue: getSectionAccentValue(index),
});

export default {
  SECTION_BG_COLORS,
  getSectionBg,
  getSectionAccent,
  getSectionAccentValue,
  getSectionStyle,
};

// Dynamic theme-aware background mapping
export const SECTION_THEMES = {
  hero: {
    bg: 'bg-[var(--bg-surface)]',
    badgeBg: 'bg-[var(--accent-1)]',
    badgeText: 'text-[var(--bg-primary)]',
  },
  featured: {
    bg: 'bg-[var(--accent-1)]/10', // Soft pastel variant of Accent 1
    badgeBg: 'bg-[var(--accent-1)]',
    badgeText: 'text-[var(--bg-primary)]',
  },
  collections: {
    bg: 'bg-[var(--accent-2)]/12', // Soft pastel variant of Accent 2
    badgeBg: 'bg-[var(--accent-2)]',
    badgeText: 'text-[var(--bg-primary)]',
  },
  about: {
    bg: 'bg-[var(--accent-3)]/15', // Soft mint/pastel variant of Accent 3
    badgeBg: 'bg-[var(--accent-3)]',
    badgeText: 'text-[var(--ink)]',
  },
  whyCommission: {
    bg: 'bg-[var(--accent-4)]/12', // Warm butter/pastel variant
    badgeBg: 'bg-[var(--accent-4)]',
    badgeText: 'text-[var(--ink)]',
  },
  roadmap: {
    bg: 'bg-[var(--accent-2)]/10',
    badgeBg: 'bg-[var(--accent-2)]',
    badgeText: 'text-[var(--bg-primary)]',
  },
  pricing: {
    bg: 'bg-[var(--accent-1)]/15',
    badgeBg: 'bg-[var(--accent-1)]',
    badgeText: 'text-[var(--bg-primary)]',
  },
};