import * as React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useCommonInfo } from '@/contexts/Common';

interface IProps {
  children: React.ReactNode;
}
const Wrapper = React.memo<IProps>(({ children }) => {
  const { isLoading } = useCommonInfo();
  return (
    <div>
      <div>{children}</div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
});

export default Wrapper;
