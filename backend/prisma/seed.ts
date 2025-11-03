import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ============================================
  // SECTION TYPES
  // ============================================
  console.log('📦 Creating section types...');
  
  const heroMinimal = await prisma.sectionType.upsert({
    where: { name: 'hero-minimal' },
    update: {},
    create: {
      name: 'hero-minimal',
      displayName: 'Hero - Minimal',
      description: 'Clean and minimal hero section with name and tagline',
      icon: '🎯',
      category: 'hero',
      componentName: 'HeroMinimal',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          tagline: { type: 'string' },
          photoUrl: { type: 'string' },
          cta: {
            type: 'object',
            properties: {
              primary: { type: 'object', properties: { text: { type: 'string' }, link: { type: 'string' } } },
              secondary: { type: 'object', properties: { text: { type: 'string' }, link: { type: 'string' } } },
            },
          },
        },
      },
      defaultData: {
        name: 'Your Name',
        tagline: 'Your Professional Title',
        photoUrl: '',
        cta: {
          primary: { text: 'View My Work', link: '#projects' },
          secondary: { text: 'Contact Me', link: '#contact' },
        },
      },
      layoutVariants: ['centered', 'split', 'fullscreen'],
      styleOptions: ['backgroundColor', 'textAlign', 'padding', 'backgroundImage'],
    },
  });

  const aboutText = await prisma.sectionType.upsert({
    where: { name: 'about-text' },
    update: {},
    create: {
      name: 'about-text',
      displayName: 'About - Text',
      description: 'Simple text-based about section',
      icon: '👤',
      category: 'about',
      componentName: 'AboutText',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          bio: { type: 'string' },
          image: { type: 'string' },
        },
      },
      defaultData: {
        title: 'About Me',
        bio: 'Write your bio here...',
        image: '',
      },
      layoutVariants: ['single-column', 'two-column', 'image-left', 'image-right'],
      styleOptions: ['all'],
    },
  });

  const skillsCards = await prisma.sectionType.upsert({
    where: { name: 'skills-cards' },
    update: {},
    create: {
      name: 'skills-cards',
      displayName: 'Skills - Cards',
      description: 'Display skills in card format',
      icon: '⚡',
      category: 'skills',
      componentName: 'SkillsCards',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          skills: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
      defaultData: {
        title: 'Skills & Expertise',
        skills: [],
      },
      layoutVariants: ['grid', 'list', 'icons'],
      styleOptions: ['all'],
    },
  });

  const portfolioGrid = await prisma.sectionType.upsert({
    where: { name: 'portfolio-grid' },
    update: {},
    create: {
      name: 'portfolio-grid',
      displayName: 'Portfolio - Grid',
      description: 'Display projects in a grid layout',
      icon: '🎨',
      category: 'portfolio',
      componentName: 'PortfolioGrid',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          subtitle: { type: 'string' },
          showFilters: { type: 'boolean' },
          categories: { type: 'array', items: { type: 'string' } },
          projects: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                image: { type: 'string' },
                tags: { type: 'array', items: { type: 'string' } },
                link: { type: 'string' },
                github: { type: 'string' },
              },
            },
          },
        },
      },
      defaultData: {
        title: 'My Work',
        subtitle: 'Featured projects and case studies',
        showFilters: false,
        categories: [],
        projects: [],
      },
      layoutVariants: ['masonry', 'grid-2', 'grid-3', 'grid-4'],
      styleOptions: ['all'],
    },
  });

  const contactForm = await prisma.sectionType.upsert({
    where: { name: 'contact-form' },
    update: {},
    create: {
      name: 'contact-form',
      displayName: 'Contact - Form',
      description: 'Contact form with social links',
      icon: '📧',
      category: 'contact',
      componentName: 'ContactForm',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          subtitle: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          linkedin: { type: 'string' },
          github: { type: 'string' },
          twitter: { type: 'string' },
        },
      },
      defaultData: {
        title: 'Get In Touch',
        subtitle: "Let's work together!",
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        twitter: '',
      },
      layoutVariants: ['simple', 'sidebar', 'centered'],
      styleOptions: ['all'],
    },
  });

  const experienceTimeline = await prisma.sectionType.upsert({
    where: { name: 'experience-timeline' },
    update: {},
    create: {
      name: 'experience-timeline',
      displayName: 'Experience - Timeline',
      description: 'Timeline of work experience and education',
      icon: '📅',
      category: 'experience',
      componentName: 'ExperienceTimeline',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          entries: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                company: { type: 'string' },
                location: { type: 'string' },
                startDate: { type: 'string' },
                endDate: { type: 'string' },
                description: { type: 'string' },
                current: { type: 'boolean' },
              },
            },
          },
        },
      },
      defaultData: {
        title: 'Experience',
        entries: [],
      },
      layoutVariants: ['vertical', 'horizontal', 'zigzag'],
      styleOptions: ['all'],
    },
  });

  console.log('✅ Section types created');

  // ============================================
  // THEMES
  // ============================================
  console.log('🎨 Creating themes...');
  
  // Delete all existing themes first
  console.log('🗑️  Deleting existing themes...');
  await prisma.theme.deleteMany({});
  console.log('✅ Existing themes deleted');

  const modernMinimal = await prisma.theme.create({
    data: {
      id: 'modern-minimal-theme',
      name: 'Modern Minimal',
      description: 'Clean and minimal design with black and white aesthetics',
      category: 'light',
      isDefault: true,
      isPublic: true,
      colors: {
        primary: '#000000',
        secondary: '#666666',
        accent: '#0066FF',
        background: {
          primary: '#FFFFFF',
          secondary: '#F5F5F5',
          tertiary: '#E5E5E5',
        },
        text: {
          primary: '#000000',
          secondary: '#666666',
          tertiary: '#999999',
          inverse: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        border: '#E5E5E5',
        divider: '#E5E5E5',
      },
      fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const darkProfessional = await prisma.theme.create({
    data: {
      id: 'dark-professional-theme',
      name: 'Dark Professional',
      description: 'Professional dark theme with vibrant accents',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#00D9FF',
        secondary: '#8B5CF6',
        accent: '#F59E0B',
        background: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#334155',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#CBD5E1',
          tertiary: '#94A3B8',
          inverse: '#0F172A',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        border: '#334155',
        divider: '#334155',
      },
      fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.5)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.5)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.5)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.75)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const vibrantGradient = await prisma.theme.create({
    data: {
      id: 'vibrant-gradient-theme',
      name: 'Vibrant Gradient',
      description: 'Bold and colorful with gradient accents',
      category: 'light',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        background: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
        },
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          tertiary: '#6B7280',
          inverse: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        border: '#E5E7EB',
        divider: '#E5E7EB',
      },
      fonts: {
        heading: 'Poppins, sans-serif',
        body: 'Inter, system-ui, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const sunsetWarmth = await prisma.theme.create({
    data: {
      id: 'sunset-warmth-theme',
      name: 'Sunset Warmth',
      description: 'Warm and inviting theme with sunset-inspired coral and orange tones',
      category: 'light',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#FF6B6B',
        secondary: '#FFA07A',
        accent: '#FFD93D',
        background: {
          primary: '#FFF8F0',
          secondary: '#FFE8D6',
          tertiary: '#FFD8B5',
        },
        text: {
          primary: '#2D1B1B',
          secondary: '#5C4033',
          tertiary: '#8B7355',
          inverse: '#FFFFFF',
        },
        success: '#06D6A0',
        warning: '#F4A259',
        error: '#EF476F',
        info: '#118AB2',
        border: '#FFD8B5',
        divider: '#FECDAA',
      },
      fonts: {
        heading: 'Montserrat, sans-serif',
        body: 'Open Sans, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.375rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 2px 4px 0 rgb(255 107 107 / 0.1)',
        md: '0 4px 8px -1px rgb(255 107 107 / 0.15)',
        lg: '0 12px 20px -3px rgb(255 107 107 / 0.2)',
        xl: '0 20px 30px -5px rgb(255 107 107 / 0.25)',
        '2xl': '0 30px 60px -12px rgb(255 107 107 / 0.35)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '200ms',
          normal: '350ms',
          slow: '600ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const oceanBreeze = await prisma.theme.create({
    data: {
      id: 'ocean-breeze-theme',
      name: 'Ocean Breeze',
      description: 'Calm and professional theme inspired by ocean waves with blue and teal colors',
      category: 'light',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#0891B2',
        secondary: '#06B6D4',
        accent: '#22D3EE',
        background: {
          primary: '#F0FDFA',
          secondary: '#CCFBF1',
          tertiary: '#99F6E4',
        },
        text: {
          primary: '#134E4A',
          secondary: '#115E59',
          tertiary: '#14B8A6',
          inverse: '#F0FDFA',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#06B6D4',
        border: '#5EEAD4',
        divider: '#2DD4BF',
      },
      fonts: {
        heading: 'Raleway, sans-serif',
        body: 'Lato, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 1px 3px 0 rgb(8 145 178 / 0.12)',
        md: '0 4px 8px -1px rgb(8 145 178 / 0.15)',
        lg: '0 10px 20px -3px rgb(8 145 178 / 0.2)',
        xl: '0 20px 30px -5px rgb(8 145 178 / 0.25)',
        '2xl': '0 25px 50px -12px rgb(8 145 178 / 0.3)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const neonCyber = await prisma.theme.create({
    data: {
      id: 'neon-cyber-theme',
      name: 'Neon Cyber',
      description: 'Futuristic cyberpunk theme with neon accents and dark background',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#00FFF0',
        secondary: '#FF006E',
        accent: '#FFBE0B',
        background: {
          primary: '#0A0E27',
          secondary: '#151934',
          tertiary: '#1E2749',
        },
        text: {
          primary: '#E0F7FF',
          secondary: '#A0D8F0',
          tertiary: '#7BB8D0',
          inverse: '#0A0E27',
        },
        success: '#39FF14',
        warning: '#FFBE0B',
        error: '#FF006E',
        info: '#00FFF0',
        border: '#2D3561',
        divider: '#1E2749',
      },
      fonts: {
        heading: 'Orbitron, sans-serif',
        body: 'Rajdhani, sans-serif',
        mono: 'Fira Code, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '3px',
      },
      shadows: {
        sm: '0 0 5px rgb(0 255 240 / 0.3)',
        md: '0 0 10px rgb(0 255 240 / 0.4), 0 0 20px rgb(255 0 110 / 0.2)',
        lg: '0 0 15px rgb(0 255 240 / 0.5), 0 0 30px rgb(255 0 110 / 0.3)',
        xl: '0 0 20px rgb(0 255 240 / 0.6), 0 0 40px rgb(255 0 110 / 0.4)',
        '2xl': '0 0 30px rgb(0 255 240 / 0.7), 0 0 60px rgb(255 0 110 / 0.5), 0 0 90px rgb(255 190 11 / 0.3)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '100ms',
          normal: '250ms',
          slow: '400ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      customCSS: `
        @keyframes neon-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        
        .neon-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
          animation: neon-pulse 2s infinite;
        }
        
        .cyber-border {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00FFF0, #FF006E, #FFBE0B);
          z-index: -1;
          filter: blur(10px);
          opacity: 0.7;
        }
      `,
    },
  });

  const royalPurple = await prisma.theme.create({
    data: {
      id: 'royal-purple-theme',
      name: 'Royal Purple',
      description: 'Elegant dark theme with rich purple and gold accents',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#9333EA',
        secondary: '#C084FC',
        accent: '#FBBF24',
        background: {
          primary: '#1E1B2E',
          secondary: '#2A2640',
          tertiary: '#3A3352',
        },
        text: {
          primary: '#F3E8FF',
          secondary: '#DDD6FE',
          tertiary: '#C4B5FD',
          inverse: '#1E1B2E',
        },
        success: '#10B981',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#A78BFA',
        border: '#4C4066',
        divider: '#3A3352',
      },
      fonts: {
        heading: 'Playfair Display, serif',
        body: 'Inter, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 2px 4px 0 rgb(147 51 234 / 0.2)',
        md: '0 4px 8px -1px rgb(147 51 234 / 0.3)',
        lg: '0 10px 20px -3px rgb(147 51 234 / 0.4)',
        xl: '0 20px 30px -5px rgb(147 51 234 / 0.5)',
        '2xl': '0 30px 60px -12px rgb(147 51 234 / 0.6)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const forestGreen = await prisma.theme.create({
    data: {
      id: 'forest-green-theme',
      name: 'Forest Green',
      description: 'Natural and calming theme with earthy green tones',
      category: 'light',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#059669',
        secondary: '#10B981',
        accent: '#84CC16',
        background: {
          primary: '#F7FEF9',
          secondary: '#ECFDF5',
          tertiary: '#D1FAE5',
        },
        text: {
          primary: '#064E3B',
          secondary: '#065F46',
          tertiary: '#047857',
          inverse: '#FFFFFF',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        border: '#A7F3D0',
        divider: '#6EE7B7',
      },
      fonts: {
        heading: 'Merriweather, serif',
        body: 'Source Sans Pro, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 1px 3px 0 rgb(5 150 105 / 0.15)',
        md: '0 4px 8px -1px rgb(5 150 105 / 0.2)',
        lg: '0 10px 20px -3px rgb(5 150 105 / 0.25)',
        xl: '0 20px 30px -5px rgb(5 150 105 / 0.3)',
        '2xl': '0 25px 50px -12px rgb(5 150 105 / 0.35)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const midnightBlue = await prisma.theme.create({
    data: {
      id: 'midnight-blue-theme',
      name: 'Midnight Blue',
      description: 'Deep blue professional theme perfect for corporate portfolios',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        accent: '#38BDF8',
        background: {
          primary: '#0C1221',
          secondary: '#1E293B',
          tertiary: '#334155',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#CBD5E1',
          tertiary: '#94A3B8',
          inverse: '#0C1221',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#60A5FA',
        border: '#475569',
        divider: '#334155',
      },
      fonts: {
        heading: 'IBM Plex Sans, sans-serif',
        body: 'Inter, sans-serif',
        mono: 'IBM Plex Mono, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 1px 3px 0 rgb(59 130 246 / 0.3)',
        md: '0 4px 8px -1px rgb(59 130 246 / 0.4)',
        lg: '0 10px 20px -3px rgb(59 130 246 / 0.5)',
        xl: '0 20px 30px -5px rgb(59 130 246 / 0.6)',
        '2xl': '0 25px 50px -12px rgb(59 130 246 / 0.7)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  const peachCream = await prisma.theme.create({
    data: {
      id: 'peach-cream-theme',
      name: 'Peach Cream',
      description: 'Soft and modern light theme with peachy cream tones',
      category: 'light',
      isDefault: false,
      isPublic: true,
      colors: {
        primary: '#FB923C',
        secondary: '#FDBA74',
        accent: '#F472B6',
        background: {
          primary: '#FFFBF5',
          secondary: '#FFF7ED',
          tertiary: '#FFEDD5',
        },
        text: {
          primary: '#431407',
          secondary: '#7C2D12',
          tertiary: '#9A3412',
          inverse: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        border: '#FED7AA',
        divider: '#FED7AA',
      },
      fonts: {
        heading: 'DM Serif Display, serif',
        body: 'DM Sans, sans-serif',
        mono: 'Monaco, monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
      shadows: {
        sm: '0 1px 3px 0 rgb(251 146 60 / 0.12)',
        md: '0 4px 8px -1px rgb(251 146 60 / 0.15)',
        lg: '0 10px 20px -3px rgb(251 146 60 / 0.2)',
        xl: '0 20px 30px -5px rgb(251 146 60 / 0.25)',
        '2xl': '0 25px 50px -12px rgb(251 146 60 / 0.3)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms',
        },
        easings: {
          linear: 'linear',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  });

  console.log('✅ Themes created');

  // ============================================
  // TEMPLATES
  // ============================================
  console.log('📄 Creating templates...');

  const engineerTemplate = await prisma.template.upsert({
    where: { id: 'engineer-template-id' },
    update: {},
    create: {
      id: 'engineer-template-id',
      name: 'Software Engineer',
      category: 'engineer',
      description: 'Perfect for software developers and engineers. Showcase your technical skills, projects, and experience.',
      previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      thumbnailImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      defaultThemeId: 'dark-professional-theme',
      tags: ['developer', 'tech', 'engineer'],
    },
  });

  const marketerTemplate = await prisma.template.upsert({
    where: { id: 'marketer-template-id' },
    update: {},
    create: {
      id: 'marketer-template-id',
      name: 'Marketing Professional',
      category: 'marketer',
      description: 'Ideal for marketing professionals. Highlight your services, case studies, and client success stories.',
      previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      thumbnailImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      defaultThemeId: 'vibrant-gradient-theme',
      tags: ['marketing', 'creative', 'business'],
    },
  });

  const generalTemplate = await prisma.template.upsert({
    where: { id: 'general-template-id' },
    update: {},
    create: {
      id: 'general-template-id',
      name: 'General Professional',
      category: 'general',
      description: 'A versatile template suitable for any professional. Simple and clean design for all industries.',
      previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
      thumbnailImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400',
      defaultThemeId: 'modern-minimal-theme',
      tags: ['general', 'professional', 'clean'],
    },
  });

  console.log('✅ Templates created');

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
