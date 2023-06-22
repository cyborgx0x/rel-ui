import { useMemo, useState } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider } from 'notistack';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import ThemePrimaryColor from './components/common/ThemePrimaryColor';
import Wrapper from './components/common/Wrapper';
import { AuthProvider, ThemeModeContext, CommonProvider } from './contexts';
import ListRouter from './routes/routes';
import store, { persistor } from './state/redux/store';
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

  return (
    <GoogleOAuthProvider clientId="895399845840-c0eisal6806qg2hgsejkh3hksno2onjb.apps.googleusercontent.com">
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
