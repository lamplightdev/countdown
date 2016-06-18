import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { addCountdown, removeCountdown, setUIState } from './actions';

import App from './components/App';
import Home from './components/Home';
import Info from './components/Info';
import Data from './components/Data';

const func = (nextState, replace, callback) => {
  const dispatch = nextState.location.state.dispatch;
  const time = nextState.location.state.time;

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

export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="info" component={Info} />
      <Route path="data" component={Data} />
      <Route path="add" onEnter={func} />
      <Route path="remove" onEnter={funcRemove} />
    </Route>
  </Router>
);
