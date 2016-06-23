import React from 'react';

import AddCountdown from '../containers/AddCountdown';
import CountdownList from '../containers/CountdownList';
import Clock from '../components/Clock';

const Home = () => (
  <div>
    <h3>Home</h3>
    <AddCountdown />
    <Clock />
    <CountdownList />
  </div>
);

export default Home;
