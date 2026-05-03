import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';

describe('rootReducer initialization', () => {
  const initialState = {
    ingredients: {
      ingredients: [],
      isLoading: false,
      error: null
    },
    auth: {
      user: null,
      isLoading: false,
      error: null,
      isAuthChecked: false
    },
    orders: {
      orders: [],
      currentOrder: null,
      createdOrder: null,
      isLoading: false,
      error: null
    },
    feed: {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    },
    burgerConstructor: {
      bun: null,
      ingredients: []
    }
  };
  test('should initialize correctly', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
