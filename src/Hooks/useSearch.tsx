import { useState } from 'react';

const useSearch = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return {
    isOpenModal,
    setIsOpenModal,
    handleCloseModal,
  };
};

export { useSearch };
