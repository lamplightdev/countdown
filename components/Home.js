import React from 'react';

import AddCountdown from '../containers/AddCountdown';
import CountdownList from '../containers/CountdownList';
// import Chart from '../components/Chart';

const Home = () => (
  <div>
    <h3>Home</h3>
    <AddCountdown />
    {/* <Chart /> */}
    <CountdownList />
  </div>
);

export default Home;
