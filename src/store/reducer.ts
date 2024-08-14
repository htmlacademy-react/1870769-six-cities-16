import { createReducer } from '@reduxjs/toolkit';
import {
  setCityName,
  setOfferComments,
  setOfferPages,
  setOffers,
} from './action';

import { CITIES } from '../const';

import { CityName, Offers } from '../types/offer-types/offer-list-types';
import { OffersPage } from '../types/offer-types/offer-page-types';
import { OfferComments } from '../types/offer-types/offer-comment-types';

type initialState = {
  cityName: CityName;
  offers: Offers;
  offerPages: OffersPage;
  offerComments: OfferComments;
};

const initialState: initialState = {
  cityName: CITIES[0],
  offers: [],
  offerPages: [],
  offerComments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityName, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOfferPages, (state, action) => {
      state.offerPages = action.payload;
    })
    .addCase(setOfferComments, (state, action) => {
      state.offerComments = action.payload;
    });
});

export { reducer };
