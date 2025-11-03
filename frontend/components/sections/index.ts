import React from 'react';
import { HeroMinimal } from './HeroMinimal';
import { AboutText } from './AboutText';
import { SkillsCards } from './SkillsCards';
import { PortfolioGrid } from './PortfolioGrid';
import { ContactForm } from './ContactForm';
import { ExperienceTimeline } from './ExperienceTimeline';
import { SectionProps } from './types';

// Section Registry - maps section type names to React components
export const SECTION_REGISTRY: Record<string, React.FC<SectionProps>> = {
  'hero-minimal': HeroMinimal,
  'about-text': AboutText,
  'skills-cards': SkillsCards,
  'portfolio-grid': PortfolioGrid,
  'contact-form': ContactForm,
  'experience-timeline': ExperienceTimeline,
};

// Helper function to get a section component by name
export const getSectionComponent = (sectionTypeName: string): React.FC<SectionProps> | null => {
  return SECTION_REGISTRY[sectionTypeName] || null;
};

// Export all section components
export {
  HeroMinimal,
  AboutText,
  SkillsCards,
  PortfolioGrid,
  ContactForm,
  ExperienceTimeline,
};
