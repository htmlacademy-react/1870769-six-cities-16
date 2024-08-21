import { createAction } from '@reduxjs/toolkit';
import { CityName, Offers } from '../types/offer-types/offer-list-types';
import { OffersPage } from '../types/offer-types/offer-page-types';
import { OfferComments } from '../types/offer-types/offer-comment-types';
import { AuthorizationStatus, SortingOptionValue } from '../const';

export const setCityName = createAction<CityName>('offer/setCityName');

export const loadOffers = createAction<Offers>('offer/loadOffers');

export const loadOfferPages = createAction<OffersPage>('offer/loadOfferPages');

export const loadOfferComments = createAction<OfferComments>(
  'offer/loadOfferComments'
);

export const setSortingOption = createAction<SortingOptionValue>(
  'main/setSortingOption'
);

export const setFavoriteStatus = createAction<{
  offerId: string | undefined;
  isFavorite: boolean;
}>('offer/setFavoriteStatus');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
