import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import OfferList from '../../components/offer/offer-list';
import { Offers } from '../../types/offer-list-types';
import { AppRoute, CITIES } from '../../const';
import { useState } from 'react';

type MainPageProps = {
  offerCardCount: number;
  offers: Offers;
}

function MainPage({ offerCardCount, offers }: MainPageProps):JSX.Element {
  const [activeCity, setActiveCity] = useState<string>(CITIES[3]);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);

  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false);
  const handleSortingClick = () => {
    setIsSortingOpen(!isSortingOpen);
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
                    className={`locations__item-link tabs__item ${activeCity === city && 'tabs__item--active'}`}
                    to={AppRoute.Main}
                    onClick={() => setActiveCity(city)}
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
              <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0} onClick={handleSortingClick}>
              Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`}>
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <OfferList offers={filteredOffers} offerCardCount={offerCardCount} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
