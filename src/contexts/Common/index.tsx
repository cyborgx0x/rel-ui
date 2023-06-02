import React, { createContext, useContext } from 'react';

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

  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>;
};

export const useCommonInfo = () => useContext(CommonContext);
