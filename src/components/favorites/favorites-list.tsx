import { Link } from 'react-router-dom';
import OfferCard from '../offer/offer-card';
import { Offers } from '../../types/offer-types/offer-list-types';
import { AppRoute } from '../../const';

type FavoritesTypes = {
  favoriteOffers: Partial<Record<string, Offers>>;
};

function FavoritesList({favoriteOffers}: FavoritesTypes): JSX.Element {
  return (
    <ul className="favorites__list">
      {
        Object.entries(favoriteOffers).map(([city, offers]) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={AppRoute.Main}>
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {
                offers && offers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} isCities={false} />
                ))
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default FavoritesList;
