import { Offers } from '../../types/offer-list-types';
import OfferCard from './offer-card';

type OfferCardProps = {
  offers: Offers;
  offerCardCount: number;
}

function OfferList({offers, offerCardCount}: OfferCardProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.slice(0, offerCardCount).map((offer) =>
          <OfferCard offer={offer} key={offer.id} />
        )
      }
    </div>
  );
}

export default OfferList;
