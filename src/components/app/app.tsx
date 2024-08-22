import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../../const';

import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundScreen from '../not-found-screen/NotFoundScreen';
import { useAppSelector } from '../../hook';
import SpinnerLoader from '../rotating-loader/spinner-loader';

function App(): JSX.Element {
  const isOfferDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const authorizationStatus = useAppSelector((state) => state.isAuthorized);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOfferDataLoading) {
    return (
      <SpinnerLoader />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<OfferPage />}/>
          <Route path='*' element={<NotFoundScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
