import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import reducer, {
  login,
  register,
  getUser,
  updateUser,
  logout
} from './authSlice';
import { TUser } from '@utils-types';

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
});

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: false
};

const mockUser: TUser = {
  email: 'test@mail.com',
  name: 'Test'
};

describe('Auth reducer', () => {
  test('login pending', () => {
    const newState = reducer(initialState, {
      type: login.pending.type
    });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('login fulfilled', () => {
    const newState = reducer(initialState, {
      type: login.fulfilled.type,
      payload: {
        user: mockUser,
        accessToken: 'token',
        refreshToken: 'refresh'
      }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(mockUser);
  });

  test('login rejected', () => {
    const newState = reducer(initialState, {
      type: login.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('error');
  });

  test('register fulfilled', () => {
    const newState = reducer(initialState, {
      type: register.fulfilled.type,
      payload: {
        user: mockUser,
        accessToken: 'token',
        refreshToken: 'refresh'
      }
    });

    expect(newState.user).toEqual(mockUser);
    expect(newState.isLoading).toBe(false);
  });

  test('getUser fulfilled', () => {
    const newState = reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: mockUser
    });

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isLoading).toBe(false);
  });

  test('getUser rejected', () => {
    const newState = reducer(initialState, {
      type: getUser.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.user).toBeNull();
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBe('error');
  });

  test('updateUser fulfilled', () => {
    const newState = reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: mockUser
    });

    expect(newState.user).toEqual(mockUser);
    expect(newState.isLoading).toBe(false);
  });

  test('logout fulfilled', () => {
    const newState = reducer(
      {
        ...initialState,
        user: mockUser
      },
      {
        type: logout.fulfilled.type
      }
    );

    expect(newState.user).toBeNull();
    expect(newState.isLoading).toBe(false);
  });

  test('logout rejected', () => {
    const newState = reducer(initialState, {
      type: logout.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.error).toBe('error');
    expect(newState.isLoading).toBe(false);
  });
});
