import React from 'react';
import { SectionProps } from './types';

interface EducationItem {
  degree: string;
  institution: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
  achievements?: string[];
  current?: boolean;
}

interface EducationContent {
  title?: string;
  items?: EducationItem[];
}

export const EducationTimeline: React.FC<SectionProps> = ({
  content,
  styles,
  layout = 'vertical',
  theme,
}) => {
  const educationContent = content as EducationContent;

  const getDegreeIcon = (degree?: string) => {
    const degreeLower = degree?.toLowerCase() || '';
    if (degreeLower.includes('phd') || degreeLower.includes('doctorate')) {
      return '🎓';
    } else if (degreeLower.includes('master') || degreeLower.includes('mba')) {
      return '📚';
    } else if (degreeLower.includes('bachelor')) {
      return '🎓';
    } else if (degreeLower.includes('diploma') || degreeLower.includes('certificate')) {
      return '📜';
    }
    return '🎓';
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
      <div className="max-w-5xl mx-auto">
        {educationContent.title && (
          <h2
            className="text-5xl font-bold mb-12 text-center"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.heading,
            }}
          >
            {educationContent.title}
          </h2>
        )}

        <div className={layout === 'horizontal' ? 'flex overflow-x-auto pb-4 gap-6' : layout === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'relative'}>
          {/* Vertical timeline line - hidden on mobile */}
          {layout === 'vertical' && (
            <div
              className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: theme.colors.border }}
            />
          )}

          {educationContent.items?.map((item, index) => (
            <div
              key={index}
              className={
                layout === 'horizontal'
                  ? 'min-w-[350px] flex-shrink-0'
                  : layout === 'cards'
                  ? ''
                  : 'relative md:pl-20 pb-12 last:pb-0'
              }
            >
              {/* Timeline dot - hidden on mobile for vertical layout */}
              {layout === 'vertical' && (
                <div
                  className="hidden md:block absolute left-6 w-5 h-5 rounded-full border-4"
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.background.primary,
                  }}
                />
              )}

              <div
                className="p-6 rounded-xl transition-all hover:shadow-xl"
                style={{
                  backgroundColor: theme.colors.background.secondary,
                  borderRadius: theme.borderRadius.xl,
                  boxShadow: theme.shadows.lg,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {/* Degree Icon */}
                <div className="text-3xl mb-3">{getDegreeIcon(item.degree)}</div>

                {/* Degree */}
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.heading,
                  }}
                >
                  {item.degree}
                </h3>

                {/* Field of Study */}
                {item.field && (
                  <p
                    className="text-lg mb-2"
                    style={{
                      color: theme.colors.text.secondary,
                      fontFamily: theme.fonts.body,
                      fontStyle: 'italic',
                    }}
                  >
                    {item.field}
                  </p>
                )}

                {/* Institution */}
                <h4
                  className="text-xl mb-2"
                  style={{
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.body,
                    fontWeight: theme.fontWeights.semibold,
                  }}
                >
                  {item.institution}
                </h4>

                {/* Date Range and Location */}
                <div
                  className="flex flex-wrap items-center gap-4 mb-4 text-sm"
                  style={{ color: theme.colors.text.secondary }}
                >
                  <span className="flex items-center">
                    📅 {item.startDate} - {item.current ? 'Present' : item.endDate}
                  </span>
                  {item.location && (
                    <span className="flex items-center">
                      📍 {item.location}
                    </span>
                  )}
                  {item.grade && (
                    <span className="flex items-center">
                      ⭐ {item.grade}
                    </span>
                  )}
                </div>

                {/* Description */}
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

                {/* Achievements / Honors */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-4">
                    <h5
                      className="font-semibold mb-2"
                      style={{
                        color: theme.colors.text.primary,
                        fontFamily: theme.fonts.heading,
                      }}
                    >
                      Achievements & Honors
                    </h5>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start"
                          style={{
                            color: theme.colors.text.secondary,
                            fontFamily: theme.fonts.body,
                          }}
                        >
                          <span
                            className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
