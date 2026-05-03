import { describe, test, expect } from '@jest/globals';
import reducer, {
  getOrders,
  createOrder,
  getOrderByNumber,
  clearOrder
} from './ordersSlice';
import { TOrder } from '@utils-types';
import { TNewOrder } from '@api';

const initialState = {
  orders: [],
  currentOrder: null,
  createdOrder: null,
  isLoading: false,
  error: null
};

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'order',
  createdAt: '',
  updatedAt: '',
  number: 1,
  ingredients: ['c1', 'c2']
};

const mockNewOrder: TNewOrder = {
  _id: '1',
  status: 'done',
  name: 'order',
  createdAt: '',
  updatedAt: '',
  number: 1,
  price: 100,
  owner: {
    name: 'test',
    email: 'test@mail.com',
    createdAt: '',
    updatedAt: ''
  }
};

describe('orders reducer', () => {
  test('getOrders pending', () => {
    const newState = reducer(initialState, {
      type: getOrders.pending.type
    });

    expect(newState.isLoading).toBe(true);
  });

  test('getOrders fulfilled', () => {
    const newState = reducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: [mockOrder]
    });

    expect(newState.orders).toEqual([mockOrder]);
    expect(newState.isLoading).toBe(false);
  });

  test('getOrders rejected', () => {
    const newState = reducer(initialState, {
      type: getOrders.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.error).toBe('error');
    expect(newState.isLoading).toBe(false);
  });

  test('createOrder pending', () => {
    const newState = reducer(initialState, {
      type: createOrder.pending.type
    });

    expect(newState.isLoading).toBe(true);
  });

  test('createOrder fulfilled', () => {
    const newState = reducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: {
        order: mockNewOrder
      }
    });

    expect(newState.createdOrder).toEqual(mockNewOrder);
    expect(newState.isLoading).toBe(false);
  });

  test('createOrder rejected', () => {
    const newState = reducer(initialState, {
      type: createOrder.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.error).toBe('error');
    expect(newState.isLoading).toBe(false);
  });

  test('getOrderByNumber pending', () => {
    const newState = reducer(initialState, {
      type: getOrderByNumber.pending.type
    });

    expect(newState.isLoading).toBe(true);
  });

  test('getOrderByNumber fulfilled', () => {
    const newState = reducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    });

    expect(newState.currentOrder).toEqual(mockOrder);
    expect(newState.isLoading).toBe(false);
  });

  test('getOrderByNumber rejected', () => {
    const newState = reducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.error).toBe('error');
    expect(newState.isLoading).toBe(false);
  });

  test('clearOrder', () => {
    const newState = reducer(
      {
        ...initialState,
        createdOrder: mockNewOrder,
        error: 'some error',
        isLoading: true
      },
      clearOrder()
    );

    expect(newState.createdOrder).toBeNull();
    expect(newState.error).toBeNull();
    expect(newState.isLoading).toBe(false);
  });
});
