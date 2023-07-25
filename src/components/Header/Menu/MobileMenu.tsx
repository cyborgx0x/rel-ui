import React, { useContext, useState } from 'react';

import { Box, Menu, MenuItem } from '@mui/material';

import { useCommonInfo } from '@/contexts/Common';

import { ThemeModeContext } from '../../../contexts';
import { Messages, Notifications, SignOut, Settings } from '../../Actions';
import { ThemeSwitcher } from '../ThemeSwitcher';

interface MobileMenuProps {
  isMenuOpen: boolean;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
  handleLogout: () => void;
  handleLoginLocal: () => void;
}

export const MobileMenu = ({
  isMenuOpen,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
  handleLogout,
  handleLoginLocal,
}: MobileMenuProps) => {
  const { toggleThemeMode } = useContext(ThemeModeContext);
  const { inforGmail } = useCommonInfo();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ textAlign: 'center' }}>
        {/* <MenuItem onClick={toggleThemeMode}>
          <ThemeSwitcher disableTooltip />
          Toggle Theme
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Messages total={15} disableTooltip />
          Messages
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Notifications total={20} disableTooltip />
          Notifications
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Settings disableTooltip />
          Settings
        </MenuItem> */}
        {inforGmail ? (
          <MenuItem onClick={handleLogout}>
            <SignOut disableTooltip onClick={() => alert('Signing out...')} />
            Sign Out
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLoginLocal}>
            <SignOut disableTooltip onClick={() => alert('Signing in...')} />
            Sign In
          </MenuItem>
        )}
      </Box>
    </Menu>
  );
};
