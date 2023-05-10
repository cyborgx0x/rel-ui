import ExitToApp from '@mui/icons-material/ExitToApp';
import { ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';

import useAuth from '@/Hooks/useAuth';

interface IProps {
  open: boolean | undefined;
}

export const SignOutRoute = ({ open }: IProps) => {
  const { logout } = useAuth();

  return (
    <StyledListItemButton onClick={logout}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      {open && <ListItemText primary="Sign Out" />}
    </StyledListItemButton>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
