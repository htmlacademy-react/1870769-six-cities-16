import { createAction } from '@reduxjs/toolkit';
import { cityName, Offers } from '../types/offer-types/offer-list-types';

export const changeCity = createAction<cityName>('offer/changeCity');
export const setOffers = createAction<Offers>('offer/setOffers');
