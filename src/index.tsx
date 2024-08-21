import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import ErrorMessage from './components/error-message/error-message';
import App from './components/app/app';
import { store } from './store';

import 'leaflet/dist/leaflet.css';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
