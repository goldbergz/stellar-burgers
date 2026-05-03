import { expect, test, describe } from '@jest/globals';
import reducer, { FeedState, getFeed } from './feedSlice';
import { TOrdersData } from '@utils-types';

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const expectedResult: TOrdersData = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'order',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['c1', 'c2']
    }
  ],
  total: 1,
  totalToday: 1
};

describe('Feed reducer', () => {
  test('getFeed pending', () => {
    const newState = reducer(initialState, {
      type: getFeed.pending.type
    });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('getFeed fulfilled', () => {
    const newState = reducer(initialState, {
      type: getFeed.fulfilled.type,
      payload: expectedResult
    });

    expect(newState.orders).toEqual(expectedResult.orders);
    expect(newState.total).toEqual(expectedResult.total);
    expect(newState.totalToday).toEqual(expectedResult.totalToday);
    expect(newState.isLoading).toBe(false);
  });

  test('getFeed rejected', () => {
    const newState = reducer(initialState, {
      type: getFeed.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.error).toBe('error');
    expect(newState.isLoading).toBe(false);
  });
});
