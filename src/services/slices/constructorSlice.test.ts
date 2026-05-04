import { expect, test, describe } from '@jest/globals';
import reducer, {
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  setBun
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const ingredient: TIngredient = {
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
};

const constructorIngredient: TConstructorIngredient = {
  ...ingredient,
  id: 'c1'
};

describe('burgerConstructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  test('addIngredient', () => {
    const newState = reducer(
      initialState,
      addIngredient(constructorIngredient)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].id).toBe('c1');
  });

  test('setBun should set bun and not touch ingredients', () => {
    const bun: TIngredient = {
      ...ingredient,
      _id: 'bun1',
      type: 'bun'
    };

    const newState = reducer(initialState, setBun(bun));

    expect(newState.bun).toEqual(bun);
    expect(newState.ingredients).toHaveLength(0);
  });

  test('addIngredient should add non-bun ingredient only to ingredients', () => {
    const nonBunIngredient: TConstructorIngredient = {
      ...ingredient,
      type: 'main',
      id: 'c2'
    };

    const newState = reducer(initialState, addIngredient(nonBunIngredient));

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].type).not.toBe('bun');
    expect(newState.bun).toBeNull();
  });

  test('removeIngredient', () => {
    const newState = reducer(initialState, removeIngredient('c1'));
    expect(newState.ingredients).toHaveLength(0);
  });

  test('moveIngredientUp', () => {
    const secondIngredient = {
      ...ingredient,
      id: 'c2'
    };
    const state = {
      bun: null,
      ingredients: [constructorIngredient, secondIngredient]
    };

    const newState = reducer(state, moveIngredientUp(1));
    expect(newState.ingredients[0].id).toBe('c2');
    expect(newState.ingredients[1].id).toBe('c1');
  });

  test('moveIngredientDown', () => {
    const secondIngredient = {
      ...ingredient,
      id: 'c2'
    };
    const state = {
      bun: null,
      ingredients: [constructorIngredient, secondIngredient]
    };

    const newState = reducer(state, moveIngredientDown(0));
    expect(newState.ingredients[0].id).toBe('c2');
    expect(newState.ingredients[1].id).toBe('c1');
  });
});
