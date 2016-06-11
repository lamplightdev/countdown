import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from './middleware/redux/logger';
import db from './middleware/redux/db';

import countdownApp from './reducers';
import App from './components/App';
import Home from './components/Home';
import Info from './components/Info';
import Data from './components/Data';

window.PouchDB = require('pouchdb');

const store = createStore(
  countdownApp,
  window.__INITIAL_STATE__,
  applyMiddleware(logger, db),
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="info" component={Info} />
        <Route path="data" component={Data} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);