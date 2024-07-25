import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundScreen from '../not-found-screen/NotFoundScreen';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offer-list-types';
import { OffersPage } from '../../types/offer-page-types';

type AppScreenProps = {
  offerCardCount: number;
  offers: Offers;
  offerPage: OffersPage;
}

function App({offerCardCount, offers, offerPage}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage offerCardCount={offerCardCount} offers={offers} />} />
          <Route path={AppRoute.Login} element={<LoginPage />}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<OfferPage offerPage={offerPage} />}/>
          <Route path='*' element={<NotFoundScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
