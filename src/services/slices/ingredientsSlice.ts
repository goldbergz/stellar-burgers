import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

interface ingredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ingredientsState = {
  ingredients: [],
  isLoading: true,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingridients/getAll',
  async () => {
    return await getIngredientsApi();
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState) => {
      return sliceState.ingredients;
    },

    selectIsLoading: (sliceState) => {
      return sliceState.isLoading;
    },
    selectError: (sliceState) => {
      return sliceState.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state: ingredientsState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state: ingredientsState, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(
        getIngredients.fulfilled,
        (state: ingredientsState, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      );
  }
});

export default ingredientsSlice.reducer;

export const { selectIngredients, selectIsLoading, selectError } =
  ingredientsSlice.selectors;

export const selectIngredientById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((item) => item._id === id);
