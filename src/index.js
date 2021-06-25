import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App state={store.getState()} dispatch={store.dispatch.bind(store)} />
  </Provider>,
  document.getElementById('root')
);

// test@mail.ru
// 1234

// test3@mail.ru
// 12345678