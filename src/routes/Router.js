import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import useAuth from './useAuth';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Admin = Loadable(lazy(() => import('../views/dashboard/Admin')));
const Services = Loadable(lazy(() => import('../views/dashboard/Services')));
const FrontEnd = Loadable(lazy(() => import('../views/dashboard/FrontEnd')));
const Catagory = Loadable(lazy(() => import('../views/dashboard/Catogery')));
const Catagories = Loadable(lazy(() => import('../views/dashboard/catogeries')));
const ServiceCenter = Loadable(lazy(() => import('../views/dashboard/ServiceCenter')));
const ServiceRequest = Loadable(lazy(() => import('../views/dashboard/Servicerequestedadmin')));
const Servicerequested = Loadable(lazy(() => import('../views/dashboard/Servicerequested')));
const Servicehistory = Loadable(lazy(() => import('../views/dashboard/ServiceHistory')));
const Users = Loadable(lazy(() => import('../views/dashboard/Users')));
const Roles = Loadable(lazy(() => import('../views/dashboard/Roles')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Option = Loadable(lazy(() => import('../views/authentication/Option')));
const Router = (auth) => {
  const router = [
    {
      path: '/',
      element: <FullLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/catogery" />,
        },
        {
          path: '/catogeries',
          element: <Catagories />,
        },
        {
          path: '/servicerequested',
          element: <Servicerequested />,
        },
        {
          path: '/servicehistory',
          element: <Servicehistory />,
        },
        {
          path: '/catogery',
          element: auth == '1' ? <Catagory /> : <Navigate to={'/auth/login'} replace />,
        },
        {
          path: '/Services',
          element: auth == '1' ? <Services /> : <Navigate to={'/auth/login'} replace />,
        },
        {
          path: '/servicerequest',
          element: auth == '1' ? <ServiceRequest /> : <Navigate to={'/auth/login'} replace />,
        },
        {
          path: '/servicecenter',
          element: auth == '1' ? <ServiceCenter /> : <Navigate to={'/auth/login'} replace />,
        },
        {
          path: '/frontend',
          element: auth == '1' ? <FrontEnd /> : <Navigate to={'/auth/login'} replace />,
        },

        { path: '/roles', exact: true, element: <Roles /> },

        {
          path: '/users',
          element: auth == '1' ? <Users /> : <Navigate to={'/auth/login'} replace />,
        },

        { path: '*', element: <Navigate to="/auth/404" /> },
      ],
    },
    // {
    //   path: '/user',
    //   element: <FullLayout />,
    //   children: [
    //     {
    //       path: '/user/catogeries',
    //       element: auth.type == '2' ? <Catagories /> : <Navigate to={'/auth/login'} replace />,
    //     },
    //   ],
    // },
    {
      path: '/auth',
      element: <BlankLayout />,
      children: [
        { path: '404', element: <Error /> },
        { path: '/auth/register/:phone?/:id?', element: <Register /> },
        { path: '/auth/option/:phone', element: <Option /> },
        { path: '/auth/login', element: <Login /> },
        { path: '*', element: <Navigate to="/auth/404" /> },
      ],
    },
  ];
  return router;
};

export default Router;
