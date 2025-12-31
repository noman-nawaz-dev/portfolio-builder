import { Box, Button, Card, Flex, Heading, Stack, Text } from '@/components/ui';

interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'light' | 'dark';
  isPremium: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface ThemeSelectorProps {
  themes: Theme[];
  currentThemeId: string;
  changingTheme: boolean;
  onThemeSelect: (themeId: string) => void;
  onClose: () => void;
}

export function ThemeSelector({
  themes,
  currentThemeId,
  changingTheme,
  onThemeSelect,
  onClose,
}: ThemeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = 
    useState<'light' | 'dark' | null>(null);

  const lightThemes = themes.filter((t) => t.category === 'light');
  const darkThemes = themes.filter((t) => t.category === 'dark');

  return (
    <Card className="theme-selector-popup absolute right-2 sm:right-4 top-14 sm:top-16 shadow-2xl p-4 w-80 sm:w-96 z-50 max-h-[80vh] overflow-y-auto">
      {/* Loading Overlay */}
      {changingTheme && (
        <Box className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center z-10">
          <Stack spacing="sm" align="center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <Text size="sm" weight="medium" className="text-neutral-600">
              Changing theme...
            </Text>
          </Stack>
        </Box>
      )}

      <Flex justify="between" align="center" className="mb-4">
        <Heading as="h3" size="lg" className="text-base sm:text-lg">
          Choose Theme
        </Heading>
        <Button
          onClick={onClose}
          disabled={changingTheme}
          variant="ghost"
          size="sm"
          className="text-neutral-400 hover:text-neutral-600 p-1"
        >
          ✕
        </Button>
      </Flex>

      {/* Category Selection */}
      {!selectedCategory && (
        <Stack spacing="sm">
          <Text size="sm" className="text-neutral-600 mb-2">
            Select a theme category:
          </Text>
          
          <button
            onClick={() => setSelectedCategory('light')}
            disabled={changingTheme}
            className="w-full p-4 rounded-lg border-2 border-neutral-200 hover:border-teal-300 hover:bg-teal-50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Flex justify="between" align="center">
              <Flex align="center" gap="sm">
                <span className="text-3xl">☀️</span>
                <Stack spacing="xs">
                  <Text weight="semibold" className="text-neutral-900 group-hover:text-teal-700">
                    Light Themes
                  </Text>
                  <Text size="sm" className="text-neutral-500">
                    {lightThemes.length} themes available
                  </Text>
                </Stack>
              </Flex>
              <span className="text-neutral-400 group-hover:text-teal-700">→</span>
            </Flex>
          </button>

          <button
            onClick={() => setSelectedCategory('dark')}
            disabled={changingTheme}
            className="w-full p-4 rounded-lg border-2 border-neutral-200 hover:border-teal-300 hover:bg-teal-50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Flex justify="between" align="center">
              <Flex align="center" gap="sm">
                <span className="text-3xl">🌙</span>
                <Stack spacing="xs">
                  <Text weight="semibold" className="text-neutral-900 group-hover:text-teal-700">
                    Dark Themes
                  </Text>
                  <Text size="sm" className="text-neutral-500">
                    {darkThemes.length} themes available
                  </Text>
                </Stack>
              </Flex>
              <span className="text-neutral-400 group-hover:text-teal-700">→</span>
            </Flex>
          </button>
        </Stack>
      )}

      {/* Theme List */}
      {selectedCategory && (
        <Stack spacing="sm">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-2 transition-colors"
          >
            ← Back to categories
          </button>

          <Flex align="center" gap="sm" className="px-2 mb-2">
            <span className="text-2xl">{selectedCategory === 'light' ? '☀️' : '🌙'}</span>
            <Heading as="h4" size="md" className="text-neutral-700">
              {selectedCategory === 'light' ? 'Light' : 'Dark'} Themes
            </Heading>
          </Flex>

          <Stack spacing="xs" className="max-h-96 overflow-y-auto">
            {themes
              .filter((theme) => theme.category === selectedCategory)
              .map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onThemeSelect(theme.id)}
                  disabled={changingTheme}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentThemeId === theme.id
                      ? 'border-indigo-600 bg-indigo-50 shadow-md'
                      : 'border-neutral-200 hover:border-teal-300 hover:shadow-sm'
                  }`}
                >
                  <Flex justify="between" align="start" className="mb-2">
                    <Stack spacing="xs" className="flex-1">
                      <Flex align="center" gap="sm">
                        <Text weight="semibold">{theme.name}</Text>
                        {theme.isPremium && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            ⭐ Premium
                          </span>
                        )}
                      </Flex>
                      <Text size="xs" className="text-neutral-600">
                        {theme.description}
                      </Text>
                    </Stack>
                    {currentThemeId === theme.id && (
                      <span className="text-indigo-600 text-xl">✓</span>
                    )}
                  </Flex>
                  <Flex gap="sm">
                    <div
                      className="w-8 h-8 rounded shadow-sm border border-neutral-200"
                      style={{ backgroundColor: theme.colors.primary }}
                      title="Primary"
                    />
                    <div
                      className="w-8 h-8 rounded shadow-sm border border-neutral-200"
                      style={{ backgroundColor: theme.colors.secondary }}
                      title="Secondary"
                    />
                    <div
                      className="w-8 h-8 rounded shadow-sm border border-neutral-200"
                      style={{ backgroundColor: theme.colors.accent }}
                      title="Accent"
                    />
                  </Flex>
                </button>
              ))}
          </Stack>
        </Stack>
      )}
    </Card>
  );
}

import { useState } from 'react';
