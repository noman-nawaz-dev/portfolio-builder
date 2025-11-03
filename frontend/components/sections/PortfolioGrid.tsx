import React from 'react';
import { SectionProps } from './types';

interface PortfolioItem {
  title: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  link?: string;
  demoLink?: string;
  githubLink?: string;
}

interface PortfolioContent {
  title?: string;
  items?: PortfolioItem[];
}

export const PortfolioGrid: React.FC<SectionProps> = ({
  content,
  styles,
  layout = 'grid',
  theme,
}) => {
  const portfolioContent = content as PortfolioContent;

  const layoutClasses = {
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
    masonry: 'columns-1 md:columns-2 lg:columns-3 gap-8',
    list: 'flex flex-col space-y-8 max-w-4xl mx-auto',
  };

  return (
    <section
      className="px-4 py-16"
      style={{
        backgroundColor: styles?.backgroundColor || theme.colors.background.primary,
        padding: styles?.padding,
        margin: styles?.margin,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {portfolioContent.title && (
          <h2
            className="text-5xl font-bold mb-12 text-center"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.heading,
            }}
          >
            {portfolioContent.title}
          </h2>
        )}

        <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.grid}>
          {portfolioContent.items?.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all hover:scale-105 ${
                layout === 'masonry' ? 'mb-8 break-inside-avoid' : ''
              }`}
              style={{
                backgroundColor: theme.colors.background.secondary,
                borderRadius: theme.borderRadius.xl,
                boxShadow: theme.shadows.lg,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              {item.imageUrl && (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              )}

              <div className="p-6">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.heading,
                  }}
                >
                  {item.title}
                </h3>

                {item.description && (
                  <p
                    className="mb-4"
                    style={{
                      color: theme.colors.text.secondary,
                      fontFamily: theme.fonts.body,
                      lineHeight: theme.lineHeights.relaxed,
                    }}
                  >
                    {item.description}
                  </p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: theme.colors.accent,
                          color: theme.colors.text.inverse,
                          fontSize: theme.fontSizes.sm,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 flex-wrap">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                      style={{
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.text.inverse,
                        borderRadius: theme.borderRadius.md,
                      }}
                    >
                      View Project
                    </a>
                  )}
                  {item.demoLink && (
                    <a
                      href={item.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        backgroundColor: theme.colors.background.tertiary,
                        color: theme.colors.text.primary,
                        borderRadius: theme.borderRadius.md,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      Demo
                    </a>
                  )}
                  {item.githubLink && (
                    <a
                      href={item.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        backgroundColor: theme.colors.background.tertiary,
                        color: theme.colors.text.primary,
                        borderRadius: theme.borderRadius.md,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
