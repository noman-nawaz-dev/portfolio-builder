import React from 'react';
import { SectionProps } from './types';

interface HeroContent {
  name?: string;
  tagline?: string;
  photoUrl?: string;
  cta?: {
    primary?: { text: string; link: string };
    secondary?: { text: string; link: string };
  };
}

export const HeroMinimal: React.FC<SectionProps> = ({
  content,
  styles,
  layout = 'centered',
  theme,
  isEditing,
}) => {
  const heroContent = content as HeroContent;

  const layoutClasses = {
    centered: 'text-center items-center justify-center',
    split: 'text-left md:flex-row items-center',
    fullscreen: 'min-h-screen text-center items-center justify-center',
  };

  return (
    <section
      className={`flex flex-col px-4 py-20 ${layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.centered}`}
      style={{
        backgroundColor: styles?.backgroundColor || theme.colors.background.primary,
        padding: styles?.padding,
        margin: styles?.margin,
        textAlign: styles?.textAlign,
      }}
    >
      <div className="max-w-5xl w-full">
        {heroContent.photoUrl && (
          <div className={`mb-8 ${layout === 'centered' || layout === 'fullscreen' ? 'flex justify-center' : ''}`}>
            <img
              src={heroContent.photoUrl}
              alt={heroContent.name || 'Profile'}
              className="w-36 h-36 rounded-full object-cover border-4 shadow-2xl"
              style={{
                borderColor: theme.colors.primary,
                boxShadow: theme.shadows.xl,
              }}
            />
          </div>
        )}

        <h1
          className="text-6xl md:text-8xl font-bold mb-6"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.heading,
            fontWeight: theme.fontWeights.bold,
          }}
        >
          {heroContent.name || 'Your Name'}
        </h1>

        {heroContent.tagline && (
          <p
            className="text-2xl md:text-3xl mb-8"
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.fonts.body,
            }}
          >
            {heroContent.tagline}
          </p>
        )}

        {heroContent.cta && (
          <div className="flex gap-4 flex-wrap justify-center">
            {heroContent.cta.primary && (
              <a
                href={heroContent.cta.primary.link}
                className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text.inverse,
                  borderRadius: theme.borderRadius.lg,
                  boxShadow: theme.shadows.md,
                }}
              >
                {heroContent.cta.primary.text}
              </a>
            )}
            {heroContent.cta.secondary && (
              <a
                href={heroContent.cta.secondary.link}
                className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: theme.colors.background.secondary,
                  color: theme.colors.text.primary,
                  borderRadius: theme.borderRadius.lg,
                  border: `2px solid ${theme.colors.border}`,
                }}
              >
                {heroContent.cta.secondary.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
