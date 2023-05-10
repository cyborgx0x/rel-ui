import React, { ComponentType } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Icon, IconButton, lighten, ListItemButton, ListItemIcon, ListItemText, styled, Tooltip } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { Route } from '../../../../types';

interface RouteItemProps {
  route: Route;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: Route) => void;
  open: boolean | undefined;
}

export const RouteItem = ({
  route,
  nested = false,
  hasChildren = false,
  handleMenuClick = () => {},
  open,
}: RouteItemProps) => {
  const location = useLocation();

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!route.isEnabled || hasChildren) e.preventDefault();
  };

  const isSelected =
    location.pathname === route.path || (hasChildren && route.subRoutes?.some((e) => location.pathname === e.path));

  const item = (
    <StyledListItemButton isSelected={location.pathname === route.path} onClick={() => handleMenuClick(route)}>
      <StyledIconButton size="small">
        {route.icon && <StyledIcon component={route.icon} isSelected={isSelected || false} />}
      </StyledIconButton>
      {open && <CustomListItemText isSelected={location.pathname === route.path} primary={route.title} />}
      {hasChildren && (route.expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
    </StyledListItemButton>
  );

  return (
    <StyledNavLink to={`${route.path}`} key={route.key} onClick={handleNavigate}>
      {route.description ? (
        <Tooltip title={`${route.description}${!route.isEnabled ? ' (Not Allowed)' : ''}`} placement="right">
          {item}
        </Tooltip>
      ) : (
        item
      )}
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const StyledListItemButton = styled(ListItemButton)<{ isSelected: boolean }>(({ isSelected }) => ({
  background: isSelected ? 'rgba(0, 133, 255, 0.1)' : 'transparent',
  borderRadius: 4,
  padding: 0,
  marginLeft: 8,
  marginRight: 8,
  marginTop: 8,
}));

const StyledIconButton = styled(IconButton)({
  transition: 'box-shadow 0.1s',
});

const StyledIcon = styled(Icon)<{ isSelected: boolean; component: ComponentType<{}> }>`
  ${({ isSelected, theme }) => isSelected && `color: ${theme.palette.primary.main};`}
`;

const CustomListItemText = styled(ListItemText)<{ isSelected: boolean; primary: string }>(({ isSelected, theme }) => ({
  '& .MuiTypography-root': {
    fontWeight: 500,
    color: isSelected ? theme.palette.primary.main : '#585858',
  },
}));
