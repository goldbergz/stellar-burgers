import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorItems
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  createOrder,
  selectCreatedOrder,
  selectIsLoading
} from '../../services/slices/ordersSlice';
import { selectUser } from '../../services/slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectIsLoading);
  const orderModalData = useSelector(selectCreatedOrder);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  const ingredientsIds = useMemo(() => {
    if (!constructorItems.bun) return [];

    return [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', {
        state: { from: location }
      });
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
