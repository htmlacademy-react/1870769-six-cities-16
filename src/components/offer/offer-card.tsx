import { Link, generatePath } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer-types/offer-list-types';
import { OfferPage } from '../../types/offer-types/offer-page-types';
import FavoriteButton from '../favorite-button/favorite-button';

type OfferCardTypes= {
  offer: Offer | OfferPage;
  isCities?: boolean;
  onHover?: (offer?: Offer | null) => void;
}

function OfferCard({offer, isCities, onHover}: OfferCardTypes): JSX.Element {
  const {
    id,
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type } = offer;

  const classesArticle = classNames(
    [
      'place-card',
      {'cities__card': isCities},
      {'favorites__card': !isCities},
      {'near-places__card': isCities === undefined}
    ]
  );
  const classesImageWrapper = classNames(
    [
      'place-card__image-wrapper',
      {'cities__image-wrapper': isCities},
      {'favorites__image-wrapper': !isCities},
      {'near-places__image-wrapper': isCities === undefined}
    ]
  );

  function handlerMouseEnter() {
    if (onHover) {
      onHover(offer);
    }
  }
  function handlerMouseLeave() {
    if (onHover) {
      onHover(null);
    }
  }

  return (
    <article
      key={id}
      className={classesArticle}
      onMouseEnter={handlerMouseEnter}
      onMouseLeave={handlerMouseLeave}
    >
      <div className="place-card__mark">
        {isPremium && <span>Premium</span>}
      </div>

      <div className={classesImageWrapper}>
        <Link to={generatePath(AppRoute.Offer, {id})}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite} offerId={id} />
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id})}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
