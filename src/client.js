import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root');

hydrateRoot(
  container,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

if (module.hot) {
  module.hot.accept();
}
