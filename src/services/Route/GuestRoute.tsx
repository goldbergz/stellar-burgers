import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/authSlice';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactElement;
};

export const GuestRoute = ({ children }: Props) => {
  const user = useSelector(selectUser);
  console.log('user' + user);

  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
