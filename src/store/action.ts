import { createAction } from '@reduxjs/toolkit';
import { CityName, Offers } from '../types/offer-types/offer-list-types';
import { OffersPage } from '../types/offer-types/offer-page-types';
import { OfferComments } from '../types/offer-types/offer-comment-types';
import { SortingOptionValue } from '../const';

export const setCityName = createAction<CityName>('offer/setCityName');

export const setOffers = createAction<Offers>('offer/setOffers');

export const setOfferPages = createAction<OffersPage>('offer/setOfferPages');

export const setOfferComments = createAction<OfferComments>(
  'offer/setOfferComments'
);

export const setSortingOption = createAction<SortingOptionValue>(
  'main/setSortingOption'
);
