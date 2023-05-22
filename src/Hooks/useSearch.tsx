import { useState } from 'react';

import useSearchService from '@/services/search';

import useLoading from './common/useLoading';

const useSearch = () => {
  const { getSearchInfo } = useSearchService();
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
        return {};
      }
      return data;
    }
  };
  return {
    isOpenModal,
    setIsOpenModal,
    handleCloseModal,
    handleSearchInfo,
  };
};

export default useSearch;
