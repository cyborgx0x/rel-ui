import { useState } from 'react';

import useSearchService from '@/services/search';

import useLoading from './common/useLoading';

const useSearch = () => {
  const { getSearchInfo, getRemainTokenService } = useSearchService();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { setLoading } = useLoading();

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleSearchInfo = async (text: string) => {
    const params = { text };
    setLoading(true);
    const res: any = await getSearchInfo(params);
    setLoading(false);
    const { data, status } = res || {};
    if (status === 200) {
      if (data.status_code === 400) {
        return { remaining: data.remaining };
      }
      return data;
    }
  };
  const getRemainToken = async () => {
    const res: any = await getRemainTokenService();
    const { data, status } = res || {};
    if (status === 200) {
      return data.tokens;
    }
  };
  return {
    isOpenModal,
    setIsOpenModal,
    handleCloseModal,
    handleSearchInfo,
    getRemainToken,
  };
};

export default useSearch;
