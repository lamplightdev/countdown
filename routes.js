import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Info from './components/Info';
import Data from './components/Data';

export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="info" component={Info} />
      <Route path="data" component={Data} />
    </Route>
  </Router>
);
