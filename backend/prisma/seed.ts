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
      description: 'Timeline of work experience',
      icon: '�',
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

  const educationTimeline = await prisma.sectionType.upsert({
    where: { name: 'education-timeline' },
    update: {},
    create: {
      name: 'education-timeline',
      displayName: 'Education - Timeline',
      description: 'Timeline of educational background and certifications',
      icon: '🎓',
      category: 'education',
      componentName: 'EducationTimeline',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                degree: { type: 'string' },
                institution: { type: 'string' },
                field: { type: 'string' },
                location: { type: 'string' },
                startDate: { type: 'string' },
                endDate: { type: 'string' },
                grade: { type: 'string' },
                description: { type: 'string' },
                achievements: {
                  type: 'array',
                  items: { type: 'string' },
                },
                current: { type: 'boolean' },
              },
            },
          },
        },
      },
      defaultData: {
        title: 'Education',
        items: [],
      },
      layoutVariants: ['vertical', 'horizontal', 'cards'],
      styleOptions: ['all'],
    },
  });

  console.log('✅ Section types created');

  // ============================================
  // THEMES
  // ============================================
  console.log('🎨 Creating themes...');

  const modernMinimal = await prisma.theme.upsert({
    where: { id: 'modern-minimal-theme' },
    update: {},
    create: {
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

  const darkProfessional = await prisma.theme.upsert({
    where: { id: 'dark-professional-theme' },
    update: {},
    create: {
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

  const vibrantGradient = await prisma.theme.upsert({
    where: { id: 'vibrant-gradient-theme' },
    update: {},
    create: {
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

  const sunsetWarmth = await prisma.theme.upsert({
    where: { id: 'sunset-warmth-theme' },
    update: {},
    create: {
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

  const oceanBreeze = await prisma.theme.upsert({
    where: { id: 'ocean-breeze-theme' },
    update: {},
    create: {
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

  const neonCyber = await prisma.theme.upsert({
    where: { id: 'neon-cyber-theme' },
    update: {},
    create: {
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

  const royalPurple = await prisma.theme.upsert({
    where: { id: 'royal-purple-theme' },
    update: {},
    create: {
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

  const forestGreen = await prisma.theme.upsert({
    where: { id: 'forest-green-theme' },
    update: {},
    create: {
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

  const midnightBlue = await prisma.theme.upsert({
    where: { id: 'midnight-blue-theme' },
    update: {},
    create: {
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

  const peachCream = await prisma.theme.upsert({
    where: { id: 'peach-cream-theme' },
    update: {},
    create: {
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

  const crimsonNoir = await prisma.theme.upsert({
    where: { id: 'crimson-noir-theme' },
    update: {},
    create: {
      id: 'crimson-noir-theme',
      name: 'Crimson Noir',
      description: 'Sophisticated dark theme with deep red and black aesthetics for bold portfolios',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#DC2626',
        secondary: '#EF4444',
        accent: '#F87171',
        background: {
          primary: '#0A0A0A',
          secondary: '#1A1A1A',
          tertiary: '#2A2A2A',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#E5E5E5',
          tertiary: '#A3A3A3',
          inverse: '#0A0A0A',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#DC2626',
        info: '#EF4444',
        border: '#3A3A3A',
        divider: '#2A2A2A',
      },
      fonts: {
        heading: 'Montserrat, sans-serif',
        body: 'Roboto, sans-serif',
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
        sm: '0 2px 4px 0 rgb(220 38 38 / 0.3)',
        md: '0 4px 8px -1px rgb(220 38 38 / 0.4)',
        lg: '0 10px 20px -3px rgb(220 38 38 / 0.5)',
        xl: '0 20px 30px -5px rgb(220 38 38 / 0.6)',
        '2xl': '0 30px 60px -12px rgb(220 38 38 / 0.7)',
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
      customCSS: `
        .crimson-glow {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
          transition: box-shadow 0.3s ease;
        }
        
        .crimson-glow:hover {
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
        }
        
        .accent-border {
          border-image: linear-gradient(135deg, #DC2626, #EF4444) 1;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `,
    },
  });

  const emeraldDusk = await prisma.theme.upsert({
    where: { id: 'emerald-dusk-theme' },
    update: {},
    create: {
      id: 'emerald-dusk-theme',
      name: 'Emerald Dusk',
      description: 'Premium dark theme with luxurious emerald green and gold accents',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#10B981',
        secondary: '#34D399',
        accent: '#FCD34D',
        background: {
          primary: '#0C1713',
          secondary: '#1A2921',
          tertiary: '#2D3E37',
        },
        text: {
          primary: '#F0FDF4',
          secondary: '#D1FAE5',
          tertiary: '#A7F3D0',
          inverse: '#0C1713',
        },
        success: '#10B981',
        warning: '#FCD34D',
        error: '#EF4444',
        info: '#34D399',
        border: '#3D5449',
        divider: '#2D3E37',
      },
      fonts: {
        heading: 'Cinzel, serif',
        body: 'Lato, sans-serif',
        mono: 'JetBrains Mono, monospace',
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
        sm: '0 2px 4px 0 rgb(16 185 129 / 0.25)',
        md: '0 4px 8px -1px rgb(16 185 129 / 0.35)',
        lg: '0 12px 20px -3px rgb(16 185 129 / 0.4)',
        xl: '0 20px 30px -5px rgb(16 185 129 / 0.5)',
        '2xl': '0 30px 60px -12px rgb(16 185 129 / 0.6)',
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
      customCSS: `
        .emerald-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .emerald-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(16, 185, 129, 0.2),
            transparent
          );
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          to {
            left: 100%;
          }
        }
        
        .gold-accent {
          background: linear-gradient(135deg, #10B981, #FCD34D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .luxury-border {
          border: 2px solid;
          border-image: linear-gradient(135deg, #10B981, #FCD34D, #34D399) 1;
        }
      `,
    },
  });

  // Premium Dark Theme 1: Aurora Night
  const auroraNight = await prisma.theme.upsert({
    where: { id: 'aurora-night-theme' },
    update: {},
    create: {
      id: 'aurora-night-theme',
      name: 'Aurora Night',
      description: 'Mesmerizing dark theme with northern lights-inspired gradient effects and ethereal glow',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#8B5CF6',
        secondary: '#06B6D4',
        accent: '#EC4899',
        background: {
          primary: '#0F0A1E',
          secondary: '#1A1229',
          tertiary: '#2A1F3D',
        },
        text: {
          primary: '#F5F3FF',
          secondary: '#DDD6FE',
          tertiary: '#C4B5FD',
          inverse: '#0F0A1E',
        },
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#06B6D4',
        border: '#3B2F5A',
        divider: '#2A1F3D',
      },
      fonts: {
        heading: 'Space Grotesk, sans-serif',
        body: 'Inter, sans-serif',
        mono: 'JetBrains Mono, monospace',
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
        thick: '3px',
      },
      shadows: {
        sm: '0 0 10px rgba(139, 92, 246, 0.2)',
        md: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)',
        lg: '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(6, 182, 212, 0.3)',
        xl: '0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(236, 72, 153, 0.3)',
        '2xl': '0 0 60px rgba(139, 92, 246, 0.6), 0 0 100px rgba(6, 182, 212, 0.4), 0 0 140px rgba(236, 72, 153, 0.3)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '200ms',
          normal: '400ms',
          slow: '600ms',
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
      customCSS: `
        @keyframes aurora {
          0%, 100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(30deg);
          }
        }
        
        .aurora-bg {
          background: linear-gradient(135deg, #8B5CF6, #06B6D4, #EC4899);
          background-size: 200% 200%;
          animation: aurora 8s ease infinite;
        }
        
        .aurora-glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3),
                      0 0 40px rgba(6, 182, 212, 0.2),
                      0 0 60px rgba(236, 72, 153, 0.1);
          transition: box-shadow 0.3s ease;
        }
        
        .aurora-glow:hover {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.5),
                      0 0 60px rgba(6, 182, 212, 0.3),
                      0 0 90px rgba(236, 72, 153, 0.2);
        }
      `,
    },
  });

  // Premium Dark Theme 2: Obsidian Luxury
  const obsidianLuxury = await prisma.theme.upsert({
    where: { id: 'obsidian-luxury-theme' },
    update: {},
    create: {
      id: 'obsidian-luxury-theme',
      name: 'Obsidian Luxury',
      description: 'Ultra-premium dark theme with sleek black, gold, and champagne accents for high-end portfolios',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#D4AF37',
        secondary: '#F7E7CE',
        accent: '#FFD700',
        background: {
          primary: '#0D0D0D',
          secondary: '#1A1A1A',
          tertiary: '#262626',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#F5F5F5',
          tertiary: '#D4D4D4',
          inverse: '#0D0D0D',
        },
        success: '#4ADE80',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#60A5FA',
        border: '#404040',
        divider: '#333333',
      },
      fonts: {
        heading: 'Cormorant Garamond, serif',
        body: 'Outfit, sans-serif',
        mono: 'Source Code Pro, monospace',
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
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '3px',
      },
      shadows: {
        sm: '0 2px 8px rgba(212, 175, 55, 0.15)',
        md: '0 4px 16px rgba(212, 175, 55, 0.2)',
        lg: '0 8px 24px rgba(212, 175, 55, 0.25)',
        xl: '0 12px 32px rgba(212, 175, 55, 0.3)',
        '2xl': '0 20px 48px rgba(212, 175, 55, 0.35)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '200ms',
          normal: '400ms',
          slow: '700ms',
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
      customCSS: `
        .gold-gradient {
          background: linear-gradient(135deg, #D4AF37, #FFD700, #F7E7CE);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .luxury-shine {
          position: relative;
          overflow: hidden;
        }
        
        .luxury-shine::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 215, 0, 0),
            rgba(255, 215, 0, 0.1),
            rgba(255, 215, 0, 0)
          );
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        .obsidian-card {
          background: linear-gradient(145deg, #1A1A1A, #0D0D0D);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }
      `,
    },
  });

  // Premium Dark Theme 3: Deep Space
  const deepSpace = await prisma.theme.upsert({
    where: { id: 'deep-space-theme' },
    update: {},
    create: {
      id: 'deep-space-theme',
      name: 'Deep Space',
      description: 'Cosmic dark theme with stellar blue and purple gradients, perfect for tech and creative portfolios',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#5B8DEF',
        secondary: '#7B68EE',
        accent: '#00D4FF',
        background: {
          primary: '#0B0E1A',
          secondary: '#151923',
          tertiary: '#1F2937',
        },
        text: {
          primary: '#E5E7EB',
          secondary: '#D1D5DB',
          tertiary: '#9CA3AF',
          inverse: '#0B0E1A',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#00D4FF',
        border: '#374151',
        divider: '#1F2937',
      },
      fonts: {
        heading: 'Exo 2, sans-serif',
        body: 'Nunito Sans, sans-serif',
        mono: 'Roboto Mono, monospace',
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
        thick: '3px',
      },
      shadows: {
        sm: '0 0 10px rgba(91, 141, 239, 0.2)',
        md: '0 0 20px rgba(91, 141, 239, 0.3), 0 0 40px rgba(0, 212, 255, 0.15)',
        lg: '0 0 30px rgba(91, 141, 239, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)',
        xl: '0 0 40px rgba(91, 141, 239, 0.5), 0 0 80px rgba(123, 104, 238, 0.3)',
        '2xl': '0 0 60px rgba(91, 141, 239, 0.6), 0 0 100px rgba(0, 212, 255, 0.4)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '150ms',
          normal: '350ms',
          slow: '600ms',
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
      customCSS: `
        @keyframes stars {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2000px); }
        }
        
        .space-background {
          background: radial-gradient(ellipse at bottom, #1F2937 0%, #0B0E1A 100%);
          position: relative;
        }
        
        .space-background::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          box-shadow: 
            100px 200px white, 300px 400px white, 500px 100px white,
            700px 300px white, 900px 500px white, 200px 600px white;
          animation: stars 50s linear infinite;
        }
        
        .cosmic-glow {
          box-shadow: 
            0 0 20px rgba(91, 141, 239, 0.3),
            0 0 40px rgba(123, 104, 238, 0.2),
            inset 0 0 20px rgba(0, 212, 255, 0.1);
        }
        
        .stellar-border {
          border: 2px solid transparent;
          background: linear-gradient(#0B0E1A, #0B0E1A) padding-box,
                      linear-gradient(135deg, #5B8DEF, #00D4FF) border-box;
        }
      `,
    },
  });

  // Premium Dark Theme 4: Midnight Velvet
  const midnightVelvet = await prisma.theme.upsert({
    where: { id: 'midnight-velvet-theme' },
    update: {},
    create: {
      id: 'midnight-velvet-theme',
      name: 'Midnight Velvet',
      description: 'Sophisticated dark theme with rich velvet textures, burgundy and navy tones for artistic portfolios',
      category: 'dark',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#701A75',
        secondary: '#BE185D',
        accent: '#D946EF',
        background: {
          primary: '#0F0A1A',
          secondary: '#1A1229',
          tertiary: '#2D1B3D',
        },
        text: {
          primary: '#FAF5FF',
          secondary: '#F3E8FF',
          tertiary: '#E9D5FF',
          inverse: '#0F0A1A',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#DC2626',
        info: '#A855F7',
        border: '#4C1D95',
        divider: '#3B0764',
      },
      fonts: {
        heading: 'Crimson Pro, serif',
        body: 'Karla, sans-serif',
        mono: 'Courier Prime, monospace',
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
        thick: '3px',
      },
      shadows: {
        sm: '0 2px 8px rgba(112, 26, 117, 0.3)',
        md: '0 4px 16px rgba(190, 24, 93, 0.35)',
        lg: '0 8px 24px rgba(112, 26, 117, 0.4)',
        xl: '0 12px 32px rgba(217, 70, 239, 0.45)',
        '2xl': '0 20px 48px rgba(190, 24, 93, 0.5)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '200ms',
          normal: '400ms',
          slow: '800ms',
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
      customCSS: `
        .velvet-texture {
          background: linear-gradient(145deg, #1A1229, #0F0A1A);
          position: relative;
        }
        
        .velvet-texture::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            repeating-linear-gradient(
              0deg,
              rgba(112, 26, 117, 0.03) 0px,
              transparent 1px,
              transparent 2px,
              rgba(112, 26, 117, 0.03) 3px
            );
          pointer-events: none;
        }
        
        .velvet-glow {
          box-shadow: 
            0 0 20px rgba(190, 24, 93, 0.4),
            0 0 40px rgba(112, 26, 117, 0.3),
            inset 0 0 60px rgba(217, 70, 239, 0.1);
          transition: box-shadow 0.4s ease;
        }
        
        .velvet-glow:hover {
          box-shadow: 
            0 0 30px rgba(190, 24, 93, 0.6),
            0 0 60px rgba(112, 26, 117, 0.4),
            inset 0 0 80px rgba(217, 70, 239, 0.15);
        }
        
        .artistic-gradient {
          background: linear-gradient(135deg, #701A75, #BE185D, #D946EF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `,
    },
  });

  // Premium Light Theme 1: Crystal Clear
  const crystalClear = await prisma.theme.upsert({
    where: { id: 'crystal-clear-theme' },
    update: {},
    create: {
      id: 'crystal-clear-theme',
      name: 'Crystal Clear',
      description: 'Ultra-clean premium light theme with crystal-like clarity, subtle gradients, and modern minimalism',
      category: 'light',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#2563EB',
        secondary: '#3B82F6',
        accent: '#06B6D4',
        background: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#F1F5F9',
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          tertiary: '#64748B',
          inverse: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#06B6D4',
        border: '#E2E8F0',
        divider: '#CBD5E1',
      },
      fonts: {
        heading: 'Sora, sans-serif',
        body: 'Plus Jakarta Sans, sans-serif',
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
        thick: '3px',
      },
      shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
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
      customCSS: `
        .glass-effect {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.5);
        }
        
        .crystal-shadow {
          box-shadow: 
            0 1px 2px rgba(37, 99, 235, 0.05),
            0 4px 8px rgba(37, 99, 235, 0.08),
            0 8px 16px rgba(6, 182, 212, 0.06);
        }
        
        .crystal-gradient {
          background: linear-gradient(135deg, #FFFFFF, #F8FAFC, #F1F5F9);
        }
        
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(37, 99, 235, 0.1),
            transparent
          );
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          to { left: 100%; }
        }
      `,
    },
  });

  // Premium Light Theme 2: Golden Hour
  const goldenHour = await prisma.theme.upsert({
    where: { id: 'golden-hour-theme' },
    update: {},
    create: {
      id: 'golden-hour-theme',
      name: 'Golden Hour',
      description: 'Warm and luxurious light theme inspired by golden hour sunlight, perfect for creative portfolios',
      category: 'light',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#D97706',
        secondary: '#F59E0B',
        accent: '#FBBF24',
        background: {
          primary: '#FFFBEB',
          secondary: '#FEF3C7',
          tertiary: '#FDE68A',
        },
        text: {
          primary: '#78350F',
          secondary: '#92400E',
          tertiary: '#B45309',
          inverse: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        border: '#FCD34D',
        divider: '#FDE68A',
      },
      fonts: {
        heading: 'Libre Baskerville, serif',
        body: 'Work Sans, sans-serif',
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
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '3px',
      },
      shadows: {
        sm: '0 2px 4px rgba(217, 119, 6, 0.1)',
        md: '0 4px 8px rgba(217, 119, 6, 0.15), 0 2px 4px rgba(245, 158, 11, 0.1)',
        lg: '0 8px 16px rgba(217, 119, 6, 0.2), 0 4px 8px rgba(251, 191, 36, 0.15)',
        xl: '0 12px 24px rgba(217, 119, 6, 0.25), 0 8px 12px rgba(245, 158, 11, 0.2)',
        '2xl': '0 20px 40px rgba(217, 119, 6, 0.3), 0 12px 20px rgba(251, 191, 36, 0.25)',
        none: 'none',
      },
      animations: {
        durations: {
          fast: '200ms',
          normal: '400ms',
          slow: '600ms',
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
      customCSS: `
        .golden-glow {
          box-shadow: 
            0 0 20px rgba(217, 119, 6, 0.2),
            0 0 40px rgba(245, 158, 11, 0.15),
            inset 0 0 60px rgba(251, 191, 36, 0.1);
        }
        
        .golden-gradient {
          background: linear-gradient(135deg, #FEF3C7, #FBBF24, #F59E0B);
        }
        
        .warm-shimmer {
          animation: warm-pulse 2s ease-in-out infinite;
        }
        
        @keyframes warm-pulse {
          0%, 100% { 
            filter: brightness(1);
          }
          50% { 
            filter: brightness(1.1);
          }
        }
        
        .sunray-effect {
          background: 
            radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.2), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(245, 158, 11, 0.15), transparent 60%);
        }
      `,
    },
  });

  // Premium Light Theme 3: Lavender Dreams
  const lavenderDreams = await prisma.theme.upsert({
    where: { id: 'lavender-dreams-theme' },
    update: {},
    create: {
      id: 'lavender-dreams-theme',
      name: 'Lavender Dreams',
      description: 'Elegant light theme with soft lavender and purple tones, perfect for creative and design portfolios',
      category: 'light',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#C4B5FD',
        background: {
          primary: '#FEFBFF',
          secondary: '#FAF5FF',
          tertiary: '#F3E8FF',
        },
        text: {
          primary: '#4C1D95',
          secondary: '#5B21B6',
          tertiary: '#7C3AED',
          inverse: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#8B5CF6',
        border: '#DDD6FE',
        divider: '#E9D5FF',
      },
      fonts: {
        heading: 'Poppins, sans-serif',
        body: 'Quicksand, sans-serif',
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
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '3px',
      },
      shadows: {
        sm: '0 2px 4px rgba(139, 92, 246, 0.08)',
        md: '0 4px 8px rgba(139, 92, 246, 0.12), 0 2px 4px rgba(167, 139, 250, 0.08)',
        lg: '0 8px 16px rgba(139, 92, 246, 0.16), 0 4px 8px rgba(196, 181, 253, 0.12)',
        xl: '0 12px 24px rgba(139, 92, 246, 0.2), 0 8px 12px rgba(167, 139, 250, 0.15)',
        '2xl': '0 20px 40px rgba(139, 92, 246, 0.25), 0 12px 20px rgba(196, 181, 253, 0.2)',
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
      customCSS: `
        .lavender-mist {
          background: linear-gradient(135deg, #FAF5FF, #F3E8FF, #E9D5FF);
          backdrop-filter: blur(10px);
        }
        
        .dreamy-glow {
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.15),
            0 0 40px rgba(167, 139, 250, 0.1),
            0 0 60px rgba(196, 181, 253, 0.08);
        }
        
        .lavender-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
        
        .purple-gradient-text {
          background: linear-gradient(135deg, #8B5CF6, #A78BFA, #C4B5FD);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .soft-border {
          border: 2px solid rgba(139, 92, 246, 0.2);
          box-shadow: inset 0 0 20px rgba(167, 139, 250, 0.1);
        }
      `,
    },
  });

  // Premium Light Theme 4: Mint Fresh
  const mintFresh = await prisma.theme.upsert({
    where: { id: 'mint-fresh-theme' },
    update: {},
    create: {
      id: 'mint-fresh-theme',
      name: 'Mint Fresh',
      description: 'Refreshing light theme with minty green and aqua tones, ideal for modern and clean portfolios',
      category: 'light',
      isDefault: false,
      isPublic: true,
      isPremium: true,
      colors: {
        primary: '#14B8A6',
        secondary: '#2DD4BF',
        accent: '#5EEAD4',
        background: {
          primary: '#F0FDFA',
          secondary: '#CCFBF1',
          tertiary: '#99F6E4',
        },
        text: {
          primary: '#134E4A',
          secondary: '#115E59',
          tertiary: '#0F766E',
          inverse: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#14B8A6',
        border: '#5EEAD4',
        divider: '#99F6E4',
      },
      fonts: {
        heading: 'Lexend, sans-serif',
        body: 'Manrope, sans-serif',
        mono: 'JetBrains Mono, monospace',
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
        md: '1rem',
        lg: '1.25rem',
        xl: '1.75rem',
        full: '9999px',
      },
      borderWidth: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '3px',
      },
      shadows: {
        sm: '0 2px 4px rgba(20, 184, 166, 0.1)',
        md: '0 4px 8px rgba(20, 184, 166, 0.15), 0 2px 4px rgba(45, 212, 191, 0.1)',
        lg: '0 8px 16px rgba(20, 184, 166, 0.2), 0 4px 8px rgba(94, 234, 212, 0.15)',
        xl: '0 12px 24px rgba(20, 184, 166, 0.25), 0 8px 12px rgba(45, 212, 191, 0.2)',
        '2xl': '0 20px 40px rgba(20, 184, 166, 0.3), 0 12px 20px rgba(94, 234, 212, 0.25)',
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
      customCSS: `
        .mint-gradient {
          background: linear-gradient(135deg, #CCFBF1, #5EEAD4, #2DD4BF);
        }
        
        .fresh-glow {
          box-shadow: 
            0 0 20px rgba(20, 184, 166, 0.2),
            0 0 40px rgba(45, 212, 191, 0.15),
            inset 0 0 60px rgba(94, 234, 212, 0.1);
        }
        
        .wave-animation {
          position: relative;
          overflow: hidden;
        }
        
        .wave-animation::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(20, 184, 166, 0.1),
            transparent
          );
          animation: wave 4s linear infinite;
        }
        
        @keyframes wave {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .mint-text-gradient {
          background: linear-gradient(135deg, #14B8A6, #2DD4BF, #5EEAD4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .bubble-effect {
          position: relative;
        }
        
        .bubble-effect::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.2), transparent);
          filter: blur(20px);
          z-index: -1;
        }
      `,
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
