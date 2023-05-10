import React, { useState } from 'react';

import { AppBar, Box, Toolbar } from '@mui/material';

import Logo from '@/assets/image/etc-logo.png';
import useAuth from '@/Hooks/useAuth';

import { Hamburger } from './Hamburger';
import { DefaultMenu, MobileMenu } from './Menu';
import { Messages, More, Notifications, UserAccount } from '../Actions';

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
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.grey[600],
        }}
      >
        <Toolbar disableGutters variant="dense">
          <Hamburger toggleNavigation={toggleNavigation} />
          <Box component="img" src={Logo} paddingX={1} sx={{ width: 80, height: 34 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            {/* <ThemeSwitcher /> */}
            <Messages total={15} />
            <Notifications total={20} />
            <UserAccount onClick={handleProfileMenuOpen} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <More onClick={handleMobileMenuOpen} />
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        isMenuOpen={Boolean(mobileMoreAnchorEl)}
        handleMenuOpen={handleMobileMenuOpen}
        handleMenuClose={logout}
        anchorEl={mobileMoreAnchorEl}
      />
      <DefaultMenu isMenuOpen={Boolean(anchorEl)} handleMenuClose={logout} anchorEl={anchorEl} />
    </>
  );
};
