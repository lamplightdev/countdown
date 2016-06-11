import React, { PropTypes } from 'react';

import moment from 'moment';

const DataList = ({ data }) => (
  <ul>
    {data.slice(0, 100).map(datum => (
      <li
        key={datum.startTime}
      >
        {datum.kWh} ({datum.date}, {moment.utc(datum.date).format('X')})
      </li>
    ))}
  </ul>
);


DataList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    kWh: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default DataList;
