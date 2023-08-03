import { FC, useState } from 'react';

import { styled, Box } from '@mui/material';

import { FOOTER_HEIGHT } from '../../utils/constants';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Navigation } from '../Navigation';

interface Props {
  children: any;
}

export const Layout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  return (
    <LayoutWrapper>
      <ContentWrapper>
        <Box component="header">
          <Header toggleNavigation={toggleNavigation} />
        </Box>
        {/* <Navigation open={open} handleClose={toggleNavigation} /> */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          <Box sx={{ width: '100%', padding: 2, background: 'rgba(255, 255, 255, 0.2)' }}>{children}</Box>
        </Box>
      </ContentWrapper>
      {/* <Box component="footer">
        <Footer />
      </Box> */}
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled('div')`
  min-height: 100vh;
  background-image: linear-gradient(#ccccdc 1px, transparent 1px),
  linear-gradient(to right, #ccccdc 1px, transparent 1px);
  background-size: 100px 100px;
  
`;

const ContentWrapper = styled('div')`
  display: flex;
  min-height: calc(100vh - ${FOOTER_HEIGHT}px);
  display: grid;
  background: radial-gradient(transparent, #f4f5f7 85%);
  height: 100vh;
  
`;

const DrawerHeader = styled('div')(({ theme }) => ({
  // padding: theme.spacing(0, 1),
  // ...theme.mixins.toolbar,
  minHeight: 48,
}));
