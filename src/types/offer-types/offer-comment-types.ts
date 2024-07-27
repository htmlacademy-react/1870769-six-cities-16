type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferComment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type OfferComments = OfferComment[];
