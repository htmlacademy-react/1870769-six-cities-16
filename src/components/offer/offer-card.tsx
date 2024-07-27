import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer-types/offer-list-types';
import { AppRoute } from '../../const';
import { Nullable } from 'vitest';
import classNames from 'classnames';

type OfferCardProps = {
  offer: Offer;
  isCities: boolean;
  setCurrentOffer?: (offer: Nullable<Offer>) => void;
}

function OfferCard({offer, isCities, setCurrentOffer}: OfferCardProps): JSX.Element {
  const {
    id,
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type } = offer;

  const classesArticle = classNames(['place-card', {'cities__card': isCities}, {'favorites__card': !isCities}]);
  const classesImageWrapper = classNames(['place-card__image-wrapper', {'cities__image-wrapper': isCities}, {'favorites__image-wrapper': !isCities}]);

  function handlerMouseEnter() {
    if (setCurrentOffer) {
      setCurrentOffer(offer);
    }
  }
  function handlerMouseLeave() {
    if (setCurrentOffer) {
      setCurrentOffer(null);
    }
  }

  return (
    <article
      key={id + 1}
      className={classesArticle}
      onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}
    >
      <div className="place-card__mark">
        {isPremium && <span>Premium</span>}
      </div>

      <div className={classesImageWrapper}>
        <Link to={AppRoute.Offer.replace(':id', id)}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
