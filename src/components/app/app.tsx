import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundScreen from '../not-found-screen/NotFoundScreen';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offer-types/offer-list-types';
import { OffersPage } from '../../types/offer-types/offer-page-types';
import { OfferComments } from '../../types/offer-types/offer-comment-types';

type AppScreenProps = {
  offerCardCount: number;
  offers: Offers;
  offerPage: OffersPage;
  offerComment: OfferComments;
}

function App({offerCardCount, offers, offerPage, offerComment}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage offerCardCount={offerCardCount} offers={offers} />} />
          <Route path={AppRoute.Login} element={<LoginPage />}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<OfferPage offerPage={offerPage} offerComment={offerComment} />}/>
          <Route path='*' element={<NotFoundScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
