import React, { useState } from 'react';

import { AppBar, Box, Toolbar, Button } from '@mui/material';

import Logo from '@/assets/image/ic_logo.png';
import useAuth from '@/Hooks/useAuth';

import { DefaultMenu, MobileMenu } from './Menu';
import { More } from '../Actions';

interface HeaderProps {
  toggleNavigation: () => void;
}

export const Header = ({ toggleNavigation }: HeaderProps) => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <>
      <AppBar
        // onClick={() => handleMenuClose()}
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.grey[600],
        }}
      >
        <Toolbar disableGutters variant="dense">
          {/* <Hamburger toggleNavigation={toggleNavigation} /> */}
          <Box component="img" src={Logo} sx={{ width: 60, height: 48 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            {/* <ThemeSwitcher /> */}
            {/* <Messages total={15} />
            <Notifications total={20} /> */}
            {/* <UserAccount onClick={handleProfileMenuOpen} /> */}
            <Button variant="text" style={{ color: 'black', textTransform: 'none' }}>
              About
            </Button>
            <Button variant="text" style={{ color: 'black', textTransform: 'none' }}>
              Product
            </Button>
            <Button variant="text" style={{ color: 'black', textTransform: 'none' }}>
              Blog
            </Button>
            <Button variant="text" style={{ color: 'black', textTransform: 'none' }}>
              Tools
            </Button>
            <Button variant="text" style={{ color: 'black', textTransform: 'none' }}>
              Integrations
            </Button>
            <Button variant="outlined" style={{ marginRight: 10, marginLeft: 10, textTransform: 'none' }}>
              Log In
            </Button>
            <Button variant="contained" style={{ marginRight: 10, textTransform: 'none' }}>
              Sign In
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <More onClick={handleMobileMenuOpen} />
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        isMenuOpen={Boolean(mobileMoreAnchorEl)}
        handleMenuOpen={handleMobileMenuOpen}
        handleMenuClose={handleMenuClose}
        anchorEl={mobileMoreAnchorEl}
      />
      <DefaultMenu isMenuOpen={Boolean(anchorEl)} handleMenuClose={logout} anchorEl={anchorEl} />
    </>
  );
};
