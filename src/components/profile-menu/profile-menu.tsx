import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/authSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logout()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/login', { replace: true });
      }
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
