import OfferCard from '../offer/offer-card';
import { Offers } from '../../types/offer-types/offer-list-types';

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
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
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
