import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData
} from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';
import { RootState } from '../store';

interface AuthState {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: false
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => await loginUserApi(data)
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; name: string }) =>
    await registerUserApi(data)
);

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка получения пользователя';
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления пользователя';
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
      });
  }
});

export const selectIsLoadingAuth = (state: RootState) => state.auth.isLoading;
export const selectErrorAuth = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectiIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
export default authSlice.reducer;
