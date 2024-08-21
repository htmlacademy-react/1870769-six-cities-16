import { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import OfferList from '../../components/offer/offer-list';
import Map from '../../components/map/map';

import { useAppDispatch, useAppSelector } from '../../hook';
import { setCityName } from '../../store/action';

import { Offer } from '../../types/offer-types/offer-list-types';

import SortingOptions from '../../components/sorting-options/sorting-options';

import { AppRoute, CITIES } from '../../const';
import { sortingOffers } from '../../utils';

function MainPage():JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector((state) => state.cityName);
  const offers = useAppSelector((state) => state.offers);
  const sortingOption = useAppSelector((state) => state.sortingOption);

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const filteredOffers = offers.filter((offer) => offer.city.name === cityName);
  const sortedOffers = sortingOffers(filteredOffers, sortingOption);

  const activeCityDetails = filteredOffers.length > 0 ? filteredOffers[0].city : null;

  const handleOfferHover = (offer?: Offer | null) => {
    setActiveOffer(offer || null);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li key={city} className="locations__item">
                  <Link
                    className={`locations__item-link tabs__item ${cityName === city && 'tabs__item--active'}`}
                    to={AppRoute.Main}
                    onClick={() => dispatch(setCityName(city))}
                  >
                    <span>{city}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} place{sortedOffers.length > 1 ? 's' : ''} to stay in {cityName}
              </b>

              <SortingOptions />

              <OfferList offers={sortedOffers} offerCardCount={offers.length} onHover={handleOfferHover} />
            </section>
            <div className="cities__right-section">
              {activeCityDetails && (
                <Map offers={sortedOffers} activeOffer={activeOffer} city={activeCityDetails} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
