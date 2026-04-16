import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../../services/Route/ProtecredRoute';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  selectError,
  selectIngredients,
  selectIsLoading
} from '../../services/slices/ingredientsSlice';
import { GuestRoute } from '../../services/Route/GuestRoute';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { getUser } from '../../services/slices/authSlice';

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path='/register'
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о закуске' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Информация о заказе' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(selectIsLoading);
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectError);

  useEffect(() => {
    if (ingredients.length === 0 && !isIngredientsLoading) {
      dispatch(getIngredients());
    }
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch, ingredients.length, isIngredientsLoading]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        {isIngredientsLoading ? (
          <Preloader />
        ) : error ? (
          <div className={`${styles.error} text text_type_main-medium pt-4`}>
            {error}
          </div>
        ) : (
          <AppRoutes />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
