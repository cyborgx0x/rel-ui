import React from 'react';

import { useCommonInfo } from '@/contexts/Common';
import { actionType } from '@/contexts/Common/action';

const useLoading = () => {
  const { dispatch } = useCommonInfo();

  const setLoading = (isLoading: any) => {
    dispatch({
      type: actionType.SET_LOADING,
      isLoading,
    });
  };

  return { setLoading };
};
export default useLoading;
