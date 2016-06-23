import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
    };

    const now = new Date(this.props.now);
    this.endTime = new Date(this.props.id);
    this.toGo = this.endTime.getTime() - now.getTime();
    if (this.toGo < 0) {
      this.toGo = 0;
    }

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.interval);
  }

  tick() {
    const now = new Date();
    this.toGo = this.endTime.getTime() - now.getTime();

    if (this.toGo < 0) {
      this.toGo = 0;
      this.setState({
        interval: null,
      });
    } else {
      this.setState({
        interval: requestAnimationFrame(this.tick),
      });
    }
  }

  render() {
    return (
      <li
        className="mdl-list__item"
      >
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
  now: PropTypes.number.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect()(withRouter(Countdown));
