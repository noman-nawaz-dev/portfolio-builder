import React from 'react';
import { ThemeConfig } from '@/lib/ThemeContext';

// Base Section Props Interface
export interface SectionProps {
  id: string;
  content: any;
  styles?: SectionStyles;
  layout?: string;
  animations?: AnimationConfig;
  theme: ThemeConfig;
  isEditing?: boolean;
  onUpdate?: (content: any) => void;
}

export interface SectionStyles {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: string;
  [key: string]: any;
}

export interface AnimationConfig {
  enabled: boolean;
  type: 'fadeIn' | 'slideIn' | 'scaleIn' | 'custom';
  duration: string;
  delay?: string;
  easing?: string;
}

// Section Registry Type
export interface SectionRegistryEntry {
  component: React.ComponentType<SectionProps>;
  category: string;
  layouts: string[];
  displayName: string;
  icon?: string;
}

export type SectionRegistry = Record<string, SectionRegistryEntry>;
