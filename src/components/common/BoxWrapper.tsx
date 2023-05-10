import React from 'react';

import { Box } from '@mui/material';

interface IProps {
  children: any;
}
export const BoxWrapper = (props: IProps) => {
  const { children } = props;
  return (
    <Box sx={{ boxShadow: '0px 0.5px 1.75px rgba(0, 0, 0, 0.039), 0px 1.85px 6.25px rgba(0, 0, 0, 0.19)' }}>
      {children}
    </Box>
  );
};
