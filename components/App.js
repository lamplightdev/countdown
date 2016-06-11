import React, { PropTypes } from 'react';

import Header from './Header';
import Drawer from './Drawer';

class App extends React.Component {
  componentDidUpdate() {
    if (window && window.componentHandler) {
      window.componentHandler.upgradeDom();
    }
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <Drawer />
        <main className="mdl-layout__content">
          <div className="page-content">
            <div>{this.props.children}</div>
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
