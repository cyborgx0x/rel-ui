import React from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { GoogleLogin } from 'react-google-login';

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

  const { loginGmail, handleUserLocal } = useAuth();
  const handleClose = () => setShowModalLoginGmail({ isShow: false });
  const handleResGoogle = async (credentialResponse: any) => {
    await loginGmail(credentialResponse.tokenId);
    handleClose();
  };
  const [accountLocal, setAccountLocal] = React.useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      handleUserLocal(accountLocal, setAccountLocal);
    }
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
            Welcome to ReconSentinel Engine
          </Typography>

          <GoogleLogin
            clientId="895399845840-c0eisal6806qg2hgsejkh3hksno2onjb.apps.googleusercontent.com"
            onSuccess={(response) => {
              console.log(response);
              handleResGoogle(response);
            }}
            isSignedIn={false}
            cookiePolicy="single_host_origin"
            prompt="consent"
          />

          <Typography sx={{ marginTop: 2, marginBottom: 2 }}>----------------- or -----------------</Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ m: 1, width: '25ch' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAccountLocal({ ...accountLocal, username: event.target.value });
            }}
            value={accountLocal.username}
            onKeyDown={handleKeyDown}
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAccountLocal({ ...accountLocal, password: event.target.value });
              }}
              value={accountLocal.password}
              onKeyDown={handleKeyDown}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{ marginTop: 1 }}
            onClick={() => {
              handleUserLocal(accountLocal, setAccountLocal);
            }}
          >
            Log In
          </Button>
          <Typography id="modal-modal-description" sx={{ mt: 2, justifyContent: 'center' }}>
            By continuing, you agree to ReconSentinel Engine's Terms of Service and acknowledge you've read our Privacy Policy
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLoginGmail;
