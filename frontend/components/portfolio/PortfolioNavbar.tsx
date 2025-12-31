'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeConfig } from '@/lib/ThemeContext';

interface Section {
  id: string;
  sectionType: {
    name: string;
  };
  content: {
    title?: string;
    [key: string]: any;
  };
  order: number;
}

interface PortfolioNavbarProps {
  sections: Section[];
  resumeUrl?: string | null;
  theme: ThemeConfig;
}

export const PortfolioNavbar: React.FC<PortfolioNavbarProps> = ({ sections, resumeUrl, theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Filter out the first section (usually Hero/Landing)
  const navSections = sections.slice(1);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sectionElements = navSections.map(section => ({
        id: section.id,
        element: document.getElementById(`section-${section.id}`)
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navSections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const getSectionLabel = (section: Section): string => {
    // Use the title from section content if available
    if (section.content?.title) {
      return section.content.title;
    }

    // Fallback to section type name
    const labelMap: Record<string, string> = {
      'HeroSection': 'Home',
      'AboutSection': 'About',
      'SkillsSection': 'Skills',
      'ProjectsSection': 'Projects',
      'ExperienceSection': 'Experience',
      'EducationSection': 'Education',
      'ContactSection': 'Contact',
      'TestimonialsSection': 'Testimonials',
      'ServicesSection': 'Services',
      'BlogSection': 'Blog',
    };

    return labelMap[section.sectionType.name] || section.sectionType.name.replace('Section', '');
  };

  // Don't show navbar if there are no sections to navigate to (excluding first section)
  if (navSections.length === 0) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{
        backgroundColor: isScrolled 
          ? theme.colors.background.secondary || theme.colors.background.primary
          : theme.colors.background.primary,
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${theme.colors.text.primary}10` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo/Brand (optional - could add portfolio title here) */}
          <div className="flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Portfolio
            </button>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-1 justify-center">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white shadow-lg'
                    : ''
                }`}
                style={{
                  color: activeSection === section.id ? '#fff' : theme.colors.text.primary,
                  backgroundColor: activeSection === section.id ? undefined : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = `${theme.colors.text.primary}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {getSectionLabel(section)}
              </button>
            ))}
          </div>

          {/* Right Resume Button */}
          {resumeUrl && (
            <div className="hidden md:flex flex-shrink-0">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button variant="primary" size="sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Resume
                </Button>
              </a>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button variant="primary" size="sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </Button>
              </a>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: theme.colors.text.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.colors.text.primary}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden py-4 space-y-2 border-t"
            style={{ borderColor: `${theme.colors.text.primary}20` }}
          >
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white shadow-lg'
                    : ''
                }`}
                style={{
                  color: activeSection === section.id ? '#fff' : theme.colors.text.primary,
                  backgroundColor: activeSection === section.id ? undefined : `${theme.colors.text.primary}05`,
                }}
              >
                {getSectionLabel(section)}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
