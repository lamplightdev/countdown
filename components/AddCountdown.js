import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddCountdown extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;
  }

  render() {
    return (<div>
      <div
        style={{
          display: this.props.ui.invalid ? '' : 'none',
        }}
      >
        Invalid
      </div>
      <form
        method="post"
        action="add"
        onSubmit={event => {
          event.preventDefault();

          this.props.router.replace({
            pathname: '/add',
            state: {
              post: {
                time: this.input.value,
              },
            },
          });
        }}
      >
        <div
          className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        >
          <input
            className="mdl-textfield__input"
            type="text"
            name="time"
            ref={node => {
              this.input = node;
            }}
          />
          <label
            className="mdl-textfield__label"
            htmlFor="time"
          >
            Time
          </label>
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          type="Submit"
        >
          Add Countdown
        </button>
      </form>
    </div>);
  }
}

AddCountdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    invalid: PropTypes.bool,
  }),
};

export default connect()(withRouter(AddCountdown));
