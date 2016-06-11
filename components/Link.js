import React, { PropTypes } from 'react';

const Link = ({ children, onClick }) => (
  <button
    onClick={event => {
      event.preventDefault();
      onClick();
    }}
  >
    {children}
  </button>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
