import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
    };

    this.input = null;

    const now = this.props.now;
    this.toGo = this.props.start + this.props.time - now;

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    const now = Math.floor(Date.now() / 1000);
    this.toGo = this.props.start + this.props.time - now;

    this.setState({
      interval: requestAnimationFrame(this.tick),
    });
  }

  render() {
    return (
      <li
        className="mdl-list__item"
      >
        {this.props.time} ({this.toGo})
        <form
          className="mdl-list__item-primary-content"
          method="post"
          action="remove"
          onSubmit={event => {
            event.preventDefault();

            const id = this.input.value;
            this.props.router.replace({
              pathname: '/remove',
              state: {
                post: {
                  id,
                },
              },
            });
          }}
        >
          <input
            type="hidden"
            name="id"
            value={this.props.id}
            ref={node => {
              this.input = node;
            }}
          />
          <button
            className="cd-button cd-button--link mdl-list__item-secondary-action"
            type="submit"
          >
            <i className="material-icons">delete</i>
          </button>
        </form>
      </li>
    );
  }
}


Countdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default connect()(withRouter(Countdown));
