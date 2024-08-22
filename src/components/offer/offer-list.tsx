import { Offer, Offers } from '../../types/offer-types/offer-list-types';
import OfferCard from './offer-card';
import classNames from 'classnames';

type OfferCardProps = {
  offers: Offers;
  offerCardCount?: number;
  isCitiesNear?: boolean;
  onHover?: (offer?: Offer | null) => void;
}

function OfferList({offers, offerCardCount, onHover, isCitiesNear}: OfferCardProps): JSX.Element {
  const classesOfferList = classNames(
    [
      'places__list',
      'tabs__content',
      {'near-places__list': isCitiesNear},
      {'cities__places-list': !isCitiesNear}
    ]
  );
  return (
    <div className={classesOfferList}>
      {
        offers.slice(0, offerCardCount).map((offer) =>
          (
            <OfferCard
              offer={offer}
              key={offer.id}
              isCities={isCitiesNear ? true : undefined}
              onHover={onHover}
            />
          )
        )
      }
    </div>
  );
}

export default OfferList;
