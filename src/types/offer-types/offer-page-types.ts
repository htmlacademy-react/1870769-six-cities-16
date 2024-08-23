import { Offer } from './offer-list-types';

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export interface OfferPage extends Offer {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}
