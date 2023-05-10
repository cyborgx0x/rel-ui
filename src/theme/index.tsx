import { useMemo } from 'react';

// material
import { CssBaseline } from '@mui/material';
// import { PaletteType } from '@mui/material/core';
import { createTheme, ThemeProvider, StyledEngineProvider, ThemeOptions } from '@mui/material/styles';
import PropTypes from 'prop-types';

// hooks
//
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import shape from './shape';
import typography from './typography';

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

interface IProps {
  children: any;
  mode: string;
}

export default function ThemeConfig({ children, mode }: IProps) {
  const isLight = mode === 'dark';
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? { ...palette.dark, mode: 'dark' } : { ...palette.light, mode: 'light' },
      shape,
      typography,
      breakpoints,
      direction: 'ltr',
      shadows: isLight ? shadows.dark : shadows.light,
      customShadows: isLight ? customShadows.dark : customShadows.light,
    }),
    [isLight],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
