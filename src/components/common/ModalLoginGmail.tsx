import { Modal, Box, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

import Logo from '@/assets/image/ic_logo.png';
import { useCommonInfo } from '@/contexts/Common';
import useShowModalLoginGmail from '@/Hooks/common/useShowModalLoginGmail';
import useAuth from '@/Hooks/useAuth';

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

const ModalLoginGmail = () => {
  const { showModalLoginGmail } = useCommonInfo();
  const { setShowModalLoginGmail } = useShowModalLoginGmail();

  const { loginGmail } = useAuth();
  const handleClose = () => setShowModalLoginGmail({ isShow: false });
  const handleResGoogle = async (credentialResponse: any) => {
    await loginGmail(credentialResponse.credential);
    handleClose();
  };
  return (
    <div>
      <Modal
        open={showModalLoginGmail.isShow}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={[
            style,
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: 1,
            },
          ]}
        >
          <Box component="img" src={Logo} sx={{ width: 60, height: 48 }} />
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginTop: 2, marginBottom: 2 }}>
            Welcome to Wibu
          </Typography>

          <GoogleLogin
            shape="pill"
            width="240"
            theme="filled_blue"
            onSuccess={(credentialResponse) => {
              handleResGoogle(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />

          <Typography id="modal-modal-description" sx={{ mt: 2, justifyContent: 'center' }}>
            By continuing, you agree to Wibu's Terms of Service and acknowledge you've read our Privacy Policy
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLoginGmail;
