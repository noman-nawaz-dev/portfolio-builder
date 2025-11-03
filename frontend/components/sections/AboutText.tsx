import React from 'react';
import { SectionProps } from './types';

interface AboutContent {
  title?: string;
  bio?: string;
  highlights?: string[];
}

export const AboutText: React.FC<SectionProps> = ({
  content,
  styles,
  layout = 'single-column',
  theme,
}) => {
  const aboutContent = content as AboutContent;

  const layoutClasses = {
    'single-column': 'max-w-3xl mx-auto',
    'two-column': 'grid md:grid-cols-2 gap-8',
    'centered': 'text-center max-w-3xl mx-auto',
  };

  return (
    <section
      className="px-4 py-20"
      style={{
        backgroundColor: styles?.backgroundColor || theme.colors.background.secondary,
        padding: styles?.padding,
        margin: styles?.margin,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {aboutContent.title && (
          <h2
            className="text-5xl font-bold mb-12 text-center"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.heading,
            }}
          >
            {aboutContent.title}
          </h2>
        )}

        <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses['single-column']}>
          {aboutContent.bio && (
            <div
              className="relative"
              style={{
                backgroundColor: theme.colors.background.primary,
                padding: '2.5rem',
                borderRadius: theme.borderRadius.xl,
                boxShadow: theme.shadows.lg,
              }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              />
              <p
                className="text-lg leading-relaxed pl-4"
                style={{
                  color: theme.colors.text.secondary,
                  fontFamily: theme.fonts.body,
                  fontSize: theme.fontSizes.lg,
                  lineHeight: theme.lineHeights.relaxed,
                }}
              >
                {aboutContent.bio}
              </p>
            </div>
          )}

          {aboutContent.highlights && aboutContent.highlights.length > 0 && (
            <div className="mt-10">
              <h3
                className="text-2xl font-semibold mb-6 text-center"
                style={{
                  color: theme.colors.text.primary,
                  fontFamily: theme.fonts.heading,
                }}
              >
                Highlights
              </h3>
              <ul className="space-y-4">
                {aboutContent.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start p-4 rounded-lg"
                    style={{
                      color: theme.colors.text.secondary,
                      fontFamily: theme.fonts.body,
                      backgroundColor: theme.colors.background.primary,
                      boxShadow: theme.shadows.sm,
                    }}
                  >
                    <span
                      className="mr-3 mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
