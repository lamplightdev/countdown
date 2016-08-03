import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Clock from '../components/Clock';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.toGo = this.props.id - this.props.now;
    if (this.toGo < 0) {
      this.toGo = 0;
    }
  }

  componentDidUpdate() {
    this.toGo = this.props.id - this.props.now;
    if (this.toGo < 0) {
      this.toGo = 0;
    }
  }

  render() {
    return (
      <li
        className=""
      >
        <Clock
          time={this.toGo}
          length={this.props.length}
        />
        ({this.toGo})
        <form
          className="mdl-list__item-primary-content"
          method="post"
          action="remove"
          onSubmit={event => {
            event.preventDefault();

            this.props.router.replace({
              pathname: '/remove',
              state: {
                post: {
                  id: this.props.id,
                },
              },
            });
          }}
        >
          <input
            type="hidden"
            name="id"
            value={this.props.id}
          />
          <button
            className="cd-button cd-button--link mdl-list__item-secondary-action"
            type="submit"
          >
            <i className="material-icons">delete</i>
          </button>
        </form>
        <form
          className="mdl-list__item-primary-content"
          method="post"
          action="modify"
          onSubmit={event => {
            event.preventDefault();

            this.props.router.replace({
              pathname: '/modify',
              state: {
                post: {
                  id: this.props.id,
                  now: this.props.now,
                  plus: 10000,
                },
              },
            });
          }}
        >
          <input
            type="hidden"
            name="id"
            value={this.props.id}
          />
          <input
            type="hidden"
            name="plus"
            value={10000}
          />
          <button
            className="cd-button cd-button--link mdl-list__item-secondary-action"
            type="submit"
          >
            +10
          </button>
        </form>
      </li>
    );
  }
}


Countdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect()(withRouter(Countdown));
