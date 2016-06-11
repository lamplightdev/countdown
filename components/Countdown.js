import React, { PropTypes } from 'react';

const Countdown = ({ onClick, time }) => (
  <li
    onClick={onClick}
  >
    {time}
  </li>
);


Countdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default Countdown;
