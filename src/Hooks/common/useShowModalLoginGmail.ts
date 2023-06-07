import { useCallback } from 'react';

import { useCommonInfo } from '@/contexts/Common';
import { actionType } from '@/contexts/Common/action';

const useShowModalLoginGmail = () => {
  const { dispatch } = useCommonInfo();

  const setShowModalLoginGmail = useCallback(
    (showModalLoginGmail: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      showModalLoginGmail !== -1
        ? dispatch({
            type: actionType.SHOW_MODAL_LOGIN_GMAIL,
            showModalLoginGmail: {
              isShow: showModalLoginGmail.isShow,
            },
          })
        : null;
    },
    [dispatch],
  );

  return { setShowModalLoginGmail };
};
export default useShowModalLoginGmail;
