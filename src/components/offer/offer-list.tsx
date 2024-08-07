import { Offer, Offers } from '../../types/offer-types/offer-list-types';
import OfferCard from './offer-card';

type OfferCardProps = {
  offers: Offers;
  offerCardCount: number;
  onHover?: (offer?: Offer | null) => void;
}

function OfferList({offers, offerCardCount, onHover}: OfferCardProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.slice(0, offerCardCount).map((offer) =>
          <OfferCard offer={offer} key={offer.id} isCities onHover={onHover} />
        )
      }
    </div>
  );
}

export default OfferList;
