import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconUserCheck,
  IconCategory,
  IconUsers,
  IconColorFilter,
  Icon24Hours,
  IconBuildingEstate,
} from '@tabler/icons';

import { uniqueId } from 'lodash';
export const NormaiAdmin = [
  {
    id: uniqueId(),
    title: 'Catogery',
    icon: IconCategory,
    href: '/catogery',
  },

  {
    id: uniqueId(),
    title: 'Services',
    icon: Icon24Hours,
    href: '/Services',
  },

  {
    id: uniqueId(),
    title: 'Service Center',
    icon: IconBuildingEstate,
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
    icon: IconUsers,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'Manage Frontends',
    icon: IconColorFilter,
    href: '/frontend',
  },
];
export const Menuitems = [
  {
    id: uniqueId(),
    title: 'Admin',
    icon: IconUserCheck,
    href: '/admin',
  },
  {
    id: uniqueId(),
    title: 'Catogery',
    icon: IconCategory,
    href: '/catogery',
  },

  {
    id: uniqueId(),
    title: 'Services',
    icon: Icon24Hours,
    href: '/Services',
  },

  {
    id: uniqueId(),
    title: 'Service Center',
    icon: IconBuildingEstate,
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
    title: 'Smart Services',
    icon: IconMoodHappy,
    href: '/smartservices',
  },
  {
    id: uniqueId(),
    title: 'Manage Users',
    icon: IconUsers,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'Manage Frontends',
    icon: IconColorFilter,
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
