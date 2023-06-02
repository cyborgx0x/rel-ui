import { Divider, Menu, MenuItem } from '@mui/material';

import { Settings, Preferences, SignOut } from '../../Actions';

interface DefaultMenuProps {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleLogout: () => void;
  anchorEl: HTMLElement | null;
}

export const DefaultMenu = ({ isMenuOpen, handleMenuClose, anchorEl, handleLogout }: DefaultMenuProps) => (
  <Menu anchorEl={anchorEl} id="primary-search-account-menu" keepMounted open={isMenuOpen} onClose={handleMenuClose}>
    {/* <MenuItem onClick={handleMenuClose}>
      <Settings disableTooltip />
      Settings
    </MenuItem>
    <MenuItem onClick={handleMenuClose}>
      <Preferences disableTooltip />
      Preferences
    </MenuItem>
    <Divider /> */}
    <MenuItem onClick={handleLogout}>
      <SignOut disableTooltip />
      Sign Out
    </MenuItem>
  </Menu>
);
