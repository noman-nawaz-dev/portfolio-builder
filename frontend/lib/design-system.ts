/**
 * ========================================
 * PREMIUM DESIGN SYSTEM
 * ========================================
 * Centralized design tokens for consistent styling
 * Color Scheme: Deep Teal & Champagne Gold
 * Premium, sophisticated, and unique
 */

// ===== COLORS =====
export const colors = {
  // Primary: Deep Teal to Emerald (Sophisticated & Trustworthy)
  primary: {
    50: 'bg-teal-50',
    100: 'bg-teal-100',
    200: 'bg-teal-200',
    500: 'bg-teal-500',
    600: 'bg-teal-600',
    700: 'bg-teal-700',
    800: 'bg-teal-800',
    gradient: 'from-teal-700 to-emerald-600',
    gradientHover: 'from-teal-800 to-emerald-700',
    text: 'text-teal-700',
    textLight: 'text-teal-600',
    textDark: 'text-teal-800',
    border: 'border-teal-600',
    ring: 'ring-teal-500',
  },
  
  // Secondary: Champagne Gold to Amber (Premium & Elegant)
  secondary: {
    50: 'bg-amber-50',
    100: 'bg-amber-100',
    200: 'bg-amber-200',
    500: 'bg-amber-500',
    600: 'bg-amber-600',
    700: 'bg-amber-700',
    gradient: 'from-amber-500 to-yellow-400',
    gradientHover: 'from-amber-600 to-yellow-500',
    text: 'text-amber-600',
    textDark: 'text-amber-700',
    border: 'border-amber-500',
    ring: 'ring-amber-500',
  },
  
  // Accent: Rose Gold (Modern & Luxurious)
  accent: {
    50: 'bg-rose-50',
    100: 'bg-rose-100',
    500: 'bg-rose-500',
    600: 'bg-rose-600',
    gradient: 'from-rose-500 to-pink-500',
    text: 'text-rose-600',
    border: 'border-rose-500',
  },
  
  // Neutral: Warm Slate Grays
  neutral: {
    50: 'bg-neutral-50',
    100: 'bg-neutral-100',
    200: 'bg-neutral-200',
    300: 'bg-neutral-300',
    400: 'bg-neutral-400',
    500: 'bg-neutral-500',
    600: 'text-neutral-600',
    700: 'text-neutral-700',
    800: 'text-neutral-800',
    900: 'text-neutral-900',
    border: 'border-neutral-300',
  },
  
  // Status colors (Refined)
  success: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    solid: 'bg-emerald-500',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    solid: 'bg-red-600',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    solid: 'bg-amber-500',
  },
  info: {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    solid: 'bg-sky-500',
  },
};

// ===== SPACING =====
export const spacing = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-10',
  '3xl': 'p-12',
  '4xl': 'p-16',
};

export const gap = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

// ===== BORDER RADIUS =====
export const borderRadius = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  full: 'rounded-full',
};

// ===== SHADOWS =====
export const shadows = {
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  primary: 'shadow-primary',
  secondary: 'shadow-secondary',
  accent: 'shadow-accent',
};

// ===== TRANSITIONS =====
export const transitions = {
  fast: 'transition-all duration-150',
  base: 'transition-all duration-250',
  slow: 'transition-all duration-350',
  smooth: 'transition-all duration-400',
};

// ===== TYPOGRAPHY =====
export const typography = {
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900',
    h4: 'text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900',
    h5: 'text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900',
    h6: 'text-base md:text-lg lg:text-xl font-semibold text-neutral-900',
  },
  body: {
    xl: 'text-xl text-neutral-700',
    lg: 'text-lg text-neutral-700',
    base: 'text-base text-neutral-700',
    sm: 'text-sm text-neutral-600',
    xs: 'text-xs text-neutral-600',
  },
};

// ===== GRADIENTS =====
export const gradients = {
  primary: 'bg-gradient-to-r from-teal-700 to-emerald-600',
  primaryLight: 'bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50',
  secondary: 'bg-gradient-to-r from-amber-500 to-yellow-400',
  accent: 'bg-gradient-to-r from-rose-500 to-pink-500',
  premium: 'bg-gradient-to-br from-teal-600 via-emerald-600 to-amber-500',
  success: 'bg-gradient-to-r from-emerald-500 to-teal-500',
  dark: 'bg-gradient-to-br from-neutral-800 to-neutral-900',
};

export const textGradients = {
  primary: 'bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent',
  secondary: 'bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent',
  premium: 'bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500 bg-clip-text text-transparent',
};

// ===== COMMONLY USED CLASS COMBINATIONS =====
export const commonStyles = {
  // Page Layouts
  pageContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
  sectionContainer: 'py-12 sm:py-16 lg:py-20',
  
  // Cards
  cardBase: 'bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100',
  cardHover: 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
  cardGlass: 'bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl',
  
  // Inputs
  inputBase: 'w-full px-4 py-3 border border-neutral-300 rounded-xl transition-all duration-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-neutral-400',
  inputError: 'border-red-300 focus:ring-red-500 focus:border-red-500',
  
  // Buttons
  buttonBase: 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2',
  buttonPrimary: 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-teal-500 shadow-primary',
  buttonSecondary: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-amber-500 shadow-secondary',
  buttonOutline: 'bg-white text-teal-700 border-2 border-teal-700 hover:bg-teal-50 hover:shadow-md focus:ring-teal-500',
  buttonGhost: 'bg-transparent text-teal-700 hover:bg-teal-50 focus:ring-teal-500',
  
  // Badges
  badgePrimary: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800',
  badgeSecondary: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800',
  badgeAccent: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800',
  
  // Alerts
  alertSuccess: 'px-4 py-3 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800',
  alertError: 'px-4 py-3 rounded-xl border bg-red-50 border-red-200 text-red-800',
  alertWarning: 'px-4 py-3 rounded-xl border bg-amber-50 border-amber-200 text-amber-800',
  alertInfo: 'px-4 py-3 rounded-xl border bg-sky-50 border-sky-200 text-sky-800',
  
  // Dividers
  divider: 'border-t border-neutral-200',
  dividerGradient: 'h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent',
};
