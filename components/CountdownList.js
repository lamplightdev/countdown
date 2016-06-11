import React, { PropTypes } from 'react';
import Countdown from './Countdown';

const CountdownList = ({ countdowns, onCountdownClick }) => (
  <ul>
    {countdowns.map(countdown => (
      <Countdown
        key={countdown.id}
        {...countdown}
        onClick={() => onCountdownClick(countdown.id)}
      />
    ))}
  </ul>
);


CountdownList.propTypes = {
  countdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  onCountdownClick: PropTypes.func.isRequired,
};

export default CountdownList;
