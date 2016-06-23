import React from 'react';
import { Route, IndexRoute } from 'react-router';

import apiAddCountdown from './api/addCountdown';
import apiRemoveCountdown from './api/removeCountdown';
import apiModifyCountdown from './api/modifyCountdown';

import App from './components/App';
import Home from './components/Home';
import Info from './components/Info';
import Data from './components/Data';

export default store => (
  <Route path="/(?(:params))" component={App}>
    <IndexRoute component={Home} />
    <Route path="info" component={Info} />
    <Route path="data" component={Data} />

    <Route path="add" onEnter={apiAddCountdown(store)} />
    <Route path="remove" onEnter={apiRemoveCountdown(store)} />
    <Route path="modify" onEnter={apiModifyCountdown(store)} />
  </Route>
);
