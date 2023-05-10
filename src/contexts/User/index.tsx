import React, { createContext, useContext, useEffect } from 'react';

import { AuthService } from '@/services/auth';
import { getTokenStorage } from '@/utils/function';

import { actionType } from './action';
import userReducer from './reducer';

interface Props {
  children: React.ReactNode;
}

interface IDispatch {
  type: string;
  payload?: object;
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  dispatch: () => null,
};

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  dispatch: ({ type, payload }: IDispatch) => {},
});

const setSession = async (serviceToken: string | undefined) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  useEffect(() => {
    const init = async () => {
      const serviceToken = await getTokenStorage();
      if (serviceToken) {
        await setSession(serviceToken);
        dispatch({
          type: actionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
          },
        });
      } else {
        dispatch({
          type: actionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
          },
        });
      }
    };

    init();
  }, []);

  const value = React.useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
