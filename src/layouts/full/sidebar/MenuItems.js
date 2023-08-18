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

const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: 'Home',
  // },

  {
    id: uniqueId(),
    title: 'Admin',
    icon: IconLayoutDashboard,
    href: '/admin',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
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
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  {
    id: uniqueId(),
    title: 'Service Center',
    icon: IconLogin,
    href: '/Servicecenter',
  },
  {
    id: uniqueId(),
    title: 'Roles',
    icon: IconUserPlus,
    href: '/roles',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
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

export default Menuitems;
