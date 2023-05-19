/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react';

import Backdrop from '@mui/material/Backdrop';

import Loading from '@/assets/image/running-nezuko-gif.gif';
import { useCommonInfo } from '@/contexts/Common';

import ModalCustom from './ModalCustom';

interface IProps {
  children: React.ReactNode;
}
const Wrapper = React.memo<IProps>(({ children }) => {
  const { isLoading, showModal } = useCommonInfo();
  return (
    <div>
      <div>{children}</div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        {/* <CircularProgress color="inherit" /> */}
        <img src={Loading} alt="login" style={{ width: 200, height: 100 }} />
      </Backdrop>
      {showModal && <ModalCustom />}
    </div>
  );
});

export default Wrapper;
