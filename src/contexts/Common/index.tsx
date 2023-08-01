import React, { createContext, useContext, useEffect } from 'react';

import commonReducer from './reducer';

interface CommonContextInterface {
  isLoading: boolean;
  showModal: any;
  showModalLoginGmail: any;
  inforGmail: any;
  dispatch: React.Dispatch<any>;
}

const CommonContext = createContext<CommonContextInterface>({
  isLoading: false,
  showModal: null,
  showModalLoginGmail: null,
  inforGmail: null,
  dispatch: () => null,
});

const defaultCommonInfo = {
  showModal: null,
  showModalLoginGmail: null,
  inforGmail: null,
  isLoading: false,
};

interface Props {
  children?: any;
}

export const CommonProvider = ({ children }: Props) => {
  const [commonInfo, dispatch] = React.useReducer(commonReducer, defaultCommonInfo);

  const value = React.useMemo(
    () => ({
      ...commonInfo,
      dispatch,
    }),
    [commonInfo],
  );
  useEffect(() => {
    const savedData = localStorage.getItem('myAppData');
    if (savedData) {
      dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(savedData) });
      localStorage.removeItem('myAppData');
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('myAppData', JSON.stringify({ ...commonInfo, isLoading: false }));
  }, [commonInfo]);
  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>;
};

export const useCommonInfo = () => useContext(CommonContext);
