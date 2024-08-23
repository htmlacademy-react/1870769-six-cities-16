import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hook';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const email = useAppSelector((state) => state.userEmail);
  const avatar = useAppSelector((state) => state.userAvatar);
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.NoAuth ?
                <li className="header__nav-item">
                  <Link to={AppRoute.Login} className="header__nav-link">
                    Login
                  </Link>
                </li> :
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src={avatar}
                          width="54" height="54"
                          alt="Reviews avatar"
                        />
                      </div>
                      <span className="header__user-name user__name">{email}</span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span onClick={handleLogout} className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
