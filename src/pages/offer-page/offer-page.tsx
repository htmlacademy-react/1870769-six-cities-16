import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import CommentList from '../../components/comments/comments-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer/offer-list';

import { AppRoute } from '../../const';

import { Offer } from '../../types/offer-types/offer-list-types';

import { useAppDispatch, useAppSelector } from '../../hook';

import { fetchCommetsAction, fetchNearOffersAction, fetchOfferByIdAction } from '../../store/api-actions';

import FavoriteButton from '../../components/favorite-button/favorite-button';
import ErrorMessage from '../../components/error-message/error-message';
import CommentForm from '../../components/comments/comment-form';

const MAX_NUMBER_OFFERS = 5;

function OfferPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const offerPages = useAppSelector((state) => state.offerPage);
  const offerPageComments = useAppSelector((state) => state.offerComments);
  const nearOffers = useAppSelector((state) => state.nearOffers);

  const { id } = useParams();
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          await dispatch(fetchOfferByIdAction(id));
          await dispatch(fetchCommetsAction(id));
          await dispatch(fetchNearOffersAction(id));
        } catch (error) {
          navigate('/404');
        }
      } else {
        <ErrorMessage />;
      }

    };

    fetchData();
  }, [dispatch, id, navigate]);

  if (!offerPages) {
    return <div>Offer not found <Link to={AppRoute.Main}>Go back main page</Link></div>;
  }

  const {
    images,
    title,
    isPremium,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    isFavorite,
    city
  } = offerPages;

  const handleOfferHover = (hoveredOffer?: Offer | null) => {
    setActiveOffer(hoveredOffer || null);
  };

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <Header />

        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                images.map((image) => (
                  <div key={`${image}-${id}`} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt="there should be a photo here" />
                  </div>
                ))
              }
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <FavoriteButton isFavorite={isFavorite} pageType offerId={id} />
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
              Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>

              <CommentList comments={offerPageComments} />
              <CommentForm id={id} />
            </div>
          </div>

          <Map offers={nearOffers} activeOffer={activeOffer} city={city} />
        </section>

        <div className="container">

          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OfferList
              offerCardCount={MAX_NUMBER_OFFERS}
              offers={nearOffers}
              isCitiesNear
              onHover={handleOfferHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
