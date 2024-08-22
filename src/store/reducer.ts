import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  setCityName,
  setFavoriteStatus,
  loadOfferComments,
  loadOfferPages,
  setSortingOption,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
  loadNearOffers,
  getUserData,
} from './action';

import { AuthorizationStatus, CITIES, SortingOptionValue } from '../const';

import { CityName, Offers } from '../types/offer-types/offer-list-types';
import { OfferPage } from '../types/offer-types/offer-page-types';
import { OfferComments } from '../types/offer-types/offer-comment-types';

type initialState = {
  cityName: CityName;
  offers: Offers;
  offerPage: OfferPage | null;
  nearOffers: Offers;
  offerComments: OfferComments;
  sortingOption: SortingOptionValue;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  userEmail: string | null;
  userAvatar: string | undefined;
  error: string | null;
};

const initialState: initialState = {
  cityName: CITIES[0],
  offers: [],
  offerPage: null,
  nearOffers: [],
  offerComments: [],
  sortingOption: SortingOptionValue.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: true,
  userEmail: null,
  userAvatar: undefined,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOfferPages, (state, action) => {
      state.offerPage = action.payload;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.offerComments = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      const { email, avatarUrl } = action.payload;
      state.userAvatar = avatarUrl;
      state.userEmail = email;
    })
    .addCase(setCityName, (state, action) => {
      state.cityName = action.payload;
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
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
