import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Clock from '../components/Clock';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const nowTimestamp = new Date(this.props.now);
    const endTimestamp = new Date(this.props.id);
    this.toGo = endTimestamp - nowTimestamp;
    if (this.toGo < 0) {
      this.toGo = 0;
    }
  }

  componentDidUpdate() {
    const nowTimestamp = new Date(this.props.now);
    const endTimestamp = new Date(this.props.id);
    this.toGo = endTimestamp - nowTimestamp;
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
          action="remove"
          onSubmit={event => {
            event.preventDefault();

            this.props.router.replace({
              pathname: '/modify',
              state: {
                post: {
                  id: this.props.id,
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
  id: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect()(withRouter(Countdown));
