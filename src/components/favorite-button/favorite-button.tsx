import classNames from 'classnames';
import { useState } from 'react';

type FavoriteButtonTypes = {
  isFavorite: boolean;
  pageType?: boolean;
}

function FavoriteButton({isFavorite, pageType}: FavoriteButtonTypes): JSX.Element {
  const [favorite, setFavorite] = useState(isFavorite);

  const buttonClass = classNames([
    'button',
    {'place-card__bookmark-button': !pageType},
    {'offer__bookmark-button': pageType},
    {'offer__bookmark-button--active': pageType && favorite},
    {'place-card__bookmark-button--active': !pageType && favorite}
  ]);

  const iconClass = classNames(
    {'offer__bookmark-icon': pageType},
    {'place-card__bookmark-icon': !pageType}
  );

  const iconWidth = pageType === pageType ? 31 : 18;
  const iconHeight = pageType === pageType ? 33 : 19;

  const handleButtonClick = () => {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
  };

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={handleButtonClick}
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
