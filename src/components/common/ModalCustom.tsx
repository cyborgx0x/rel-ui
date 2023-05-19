import { Modal, Box, Typography } from '@mui/material';

import { useCommonInfo } from '@/contexts/Common';
import useShowModal from '@/Hooks/common/useShowModal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalCustom = () => {
  const { showModal } = useCommonInfo();
  const { setShowModal } = useShowModal();
  const handleClose = () => setShowModal({ isShow: false });

  return (
    <div>
      <Modal
        open={showModal.isShow}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {showModal.title || 'Error'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {showModal.content || 'Network error'}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCustom;
