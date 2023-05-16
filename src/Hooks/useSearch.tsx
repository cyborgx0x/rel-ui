import { useState } from 'react';

const useSearch = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleSearchInfo = (text: string) => {};
  return {
    isOpenModal,
    setIsOpenModal,
    handleCloseModal,
    handleSearchInfo,
  };
};

export { useSearch };
