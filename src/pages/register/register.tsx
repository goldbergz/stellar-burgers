import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  register,
  selectErrorAuth,
  selectIsLoadingAuth
} from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector(selectIsLoadingAuth);
  const error = useSelector(selectErrorAuth);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      register({
        email,
        password,
        name: userName
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
    <RegisterUI
      errorText={error || 'Register error'}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
