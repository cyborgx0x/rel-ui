import React, { useMemo } from 'react';

// material
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

import ComponentsOverrides from '@/theme/overrides';
import palette from '@/theme/palette';
import { customShadows } from '@/theme/shadows';
import '@/styles/bitter-font.css';

interface IProps {
  children: React.ReactNode;
  mode: string;
}

export default function ThemePrimaryColor({ children, mode }: IProps) {
  const defaultTheme = useTheme();
  const isLight = mode === 'dark';

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: {
          name: 'default',
          ...palette.light.primary,
        },
      },
      customShadows: isLight
        ? { ...customShadows.dark, primary: `0 8px 16px 0 ${alpha('#00AB55', 0.24)}` }
        : { ...customShadows.light, primary: `0 8px 16px 0 ${alpha('#00AB55', 0.24)}` },
    }),
    [defaultTheme, isLight],
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
