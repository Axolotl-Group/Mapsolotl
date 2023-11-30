import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './store.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome.jsx';

import styles from './styles.scss';

import ListContainer from './components/ListContainer.jsx';
import Loading from './components/Loading.jsx';
import MoreInfo from './components/MoreInfo.jsx';

// const root = ReactDOM.createRoot(document.getElementById('root'));

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
