/**
 * Common type definitions for the Portfolio Builder backend
 * These types replace 'any' for JSON fields and improve type safety
 */

import { Prisma } from '@prisma/client';

// ============================================
// AUTH TYPES
// ============================================

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  userId: string;
}

// ============================================
// SECTION CONTENT TYPES
// ============================================

export interface BaseContent {
  [key: string]: unknown;
}

export interface HeroContent extends BaseContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  cta?: {
    text: string;
    link: string;
  };
}

export interface AboutContent extends BaseContent {
  title?: string;
  bio?: string;
  image?: string;
  skills?: string[];
}

export interface ProjectContent extends BaseContent {
  title?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceContent extends BaseContent {
  company?: string;
  position?: string;
  duration?: string;
  description?: string;
  location?: string;
}

export interface EducationContent extends BaseContent {
  institution?: string;
  degree?: string;
  field?: string;
  duration?: string;
  description?: string;
}

export interface ContactContent extends BaseContent {
  email?: string;
  phone?: string;
  location?: string;
  social?: {
    platform: string;
    url: string;
  }[];
}

export interface SkillsContent extends BaseContent {
  title?: string;
  categories?: {
    name: string;
    skills: {
      name: string;
      level?: number;
    }[];
  }[];
}

// Union type for all possible section content
export type SectionContent = 
  | HeroContent 
  | AboutContent 
  | ProjectContent 
  | ExperienceContent 
  | EducationContent 
  | ContactContent 
  | SkillsContent 
  | BaseContent;

// ============================================
// STYLE & ANIMATION TYPES
// ============================================

export interface SectionStyles {
  backgroundColor?: string;
  textColor?: string;
  padding?: string | number;
  margin?: string | number;
  borderRadius?: string | number;
  boxShadow?: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  [key: string]: unknown;
}

export interface AnimationConfig {
  type?: 'fade' | 'slide' | 'zoom' | 'bounce' | 'none';
  duration?: number;
  delay?: number;
  easing?: string;
  [key: string]: unknown;
}

// ============================================
// THEME TYPES
// ============================================

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent?: string;
  background: string;
  foreground: string;
  muted?: string;
  border?: string;
  [key: string]: string | undefined;
}

export interface ThemeFonts {
  body: string;
  heading: string;
  mono?: string;
  [key: string]: string | undefined;
}

export interface ThemeFontSizes {
  xs?: string;
  sm?: string;
  base?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  '3xl'?: string;
  '4xl'?: string;
  '5xl'?: string;
  [key: string]: string | undefined;
}

export interface ThemeFontWeights {
  light?: number;
  normal?: number;
  medium?: number;
  semibold?: number;
  bold?: number;
  [key: string]: number | undefined;
}

export interface ThemeLineHeights {
  tight?: number;
  normal?: number;
  relaxed?: number;
  loose?: number;
  [key: string]: number | undefined;
}

export interface ThemeSpacing {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  [key: string]: string | undefined;
}

export interface ThemeBorderRadius {
  none?: string;
  sm?: string;
  md?: string;
  lg?: string;
  full?: string;
  [key: string]: string | undefined;
}

export interface ThemeBorderWidth {
  none?: string;
  thin?: string;
  base?: string;
  thick?: string;
  [key: string]: string | undefined;
}

export interface ThemeShadows {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  none?: string;
  [key: string]: string | undefined;
}

export interface ThemeAnimations {
  duration?: {
    fast?: string;
    base?: string;
    slow?: string;
    [key: string]: string | undefined;
  };
  easing?: {
    linear?: string;
    ease?: string;
    easeIn?: string;
    easeOut?: string;
    easeInOut?: string;
    [key: string]: string | undefined;
  };
  [key: string]: unknown;
}

export interface ThemeBreakpoints {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  [key: string]: string | undefined;
}

// ============================================
// PORTFOLIO TYPES
// ============================================

export interface PortfolioSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  [key: string]: unknown;
}

export interface PortfolioGlobalSettings {
  analytics?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    [key: string]: unknown;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    [key: string]: string | undefined;
  };
  navigation?: {
    logo?: string;
    menuItems?: Array<{
      label: string;
      href: string;
    }>;
  };
  footer?: {
    copyright?: string;
    links?: Array<{
      label: string;
      href: string;
    }>;
  };
  [key: string]: unknown;
}

// ============================================
// SECTION TYPE SCHEMA TYPES
// ============================================

export interface SectionTypeSchema {
  fields: Array<{
    name: string;
    type: 'text' | 'textarea' | 'image' | 'url' | 'array' | 'object' | 'boolean' | 'number';
    label: string;
    required?: boolean;
    placeholder?: string;
    defaultValue?: unknown;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

export interface SectionTypeDefaultData {
  [key: string]: unknown;
}

export interface SectionTypeStyleOptions {
  backgroundColor?: string[];
  textColor?: string[];
  layout?: string[];
  alignment?: string[];
  [key: string]: unknown;
}

export interface SectionTypeLayoutVariants {
  default?: string;
  variants?: Array<{
    name: string;
    description?: string;
    preview?: string;
  }>;
  [key: string]: unknown;
}

// ============================================
// PRISMA UPDATE TYPES
// ============================================

export type PortfolioSectionUpdateData = Prisma.PortfolioSectionUpdateInput;
export type PortfolioUpdateData = Prisma.PortfolioUpdateInput;
