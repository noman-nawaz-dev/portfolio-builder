// Design System Constants
// Centralized design tokens for consistent styling across the app

export const colors = {
  // Primary brand colors
  primary: {
    50: 'from-indigo-50 to-purple-50',
    100: 'from-indigo-100 to-purple-100',
    gradient: 'from-indigo-600 to-purple-600',
    gradientHover: 'from-indigo-700 to-purple-700',
    text: 'text-indigo-600',
    textHover: 'text-indigo-700',
    bg: 'bg-indigo-600',
    bgHover: 'bg-indigo-700',
    border: 'border-indigo-600',
  },
  
  // Neutral colors
  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    600: 'text-gray-600',
    700: 'text-gray-700',
    800: 'text-gray-800',
    900: 'text-gray-900',
  },
  
  // Status colors
  success: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    solid: 'bg-green-500',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    solid: 'bg-red-600',
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    solid: 'bg-yellow-500',
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    solid: 'bg-blue-500',
  },
};

export const spacing = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-10',
  '3xl': 'p-12',
};

export const borderRadius = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
};

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
};

export const transitions = {
  base: 'transition-all duration-200',
  slow: 'transition-all duration-300',
  fast: 'transition-all duration-150',
};

export const typography = {
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-semibold',
    h6: 'text-base md:text-lg font-semibold',
  },
  body: {
    lg: 'text-lg',
    base: 'text-base',
    sm: 'text-sm',
    xs: 'text-xs',
  },
};

export const gradients = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  primaryLight: 'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
  secondary: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  warning: 'bg-gradient-to-r from-orange-500 to-red-500',
};

// Commonly used class combinations
export const commonStyles = {
  pageContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
  cardBase: 'bg-white rounded-2xl shadow-xl overflow-hidden',
  inputBase: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition',
  buttonBase: 'px-6 py-3 rounded-xl font-semibold transition-all',
  gradientButton: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all',
  outlineButton: 'bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-indigo-600 hover:shadow-lg transition-all',
};
