import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';
export const NormaiAdmin = [
  {
    id: uniqueId(),
    title: 'Catogery',
    icon: IconTypography,
    href: '/catogery',
  },

  {
    id: uniqueId(),
    title: 'Services',
    icon: IconCopy,
    href: '/Services',
  },

  {
    id: uniqueId(),
    title: 'Service Center',
    icon: IconLogin,
    href: '/Servicecenter',
  },

  {
    id: uniqueId(),
    title: 'Service Requested',
    icon: IconMoodHappy,
    href: '/servicerequest',
  },
  {
    id: uniqueId(),
    title: 'Manage Users',
    icon: IconAperture,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'Manage Frontends',
    icon: IconAperture,
    href: '/frontend',
  },
];
export const Menuitems = [
  {
    id: uniqueId(),
    title: 'Admin',
    icon: IconTypography,
    href: '/admin',
  },
  {
    id: uniqueId(),
    title: 'Catogery',
    icon: IconTypography,
    href: '/catogery',
  },

  {
    id: uniqueId(),
    title: 'Services',
    icon: IconCopy,
    href: '/Services',
  },

  {
    id: uniqueId(),
    title: 'Service Center',
    icon: IconLogin,
    href: '/Servicecenter',
  },

  {
    id: uniqueId(),
    title: 'Service Requested',
    icon: IconMoodHappy,
    href: '/servicerequest',
  },
  {
    id: uniqueId(),
    title: 'Manage Users',
    icon: IconAperture,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'Manage Frontends',
    icon: IconAperture,
    href: '/frontend',
  },
];

export const userMenu = [
  {
    id: uniqueId(),
    title: 'Catogeries',
    icon: IconTypography,
    href: '/catogeries',
  },
  {
    id: uniqueId(),
    title: 'Service Requested',
    icon: IconMoodHappy,
    href: '/servicerequested',
  },
  {
    id: uniqueId(),
    title: 'Service History',
    icon: IconMoodHappy,
    href: '/servicehistory',
  },
];
