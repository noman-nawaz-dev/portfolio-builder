// Shared category color utilities for consistent styling across the app

export interface CategoryColors {
  bg: string;
  bgHover: string;
  border: string;
  borderHover: string;
  text: string;
  textSecondary: string;
  checkBg: string;
  progressBg: string;
  progressBgSelected: string;
  // Hex colors for inline styles
  bgHex: string;
  borderHex: string;
  textHex: string;
  progressHex: string;
}

// Get Tailwind color classes and hex values for a category
export function getCategoryColors(category: string): CategoryColors {
  const lowerCategory = category.toLowerCase();
  
  // Frontend colors (Blue)
  if (lowerCategory.includes('frontend') || lowerCategory.includes('web design')) {
    return {
      bg: 'bg-blue-100',
      bgHover: 'hover:bg-blue-50',
      border: 'border-blue-500',
      borderHover: 'hover:border-blue-500',
      text: 'text-blue-700',
      textSecondary: 'text-blue-600',
      checkBg: 'bg-blue-600',
      progressBg: 'bg-blue-600',
      progressBgSelected: 'bg-blue-700',
      bgHex: '#DBEAFE',
      borderHex: '#3B82F6',
      textHex: '#1D4ED8',
      progressHex: '#2563EB',
    };
  }
  
  // Backend colors (Green)
  if (lowerCategory.includes('backend') || lowerCategory.includes('database')) {
    return {
      bg: 'bg-green-100',
      bgHover: 'hover:bg-green-50',
      border: 'border-green-500',
      borderHover: 'hover:border-green-500',
      text: 'text-green-700',
      textSecondary: 'text-green-600',
      checkBg: 'bg-green-600',
      progressBg: 'bg-green-600',
      progressBgSelected: 'bg-green-700',
      bgHex: '#D1FAE5',
      borderHex: '#10B981',
      textHex: '#047857',
      progressHex: '#059669',
    };
  }
  
  // DevOps colors (Purple)
  if (lowerCategory.includes('devops')) {
    return {
      bg: 'bg-purple-100',
      bgHover: 'hover:bg-purple-50',
      border: 'border-purple-500',
      borderHover: 'hover:border-purple-500',
      text: 'text-purple-700',
      textSecondary: 'text-purple-600',
      checkBg: 'bg-purple-600',
      progressBg: 'bg-purple-600',
      progressBgSelected: 'bg-purple-700',
      bgHex: '#F3E8FF',
      borderHex: '#A855F7',
      textHex: '#6B21A8',
      progressHex: '#A855F7',
    };
  }
  
  // Mobile colors (Pink)
  if (lowerCategory.includes('mobile')) {
    return {
      bg: 'bg-pink-100',
      bgHover: 'hover:bg-pink-50',
      border: 'border-pink-500',
      borderHover: 'hover:border-pink-500',
      text: 'text-pink-700',
      textSecondary: 'text-pink-600',
      checkBg: 'bg-pink-600',
      progressBg: 'bg-pink-600',
      progressBgSelected: 'bg-pink-700',
      bgHex: '#FCE7F3',
      borderHex: '#EC4899',
      textHex: '#BE185D',
      progressHex: '#DB2777',
    };
  }
  
  // Design colors (Rose)
  if (lowerCategory.includes('design') || lowerCategory.includes('visual') || lowerCategory.includes('creative')) {
    return {
      bg: 'bg-rose-100',
      bgHover: 'hover:bg-rose-50',
      border: 'border-rose-500',
      borderHover: 'hover:border-rose-500',
      text: 'text-rose-700',
      textSecondary: 'text-rose-600',
      checkBg: 'bg-rose-600',
      progressBg: 'bg-rose-600',
      progressBgSelected: 'bg-rose-700',
      bgHex: '#FFE4E6',
      borderHex: '#F43F5E',
      textHex: '#BE123C',
      progressHex: '#E11D48',
    };
  }
  
  // UI/UX colors (Cyan)
  if (lowerCategory.includes('ui') || lowerCategory.includes('ux')) {
    return {
      bg: 'bg-cyan-100',
      bgHover: 'hover:bg-cyan-50',
      border: 'border-cyan-500',
      borderHover: 'hover:border-cyan-500',
      text: 'text-cyan-700',
      textSecondary: 'text-cyan-600',
      checkBg: 'bg-cyan-600',
      progressBg: 'bg-cyan-600',
      progressBgSelected: 'bg-cyan-700',
      bgHex: '#CFFAFE',
      borderHex: '#06B6D4',
      textHex: '#0E7490',
      progressHex: '#0891B2',
    };
  }
  
  // Marketing colors (Orange)
  if (lowerCategory.includes('market') || lowerCategory.includes('social') || lowerCategory.includes('digital')) {
    return {
      bg: 'bg-orange-100',
      bgHover: 'hover:bg-orange-50',
      border: 'border-orange-500',
      borderHover: 'hover:border-orange-500',
      text: 'text-orange-700',
      textSecondary: 'text-orange-600',
      checkBg: 'bg-orange-600',
      progressBg: 'bg-orange-600',
      progressBgSelected: 'bg-orange-700',
      bgHex: '#FFEDD5',
      borderHex: '#F97316',
      textHex: '#C2410C',
      progressHex: '#EA580C',
    };
  }
  
  // Analytics colors (Teal)
  if (lowerCategory.includes('analytic') || lowerCategory.includes('data')) {
    return {
      bg: 'bg-teal-100',
      bgHover: 'hover:bg-teal-50',
      border: 'border-teal-500',
      borderHover: 'hover:border-teal-500',
      text: 'text-teal-700',
      textSecondary: 'text-teal-600',
      checkBg: 'bg-teal-600',
      progressBg: 'bg-teal-600',
      progressBgSelected: 'bg-teal-700',
      bgHex: '#CCFBF1',
      borderHex: '#14B8A6',
      textHex: '#0F766E',
      progressHex: '#0D9488',
    };
  }
  
  // Testing colors (Amber)
  if (lowerCategory.includes('test')) {
    return {
      bg: 'bg-amber-100',
      bgHover: 'hover:bg-amber-50',
      border: 'border-amber-500',
      borderHover: 'hover:border-amber-500',
      text: 'text-amber-700',
      textSecondary: 'text-amber-600',
      checkBg: 'bg-amber-600',
      progressBg: 'bg-amber-600',
      progressBgSelected: 'bg-amber-700',
      bgHex: '#FEF3C7',
      borderHex: '#F59E0B',
      textHex: '#B45309',
      progressHex: '#D97706',
    };
  }
  
  // Tools colors (Emerald)
  if (lowerCategory.includes('tool')) {
    return {
      bg: 'bg-emerald-100',
      bgHover: 'hover:bg-emerald-50',
      border: 'border-emerald-500',
      borderHover: 'hover:border-emerald-500',
      text: 'text-emerald-700',
      textSecondary: 'text-emerald-600',
      checkBg: 'bg-emerald-600',
      progressBg: 'bg-emerald-600',
      progressBgSelected: 'bg-emerald-700',
      bgHex: '#D1FAE5',
      borderHex: '#10B981',
      textHex: '#047857',
      progressHex: '#059669',
    };
  }
  
  // Soft Skills colors (Slate - Gray/Blue)
  if (lowerCategory.includes('soft')) {
    return {
      bg: 'bg-slate-100',
      bgHover: 'hover:bg-slate-50',
      border: 'border-slate-500',
      borderHover: 'hover:border-slate-500',
      text: 'text-slate-700',
      textSecondary: 'text-slate-600',
      checkBg: 'bg-slate-600',
      progressBg: 'bg-slate-600',
      progressBgSelected: 'bg-slate-700',
      bgHex: '#F1F5F9',
      borderHex: '#64748B',
      textHex: '#334155',
      progressHex: '#64748B',
    };
  }
  
  // Strategy colors (Fuchsia)
  if (lowerCategory.includes('strateg')) {
    return {
      bg: 'bg-fuchsia-100',
      bgHover: 'hover:bg-fuchsia-50',
      border: 'border-fuchsia-500',
      borderHover: 'hover:border-fuchsia-500',
      text: 'text-fuchsia-700',
      textSecondary: 'text-fuchsia-600',
      checkBg: 'bg-fuchsia-600',
      progressBg: 'bg-fuchsia-600',
      progressBgSelected: 'bg-fuchsia-700',
      bgHex: '#FAE8FF',
      borderHex: '#D946EF',
      textHex: '#A21CAF',
      progressHex: '#C026D3',
    };
  }
  
  // Default colors (Indigo)
  return {
    bg: 'bg-indigo-100',
    bgHover: 'hover:bg-indigo-50',
    border: 'border-indigo-500',
    borderHover: 'hover:border-indigo-500',
    text: 'text-indigo-700',
    textSecondary: 'text-indigo-600',
    checkBg: 'bg-indigo-600',
    progressBg: 'bg-indigo-600',
    progressBgSelected: 'bg-indigo-700',
    bgHex: '#E0E7FF',
    borderHex: '#6366F1',
    textHex: '#4338CA',
    progressHex: '#4F46E5',
  };
}
