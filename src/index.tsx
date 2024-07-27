import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers-list';
import { offerComment, offerPage } from './mocks/offer-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offerCardCount={Setting.offerCardCount}
      offers={offers}
      offerPage={offerPage}
      offerComment={offerComment}
    />
  </React.StrictMode>
);
