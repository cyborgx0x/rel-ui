import React, { createContext, useContext } from 'react';

import commonReducer from './reducer';

interface CommonContextInterface {
  isLoading: boolean;
  dispatch: React.Dispatch<any>;
}

const CommonContext = createContext<CommonContextInterface>({
  isLoading: false,
  dispatch: () => null,
});

const defaultCommonInfo = {
  showModal: null,
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
