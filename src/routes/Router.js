import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Admin = Loadable(lazy(() => import('../views/dashboard/Admin')));
const Services = Loadable(lazy(() => import('../views/dashboard/Services')));
const FrontEnd = Loadable(lazy(() => import('../views/dashboard/FrontEnd')));
const Catagory = Loadable(lazy(() => import('../views/dashboard/Catogery')));
const ServiceCenter = Loadable(lazy(() => import('../views/dashboard/ServiceCenter')));
const ServiceRequest = Loadable(lazy(() => import('../views/dashboard/ServiceRequest')));
const Users = Loadable(lazy(() => import('../views/dashboard/Users')));
const Roles = Loadable(lazy(() => import('../views/dashboard/Roles')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/admin" /> },
      { path: '/admin', exact: true, element: <Admin /> },
      { path: '/Services', exact: true, element: <Services /> },
      { path: '/frontend', exact: true, element: <FrontEnd /> },
      { path: '/servicecenter', exact: true, element: <ServiceCenter /> },
      { path: '/roles', exact: true, element: <Roles /> },
      { path: '/catogery', exact: true, element: <Catagory /> },
      { path: '/servicerequest', exact: true, element: <ServiceRequest /> },
      { path: '/users', exact: true, element: <Users /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
