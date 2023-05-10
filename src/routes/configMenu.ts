import {
  Diversity1 as UsersIcon,
  NotificationImportantOutlined as Warning,
  CameraAlt as CameraIcon,
  Camera as CameraPrivate,
  Map as MapIcon,
  VideoSettings as ComputerIcon,
  Dvr as DvrIcon,
  Diversity2 as Diversity2Icon,
} from '@mui/icons-material';

import { Route } from '../types/Route';

export const configMenu: Array<Route> = [
  {
    key: 'router-erp',
    title: 'Hệ thống ERP',
    description: 'Hệ thống ERP',
    path: '/',
    isEnabled: true,
    icon: UsersIcon,
  },
  {
    key: 'router-it',
    title: 'Hệ thống IT',
    description: 'Hệ thống IT',
    isEnabled: true,
    icon: ComputerIcon,
    expanded: false,
    subRoutes: [
      {
        key: 'router-soc',
        title: 'SOC',
        description: 'SOC',
        path: '/soc',
        isEnabled: true,
        icon: Diversity2Icon,
      },
      {
        key: 'router-camera',
        title: 'Camera giám sát',
        description: 'Camera giám sát',
        path: '/camera',
        isEnabled: true,
        icon: CameraIcon,
      },
      {
        key: 'router-camera-private',
        title: 'Camera bí mật',
        description: 'Camera bí mật',
        path: '/camera/private',
        isEnabled: true,
        icon: CameraPrivate,
      },
    ],
  },
  {
    key: 'router-ttdvcn',
    title: 'Hệ thống TTDVCN',
    description: 'Hệ thống TTDVCN',
    path: '/ttdvcn',
    isEnabled: true,
    icon: DvrIcon,
  },
  {
    key: 'router-map',
    title: 'Bản đồ số',
    description: 'Bản đồ số',
    path: '/map',
    isEnabled: true,
    icon: MapIcon,
  },
];
