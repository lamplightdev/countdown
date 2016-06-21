import React from 'react';
import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from './middleware/redux/logger';
import syncDB from './middleware/redux/syncDB';
import promiseMiddleware from 'redux-promise';

import routes from './routes';

import countdownApp from './reducers';

window.PouchDB = require('pouchdb');  // required for PouchDB dev tools to work?

const store = createStore(
  countdownApp,
  window.__INITIAL_STATE__,
  applyMiddleware(promiseMiddleware, logger, syncDB(true)),
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes(store)}
    </Router>
  </Provider>,
  document.getElementById('root')
);
