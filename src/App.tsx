import { useEffect, useMemo, useState } from 'react';

import { gapi } from 'gapi-script';
import { SnackbarProvider } from 'notistack';

import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import ThemePrimaryColor from './components/common/ThemePrimaryColor';
import Wrapper from './components/common/Wrapper';
import { AuthProvider, ThemeModeContext, CommonProvider } from './contexts';
import ListRouter from './routes/routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from './utils/constants';

function App() {
  const [mode, setMode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(LIGHT_MODE_THEME);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME));
      },
    }),
    [],
  );
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '895399845840-c0eisal6806qg2hgsejkh3hksno2onjb.apps.googleusercontent.com',
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });
  return (
    <CommonProvider>
      <AuthProvider>
        <ThemeModeContext.Provider value={themeMode}>
          <ThemeConfig mode={mode}>
            <ThemePrimaryColor mode={mode}>
              <BaseOptionChartStyle />
              <GlobalStyles />
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Wrapper>
                  <ListRouter />
                </Wrapper>
              </SnackbarProvider>
            </ThemePrimaryColor>
          </ThemeConfig>
        </ThemeModeContext.Provider>
      </AuthProvider>
    </CommonProvider>
  );
}

export default App;
