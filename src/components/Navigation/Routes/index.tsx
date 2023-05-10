import { useState } from 'react';

import { List, Divider, Collapse } from '@mui/material';

import { configMenu } from '@/routes/index';
import { Route } from '@/types/Route';

import { RouteItem } from './RouteItem';
import { SignOutRoute } from './SignOutRoute';

interface IProps {
  open: boolean | undefined;
}
export const Routes = ({ open }: IProps) => {
  const [routesState, setRoutesStage] = useState<Route[]>(configMenu);

  const handleMenuClick = (route: Route) => {
    const items = routesState.map((item) => {
      if (item.key === route.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setRoutesStage(items);
  };

  return (
    <>
      <List component="nav" sx={{ height: '100%', paddingTop: 0 }}>
        {routesState.map(
          (route: Route) =>
            route.isEnabled && (
              <div key={route.key}>
                {route.subRoutes ? (
                  <>
                    <RouteItem
                      key={`${route.key}`}
                      route={route}
                      hasChildren
                      handleMenuClick={handleMenuClick}
                      open={open}
                    />
                    <Collapse in={route.expanded} timeout="auto" unmountOnExit sx={{ marginLeft: 1.5 }}>
                      {route.subRoutes.map((sRoute: Route) => (
                        <RouteItem key={`${sRoute.key}`} route={sRoute} nested open={open} />
                      ))}
                    </Collapse>
                  </>
                ) : (
                  <RouteItem key={route.key} route={route} nested={false} open={open} />
                )}
                {/* {route.appendDivider && <Divider />} */}
              </div>
            ),
        )}
      </List>
      <SignOutRoute open={open} />
    </>
  );
};
