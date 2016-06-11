import React from 'react';

import { Link } from 'react-router';

const Header = () => {
  let closeDrawer = () => {
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
  };

  return (
    <div
      className="mdl-layout__drawer"
    >
      <span className="mdl-layout-title">Title</span>
      <nav className="mdl-navigation">
        <Link
          className="mdl-navigation__link"
          to="/"
          onClick={closeDrawer}
        >
          Home
        </Link>
        <Link
          className="mdl-navigation__link"
          to="/info"
          onClick={closeDrawer}
        >
          Info
        </Link>
        <Link
          className="mdl-navigation__link"
          to="/data"
          onClick={closeDrawer}
        >

          Data
        </Link>
      </nav>
    </div>
  );
};

export default Header;
