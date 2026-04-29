import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import {
  selectiIsAuthChecked,
  selectUser
} from '../../services/slices/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectiIsAuthChecked);

  if (!isAuthChecked) return <Preloader />;

  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
