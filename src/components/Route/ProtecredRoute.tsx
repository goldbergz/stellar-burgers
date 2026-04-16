import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/authSlice';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
