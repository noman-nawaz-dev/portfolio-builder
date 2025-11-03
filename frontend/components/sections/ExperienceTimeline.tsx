import React from 'react';
import { SectionProps } from './types';

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description?: string;
  achievements?: string[];
  location?: string;
  type?: 'work' | 'education' | 'project';
}

interface ExperienceContent {
  title?: string;
  items?: TimelineItem[];
}

export const ExperienceTimeline: React.FC<SectionProps> = ({
  content,
  styles,
  layout = 'vertical',
  theme,
}) => {
  const experienceContent = content as ExperienceContent;

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'work':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      default:
        return '📌';
    }
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
        {experienceContent.title && (
          <h2
            className="text-5xl font-bold mb-12 text-center"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.heading,
            }}
          >
            {experienceContent.title}
          </h2>
        )}

        <div className={layout === 'horizontal' ? 'flex overflow-x-auto pb-4 gap-6' : 'relative'}>
          {/* Vertical timeline line */}
          {layout === 'vertical' && (
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: theme.colors.border }}
            />
          )}

          {experienceContent.items?.map((item, index) => (
            <div
              key={index}
              className={
                layout === 'horizontal'
                  ? 'min-w-[350px] flex-shrink-0'
                  : 'relative pl-20 pb-12 last:pb-0'
              }
            >
              {/* Timeline dot */}
              {layout === 'vertical' && (
                <div
                  className="absolute left-6 w-5 h-5 rounded-full border-4"
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.background.primary,
                  }}
                />
              )}

              <div
                className="p-6 rounded-xl transition-all"
                style={{
                  backgroundColor: theme.colors.background.secondary,
                  borderRadius: theme.borderRadius.xl,
                  boxShadow: theme.shadows.lg,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {/* Type Icon */}
                <div className="text-3xl mb-3">{getTypeIcon(item.type)}</div>

                {/* Title and Organization */}
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.heading,
                  }}
                >
                  {item.title}
                </h3>

                <h4
                  className="text-xl mb-2"
                  style={{
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.body,
                    fontWeight: theme.fontWeights.semibold,
                  }}
                >
                  {item.organization}
                </h4>

                {/* Period and Location */}
                <div
                  className="flex items-center gap-4 mb-4 text-sm"
                  style={{ color: theme.colors.text.secondary }}
                >
                  <span className="flex items-center">
                    📅 {item.period}
                  </span>
                  {item.location && (
                    <span className="flex items-center">
                      📍 {item.location}
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

                {/* Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-4">
                    <h5
                      className="font-semibold mb-2"
                      style={{
                        color: theme.colors.text.primary,
                        fontFamily: theme.fonts.heading,
                      }}
                    >
                      Key Achievements
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
