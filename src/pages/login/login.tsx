import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import {
  login,
  selectErrorAuth,
  selectIsLoadingAuth
} from '../../services/slices/authSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector(selectIsLoadingAuth);
  const error = useSelector(selectErrorAuth);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      login({
        email,
        password
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/profile', { replace: true });
      }
    });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error || 'Login error'}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
