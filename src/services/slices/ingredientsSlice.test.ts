import { expect, test, describe } from '@jest/globals';
import reducer, { getIngredients } from './ingredientsSlice';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const expectedResult = [
  {
    _id: '1',
    name: 'fish',
    type: 'fish',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  {
    _id: '2',
    name: 'meat',
    type: 'meat',
    proteins: 2,
    fat: 2,
    carbohydrates: 2,
    calories: 2,
    price: 150,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('Ingredients reducer', () => {
  test('getIngredients pending', () => {
    const newState = reducer(initialState, {
      type: getIngredients.pending.type
    });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('getIngredients fulfilled', () => {
    const newState = reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: expectedResult
    });

    expect(newState.ingredients).toEqual(expectedResult);
    expect(newState.isLoading).toBe(false);
  });

  test('getIngredients rejected', () => {
    const newState = reducer(initialState, {
      type: getIngredients.rejected.type,
      error: { message: 'error' }
    });

    expect(newState.error).toBe('error');
    expect(newState.isLoading).toBe(false);
  });
});
