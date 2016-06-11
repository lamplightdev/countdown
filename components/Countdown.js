import React, { PropTypes } from 'react';

const Countdown = ({ onRemove, id, time }) => (
  <li>
    {time}
    <form
      method="post"
      action=""
      onSubmit={event => {
        event.preventDefault();

        onRemove();
      }}
    >
      <input
        type="hidden"
        name="action"
        value="remove"
      />
      <input
        type="hidden"
        name="id"
        value={id}
      />
      <button
        type="submit"
      >
        remove
      </button>
    </form>
  </li>
);


Countdown.propTypes = {
  onRemove: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default Countdown;
