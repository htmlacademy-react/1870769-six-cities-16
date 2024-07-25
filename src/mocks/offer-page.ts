import { offers } from './offers-list';
import { OffersPage } from '../types/offer-page-types';

const generateRandomImages = (count: number): string[] => {
  const images = [];
  for (let i = 0; i < count; i++) {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    images.push(
      `https://16.design.htmlacademy.pro/static/hotel/${randomNum}.jpg`
    );
  }
  return images;
};

const hostNames = [
  'John Doe',
  'Jane Smith',
  'Alice Johnson',
  'Bob Brown',
  'Charlie Davis',
  'Diana Evans',
  'Frank Green',
  'Grace Hill',
  'Harry Lee',
  'Ivy Wilson',
];

const allGoods = [
  'Heating',
  'Kitchen',
  'Cable TV',
  'Washing machine',
  'Wi-Fi',
  'Air conditioning',
  'Coffee machine',
  'Dishwasher',
  'Iron',
  'Hairdryer',
];

const getRandomHostName = (): string => {
  const randomIndex = Math.floor(Math.random() * hostNames.length);
  return hostNames[randomIndex];
};

const getRandomGoods = (): string[] => {
  const goods: string[] = [];
  const count = Math.floor(Math.random() * allGoods.length) + 1;
  while (goods.length < count) {
    const randomGood = allGoods[Math.floor(Math.random() * allGoods.length)];
    if (!goods.includes(randomGood)) {
      goods.push(randomGood);
    }
  }
  return goods;
};

const avatarUrl = `https://robohash.org/${Math.random()
  .toString(36)
  .substring(7)}.png`;

const offerPage: OffersPage = offers.map((offer) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { previewImage, ...rest } = offer;

  return {
    ...rest,
    description: 'A quiet cozy and picturesque place in the heart of the city.',
    bedrooms: Math.floor(Math.random() * 5) + 1,
    goods: getRandomGoods(),
    host: {
      name: getRandomHostName(),
      avatarUrl: avatarUrl,
      isPro: Math.random() > 0.5,
    },
    images: generateRandomImages(1 + Math.floor(Math.random() * 5)),
    maxAdults: Math.floor(Math.random() * 4) + 1,
  };
});

export { offerPage };
