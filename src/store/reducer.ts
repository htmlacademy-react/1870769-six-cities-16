import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { cityName, Offers } from '../types/offer-types/offer-list-types';
import { changeCity, setOffers } from './action';

type initialState = {
  cityName: cityName;
  offers: Offers;
};

const initialState: initialState = {
  cityName: CITIES[0],
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => (state.cityName = action.payload))
    .addCase(setOffers, (state, action) => (state.offers = action.payload));
});

export { reducer };
