import React, { PropTypes } from 'react';
import Countdown from './Countdown';

const CountdownList = ({ countdowns, now, onCountdownRemove }) => (
  <ul
    className="mdl-list"
  >
    {countdowns.map(countdown => (
      <Countdown
        key={countdown.id}
        {...countdown}
        now={now}
        onRemove={() => onCountdownRemove(countdown.id)}
      />
    ))}
  </ul>
);


CountdownList.propTypes = {
  countdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  onCountdownRemove: PropTypes.func.isRequired,
};

export default CountdownList;
