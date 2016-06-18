import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;
  }

  render() {
    return (<li>
      {this.props.time}
      <form
        method="post"
        action="remove"
        onSubmit={event => {
          event.preventDefault();

          const id = this.input.value;
          this.props.router.replace({
            pathname: '/remove',
            state: {
              id,
              dispatch: this.props.dispatch,
            },
          });
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
          value={this.props.id}
          ref={node => {
            this.input = node;
          }}
        />
        <button
          type="submit"
        >
          remove
        </button>
      </form>
    </li>);
  }
}


Countdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default connect()(withRouter(Countdown));
