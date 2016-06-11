import React from 'react';

import { Link } from 'react-router';

const Header = () => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Title</span>
      <div className="mdl-layout-spacer"></div>
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        <Link className="mdl-navigation__link" to="/">Home</Link>
        <Link className="mdl-navigation__link" to="/info">Info</Link>
        <Link className="mdl-navigation__link" to="/data">Data</Link>
      </nav>
    </div>
  </header>
);

export default Header;
