import React, { useCallback } from 'react';

import { useCommonInfo } from '@/contexts/Common';
import { actionType } from '@/contexts/Common/action';

const useShowModal = () => {
  const { dispatch } = useCommonInfo();

  const setShowModal = useCallback(
    (showModal: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      showModal !== -1
        ? dispatch({
            type: actionType.SHOW_MODAL,
            showModal: {
              isShow: showModal.isShow,
              title: showModal.title,
              content: showModal.content,
            },
          })
        : null;
    },
    [dispatch],
  );

  return { setShowModal };
};
export default useShowModal;
