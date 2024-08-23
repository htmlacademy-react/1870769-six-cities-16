import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state/state';
import { AxiosInstance } from 'axios';
import {
  getUserData,
  loadNearOffers,
  loadOfferComments,
  loadOfferPages,
  loadOffers,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
} from './action';
import { dropToken, getToken, saveToken } from '../service/token';

import { Offers } from '../types/offer-types/offer-list-types';
import { AuthData } from '../types/auth-data';
import { FullUserData, UserData } from '../types/user-data';

import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { store } from '.';
import { OfferPage } from '../types/offer-types/offer-page-types';
import { OfferComments } from '../types/offer-types/offer-comment-types';

export const clearErrorAction = createAsyncThunk('clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(false));
  const { data } = await api.get<Offers>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});

export const fetchOfferByIdAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offer/fetchOfferByIdAction',
  async (id: string, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(false));
    const { data } = await api.get<OfferPage>(`${APIRoute.Offers}/${id}`);
    dispatch(loadOfferPages(data));
  }
);

export const fetchNearOffersAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'offer/fetchNearOffersAction',
  async (id: string, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadNearOffers(data));
  }
);

export const fetchCommetsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('fetchCommetsAction', async (id: string, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(false));
  const { data } = await api.get<OfferComments>(`${APIRoute.Comments}/${id}`);
  dispatch(loadOfferComments(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const token = getToken();
    if (!token) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      return;
    }

    const { data } = await api.get<FullUserData>(APIRoute.Login);
    dispatch(getUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(checkAuthAction());
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
