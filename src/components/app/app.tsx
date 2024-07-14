import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import Header from '../header/header';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundScreen from '../not-found-screen/NotFoundScreen';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  offerCardCount: number;
}

function App({offerCardCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offerCardCount={offerCardCount} />} />
        <Route path={AppRoute.Login} element={<LoginPage />}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />}/>
        <Route path='*' element={<NotFoundScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
