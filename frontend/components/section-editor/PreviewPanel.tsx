import { Box, Card, Flex, Stack, Text } from '@/components/ui';
import { ThemeProvider, ThemeConfig } from '@/lib/ThemeContext';
import { getSectionComponent } from '@/components/sections';

interface PortfolioSection {
  id: string;
  content: any;
  styles?: any;
  layout: string;
  sectionType: {
    name: string;
    displayName: string;
  };
}

interface PreviewPanelProps {
  sections: PortfolioSection[];
  theme: ThemeConfig;
}

export function PreviewPanel({ sections, theme }: PreviewPanelProps) {
  return (
    <Card padding="none" className="overflow-hidden">
      <Flex 
        justify="between" 
        align="center" 
        className="bg-gray-800 text-white px-4 sm:px-6 py-3"
      >
        <Text weight="semibold" className="text-white text-sm sm:text-base">
          Live Preview
        </Text>
        <Text size="sm" className="text-gray-400 text-xs sm:text-sm">
          {theme?.name || 'Default Theme'}
        </Text>
      </Flex>
      
      <Box className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {theme && (
          <ThemeProvider initialTheme={theme}>
            {sections.map((section) => {
              const SectionComponent = getSectionComponent(section.sectionType.name);
              if (!SectionComponent) return null;

              return (
                <SectionComponent
                  key={section.id}
                  id={section.id}
                  content={section.content}
                  styles={section.styles}
                  layout={section.layout}
                  theme={theme}
                  isEditing={false}
                />
              );
            })}
            
            {sections.length === 0 && (
              <Stack 
                spacing="md" 
                align="center" 
                className="p-8 sm:p-12 text-center text-gray-400"
              >
                <Text size="lg" className="text-base sm:text-lg">
                  No sections yet
                </Text>
                <Text size="sm" className="text-sm">
                  Add your first section to get started!
                </Text>
              </Stack>
            )}
          </ThemeProvider>
        )}
      </Box>
    </Card>
  );
}
