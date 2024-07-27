import { Offer } from './offer-list-types';

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export interface OfferPage extends Omit<Offer, 'previewImage'> {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export type OffersPage = OfferPage[];
