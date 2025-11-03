import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme Configuration Interface
export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  category?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    success: string;
    warning: string;
    error: string;
    info: string;
    border: string;
    divider: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  borderWidth: {
    none: string;
    thin: string;
    medium: string;
    thick: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    none: string;
  };
  animations: {
    durations: {
      fast: string;
      normal: string;
      slow: string;
    };
    easings: {
      linear: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  customCSS?: string;
}

interface ThemeContextType {
  theme: ThemeConfig | null;
  setTheme: (theme: ThemeConfig) => void;
  applyTheme: (theme: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeConfig;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setThemeState] = useState<ThemeConfig | null>(initialTheme || null);

  const applyTheme = (newTheme: ThemeConfig) => {
    if (!newTheme) return;

    const root = document.documentElement;

    // Apply Colors
    root.style.setProperty('--color-primary', newTheme.colors.primary);
    root.style.setProperty('--color-secondary', newTheme.colors.secondary);
    root.style.setProperty('--color-accent', newTheme.colors.accent);
    
    root.style.setProperty('--color-bg-primary', newTheme.colors.background.primary);
    root.style.setProperty('--color-bg-secondary', newTheme.colors.background.secondary);
    root.style.setProperty('--color-bg-tertiary', newTheme.colors.background.tertiary);
    
    root.style.setProperty('--color-text-primary', newTheme.colors.text.primary);
    root.style.setProperty('--color-text-secondary', newTheme.colors.text.secondary);
    root.style.setProperty('--color-text-tertiary', newTheme.colors.text.tertiary);
    root.style.setProperty('--color-text-inverse', newTheme.colors.text.inverse);
    
    root.style.setProperty('--color-success', newTheme.colors.success);
    root.style.setProperty('--color-warning', newTheme.colors.warning);
    root.style.setProperty('--color-error', newTheme.colors.error);
    root.style.setProperty('--color-info', newTheme.colors.info);
    root.style.setProperty('--color-border', newTheme.colors.border);
    root.style.setProperty('--color-divider', newTheme.colors.divider);

    // Apply Typography
    root.style.setProperty('--font-heading', newTheme.fonts.heading);
    root.style.setProperty('--font-body', newTheme.fonts.body);
    root.style.setProperty('--font-mono', newTheme.fonts.mono);

    // Apply Font Sizes
    Object.entries(newTheme.fontSizes).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    // Apply Font Weights
    Object.entries(newTheme.fontWeights).forEach(([key, value]) => {
      root.style.setProperty(`--font-weight-${key}`, value.toString());
    });

    // Apply Line Heights
    Object.entries(newTheme.lineHeights).forEach(([key, value]) => {
      root.style.setProperty(`--line-height-${key}`, value.toString());
    });

    // Apply Spacing
    Object.entries(newTheme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply Border Radius
    Object.entries(newTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Apply Border Width
    Object.entries(newTheme.borderWidth).forEach(([key, value]) => {
      root.style.setProperty(`--border-${key}`, value);
    });

    // Apply Shadows
    Object.entries(newTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply Animation Durations
    Object.entries(newTheme.animations.durations).forEach(([key, value]) => {
      root.style.setProperty(`--duration-${key}`, value);
    });

    // Apply Animation Easings
    Object.entries(newTheme.animations.easings).forEach(([key, value]) => {
      root.style.setProperty(`--easing-${key}`, value);
    });

    // Apply Breakpoints
    Object.entries(newTheme.breakpoints).forEach(([key, value]) => {
      root.style.setProperty(`--breakpoint-${key}`, value);
    });

    // Apply Custom CSS if provided
    if (newTheme.customCSS) {
      let styleElement = document.getElementById('theme-custom-css');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'theme-custom-css';
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = newTheme.customCSS;
    }
  };

  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
