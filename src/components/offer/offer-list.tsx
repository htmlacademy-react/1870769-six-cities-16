import { useState } from 'react';
import { Offer, Offers } from '../../types/offer-types/offer-list-types';
import OfferCard from './offer-card';
import { Nullable } from 'vitest';

type OfferCardProps = {
  offers: Offers;
  offerCardCount: number;
}

function OfferList({offers, offerCardCount}: OfferCardProps): JSX.Element {
  const [, setCurrentOffer] = useState<Nullable<Offer>>(null);

  function handlerCurrentOffer(offer: Nullable<Offer>) {
    if(offer) {
      setCurrentOffer({ ...offer });
    } else {
      setCurrentOffer(null);
    }
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.slice(0, offerCardCount).map((offer) =>
          <OfferCard offer={offer} key={offer.id} isCities setCurrentOffer={handlerCurrentOffer} />
        )
      }
    </div>
  );
}

export default OfferList;
