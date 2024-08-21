import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  setCityName,
  setFavoriteStatus,
  loadOfferComments,
  loadOfferPages,
  setSortingOption,
  requireAuthorization,
} from './action';

import { AuthorizationStatus, CITIES, SortingOptionValue } from '../const';

import { CityName, Offers } from '../types/offer-types/offer-list-types';
import { OffersPage } from '../types/offer-types/offer-page-types';
import { OfferComments } from '../types/offer-types/offer-comment-types';

type initialState = {
  cityName: CityName;
  offers: Offers;
  offerPages: OffersPage;
  offerComments: OfferComments;
  sortingOption: SortingOptionValue;
  isAuthorized: AuthorizationStatus;
};

const initialState: initialState = {
  cityName: CITIES[0],
  offers: [],
  offerPages: [],
  offerComments: [],
  sortingOption: SortingOptionValue.Popular,
  isAuthorized: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityName, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOfferPages, (state, action) => {
      state.offerPages = action.payload;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.offerComments = action.payload;
    })
    .addCase(setSortingOption, (state, acion) => {
      state.sortingOption = acion.payload;
    })
    .addCase(setFavoriteStatus, (state, action) => {
      const offer = state.offers.find(
        (item) => item.id === action.payload.offerId
      );

      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      }
    })
    .addCase(requireAuthorization, (state, action) => {
      state.isAuthorized = action.payload;
    });
});

export { reducer };
