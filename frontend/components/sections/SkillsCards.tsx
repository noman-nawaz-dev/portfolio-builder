import React from 'react';
import { SectionProps } from './types';
import { getCategoryColors } from '@/lib/category-colors';

interface Skill {
  name: string;
  level?: number;
  category?: string;
  icon?: string;
}

interface SkillsContent {
  title?: string;
  skills?: Skill[];
}

export const SkillsCards: React.FC<SectionProps> = ({
  content,
  styles,
  layout = 'grid',
  theme,
}) => {
  const skillsContent = content as SkillsContent;

  const layoutClasses = {
    grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
    list: 'flex flex-col space-y-4 max-w-2xl mx-auto',
    'two-column': 'grid md:grid-cols-2 gap-8',
  };

  const renderSkillCard = (skill: Skill, index: number) => (
    <div
      key={index}
      className="p-6 rounded-xl transition-all"
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.xl,
        boxShadow: theme.shadows.md,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {skill.icon && (
        <div className="text-4xl mb-3" role="img" aria-label={skill.name}>
          {skill.icon}
        </div>
      )}
      <h3
        className="font-semibold text-lg mb-2"
        style={{
          color: theme.colors.text.primary,
          fontFamily: theme.fonts.heading,
        }}
      >
        {skill.name}
      </h3>
      {skill.level !== undefined && (
        <div className="mt-3">
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: theme.colors.background.tertiary }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${skill.level}%`,
                backgroundColor: skill.category 
                  ? getCategoryColors(skill.category).progressHex 
                  : theme.colors.primary,
              }}
            />
          </div>
          <span
            className="text-sm mt-1 inline-block"
            style={{ color: theme.colors.text.secondary }}
          >
            {skill.level}%
          </span>
        </div>
      )}
      {skill.category && (
        <span
          className="text-sm inline-block mt-2 px-3 py-1 rounded-full font-medium"
          style={{
            backgroundColor: getCategoryColors(skill.category).bgHex,
            color: getCategoryColors(skill.category).textHex,
            border: `2px solid ${getCategoryColors(skill.category).borderHex}`,
            fontSize: theme.fontSizes.sm,
          }}
        >
          {skill.category}
        </span>
      )}
    </div>
  );

  const renderSkillList = (skill: Skill, index: number) => (
    <div
      key={index}
      className="flex items-center p-4 rounded-lg"
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.lg,
      }}
    >
      {skill.icon && <span className="text-2xl mr-4">{skill.icon}</span>}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3
            className="font-semibold"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.heading,
            }}
          >
            {skill.name}
          </h3>
          {skill.level !== undefined && (
            <span style={{ color: theme.colors.text.secondary }}>
              {skill.level}%
            </span>
          )}
        </div>
        {skill.level !== undefined && (
          <div
            className="h-2 rounded-full overflow-hidden mt-2"
            style={{ backgroundColor: theme.colors.background.tertiary }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${skill.level}%`,
                backgroundColor: skill.category 
                  ? getCategoryColors(skill.category).progressHex 
                  : theme.colors.primary,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section
      className="px-4 py-16"
      style={{
        backgroundColor: styles?.backgroundColor || theme.colors.background.primary,
        padding: styles?.padding,
        margin: styles?.margin,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {skillsContent.title && (
          <h2
            className="text-5xl font-bold mb-12 text-center"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.heading,
            }}
          >
            {skillsContent.title}
          </h2>
        )}

        <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.grid}>
          {skillsContent.skills?.map((skill, index) =>
            layout === 'list' ? renderSkillList(skill, index) : renderSkillCard(skill, index)
          )}
        </div>
      </div>
    </section>
  );
};
