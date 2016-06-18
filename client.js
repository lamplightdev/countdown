import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from './middleware/redux/logger';
import syncDB from './middleware/redux/syncdb';
import promiseMiddleware from 'redux-promise';

import { addCountdown, removeCountdown, setUIState } from './actions';

import countdownApp from './reducers';
import App from './components/App';
import Home from './components/Home';
import Info from './components/Info';
import Data from './components/Data';

window.PouchDB = require('pouchdb');  // required for PouchDB dev tools to work?

const store = createStore(
  countdownApp,
  window.__INITIAL_STATE__,
  applyMiddleware(promiseMiddleware, logger, syncDB(true)),
  window.devToolsExtension && window.devToolsExtension()
);

const func = (nextState, replace, callback) => {
  const time = nextState.location.state.time;
  const dispatch = nextState.location.state.dispatch;

  const promises = [];

  const valueInt = parseInt(time, 10);
  if (valueInt > 9) {
    promises.push(dispatch(addCountdown(valueInt)));
    promises.push(dispatch(setUIState('invalid', false)));
  } else {
    promises.push(dispatch(setUIState('invalid', true)));
  }

  Promise.all(promises).then(() => {
    replace('/');
    callback();
  });
};

const funcRemove = (nextState, replace, callback) => {
  const dispatch = nextState.location.state.dispatch;
  const id = nextState.location.state.id;

  const promises = [];

  promises.push(dispatch(removeCountdown(id)));

  Promise.all(promises).then(() => {
    replace('/');
    callback();
  });
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="info" component={Info} />
        <Route path="data" component={Data} />
        <Route path="add" onEnter={func} />
        <Route path="remove" onEnter={funcRemove} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
