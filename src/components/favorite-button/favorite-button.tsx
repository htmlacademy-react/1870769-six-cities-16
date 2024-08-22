import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { setFavoriteStatus } from '../../store/action';

type FavoriteButtonTypes = {
  isFavorite: boolean;
  pageType?: boolean;
  offerId: string | undefined;
}

function FavoriteButton({isFavorite, pageType, offerId}: FavoriteButtonTypes): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  const isAuthorized = useAppSelector((state) => state.authorizationStatus);

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
    if(isAuthorized !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);

    dispatch(setFavoriteStatus({ offerId, isFavorite: newFavoriteStatus }));
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
