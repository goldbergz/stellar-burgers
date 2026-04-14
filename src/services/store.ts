import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import authSlice from './slices/authSlice';
import feedSlice from './slices/feedSlice';
import ordersSlice from './slices/ordersSlice';
import constructorSlice from './slices/constructorSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authSlice,
  orders: ordersSlice,
  feed: feedSlice,
  constructor: constructorSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
