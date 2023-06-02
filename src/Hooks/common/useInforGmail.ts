import { useCallback } from 'react';

import { useCommonInfo } from '@/contexts/Common';
import { actionType } from '@/contexts/Common/action';

const useInforGmail = () => {
  const { dispatch } = useCommonInfo();

  const setInforGmail = useCallback(
    (inforGmail: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      inforGmail !== -1
        ? dispatch({
            type: actionType.INFOR_GMAIL,
            inforGmail: inforGmail.inforGmail,
          })
        : null;
    },
    [dispatch],
  );

  return { setInforGmail };
};
export default useInforGmail;
