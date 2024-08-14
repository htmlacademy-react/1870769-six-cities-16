import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers-list';
import { offerComments, offerPage } from './mocks/offer-page';
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offerCardCount={Setting.offerCardCount}
        offers={offers}
        offerPage={offerPage}
        offerComments={offerComments}
      />
    </Provider>
  </React.StrictMode>
);
