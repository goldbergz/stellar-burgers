import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  selectError,
  selectIngredientById,
  selectIsLoading
} from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector(
    id ? selectIngredientById(id) : () => null
  );
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  if (!isLoading && error) {
    return <p>Запрос деталей ингридиента завершился с ошибкой: {error}</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
