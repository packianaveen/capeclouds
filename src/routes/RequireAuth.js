import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';
import FullLayout from 'src/layouts/full/FullLayout';
import { Category } from '@mui/icons-material';
import { Children } from 'react';

const RequireAuth = ({ Children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.user.type != 1) {
    return <Navigate to="/auth/login" />;
  }

  return Children;
};

export default RequireAuth;
